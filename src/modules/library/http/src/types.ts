/**
 * Request configuration
 * ============================================================================
 */

export type HttpCtx = {
  authToken?: string
  apiUrl: string
}

export type RequestConfig = RequestInit & {
  headers?: Dict
  host: string
  method: Method
  paths?: string[]
  queryParams?: DictNullable
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
export type DictNullable = Record<string, string | null>

export type Provider<Input, T> = (
  i: Input,
  ctx: HttpCtx
) => T | null | Promise<T | null>

export type StringProvider<Input> = Provider<Input, string>
export type DictProvider<Input> = Provider<Input, Dict>

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
