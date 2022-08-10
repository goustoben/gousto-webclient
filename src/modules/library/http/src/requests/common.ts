import { getAuthToken } from '@library/auth'
import { browserEnvironment } from '@library/environment'

import { RequestMiddleware } from '../types'
import { setHeader } from './header'
import { httpWarning } from '../logger'

/**
 * Use @library/auth to add an authentication header
 */
export const auth: RequestMiddleware<void> = setHeader(
  'Authorization',
  () => `Bearer ${getAuthToken()}`,
)

/**
 * WIP: Stub to set service URL on the request.
 * This is here to immediately enable Rockets development on the account details page.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setServiceUrl(serviceName: 'user', version: 1): RequestMiddleware<void> {
  const isBrowser = browserEnvironment.canUseWindow()

  return function serviceUrlMiddleware (req) {
    if (req.host.length || req.paths.length) {
      httpWarning('setServiceUrl will reset existing request host / path config')
    }

    // FEF-592: Must replace hardcoded value with a call to an endpoint module, or at least sufficient code for the account page
    if (isBrowser) {
      req.host = 'https://staging-api.gousto.info'
      req.paths = ['user']
    } else {
      req.host = 'http://staging-user.gousto.info'
      req.paths = []
    }

    return req
  }
}
