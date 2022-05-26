import isomorphicFetch from 'isomorphic-fetch'
import qs from 'qs'

import Cookies from 'utils/GoustoCookies'
import { get as getFromCookie } from 'utils/cookieHelper2'

const getSessionId = () => getFromCookie(Cookies, 'gousto_session_id', false, false)

const getAuthorizationHeader = (accessToken) =>
  accessToken ? { Authorization: `Bearer ${accessToken}` } : {}

const getHeadersToSend = (accessToken, userId, customHeaders = {}) => {
  const sessionId = getSessionId()

  return {
    ...(sessionId ? { 'x-gousto-device-id': sessionId } : {}),
    ...(userId ? { 'x-gousto-user-id': userId } : {}),
    ...getAuthorizationHeader(accessToken),
    'Content-Type': 'application/json',
    ...customHeaders,
  }
}

/**
 * Make an HTTP request
 *
 * @param {string} method - an HTTP request method. see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods}
 * @param {{ accessToken: string, userId: string}} authOptions - authentication options
 * @param {string} url - the request URL
 * @param {Object} [data] - request data; put into the querystring of a GET request, otherwise in the body
 * @param {Object} [headers] - headers to be sent with the request, combined with the authentication headers created from {@link authOptions}
 *
 * @returns {Promise<[TResponse | null, TError | null, number]>} a 3-length tuple containing:
 *                                            the response from server, if successful,
 *                                            the response from server, if a failure,
 *                                            the response status code
 */
const fetch = async (method, { accessToken, userId }, url, data = null, headers = null) => {
  let requestUrl = url

  const request = {
    method: method.toUpperCase(),
    headers: getHeadersToSend(accessToken, userId, headers),
  }

  if (data) {
    if (request.method === 'GET') {
      requestUrl += `?${qs.stringify(data)}`
    } else if (typeof data === 'string') {
      request.body = data
    } else {
      request.body = JSON.stringify(data)
    }
  }

  const response = await isomorphicFetch(requestUrl, request)

  if (response.status === 204) {
    return [null, null, response.status]
  }

  const parsed = await response.json()

  if (response.status >= 400) {
    return [null, parsed, response.status]
  }

  return [parsed, null, response.status]
}

/**
 * Make a GET request.
 *
 * @param {{ accessToken: string, userId: string}} auth - authentication options
 * @param {string} url - the request URL
 * @param {{}} [data] - request data; put into the querystring of a GET request, otherwise in the body
 * @param {{}} [headers] - headers to be sent with the request, combined with the authentication headers created from {@link auth}
 * <br />
 *
 * note: If provided, `data` will be stringified and added to the query string.
 */
export const get = (auth, url, data, headers) => fetch('GET', auth, url, data, headers)

/**
 * Make a POST request.
 *
 * @param {{ accessToken: string, userId: string}} auth - authentication options
 * @param {string} url - the request URL
 * @param {{}} [data] - request data; put into the querystring of a GET request, otherwise in the body
 * @param {{}} [headers] - headers to be sent with the request, combined with the authentication headers created from {@link auth}
 */
export const post = async (auth, url, data, headers) => fetch('POST', auth, url, data, headers)

class HTTPError extends Error {}

/**
 * Make a GET request. We required a flat version of `get` to support SWR.
 *
 * @param {string} url - the request URL
 * @param {{}} [data] - request data; put into the querystring of a GET request, otherwise in the body]
 * @param {string} accessToken - access token to be added to the headers to be sent with the request, combined with the authentication headers created from {@link auth}
 * @param {string} userId - user ID to be added to the headers to be sent with the request
 * @param {{}} [headers] - headers to be sent with the request, combined with the authentication headers created from {@link auth}
 */
export const getFetcher = async (url, data, accessToken, userId, headers) => {
  const [response, requestError, statusCode] = await get(
    { accessToken, userId },
    url,
    data,
    headers,
  )

  if (requestError) {
    const error = new HTTPError(`Fetch error: ${statusCode}`)
    // Attach extra info to the error object.
    error.info = requestError
    error.status = statusCode
    throw error
  }

  return response
}

/**
 * Make a POST request. We required a flat version of `post` to support SWR.
 *
 * @param {string} url - the request URL
 * @param {{}} [data] - request data; put into the querystring of a GET request, otherwise in the body]
 * @param {string} accessToken - access token to be added to the headers to be sent with the request, combined with the authentication headers created from {@link auth}
 * @param {string} userId - user ID to be added to the headers to be sent with the request
 * @param {{}} [headers] - headers to be sent with the request, combined with the authentication headers created from {@link auth}
 */
export const postFetcher = async (url, data, accessToken, userId, headers) => {
  const [response, requestError, statusCode] = await post(
    { accessToken, userId },
    url,
    data,
    headers,
  )

  if (requestError) {
    const error = new HTTPError(`Fetch error: ${statusCode}`)
    // Attach extra info to the error object.
    error.info = requestError
    error.status = statusCode
    throw error
  }

  return response
}
