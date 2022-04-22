/**
 * API Types
 * ============================================================================
 */

export type SuccessResponse<T> =
  | ResponseWithData<T>
  | ResponseWithDataIncluded<T>
  | ResponseWithResult<T>
  | ResponseWithResultData<T>
  | ResponseAsData<T>

type APIMeta = Record<string, unknown> | null

type ResponseWithResult<T> = {
  status: 'ok'
  meta?: APIMeta
  result: T
}

type ResponseWithResultData<T> = {
  status: 'ok'
  meta?: APIMeta
  result: {
    data: T
    meta?: APIMeta
  }
}

type ResponseWithDataIncluded<T> = T & {
  // Ideally, we should make this type reflect the API response more accurately by using "data: T" and not "& T".
  // However, this will require upstream changes
  status: 'ok'
  meta?: APIMeta
  included: true
}

type ResponseWithData<T> = {
  status: 'ok'
  meta?: APIMeta
  data: T
}

// It's not clear when we this will apply, but it's the fallthrough of the old code and is kept here for parity
type ResponseAsData<T> = T & {
  status: 'ok'
}

/**
 * Module Types
 * ============================================================================
 */

type FormattedSuccess<T> =
  | {
      meta: APIMeta | null
      response: T
    }
  | {
      // If response.included === true, the whole response is to be treated as the data
      response: T & {
        included: true
      }
    }

/**
 * Module
 * ============================================================================
 */

export function isRWithDataIncluded<T>(
  response: SuccessResponse<T>,
): response is ResponseWithDataIncluded<T> {
  return 'included' in response && response.included
}

export function isRWithData<T>(response: SuccessResponse<T>): response is ResponseWithData<T> {
  return 'data' in response && !isRWithDataIncluded(response)
}

export function isRWithResultData<T>(
  response: SuccessResponse<T>,
): response is ResponseWithResultData<T> {
  return 'result' in response && 'data' in response.result
}

export function isRWithResult<T>(response: SuccessResponse<T>): response is ResponseWithResult<T> {
  return 'result' in response && !isRWithResultData(response)
}

export function extractData<T>(response: SuccessResponse<T>): T {
  if (isRWithResultData(response)) {
    return response.result.data
  } else if (isRWithResult(response)) {
    return response.result
  } else if (isRWithData(response)) {
    return response.data
  } else if (isRWithDataIncluded(response)) {
    return response
  } else {
    // The old code had a fallthrough where we trusted the response was a ResponseAsData.
    return response
  }
}

export function formatSuccessResponse<T>(
  response: SuccessResponse<T>,
  meta: APIMeta | null,
): FormattedSuccess<T> {
  if (isRWithDataIncluded(response)) {
    return { response }
  } else {
    return {
      response: extractData(response),
      meta,
    }
  }
}
