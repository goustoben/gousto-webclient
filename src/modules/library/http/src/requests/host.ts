import { Provider, RequestMiddleware } from '../types'
import { withResolved } from '../util';

export function setHost <T> (provider: Provider<T, string>): RequestMiddleware<T> {
  return function hostMiddleware (req, input) {
    const provided = typeof provider === 'function' ? provider(input) : provider

    return withResolved(provided, value => {
      req.host = value
      return req
    })
  }
}
