import qs from 'qs'
import isomorphicFetch from 'isomorphic-fetch'

const getAuthorizationHeader = (accessToken) => (accessToken ? { Authorization: `Bearer ${accessToken}` } : {})

const getHeadersToSend = (accessToken, sessionId, userId, customHeaders = {}) => ({
  'x-gousto-device-id': sessionId,
  'x-gousto-user-id': userId,
  ...getAuthorizationHeader(accessToken),
  'Content-Type': 'application/json',
  ...customHeaders
})

/**
 * Make an HTTP request
 *
 * @param {string} method - an HTTP request method. see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods}
 * @param {{ accessToken: string, sessionId: string, userId: string}} authOptions - authentication options
 * @param {string} url - the request URL
 * @param {Object} [data] - request data; put into the querystring of a GET request, otherwise in the body
 * @param {Object} [headers] - headers to be sent with the request, combined with the authentication headers created from {@link authOptions}
 *
 * @returns {Promise<[TResponse | null, TError | null, number]>} a 3-length tuple containing:
 *                                            the response from server, if successful,
 *                                            the response from server, if a failure,
 *                                            the response status code
 */
const fetch = async (
  method,
  {
    accessToken,
    sessionId,
    userId
  },
  url,
  data = null,
  headers = null
) => {
  let requestUrl = url

  const request = {
    method: method.toUpperCase(),
    headers: getHeadersToSend(accessToken, sessionId, userId, headers)
  }

  if (data) {
    if (request.method === 'GET') {
      requestUrl += `?${qs.stringify(data)}`
    } else {
      request.body = JSON.stringify(data)
    }
  }

  const response = await isomorphicFetch(requestUrl, request)

  if (response.status === 204) {
    return [ null, null, response.status ]
  }

  const parsed = await response.json()

  if (response.status >= 400) {
    return [ null, parsed, response.status ]
  }

  return [ parsed, null, response.status ]
}

/**
 * Make a GET request.
 *
 * @param {{ accessToken: string, sessionId: string, userId: string}} auth - authentication options
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
 * @param {{ accessToken: string, sessionId: string, userId: string}} auth - authentication options
 * @param {string} url - the request URL
 * @param {{}} [data] - request data; put into the querystring of a GET request, otherwise in the body
 * @param {{}} [headers] - headers to be sent with the request, combined with the authentication headers created from {@link auth}
 */
export const post = (auth, url, data, headers) => fetch('POST', auth, url, data, headers)
