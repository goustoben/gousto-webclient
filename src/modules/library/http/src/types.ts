/**
 * Request configuration
 * ============================================================================
 */

export type HttpCtx = {
  apiUrl: string,
  authToken?: string,
  authUserId?: string,
  sessionId?: string
}

export type RequestConfig = RequestInit & {
  headers?: Dict
  host: string
  method: Method
  paths: string[]
  queryParams?: Dict
}

export type HttpConfig<Input, Piped, Output> = {
  reduceRequest: RequestMiddleware<Input>
  reduceResponse: ResponseMiddleware<Piped, Output>
}

/**
 * Config parameters
 * ============================================================================
 */

export type Method =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH'

export type Dict = Record<string, string>
export type ProviderTypes = Dict | string
export type Provider<Input, T extends ProviderTypes> = T | ((i: Input, ctx: HttpCtx) => T | Promise<T>)

/**
 * Middleware
 * ============================================================================
 *
 * Think of middleware functions as reducers. They're composed together
 * to produce the final RequestConfig or Output value.
 */

export type RequestMiddleware<Input> = (
  req: RequestConfig,
  ctx: HttpCtx,
  i: Input
) => RequestConfig | Promise<RequestConfig>

export type ResponseMiddleware<Piped, Output> = (
  piped: Piped
) => Output | Promise<Output>
