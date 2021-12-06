import qs from 'qs'
import logger from 'utils/logger'
import isomorphicFetch from 'isomorphic-fetch'
import env from 'utils/env'
import { JSONParse, processJSON } from 'utils/jsonHelper'
import { getStore } from 'store'
import { timeout as fetchWithTimeout } from 'promise-timeout'

const DEFAULT_TIME_OUT = 50000
const STATUS_CODES_WITH_NO_CONTENT = [204]

export const dataDefault = {}
export const methodDefault = 'GET'
export const cacheDefault = 'default'
export const headerDefault = {}
export const timeoutDefault = null
export const includeCookiesDefault = false
export const useMenuServiceDefault = false
export const useOverwriteRequestMethodDefault = true

/**
 * To allow fetch monitoring with DataDog, we need to
 *
 * 1. Expose fetch on a global context, if in a browser
 * 2. Call fetch from this context, to benefit from instrumentation
 */
const fetchContext = typeof window !== 'undefined' ? window : {}

fetchContext.fetch = isomorphicFetch

export function fetch(
  accessToken,
  url,
  data = dataDefault,
  method = methodDefault,
  cache = cacheDefault,
  headers = headerDefault,
  timeout = timeoutDefault,
  includeCookies = includeCookiesDefault,
  useMenuService = useMenuServiceDefault,
  useOverwriteRequestMethod = useOverwriteRequestMethodDefault
) {
  const requestData = {
    ...data,
  }

  let httpMethod = method.toUpperCase()
  if (useOverwriteRequestMethod && (method === 'PUT' || method === 'PATCH')) {
    requestData._method = httpMethod // eslint-disable-line no-underscore-dangle
    httpMethod = 'POST'
  }

  let body = ''
  let requestUrl = url
  if (requestUrl[requestUrl.length - 1] === '/') {
    requestUrl = requestUrl.substr(0, requestUrl.length - 1)
  }
  let requestHeaders = headers
  let queryString
  if (httpMethod === 'GET') {
    queryString = qs.stringify(requestData)
    if (queryString) {
      requestUrl += `?${queryString}`
    }
  } else {
    const contentType = requestHeaders['Content-Type']
    const isContentTypeJSON = (contentType === 'application/json')

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
  const { uuid } = getStore().getState().logger || {}
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

  const requestDetails = {
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

  if (timeout) {
    requestDetails.timeout = timeout
  }

  const startTime = new Date()
  logger.notice({message: '[fetch start]', requestUrl, uuid, extra: { serverSide: __SERVER__ === true, }})
  let responseStatus
  let responseRedirected
  let responseUrl

  const fetchPromise = fetchContext.fetch(requestUrl, requestDetails)

  return fetchWithTimeout(fetchPromise, timeout || DEFAULT_TIME_OUT)
    .then(response => {
      const { status, redirected, url: endpointOrRedirectedUrl } = response
      responseStatus = status
      responseRedirected = redirected
      responseUrl = endpointOrRedirectedUrl

      return response
    })
    .then(response => response.text())
    .then(response => {
      if (!response && STATUS_CODES_WITH_NO_CONTENT.includes(responseStatus) ) {
        return [{}, responseStatus]
      }

      return [JSONParse(response, useMenuService), responseStatus]
    }) // eslint-disable-line new-cap
    .then(processJSON) /* TODO - try refresh auth token and repeat request if successful */
    .then(({ response, meta }) => {
      logger.notice({message: '[fetch end]', status: responseStatus, elapsedTime: `${(new Date() - startTime)}ms`, requestUrl, uuid, extra: { serverSide: __SERVER__ === true, }})

      if ( useMenuService ) {
        return { data: response.data, included: response.included, meta: response.meta }
      }

      return { data: response, meta }
    })
    .catch(e => {
      const message = (e instanceof Error || e.message) ? e.message : e
      let log = logger.error

      if (url.indexOf('oauth/identify') > -1 || url.indexOf('oauth/refresh-token') > -1 || responseStatus === 422) {
        log = logger.warning
      }

      log({
        message: '[fetch end]',
        status: responseStatus,
        elapsedTime: `${(new Date() - startTime)}ms`,
        requestUrl,
        errors: [e],
        uuid,
        extra: { serverSide: __SERVER__ === true },
      })

      if (e && e.toLowerCase && e.toLowerCase().indexOf('unable to determine') > -1) {
        log(JSON.stringify(requestDetails.headers))
      }

      throw {
        code: e.code || 500,
        errors: e.errors || [],
        message,
        status: responseStatus || 500,
        redirected: responseRedirected,
        url: responseUrl,
      }
    })
}

export function fetchRaw(url, data = {}, options) {
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
