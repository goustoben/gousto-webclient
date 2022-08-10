import { ResponseMiddleware } from '../types'
import { composeParser } from '../compose'
import { parseResponseToJSON } from './json'
import { hasProp, isRealObject } from '../util'

type CoreData<T> = {
  status: 'ok',
  result: {
    data: T
  }
}

/**
 * Response parser middleware for extracting data from a Core PHP service request
 *
 * Example:
 *
 * composeFetch(
 *   coreEndpoint,
 *   extractCoreData<User>()
 * )
 */
export function extractCoreData <T> (): ResponseMiddleware<Response, T> {
  return composeParser(
    parseResponseToJSON,
    parseValueToCoreData,
    (value: CoreData<unknown>) => value.result.data as T
  )
}

export function parseValueToCoreData (value: unknown): CoreData<unknown> {
  if (!isRealObject(value)) {
    throw new ParseCoreDataError('value is not a record')
  }

  if (!hasProp('status', value) || value.status !== 'ok') {
    throw new ParseCoreDataError('*.status is not "ok"')
  }

  if (!hasProp('result', value) || !isRealObject(value.result)) {
    throw new ParseCoreDataError('*.result is not a record')
  }

  if (!hasProp('data', value.result)) {
    throw new ParseCoreDataError('*.result.data does not exist')
  }

  return value as CoreData<unknown>
}

/**
 * Represents an error parsing data as CoreData
 * Translation: "I couldn't parse this Response.json() result into a Core response!"
 */
export class ParseCoreDataError extends Error {
  constructor (reason: string) {
    super(`@library/http ParseCoreDataError: could not parse CoreData, reason="${reason}"`)
  }
}
