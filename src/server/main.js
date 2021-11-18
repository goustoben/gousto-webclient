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
const { Provider } = require('react-redux')
const path = require('path')
/* eslint-disable-next-line import/no-extraneous-dependencies */
const koaWebpack = require('koa-webpack')
const app = new Koa()

const globals = require('config/globals')
const MainLayout = require('layouts/MainLayout').default
const ErrorPage = require('components/ErrorPage').default
const Page = require('containers/Page').default
const { Helmet } = require('react-helmet')
const GoustoHelmet = require('Helmet/GoustoHelmet').default

const { clearPersistentStore } = require('middlewares/persist/persistStore')

const withStatic = process.env.withStatic === 'true'

const uuidv1 = require('uuid/v1')
const { loggerSetUuid } = require('actions/logger')
const addressLookupRoute = require('./routes/addressLookup').default
const { performanceTestPage } = require('./routes/performanceTest')
const routes = require('./routes').default
const htmlTemplate = require('./template')
const { appsRedirect } = require('./middleware/apps')
const { sessionMiddleware } = require('./middleware/tracking')
const { processRequest, configureHistoryAndStore } = require('./processRequest')

function enableHmr() {
  koaWebpack({
    configPath: path.join(process.cwd(), './config/webpack.client.js'),
    devMiddleware: {
      compress: true,
      headers: {
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        'Access-Control-Allow-Origin': '*',
      },
      historyApiFallback: true,
      hot: true,
      port: 8080,
      public: 'frontend.gousto.local',
      watchOptions: { aggregateTimeout: 300, poll: 1000 },
      writeToDisk: true,
    },
    hotClient: {
      host: 'frontend.gousto.local',
      server: app.server
    }
  }).then((middleware) => {
    app.use(middleware)
  })
}

app.use(sessionMiddleware())

/* eslint-disable no-param-reassign */
app.use(async (ctx, next) => {
  const startTime = new Date()
  const { header, request: { path: requestUrl }} = ctx
  const writeLog = (requestUrl.indexOf('/ping') === -1) && (requestUrl.indexOf('/nsassets') === -1 )

  if (writeLog) {
    const uuid = uuidv1()
    ctx.uuid = uuid
    logger.notice({message: '[START] REQUEST', requestUrl, uuid: ctx.uuid, headers: header})
  }

  await next()
  if (writeLog) {
    logger.notice({message: '[END] REQUEST', requestUrl, uuid: ctx.uuid, elapsedTime: (new Date() - startTime), headers: header})
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
    // If the error we want to render the error page

    if (err.networkError) {
      err.status = err.networkError.statusCode
    }
    logger.critical({message: err.message, status: err.status, uuid, errors: [err]})

    const status = Number(err.status || 500)

    if (status === 200 || Number.isNaN(status)) {
      ctx.status = 500
    } else {
      ctx.status = status
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

app.use(performanceTestPage)

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

  // Emulate CloudFront -> S3 behaviour for non-existent assets
  app.use(convert(koaMount('/nsassets/', (ctx) => {
    ctx.status = 403
  })))

  app.use(convert(koaMount('/', koaStatic('public'))))
}

app.use(processRequest)

const port = __ENV__ === 'local' ? 8080 : 80

if (__HMR__) {
  enableHmr()
}

app.listen(port, () => {
  logger.notice(`==> ✅  Koa Server is listening on port ${port}`)
})
