const React = require('react')

const { renderToString } = require('react-dom/server')
const { match, RouterContext, createMemoryHistory } = require('react-router')
const { syncHistoryWithStore } = require('react-router-redux')
const mainRoutes = require('routes').default
const htmlTemplate = require('./template')
const configureStore = require('store').configureStore
const { ApolloProvider, getDataFromTree } = require('react-apollo')
const apolloClient = require('apis/apollo').default
const Provider = require('react-redux').Provider
const promoActions = require('actions/promos').default
const logger = require('utils/logger').default
const { Header } = require('Header/Header').default
const clearPersistentStore = require('middlewares/persist/persistStore').clearPersistentStore
const processCookies = require('utils/processCookies').default
const basketActions = require('actions/basket').default
const processFeaturesQuery = require('utils/processFeaturesQuery').default
const processHeaders = require('./processHeaders')
const newAssetPath = require('utils/media').newAssetPath
const authorise = require('utils/clientAuthorise').authorise
const Helmet = require('react-helmet')
const GoustoHelmet = require('Helmet/GoustoHelmet').default
const encodeState = require('./encodeState')
const fetchContentOnChange = require('routes/fetchContentOnChange').default
const {loggerSetUuid} = require('actions/logger')

const fetchAllData = (renderProps, store) => {
  const { location, params } = renderProps
  const queries = []

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

const renderHTML = (store, renderProps, url, userAgent, noGTM = false) => {
  let startTime = new Date
  const apollo = apolloClient(store)
  const components = (
    <Provider store={store}>
      <ApolloProvider client={apollo}>
        <RouterContext {...renderProps} />
      </ApolloProvider>
    </Provider>
  )

  startTime = new Date
  renderToString(
    <GoustoHelmet
      noGTM={noGTM}
      requestUrl={url}
    />
  )

  return getDataFromTree(components)
    .then(() => {
      const reactHTML = renderToString(components)
      if(__CLIENT__){
        logger.notice({message: `renderHTML/reactHTML`, elapsedTime: (new Date() - startTime)})
      }
      startTime = new Date
      const helmetHead = __SERVER__ ? Helmet.rewind() : Helmet.peek()
      const template = htmlTemplate(reactHTML, store.getState(), apollo.cache.extract(), userAgent, noGTM, helmetHead)
      if(__CLIENT__){
        logger.notice({message: `renderHTML/template`, elapsedTime: (new Date() - startTime)})
      }

      return template
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
  if(ctx.uuid){
    store.dispatch(loggerSetUuid(ctx.uuid))
  }

  const routes = mainRoutes(store)

  if (ctx.cookies) {
    processCookies(ctx.cookies, store) // read auth cookies into the store
    createCookies(ctx, store)
  }

  await authorise(store, ctx.cookies)

  let authenticated = store.getState().auth.get('isAuthenticated')

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
    const apollo = apolloClient(store)
    const reactHTML = (
      <Provider store={store}>
        <ApolloProvider client={apollo}>
          <Header isAuthenticated={authenticated} simple={simple} path={path} />
        </ApolloProvider>
      </Provider>
    )
    getDataFromTree(reactHTML)
      .then(() => {
        ctx.body = `
          <link rel="stylesheet" property="stylesheet" href="${newAssetPath('legacy.css')}">
          <script type="text/javascript" src="${newAssetPath('legacy.js')}"></script>
          <span id="nodeHeaderReactRoot">
            <script type="text/javascript">window.__initialState__ = ${encodeState(store.getState())}</script>
            <script type="text/javascript">window.__APOLLO_STATE__ = ${encodeState(apollo.cache.extract())}</script>
            ${renderToString(reactHTML)}
          </span>
        `
      })
  } else {
    await new Promise((resolve, reject) => {
      if (ctx.request.query) {
        processFeaturesQuery(ctx.request.query, store)
      }

      match({ history, routes, location: ctx.request.url }, (err, redirectLocation, renderProps) => {
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
          fetchAllData(renderProps, store).then(async () => {
            const redirect = store.getState().redirect

            if (redirect) {
              const clearCookies = store.getState().clearCookies
              if (clearCookies) {
                clearPersistentStore(ctx.cookies)
              }
              ctx.redirect(redirect)
              resolve()
            } else {
              ctx.status = is404 ? 404 : 200
              let noGTM = ctx.request && ctx.request.query && ctx.request.query.no_gtm
              if (store.getState().basket && store.getState().basket.get('promoCode', '').toLowerCase() === 'fruit') {
                noGTM = true
              }
              const helmetHead = __SERVER__ ? Helmet.rewind() : Helmet.peek()
              await fetchContentOnChange(ctx.request.path, store)
              renderHTML(store, renderProps, ctx.request.url, ctx.req.headers['user-agent'], noGTM, helmetHead)
                .then(html => {
                  ctx.body = html
                  resolve()
                })
                .catch(err => {
                  reject(err)
                })
            }
          }).catch(err => {
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

module.exports = { processRequest, fetchAllData, configureHistoryAndStore, renderHTML }
