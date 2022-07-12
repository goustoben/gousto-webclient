import { Method, RequestMiddleware } from '../types'

/**
 * Set the method on the request
 *
 *  setMethod('POST')
 */
export function setMethod(method: Method): RequestMiddleware<unknown> {
  return function methodMiddleware(req) {
    req.method = method
    return req
  }
}
