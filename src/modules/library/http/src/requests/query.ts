import { Dict, RequestMiddleware, Provider } from '../types'
import { withResolved } from '../util'

/**
 * Set a query parameter for a key using a provider (a string or function returning string)
 * Query params are serialised using the `qs` library
 *
 *  setQueryParam('foo', 'bar')
 *  setQueryParam('foo', payload => payload.requestID)
 */
export function setQueryParam<Input>(key: string, stringProvider: Provider<Input, string>): RequestMiddleware<Input> {
  return function queryMiddleware(req, input) {
    const provided = typeof stringProvider === 'function' ? stringProvider(input) : stringProvider

    return withResolved(provided, value => {
      req.queryParams = req.queryParams || {}
      req.queryParams[key] = value
      return req
    })
  }
}

/**
 * Set query parameters using a provider (a dictionary or function returning a dict)
 * Query params are serialised using the `qs` library
 *
 *   setQueryParams({
 *     foo: 'bar',
 *     baz: null
 *   })
 *
 *   setQueryParams(payload => payload)
 */
export function setQueryParams<Input>(dictProvider: Provider<Input, Dict>): RequestMiddleware<Input> {
  return function queryMiddleware(req, input) {
    const provided = typeof dictProvider === 'function' ? dictProvider(input) : dictProvider

    return withResolved(provided, value => {
      req.queryParams = req.queryParams || {}
      Object.assign(req.queryParams, value)
      return req
    })
  }
}
