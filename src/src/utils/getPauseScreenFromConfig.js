import Immutable from 'immutable' /* eslint-disable new-cap */
import config from 'config/subscription'

export default function getPauseScreenFromConfig(key) {
	let screen = {
		type: key,
	}

	if (key && config.screens[key]) {
		screen = Object.assign(screen, { ...config.screens[key] })
	}

	return Immutable.fromJS(screen)
}
