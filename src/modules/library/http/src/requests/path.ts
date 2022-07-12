import { Provider, RequestMiddleware } from '../types'
import { fromProvider, withResolved } from '../util'

/**
 * Add a sub-path to the request using a provider (a string, or function returning string)
 * Don't provide leading / trailing slashes
 *
 *  addPath('customers')
 *  addPath(payload => payload.customerID)
 */
export function addPath<Input>(stringProvider: Provider<Input, string>): RequestMiddleware<Input> {
  return function pathMiddleware(req, ctx, input) {
    const provided = fromProvider(stringProvider, input, ctx)

    return withResolved(provided, value => {
      req.paths.push(value)
      return req
    })
  }
}
