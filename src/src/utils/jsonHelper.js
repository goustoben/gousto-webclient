import logger from 'utils/logger'

export function formatArrayErrors(errors) {
  return errors.reduce((str, error) => `${str} ${error.message}`, '')
}

export function formatErrorsWithCode(errors) {
  const errorObj = {
    code: 500,
    message: '',
  }

  errorObj.message = errors.reduce((str, error) => {
    if (error.error) {
      errorObj.code = error.error
    }

    return `${str}, ${error.error} - ${error.message}`
  }, '')

  return errorObj
}

export function snakeToCamelCase(text) {
  return text.replace(/"\w+?":/g, key => key.replace(/_\w/g, match => match[1].toUpperCase()))
}

export function JSONParse(text, useMenuService) { // eslint-disable-line new-cap
  try {
    if (useMenuService) {
      return JSON.parse(text)
    }
    const camelCaseText = snakeToCamelCase(text)

    return JSON.parse(camelCaseText)
  } catch (e) {
    logger.error({ message:`JSONParse failed with text: "${text}"`, errors:  [e] })
    throw new Error('An error occurred, please try again.')
  }
}

export function processJSON([response, status]) {
  return new Promise((resolve, reject) => {

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
        reject(formatArrayErrors(response.errors))
      }
    } else if (Array.isArray(response.data)) {
      reject(formatArrayErrors(response.data))
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
            errors[field] = Object.values(response['error-details'].failures[field])[0] // eslint-disable-line no-param-reassign

            return errors
          }, errorObj.errors)
        }
      }
      reject(errorObj)
    } else if (typeof response === 'object' && status < 400) {
      resolve({ response, meta })
    } else {
      if (typeof response === 'object') {
        reject(response, meta)
      } else {
        reject('Response is malformed')
      }
    }
  })
}
