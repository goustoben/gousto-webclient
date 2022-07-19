import { Dict, RequestMiddleware, Provider } from '../types'
import { withResolved } from '../util'

/**
 * Add a header for the given key using a provider (a string or function returning string)
 *
 *  setHeader('foo', 'bar')
 *  setHeader('baz', payload => payload.bazHeader)
 */
export function setHeader<Input>(key: string, stringProvider: Provider<Input, string>): RequestMiddleware<Input> {
  return function headerMiddleware(req, input) {
    const provided = typeof stringProvider === 'function' ? stringProvider(input) : stringProvider

    return withResolved(provided, value => {
      req.headers = req.headers || {}
      req.headers[key] = value
      return req
    })
  }
}

/**
 * Add multiple headers using a provider (a dictionary or function returning a dict)
 *
 *  setHeaders({
 *    foo: 'bar',
 *    baz: 'bam'
 *  })
 *  setHeaders((payload, ctx) => ({
 *    foo: payload.foo,
 *    bar: payload.bar
 *  })
 */
export function setHeaders<Input>(dictProvider: Provider<Input, Dict>): RequestMiddleware<Input> {
  return function headerMiddleware(req, input) {
    const provided = typeof dictProvider === 'function' ? dictProvider(input) : dictProvider

    return withResolved(provided, value => {
      req.headers = req.headers || {}
      Object.assign(req.headers, value)
      return req
    })
  }
}
