import logger from 'utils/logger'

// Roughly correct but unused, only defined to help determine the arguments of a reject call
// type ResponseWithErrors = {
//   errors: Array<{
//     error: number,
//     message: string
//   }> & Array<Error>,
// } & {
//   data: Array<Error>
// }
//
// type ResponseWithError = {
//   error: string,
//   "error-details"?: {
//     code: number
//     failures?: Array<string>
//   }
// }

export function formatArrayErrors(errors) {
  return errors.reduce((str, error) => `${str} ${error.message}`, '')
}

export function formatErrorsWithCode(errors) {
  const errorObj = {
    code: 500,
    message: '',
    errors,
  }

  errorObj.message = errors.reduce((str, error) => {
    if (error.error) {
      errorObj.code = error.error
    }

    return `${str}, ${error.error} - ${error.message}`
  }, '')

  return errorObj
}

export function responseTextSnakeToCamelCase(text) {
  return text.replace(/"\w+?":/g, key => key.replace(/_\w/g, match => match[1].toUpperCase()))
}

const snakeToCamelCase = (str) => str.replace(
  /([_][a-zA-Z\d])/g,
  (group) => group.toUpperCase()
    .replace('_', '')
)

export const parseObjectKeysToCamelCase = (obj) => {
  if (typeof obj !== 'object') return obj

  return Object.keys(obj).reduce((camelCaseObject, currentKey) => {
    const currentValue = obj[currentKey]
    let parsedValue

    switch (true) {
    case Array.isArray(currentValue):
      parsedValue = currentValue.map(parseObjectKeysToCamelCase)
      break
    case typeof currentValue === 'object' && currentValue !== null:
      parsedValue = { ...parseObjectKeysToCamelCase(currentValue) }
      break
    default:
      parsedValue = currentValue
    }

    return {
      ...camelCaseObject,
      [snakeToCamelCase(currentKey)]: parsedValue
    }
  }, {})
}

export function JSONParse(text, returnRawData) { // eslint-disable-line new-cap
  try {
    if (returnRawData) {
      return JSON.parse(text)
    }
    const camelCaseText = responseTextSnakeToCamelCase(text)

    return JSON.parse(camelCaseText)
  } catch (e) {
    logger.error({ message: `JSONParse failed with text: "${text}"`, errors: [e] })
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
    } else if (typeof response === 'object') {
      reject(response)
    } else {
      return reject('Response is malformed')
    }
  })
}
