import { Helmet } from 'react-helmet'
import { setMenuPrefetched } from 'routes/Menu/actions/menuPrefetch'
import { extractScriptOptions, DISABLED_SCRIPTS } from './routes/scripts'
import { isServerSideFetchEligible } from './utils/renderType'
const React = require('react')

const { renderToString } = require('react-dom/server')
const { match, RouterContext, createMemoryHistory } = require('react-router')
const { syncHistoryWithStore } = require('react-router-redux')
const { routes } = require('routes')
const { configureStore } = require('store')
const { Provider } = require('react-redux')
const promoActions = require('actions/promos').default
const logger = require('utils/logger').default
const { Header } = require('Header/Header')
const { clearPersistentStore } = require('middlewares/persist/persistStore')
const { processCookies } = require('utils/processCookies')
const basketActions = require('actions/basket').default
const processFeaturesQuery = require('utils/processFeaturesQuery').default
const { newAssetPath } = require('utils/media')
const { authorise } = require('utils/clientAuthorise')
const { encodeState } = require('utils/encodeDecodeState')
const GoustoHelmet = require('Helmet/GoustoHelmet').default
const fetchContentOnChange = require('routes/fetchContentOnChange').default
const { loggerSetUuid } = require('actions/logger')
const processHeaders = require('./processHeaders')
const htmlTemplate = require('./template')

const fetchAllData = (renderProps, store, headers, path, sessionId) => {
  const { location, params } = renderProps
  const queries = []

  const userId = store.getState().auth.get('id')

  const serverSideRenderEligible = isServerSideFetchEligible(headers, path, userId, sessionId)

  store.dispatch(setMenuPrefetched(serverSideRenderEligible))

  if (!serverSideRenderEligible) {
    return Promise.resolve()
  }

  renderProps.components.forEach(component => {
    if (component) {
      let fetchData
      if (typeof component.fetchData === 'function') {
        fetchData = component.fetchData
      } else if (component.WrappedComponent && typeof component.WrappedComponent.fetchData === 'function') {
        fetchData = component.WrappedComponent.fetchData
      }

      if (fetchData) {
        queries.push(
          new Promise((resolve) => {
            resolve(fetchData({ params, query: location.query, store }))
          })
        )
      }
    }
  })

  return Promise.all(queries)
}

const configureHistoryAndStore = (url, initialState) => {
  const memoryHistory = createMemoryHistory(url)
  let store = configureStore(memoryHistory, initialState)
  const history = syncHistoryWithStore(memoryHistory, store)
  const state = store.getState()
  store = configureStore(memoryHistory, state)

  return { store, history }
}

const renderHTML = (store, renderProps, url, userAgent, scripts) => {
  let startTime = new Date()

  const {
    routes: renderPropsRoutes,
    param,
    location,
    components: renderPropsComponents,
    router,
    matchContext,
    ...rest
  } = renderProps
  const components = (
    <Provider store={store}>
      <RouterContext
        routes={renderPropsRoutes}
        param={param}
        location={location}
        components={renderPropsComponents}
        router={router}
        matchContext={matchContext}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </Provider>
  )

  startTime = new Date()
  renderToString(
    <GoustoHelmet
      scripts={scripts}
      requestUrl={url}
    />
  )

  return new Promise(resolve => {
    const reactHTML = renderToString(components)
    if (__CLIENT__) {
      logger.notice({ message: 'renderHTML/reactHTML', elapsedTime: (new Date() - startTime) })
    }
    startTime = new Date()
    const helmetHead = __SERVER__ ? Helmet.renderStatic() : Helmet.peek
    const template = htmlTemplate(reactHTML, store.getState(), userAgent, scripts, helmetHead)
    if (__CLIENT__) {
      logger.notice({ message: 'renderHTML/template', elapsedTime: (new Date() - startTime) })
    }

    resolve(template)
  })
}

const createCookies = (ctx, store) => {
  // todo: make sure cookie is correctly set up
  if (ctx.cookies && ctx.request && ctx.request.query && ctx.request.query.promo) {
    ctx.cookies.set('promo_url', ctx.request.query.promo)
    store.dispatch(basketActions.basketPromoCodeUrlChange(ctx.request.query.promo))
  }
}

/* eslint-disable no-param-reassign */
async function processRequest(ctx, next) {
  if (ctx.request.url === '/500pagetest') {
    throw new Error('500 page test error')
  }

  const { history, store } = configureHistoryAndStore(ctx.request.url, {})
  if (ctx.uuid) {
    store.dispatch(loggerSetUuid(ctx.uuid))
  }

  const currentRoutes = routes(store)

  if (ctx.cookies) {
    const { header, request: { path } } = ctx

    logger.notice({ message: '[START] processRequest -> cookies', requestUrl: path, uuid: ctx.uuid, headers: header })
    processCookies(ctx.cookies, store) // read auth cookies into the store
    createCookies(ctx, store)
    logger.notice({ message: '[END] processRequest -> cookies', requestUrl: path, uuid: ctx.uuid, headers: header })
  }

  await authorise(store, ctx.cookies)

  const authenticated = store.getState().auth.get('isAuthenticated')

  let headers = ctx.request.headers || {}

  if (ctx.request.query && ctx.request.query.headers && __ENV__ !== 'production') {
    // for staging CDN headers: menu?headers=cloudfront-is-desktop-viewer=true&headers=cloudfront-is-tablet-viewer=true
    let queryHeaders = ctx.request.query.headers
    if (!Array.isArray(ctx.request.query.headers)) {
      queryHeaders = [ctx.request.query.headers]
    }
    const extraHeaders = queryHeaders.reduce((reducedObj, query) => {
      const queryValues = query.split('=')
      if (queryValues.length === 2) {
        return { ...reducedObj, [queryValues[0]]: queryValues[1] }
      }

      return reducedObj
    }, {})

    headers = { ...headers, ...extraHeaders }
  }

  if (headers) {
    logger.notice(`[browser-view]: ${processHeaders.formatHeaderNames(headers)}`)
    if (headers.referer) {
      logger.notice(`[request-referer]: ${headers.referer}`)
    }

    processHeaders.processHeaders(headers, store)
  }

  if (ctx.request.path === '/header') {
    let simple = false
    let path = ''
    if (ctx.request.query) {
      if (ctx.request.query.simple) {
        simple = true
      }
      if (ctx.request.query.landingPagePath) {
        try {
          await store.dispatch(promoActions.promoGetFromLandingPage(ctx.request.query.landingPagePath))
        } catch (e) {
          //
        }
      }
      if (ctx.request.query.path) {
        path = ctx.request.query.path
      }
      processFeaturesQuery(ctx.request.query, store)
    }
    const reactHTML = (
      <Provider store={store}>
        <Header isAuthenticated={authenticated} simple={simple} path={path} />
      </Provider>
    )
    ctx.body = `
          <link rel="stylesheet" property="stylesheet" href="${newAssetPath('legacy.css')}">
          <script type="text/javascript" src="${newAssetPath('legacy.js')}"></script>
          <span id="nodeHeaderReactRoot">
            <script type="text/javascript">window.__initialState__ = ${encodeState(store.getState())}</script>
            ${renderToString(reactHTML)}
          </span>
    `
  } else {
    await new Promise((resolve, reject) => {
      if (ctx.request.query) {
        processFeaturesQuery(ctx.request.query, store)
      }

      match({ history, routes: currentRoutes, location: ctx.request.url }, (err, redirectLocation, renderProps) => {
        if (err) {
          reject(err)
        } else if (redirectLocation) {
          // If a query string "target" is provided on the redirect url
          // then i will append it too with the `url` origin
          const searchQueryString = redirectLocation.query.target
            ? redirectLocation.search.replace('target=', `target=${ctx.request.origin}`)
            : redirectLocation.search

          const redirectUrl = `${redirectLocation.pathname}${searchQueryString}${redirectLocation.hash}`
          ctx.redirect(redirectUrl)
          resolve()
        } else if (renderProps) {
          const is404 = renderProps.routes.find(r => (r.component && r.component.displayName && r.component.displayName === 'Connect(ErrorPage)')) !== undefined

          const { header, request: { path } } = ctx

          logger.notice({ message: '[START] processRequest -> fetchAllData', requestUrl: path, uuid: ctx.uuid, headers: header })

          fetchAllData(renderProps, store, headers, path, ctx.uuid).then(async () => {
            logger.notice({ message: '[END] processRequest -> fetchAllData (success)', requestUrl: path, uuid: ctx.uuid, headers: header })

            const { redirect } = store.getState()

            if (redirect) {
              const { clearCookies } = store.getState()
              if (clearCookies) {
                clearPersistentStore(ctx.cookies)
              }
              ctx.redirect(redirect)
              resolve()
            } else {
              ctx.status = is404 ? 404 : 200
              let scripts = extractScriptOptions(ctx.request)
              if (store.getState().basket && store.getState().basket.get('promoCode', '').toLowerCase() === 'fruit') {
                scripts = DISABLED_SCRIPTS
              }

              logger.notice({ message: '[START] processRequest -> fetchContentOnChange', requestUrl: path, uuid: ctx.uuid, headers: header })
              await fetchContentOnChange(ctx.request.path, store)
              logger.notice({ message: '[END] processRequest -> fetchContentOnChange', requestUrl: path, uuid: ctx.uuid, headers: header })

              logger.notice({ message: '[START] processRequest -> renderHTML', requestUrl: path, uuid: ctx.uuid, headers: header })
              renderHTML(store, renderProps, ctx.request.url, ctx.req.headers['user-agent'], scripts)
                .then(html => {
                  ctx.body = html
                  logger.notice({ message: '[END] processRequest -> renderHTML (success)', requestUrl: path, uuid: ctx.uuid, headers: header })
                  resolve()
                })
                .catch(err => {
                  logger.notice({ message: '[END] processRequest -> renderHTML (error)', requestUrl: path, uuid: ctx.uuid, headers: header })
                  reject(err)
                })
            }
          }).catch(err => {
            logger.notice({ message: '[END] processRequest -> fetchAllData (error)', requestUrl: path, uuid: ctx.uuid, headers: header })

            reject(err)
          })
        } else {
          const err = new Error('renderProps, redirectLocation, nor error was defined when trying to match the request to a route')
          reject(err)
        }
      })
    })
  }
  await next()
}

export { processRequest, fetchAllData, configureHistoryAndStore, renderHTML }
