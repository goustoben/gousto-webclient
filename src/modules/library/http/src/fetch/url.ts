import qs from 'qs'

import { RequestConfig } from '../types'

export function getUrl(req: RequestConfig) {
  let url = req.host

  if (req.paths.length) {
    url += '/' + req.paths.join('/')
  }

  let hasQueryParams = false
  if (req.queryParams) {
    // for-in iteration is faster than Object.keys().length and less GC
    for (const key in req.queryParams) {
      hasQueryParams = true
      break
    }
  }

  if (hasQueryParams) {
    url += '?' + qs.stringify(req.queryParams)
  }

  return url
}
