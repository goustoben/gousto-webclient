import qs from 'qs'
import logger from 'utils/logger'
import isomorphicFetch from 'isomorphic-fetch'
import env from 'utils/env'
import { JSONParse, processJSON } from 'utils/jsonHelper'
import { getStore } from 'store' //webpack aliasing?
import { timeout as fetchWithTimeout } from 'promise-timeout'

type ResponseDataWithIncludedMeta = {
  data: object,
  included: boolean,
  meta: string
}

type ResponseData = {
  result: object & {
    data: object
  }
} &
{
  data: object
}

type ErrorObj = {
  code: number,
  message: string,
  errors: {
    [key: number]: string
    // key: value pairs of errors such as errCode: errMessage
  }
}

type ParsedJSON = {
  response: ResponseData,
  meta: string | null
} & {
  response: ResponseDataWithIncludedMeta,
  meta: never
}

const DEFAULT_TIME_OUT: number = 50000
const STATUS_CODES_WITH_NO_CONTENT: Array<number> = [204]

export const dataDefault: {} = {}
export const methodDefault: string = 'GET'
export const cacheDefault: RequestCache = 'default'
export const headerDefault: HeadersInit = {}
export const timeoutDefault: number = null
export const includeCookiesDefault: boolean = false
export const useMenuServiceDefault: boolean = false
export const useOverwriteRequestMethodDefault: boolean = true

export function fetchRaw(url: string, data = {}, options: { accessToken: any; method: any; cache?: any; headers: any; timeout?: any; includeCookies?: any; useMenuService?: any }) {
  return fetch(
    options.accessToken,
    url,
    data,
    options.method,
    options.cache,
    options.headers,
    options.timeout,
    options.includeCookies,
    options.useMenuService)
}

export function fetch(
  accessToken: string,
  url: string,
  data: {} = dataDefault,
  method: string = methodDefault,
  cache: RequestCache = cacheDefault,
  headers: HeadersInit = headerDefault,
  timeout: number = timeoutDefault,
  includeCookies: boolean = includeCookiesDefault,
  useMenuService: boolean = useMenuServiceDefault,
  useOverwriteRequestMethod: boolean = useOverwriteRequestMethodDefault
) {
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
  let queryString: string
  if (httpMethod === 'GET') {
    queryString = qs.stringify(requestData)
    if (queryString) {
      requestUrl += `?${queryString}`
    }
  } else {
    const contentType: string = requestHeaders['Content-Type']
    const isContentTypeJSON: boolean = (contentType === 'application/json')

    body = (isContentTypeJSON)
      ? JSON.stringify(requestData)
      : qs.stringify(requestData)

    if (!contentType) {
      requestHeaders = {
        ...requestHeaders,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  }
  const { uuid } : { uuid: string | undefined } = getStore().getState().logger || {}
  if (accessToken) {
    if (accessToken.indexOf('//') > -1) {
      logger.error({message: `accessToken in fetch.js does not look valid (${accessToken})`, uuid })
    }
    requestHeaders = { ...requestHeaders, Authorization: `Bearer ${accessToken}` }
  }

  if (__SERVER__ && __PROD__) {
    if (env && env.apiToken) {
      requestHeaders['API-Token'] = env.apiToken
    } else {
      logger.error({message: 'Missing env.apiToken', uuid })
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
    requestUrl += (queryString) ? '&' : '?'
    requestUrl += `_=${Date.now()}`
  } else if (typeof cache === 'boolean') {
    logger.warning(`boolean value passed to gousto fetch for ${requestUrl}. a valid cache mode should be provided.`)
  }

  if (body) {
    requestDetails.body = body
  }


  const startTime: number = new Date().getTime()
  logger.notice({message: '[fetch start]', requestUrl, uuid, extra: { serverSide: __SERVER__ === true, }})
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
    .then((response: string) => {
      if (!response && STATUS_CODES_WITH_NO_CONTENT.includes(responseStatus) ) {
        return [{}, responseStatus]
      }

      return [JSONParse(response, useMenuService), responseStatus]
    }) // eslint-disable-line new-cap
    .then(processJSON) /* TODO - try refresh auth token and repeat request if successful */
    .then(({ response, meta }: ParsedJSON) => {
      logger.notice({message: '[fetch end]', status: responseStatus, elapsedTime: `${(new Date().getTime() - startTime)}ms`, requestUrl, uuid, extra: { serverSide: __SERVER__ === true, }})

      if ( useMenuService ) {
        return { data: response.data, included: response.included, meta: response.meta }
      }

      return { data: response, meta }
    })
    .catch((e: ErrorObj | Error | string)  => {
      const message = (typeof e === "string") ? e : e.message
      let log = logger.error

      if (url.indexOf('oauth/identify') > -1 || url.indexOf('oauth/refresh-token') > -1 || responseStatus === 422) {
        log = logger.warning
      }

      log({
        message: '[fetch end]',
        status: responseStatus,
        elapsedTime: `${(new Date().getTime() - startTime)}ms`,
        requestUrl,
        errors: [e as Error], //This is total BS and purely to make this work with Lumberjack. Please fix this.
        uuid,
        extra: { serverSide: __SERVER__ === true },
      })

      if (e && (typeof e === "string") && e.toLowerCase &&
          e.toLowerCase().indexOf('unable to determine') > -1) {
        log(JSON.stringify(requestDetails.headers))
      }

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

export default fetch
