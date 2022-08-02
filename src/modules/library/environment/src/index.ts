import * as browserEnv from './browserEnvironment'
import * as isomorphicEnv from './isomorphicEnvironment'

export const browserEnvironment = {
  canUseWindow: browserEnv.canUseWindow
}

export const isomorphicEnvironment = {
  getDomain: isomorphicEnv.getDomain,
  getEnvironment: isomorphicEnv.getEnvironment,
  getProtocol: isomorphicEnv.getProtocol
}
