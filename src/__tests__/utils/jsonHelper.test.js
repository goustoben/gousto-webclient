import { processJSON } from 'utils/jsonHelper'

describe('JSON Helper', () => {
	test('handle validation error response', () => {
		const serverResponse = {
			error: 'Validation error',
			status: 422,
			'error-details': {
				code: 'validation-error',
				failures: {
					email: ['provide a valid email'],
				},
			},
		}

		const rejectionObj = {
			code: 'validation-error',
			message: serverResponse.error,
			errors: {
				email: 'provide a valid email',
			},
		}
		const response = processJSON([serverResponse, 500])
		expect(response).rejects.toEqual(rejectionObj)
	})

	test('handle errors response as an array', () => {
		const serverResponse = {
			error: 'Validation error',
			status: 422,
			errors: [
				{
					error: '401',
					message: 'Auth Exception!',
				},
			],
		}

		const rejectionObj = {
			code: '401',
			message: ', 401 - Auth Exception!',
		}
		const response = processJSON([serverResponse, 500])
		expect(response).rejects.toEqual(rejectionObj)
	})

	test('handle payment-required error response', () => {
		const serverResponse = {
			error: 'error',
			status: 402,
		}

		const rejectionObj = {
			code: 500,
			errors: {},
			message: serverResponse.error,
		}
		const response = processJSON([serverResponse, 500])
		expect(response).rejects.toEqual(rejectionObj)
	})
})
