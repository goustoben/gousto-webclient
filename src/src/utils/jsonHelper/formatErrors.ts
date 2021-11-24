import { filterExists, last } from 'utils/array'

/**
 * Types
 * ============================================================================
 */

type ResponseError = {
  error ?: number,
  message ?: string,
}


/**
 * Module
 * ============================================================================
 */

export function formatErrorsWithCode(errors: ResponseError[]) {
  const errorCodes = errors.map(error => error.error).filter(filterExists)
  const errorMessages = errors.map(error => `${error.error} - ${error.message}`)

  return {
    code: last(errorCodes) || 500,
    errors,
    message: ', ' + errorMessages.join(', ') // Replicates original behaviour of ported code
  }
}

export function formatErrorArray(errors: ResponseError[]): string {
  return errors.reduce((str, error) => `${str} ${error.message}`, '')
}
