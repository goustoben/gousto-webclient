import { extractScriptOptions } from './routes/scripts'

const Koa = require('koa')
const React = require('react')
const convert = require('koa-convert')
const koaStatic = require('koa-static')
const koaMount = require('koa-mount')
const bodyParser = require('koa-body')
const { renderToString } = require('react-dom/server')
const Footer = require('Footer').default
const logger = require('utils/logger').default
const app = new Koa()
const { Provider } = require('react-redux')

const globals = require('config/globals')
const MainLayout = require('layouts/MainLayout').default
const ErrorPage = require('components/ErrorPage').default
const Page = require('containers/Page').default
const { Helmet } = require('react-helmet')
const GoustoHelmet = require('Helmet/GoustoHelmet').default

const { clearPersistentStore } = require('middlewares/persist/persistStore')

const withStatic = process.env.withStatic === 'true'

const uuidv1 = require('uuid/v1')
const {loggerSetUuid} = require('actions/logger')
const addressLookupRoute = require('./routes/addressLookup').default
const routes = require('./routes').default
const htmlTemplate = require('./template')
const { appsRedirect } = require('./middleware/apps')
const { sessionMiddleware } = require('./middleware/tracking')
const { processRequest, configureHistoryAndStore } = require('./processRequest')

app.use(sessionMiddleware())

/* eslint-disable no-param-reassign */
app.use(async (ctx, next) => {
  const startTime = new Date()
  const { header, request: { path }} = ctx
  const writeLog = (path.indexOf('/ping') === -1) && (path.indexOf('/nsassets') === -1 )

  if (writeLog) {
    const uuid = uuidv1()
    ctx.uuid = uuid
    logger.notice({message: '[START] REQUEST', requestUrl: path, uuid: ctx.uuid, headers: header})
  }

  await next()
  if (writeLog) {
    logger.notice({message: '[END] REQUEST', requestUrl: path, uuid: ctx.uuid, elapsedTime: (new Date() - startTime), headers: header})
  }
})

app.use(async (ctx, next) => {
  const { request, uuid } = ctx
  const { url } = request

  if (uuid) {
    const { store } = configureHistoryAndStore(url)
    store.dispatch(loggerSetUuid(uuid))
  }
  try {
    // Make cookies secure
    ctx.cookies.secure = globals.secure
    ctx.cookies.path = '/'

    await next()
  } catch (err) {
    if (err.networkError) {
      err.status = err.networkError.statusCode
    }
    logger.critical({message: err.message, status: err.status, uuid, errors: [err]})

    if (Number(err.status) === 200) {
      ctx.status = 500
    } else {
      ctx.status = Number(err.status)
    }
    clearPersistentStore(ctx.cookies)

    const { store } = configureHistoryAndStore(url, { serverError: `${ctx.status}` })
    const scripts = extractScriptOptions(request)

    renderToString(
      <GoustoHelmet
        scripts={scripts}
        requestUrl={url}
      />
    )
    const reactHTML = (
      <Provider store={store}>
        <Page>
          <MainLayout>
            <ErrorPage status={`${ctx.status}`} />
          </MainLayout>
        </Page>
      </Provider>
    )
    const helmetHead = __SERVER__ ? Helmet.renderStatic() : Helmet.peek
    ctx.body = htmlTemplate(renderToString(reactHTML), store.getState(), ctx.req.headers['user-agent'], scripts, helmetHead)
  }
})

app.use(appsRedirect)

app.use(addressLookupRoute)

/**
 * Authentication Routes
 */
app.use(bodyParser({ multipart: true }))
routes.auth(app)
routes.user(app)

app.use(async (ctx, next) => {
  if (ctx.request.path === '/ping') {
    ctx.body = 'pong'
  } else if (ctx.request.path === '/footer') {
    const { store } = configureHistoryAndStore(ctx.request.url)
    const reactHTML = (
      <Provider store={store}>
        <Footer simple={Boolean(ctx.request.query.simple)} />
      </Provider>
    )
    ctx.body = renderToString(reactHTML)
  } else {
    await next()
  }
})

if (__DEV__ || withStatic) { // required for local DEV build
  logger.info('Serving static files in /nsassets from /public')
  app.use(convert(koaMount('/nsassets/', koaStatic('public'))))
}

if (__PROD__ && __ENV__ === 'local') { // required for local PROD build
  app.use(convert(koaMount('/nsassets/', koaStatic('public'))))
  app.use(convert(koaMount('/', koaStatic('public'))))
}

app.use(processRequest)

const port = __ENV__ === 'local' ? 8080 : 80

app.listen(port, () => {
  logger.notice(`==> ✅  Koa Server is listening on port ${port}`)
})

if (__HMR__) {
  const hotPort = port + 1

  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const WebpackDevServer = require('webpack-dev-server')
  const webpack = require('webpack')
  // eslint-disable-next-line import/no-unresolved
  const config = require('config/webpack.client')
  /* eslint-enable */

  new WebpackDevServer(webpack(config), {
    port,
    hot: true,
    historyApiFallback: false,
    withCredentials: false,
    proxy: {
      '*': `http://webclient.gousto.local:${port}`,
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  })
    .listen(hotPort, 'webclient.gousto.local', (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
      logger.info(`==> ✅  Hot-Reload listening on port ${hotPort}`)
    })
}
