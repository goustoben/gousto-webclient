import {
  formatBadStatus,
  formatErrorArray,
  formatErrorsWithCode,
  formatMalformed,
  formatUnmatched
} from './formatErrors'

import { formatSuccessResponse } from './formatResponses'

/**
 * This code has been largely untouched since it was first committed by
 * @garethtalty in 2016. You can see the original file's history here:
 * https://github.com/Gousto/Gousto2-FrontEnd/blob/750691d7/src/nodeserver/src/utils/jsonHelper.js
 */

export function processJSON([response, status]) {
  return new Promise((resolve, reject) => { // eslint-disable-line consistent-return
    const meta = response.meta || null
    if (response.status === 'ok') {
      return resolve(
        formatSuccessResponse(response, meta)
      )
    } else if (Array.isArray(response.errors)) {
      try {
        return reject(
          formatErrorsWithCode(response.errors)
        )
      } catch (err) {
        return reject(
          formatErrorArray(response.errors)
        )
      }
    } else if (Array.isArray(response.data)) {
      return reject(
        formatErrorArray(response.data)
      )
    } else if (response.error) {
      const errorObj = {
        code: 500,
        message: response.error,
        errors: {},
      }
      if (response['error-details']) {
        errorObj.code = response['error-details'].code
        if (response['error-details'].failures) {
          errorObj.errors = Object.keys(response['error-details'].failures).reduce((errors, field) => {
            errors[field] = Object.values(response['error-details'].failures[field])[0] // eslint-disable-line no-param-reassign, prefer-destructuring

            return errors
          }, errorObj.errors)
        }
      }
      reject(errorObj)
    } else if (typeof response === 'object' && status < 400) {
      return resolve(
        formatBadStatus(response, meta)
      )
    } else if (typeof response === 'object') {
      return reject(
        formatUnmatched(response)
      )
    } else {
      return reject(
        formatMalformed()
      )
    }
  })
}
