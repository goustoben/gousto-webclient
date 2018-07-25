import actionTypes from './actionTypes'

export default {
	temp: (key, value) => ({
		type: actionTypes.TEMP,
		key,
		value,
	}),
}
