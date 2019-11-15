/* eslint no-use-before-define: ["error", { "functions": false }] */
import { documentLocation } from 'utils/window'

/**
 * Get pathname
 * @param prevState
 * @constructor
 */
export const getPathName = ({ prevState }) => {
  let pathname

  try {
    ({ pathname } = prevState.routing.locationBeforeTransitions)
  } catch (e) {
    ({ pathname } = documentLocation())
  }

  return pathname
}
