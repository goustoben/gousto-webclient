import { RequestConfig, RequestMiddleware } from '../types'
import { withResolved } from '../util'

/**
 * Given a set of n requestMiddleware expecting an input payload of type In,
 * return a single requestMiddleware expecting the same input.
 */
export function composeRequest<In>(
  ...middlewares: RequestMiddleware<In>[]
): RequestMiddleware<In> {
  return function composedMiddleware(req, ctx, input) {
    let acc: RequestConfig | Promise<RequestConfig> = req
    for (const middleware of middlewares) {
      acc = withResolved(acc, (value) => middleware(value, ctx, input))
    }
    return acc
  }
}
