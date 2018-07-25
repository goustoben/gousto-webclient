import regExp from './regularExpressions'

export default {
	isEmail: 'Please provide a valid email address',
	isLength: (field, { min, max }) => {
		let error = ''
		if (min === 1) {
			error = `${field} is required`
		} else if (min > 1) {
			error = `${field} must be at least ${min} characters`
		} else {
			error = `${field} must be under ${max} characters`
		}

		return error
	},
	matches: (field, options) => {
		let message
		switch (options) {
			case regExp.latin:
				message = 'Please use only letters (a-z) and European special characters.'
				break
			default:
				message = 'Oops, this isn\'t a valid format, please double-check and try again.'
		}

		return message
	},
}
