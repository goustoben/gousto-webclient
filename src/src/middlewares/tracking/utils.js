/* eslint no-use-before-define: ["error", { "functions": false }] */
import windowUtils from 'utils/window'

/**
 * Get pathname
 * @param prevState
 * @constructor
 */
const getPathName = ({ prevState }) => {
  let pathname

  try {
    pathname = prevState.routing.locationBeforeTransitions.pathname
  } catch (e) {
    pathname = windowUtils.documentLocation().pathname
  }

  return pathname
}

export default {
  getPathName,
}

