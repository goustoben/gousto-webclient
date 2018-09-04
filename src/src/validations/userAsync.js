import { serverValidatePassword } from 'apis/auth'

const validatePassword = async (password) => {
	try {
		await serverValidatePassword(password)

		return true
	} catch (err) {
		if (err.status === 406) {
			return false
		}

		// We do not want to consider the password invalid just because the server fails while validating it
		return true
	}
}

export default (values) =>
	validatePassword(values.aboutyou.password).then(isValid => {
		if (!isValid) {
			throw { aboutyou: { password: 'Your password is too easy to guess. Please choose another one.' } } // eslint-disable-line no-throw-literal
		}
	})
