import { Fetcher, RequestMiddleware, ResponseMiddleware } from '../types'
import { makeRequest } from '../fetch/makeRequest'

const pipeResponse = (response: Response) => response

export function composeFetch<Input>(
  reduceRequest: RequestMiddleware<Input>
): Fetcher<Input, Response>

export function composeFetch<Input, Output>(
  reduceRequest: RequestMiddleware<Input>,
  reduceResponse: ResponseMiddleware<Response, Output>
): Fetcher<Input, Output>

export function composeFetch<Input, Output>(
  reduceRequest: RequestMiddleware<Input>,
  reduceResponse?: ResponseMiddleware<Response, Output>
) {
  if (reduceResponse) {
    return function fetcher (input: Input) {
      return makeRequest(reduceRequest, reduceResponse, input)
    }
  } else {
    return function fetcher (input: Input) {
      return makeRequest(reduceRequest, pipeResponse, input)
    }
  }
}
