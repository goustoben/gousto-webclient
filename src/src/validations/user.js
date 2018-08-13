import regExp from './regularExpressions'
import configAuth from 'config/auth'

export default {
	title: {
		field: 'title',
		rules: [

		],
	},

	firstName: {
		field: 'first name',
		rules: [
			{ name: 'isLength', options: { min: 1 } },
			{ name: 'isLength', options: { max: 200 } },
			{ name: 'matches', options: regExp.latin },
		],
	},

	lastName: {
		field: 'last name',
		rules: [
			{ name: 'isLength', options: { min: 1 } },
			{ name: 'isLength', options: { max: 200 } },
			{ name: 'matches', options: regExp.latin },
		],
	},

	email: {
		field: 'email',
		rules: [
			'isEmail',
		],
	},

	password: {
		field: 'password',
		rules: [
			{ name: 'isLength', options: { min: configAuth.PASSWORD_MIN_LENGTH } },
		],
	},
}
