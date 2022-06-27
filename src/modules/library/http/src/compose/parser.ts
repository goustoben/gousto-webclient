import type { ResponseMiddleware } from '../types'
import { withResolved } from '../util'

/**
 * Response
 * ============================================================================
 *
 * Given a set of n responseMiddleware that reduce the response value from type
 * A -> B, B -> C, ... Y -> Z, return a single responseMiddleware that
 * reduces A -> Z
 *
 * This compose function is type safe, so if a type transformation is missing,
 * you'll get a type error
 *
 */

export function composeParser<T1, T2>(
  rm1: ResponseMiddleware<T1, T2>
): ResponseMiddleware<T1, T2>

export function composeParser<T1, T2, T3>(
  rm1: ResponseMiddleware<T1, T2>,
  rm2: ResponseMiddleware<T2, T3>
): ResponseMiddleware<T1, T3>

export function composeParser<T1, T2, T3, T4>(
  rm1: ResponseMiddleware<T1, T2>,
  rm2: ResponseMiddleware<T2, T3>,
  rm3: ResponseMiddleware<T3, T4>
): ResponseMiddleware<T1, T4>

export function composeParser<T1, T2, T3, T4, T5>(
  rm1: ResponseMiddleware<T1, T2>,
  rm2: ResponseMiddleware<T2, T3>,
  rm3: ResponseMiddleware<T3, T4>,
  rm4: ResponseMiddleware<T4, T5>
): ResponseMiddleware<T1, T5>

export function composeParser<T1, T2, T3, T4, T5, T6>(
  rm1: ResponseMiddleware<T1, T2>,
  rm2: ResponseMiddleware<T2, T3>,
  rm3: ResponseMiddleware<T3, T4>,
  rm4: ResponseMiddleware<T4, T5>,
  rm5: ResponseMiddleware<T5, T6>
): ResponseMiddleware<T1, T6>

export function composeParser<T1, T2, T3, T4, T5, T6, T7>(
  rm1: ResponseMiddleware<T1, T2>,
  rm2: ResponseMiddleware<T2, T3>,
  rm3: ResponseMiddleware<T3, T4>,
  rm4: ResponseMiddleware<T4, T5>,
  rm5: ResponseMiddleware<T5, T6>,
  rm6: ResponseMiddleware<T6, T7>
): ResponseMiddleware<T1, T7>

export function composeParser<T1, T2, T3, T4, T5, T6, T7, T8>(
  rm1: ResponseMiddleware<T1, T2>,
  rm2: ResponseMiddleware<T2, T3>,
  rm3: ResponseMiddleware<T3, T4>,
  rm4: ResponseMiddleware<T4, T5>,
  rm5: ResponseMiddleware<T5, T6>,
  rm6: ResponseMiddleware<T6, T7>,
  rm7: ResponseMiddleware<T7, T8>
): ResponseMiddleware<T1, T8>

export function composeParser<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  rm1: ResponseMiddleware<T1, T2>,
  rm2: ResponseMiddleware<T2, T3>,
  rm3: ResponseMiddleware<T3, T4>,
  rm4: ResponseMiddleware<T4, T5>,
  rm5: ResponseMiddleware<T5, T6>,
  rm6: ResponseMiddleware<T6, T7>,
  rm7: ResponseMiddleware<T7, T8>,
  rm8: ResponseMiddleware<T8, T9>
): ResponseMiddleware<T1, T9>

export function composeParser<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  rm1: ResponseMiddleware<T1, T2>,
  rm2: ResponseMiddleware<T2, T3>,
  rm3: ResponseMiddleware<T3, T4>,
  rm4: ResponseMiddleware<T4, T5>,
  rm5: ResponseMiddleware<T5, T6>,
  rm6: ResponseMiddleware<T6, T7>,
  rm7: ResponseMiddleware<T7, T8>,
  rm8: ResponseMiddleware<T8, T9>,
  rm9: ResponseMiddleware<T9, T10>
): ResponseMiddleware<T1, T10>

/* eslint-disable @typescript-eslint/no-unused-vars, prefer-rest-params */
export function composeParser<RM extends ResponseMiddleware<unknown, unknown>>(
  rm1?: RM,
  rm2?: RM,
  rm3?: RM,
  rm4?: RM,
  rm5?: RM,
  rm6?: RM,
  rm7?: RM,
  rm8?: RM,
  rm9?: RM
): RM {
  const middlewares = Array.from(arguments) as RM[]
  return function composedParser(piped: unknown) {
    for (const middleware of middlewares) {
      piped = withResolved(piped, middleware)
    }
    return piped
  } as RM
}
/* eslint-enable @typescript-eslint/no-unused-vars, prefer-rest-params */
