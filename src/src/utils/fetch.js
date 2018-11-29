import qs from 'qs'
import Immutable from 'immutable'
import logger from 'utils/logger'
import isomorphicFetch from 'isomorphic-fetch'
import env from 'utils/env'
import { JSONParse, processJSON } from 'utils/jsonHelper'
import goustoStore from 'store'

export function fetch(accessToken, url, data = {}, method = 'GET', cache = 'default', headers = {}, timeout = null, includeCookies = false, includeExperiments = true) {
  const requestData = {
    ...data,
  }

  if (includeExperiments) {
    requestData.experiments = (goustoStore.store.getState().features || Immutable.Map({}))
      .filter(feature => feature.get('experiment'))
      .reduce((reducedFeatures, feature, featureName) => (
        reducedFeatures.set(featureName, feature.get('value'))
      ), Immutable.Map({})).toJS()
  }

  let httpMethod = method.toUpperCase()
  if (method === 'PUT' || method === 'PATCH') {
    httpMethod = 'POST'
    requestData._method = method // eslint-disable-line no-underscore-dangle
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

  if (accessToken) {
    if (accessToken.indexOf('//') > -1) {
      logger.error({message: `accessToken in fetch.js does not look valid (${accessToken})`})
    }
    requestHeaders = { ...requestHeaders, Authorization: `Bearer ${accessToken}` }
  }

  if (__SERVER__ && __PROD__) {
    if (env && env.apiToken) {
      requestHeaders['API-Token'] = env.apiToken
    } else {
      logger.error('Missing env.apiToken')
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

  const startTime = new Date
  logger.notice({message: "[fetch start]", requestUrl: requestUrl})
  let status

  return isomorphicFetch(requestUrl, requestDetails)
    .then(response => {
      status = response.status

      return response
    })
    .then(response => response.text())
    .then(response => [JSONParse(response), status]) // eslint-disable-line new-cap
    .then(processJSON) /* TODO - try refresh auth token and repeat request if successful */
    .then(({ response, meta }) => {
      logger.notice({message: "[fetch end]", status: status, elapsedTime: `${(new Date() - startTime)}ms`, requestUrl: requestUrl})

      return { data: response, meta }
    })
    .catch(e => {
      
      const message = (e instanceof Error || e.message) ? e.message : e
      let log = logger.error

      if (url.indexOf('oauth/identify') > -1 || url.indexOf('oauth/refresh-token') > -1 || status === 422) {
        log = logger.warning
      }

      log({
        message: "[fetch end]",
        status: status,
        elapsedTime: `${(new Date() - startTime)}ms`,
        requestUrl: requestUrl,
        errors: [e]
      })

      if (e && e.toLowerCase && e.toLowerCase().indexOf('unable to determine') > -1) {
        log(JSON.stringify(requestDetails.headers))
      }
      const err = new Error(message)
      err.status = status
      err.code = e.code || 500
      err.errors = e.errors || []
      throw err
    })
}

export default fetch
