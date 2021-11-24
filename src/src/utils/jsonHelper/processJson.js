import { formatErrorArray, formatErrorsWithCode } from './formatErrors'

/**
 * This code has been largely untouched since it was first committed by
 * @garethtalty in 2016. You can see the original file's history here:
 * https://github.com/Gousto/Gousto2-FrontEnd/blob/750691d7/src/nodeserver/src/utils/jsonHelper.js
 */

export function processJSON([response, status]) {
  return new Promise((resolve, reject) => { // eslint-disable-line consistent-return
    const meta = response.meta || null
    if (response.status === 'ok') {
      let cbData = response
      if (response.result) {
        cbData = response.result
        if (response.result.data) {
          cbData = response.result.data
        }
      } else if (response.data && response.included) {
        return resolve({ response })
      } else if (response.data) {
        cbData = response.data
      }
      resolve({ response: cbData, meta })
    } else if (Array.isArray(response.errors)) {
      try {
        reject(formatErrorsWithCode(response.errors))
      } catch (err) {
        reject(formatErrorArray(response.errors))
      }
    } else if (Array.isArray(response.data)) {
      reject(formatErrorArray(response.data))
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
      resolve({ response, meta })
    } else if (typeof response === 'object') {
      reject(response)
    } else {
      return reject('Response is malformed') // eslint-disable-line prefer-promise-reject-errors
    }
  })
}
