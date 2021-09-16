import qs from 'qs'
import logger from 'utils/logger'
import isomorphicFetch from 'isomorphic-fetch'
import env from 'utils/env'
import { JSONParse, processJSON } from 'utils/jsonHelper'
// @ts-ignore
import { getStore } from 'store' // webpack aliasing?
import { timeout as fetchWithTimeout } from 'promise-timeout'

type ResponseDataWithIncludedMeta<T> = {
  data: T
  included: boolean
  meta: string
}

type ResponseData<T> =
  | {
      // wtf is this pipe?
      result:
        | T
        | {
            data: T
          }
    }
  | {
      data: T
    }

type ErrorObj = {
  code: number
  message: string
  errors: Record<number, string>
}

export type ParsedPayload<T> =
  | {
      response: ResponseData<T>
      meta: string | null
    }
  | {
      response: ResponseDataWithIncludedMeta<T>
      meta: never
    }

export type FetchResult<T> =
  | { data: ResponseData<T>; meta: string | null }
  | {
      data: T
      included: boolean
      meta: string
    }

const DEFAULT_TIME_OUT = 50000
const STATUS_CODES_WITH_NO_CONTENT = [204]

export const dataDefault = {}
export const methodDefault = 'GET'
export const cacheDefault: RequestCache = 'default'
export const headerDefault: Record<string, string> = {}
export const timeoutDefault = 0
export const includeCookiesDefault = false
export const useMenuServiceDefault = false
export const useOverwriteRequestMethodDefault = true

export function fetch<T>(
  accessToken: string | null | undefined, // Can't make optional as a required param can not follow an optional
  url: string,
  data = dataDefault,
  method = methodDefault,
  cache = cacheDefault,
  headers = headerDefault,
  timeout = timeoutDefault,
  includeCookies = includeCookiesDefault,
  useMenuService = useMenuServiceDefault,
  useOverwriteRequestMethod = useOverwriteRequestMethodDefault
): Promise<FetchResult<T>> {
  const requestData: {
    _method?: string
  } = {
    ...data,
  }

  let httpMethod: string = method.toUpperCase()
  if (useOverwriteRequestMethod && (method === 'PUT' || method === 'PATCH')) {
    requestData._method = httpMethod // eslint-disable-line no-underscore-dangle
    httpMethod = 'POST'
  }

  let body: string = ''
  let requestUrl: string = url
  if (requestUrl[requestUrl.length - 1] === '/') {
    requestUrl = requestUrl.substr(0, requestUrl.length - 1)
  }
  let requestHeaders: HeadersInit = headers
  let queryString: string = ''
  if (httpMethod === 'GET') {
    queryString = qs.stringify(requestData)
    if (queryString) {
      requestUrl += `?${queryString}`
    }
  } else {
    const contentType = requestHeaders['Content-Type']
    const isContentTypeJSON = contentType === 'application/json'

    body = isContentTypeJSON ? JSON.stringify(requestData) : qs.stringify(requestData)

    if (!contentType) {
      requestHeaders = {
        ...requestHeaders,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  }
  const { uuid }: { uuid?: string } = getStore().getState().logger || {}
  if (accessToken) {
    if (accessToken.indexOf('//') > -1) {
      logger.error({
        message: `accessToken in fetch.js does not look valid (${accessToken})`,
        uuid,
      })
    }
    requestHeaders = { ...requestHeaders, Authorization: `Bearer ${accessToken}` }
  }

  if (__SERVER__ && __PROD__) {
    if (env && env.apiToken) {
      requestHeaders['API-Token'] = env.apiToken
    } else {
      logger.error({ message: 'Missing env.apiToken', uuid })
    }
  }

  const requestDetails: RequestInit = {
    method: httpMethod,
    headers: requestHeaders,
    cache,
  }

  if (includeCookies) {
    requestDetails.credentials = 'same-origin'
  }

  if (cache === 'no-store' || cache === 'reload' || cache === 'no-cache') {
    requestUrl += queryString ? '&' : '?'
    requestUrl += `_=${Date.now()}`
  } else if (typeof cache === 'boolean') {
    // TS will and should complain about this, but the condition has been left due to JS interop and safety.
    logger.warning(
      `boolean value passed to gousto fetch for ${requestUrl}. a valid cache mode should be provided.`
    )
  }

  if (body) {
    requestDetails.body = body
  }

  const startTime: number = new Date().getTime()
  logger.notice({
    message: '[fetch start]',
    requestUrl,
    uuid,
    extra: { serverSide: __SERVER__ },
  })
  let responseStatus: number
  let responseRedirected: boolean
  let responseUrl: string

  const fetchPromise = isomorphicFetch(requestUrl, requestDetails)

  return fetchWithTimeout(fetchPromise, timeout || DEFAULT_TIME_OUT)
    .then((response: Response) => {
      const { status, redirected, url: endpointOrRedirectedUrl } = response
      responseStatus = status
      responseRedirected = redirected
      responseUrl = endpointOrRedirectedUrl

      return response
    })
    .then((response: Response) => response.text())
    .then((response: string): [Record<string, unknown>, number] => {
      if (!response && STATUS_CODES_WITH_NO_CONTENT.includes(responseStatus)) {
        return [{}, responseStatus]
      }

      return [JSONParse(response, useMenuService), responseStatus]
    }) // eslint-disable-line new-cap
    .then(processJSON) /* TODO - try refresh auth token and repeat request if successful */
    .then(({ response, meta }: ParsedPayload<T>) => {
      logger.notice({
        message: '[fetch end]',
        status: responseStatus,
        elapsedTime: `${new Date().getTime() - startTime}ms`,
        requestUrl,
        uuid,
        extra: { serverSide: __SERVER__ },
      })

      if (useMenuService && 'included' in response) {
        return { data: response.data, included: response.included, meta: response.meta }
      }

      return { data: response, meta }
    })
    .catch((e: ErrorObj | Error | string) => {
      const message = typeof e === 'string' ? e : e.message
      let log = logger.error

      if (
        url.indexOf('oauth/identify') > -1 ||
        url.indexOf('oauth/refresh-token') > -1 ||
        responseStatus === 422
      ) {
        log = logger.warning
      }

      log({
        message: '[fetch end]',
        status: responseStatus,
        elapsedTime: `${new Date().getTime() - startTime}ms`,
        requestUrl,
        errors: [e as Error], // This is total BS and purely to make this work with Lumberjack. Please fix this.
        uuid,
        extra: { serverSide: __SERVER__ },
      })

      if (
        e &&
        typeof e === 'string' &&
        e.toLowerCase &&
        e.toLowerCase().indexOf('unable to determine') > -1
      ) {
        log(JSON.stringify(requestDetails.headers))
      }

      // Really should have an error library in this project.
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw {
        code: (e as ErrorObj).code || 500,
        errors: (e as ErrorObj).errors || [],
        message,
        status: responseStatus || 500,
        redirected: responseRedirected,
        url: responseUrl,
      }
    })
}

export function fetchRaw(
  url: string,
  data = {},
  options: {
    accessToken?: string
    method?: string
    cache?: RequestCache
    headers?: Record<string, string>
    timeout?: number
    includeCookies?: boolean
    useMenuService?: boolean
    useOverwriteRequestMethod?: boolean
  }
) {
  return fetch(
    options.accessToken,
    url,
    data,
    options.method,
    options.cache,
    options.headers,
    options.timeout,
    options.includeCookies,
    options.useMenuService,
    options.useOverwriteRequestMethod
  )
}

export default fetch
