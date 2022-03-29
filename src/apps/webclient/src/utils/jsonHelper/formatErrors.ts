import { filterExists, last } from 'utils/array'

/**
 * Types
 * ============================================================================
 */

type ResponseError = {
  error?: number,
  message?: string,
}

/**
 * Module
 * ============================================================================
 */

export function formatBadStatus<R, M>(response: R, meta: M) {
  return { response, meta }
}

export function formatErrorsWithCode(errors: ResponseError[]) {
  const errorCodes = errors.map(error => error.error).filter(filterExists)
  const errorMessages = errors.map(error => `${error.error} - ${error.message}`)

  return {
    code: last(errorCodes) || 500,
    errors,
    message: `, ${errorMessages.join(', ')}` // Replicates original behaviour of ported code
  }
}

export function formatErrorArray(errors: ResponseError[]): string {
  return errors.reduce((str, error) => `${str} ${error.message}`, '')
}

export function formatMalformed() {
  return 'Response is malformed' as const
}

export function formatUnmatched(response: Record<string | number, unknown>) {
  return response
}

