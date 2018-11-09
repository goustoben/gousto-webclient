import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import endpoint from 'config/endpoint'
import transit from 'transit-immutable-js'

function authLink(store) {
  return setContext((_, { headers }) => {
    const token = store.getState().auth.get('accessToken')
    const httpHeaders = {
      ...headers,
    }

    if (token) {
      httpHeaders.authorization = `Bearer ${token}`
    } else {
      delete httpHeaders.authorization
    }

    return {
      headers: httpHeaders,
    }
  })
}

export default (store) => {
  const inMemoryCache = new InMemoryCache()

  if (__CLIENT__ && !__TEST__) {
    let initialState = {}
    try {
      initialState = decodeURIComponent(window.atob(window.__APOLLO_STATE__)) // eslint-disable-line no-underscore-dangle
    } catch (error) {
      //
    }

    initialState = transit.fromJSON(initialState)
    inMemoryCache.restore(initialState)
  }

  const httpLink = createHttpLink({
    uri: `${endpoint('graphql', 'v1')}/graphql`,
  })

  const link = ApolloLink.from([
    authLink(store),
    httpLink,
  ])

  const client = new ApolloClient({
    link,
    cache: inMemoryCache,
    ssr: Boolean(__SERVER__),
  })

  return client
}
