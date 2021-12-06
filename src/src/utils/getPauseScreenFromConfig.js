import Immutable from 'immutable'
import config from 'config/subscription'

export function getPauseScreenFromConfig(key) {
  let screen = {
    type: key,
  }

  if (key && config.screens[key]) {
    screen = Object.assign(screen, { ...config.screens[key] })
  }

  return Immutable.fromJS(screen)
}
