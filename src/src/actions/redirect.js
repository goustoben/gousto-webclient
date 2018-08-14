import actionTypes from './actionTypes'
import { client, server, legacy } from 'config/globals'
import { push, replace } from 'react-router-redux'
import * as windowUtils from 'utils/window'

function shouldUseReactRouter() {
	return client && !legacy()
}

export const redirect = (url, clearCookies) => {
	let action

	if (shouldUseReactRouter()) {
		action = push(url)
	} else if (server) {
		action = {
			type: actionTypes.SERVER_REDIRECT,
			url,
			clearCookies,
		}
	} else {
		windowUtils.redirect(url)

		action = {
			type: actionTypes.VOID,
		}
	}

	return action
}

export default {
	redirect,
	replace: (url) => {
		let action

		if (shouldUseReactRouter()) {
			action = replace(url)
		} else if (server) {
			action = {
				type: actionTypes.SERVER_REPLACE,
				url,
			}
		} else {
			windowUtils.replace(url)

			action = {
				type: actionTypes.VOID,
			}
		}

		return action
	}
}
