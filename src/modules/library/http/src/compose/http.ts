import { HttpConfig, RequestMiddleware, ResponseMiddleware } from '../types'

export function composeHttp<Input, Piped, Output>(
  reduceRequest: RequestMiddleware<Input>,
  reduceResponse: ResponseMiddleware<Piped, Output>
): HttpConfig<Input, Piped, Output> {
  return {
    reduceRequest,
    reduceResponse
  }
}
