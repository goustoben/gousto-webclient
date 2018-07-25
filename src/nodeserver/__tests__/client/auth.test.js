import sinon from 'sinon'

import Immutable from 'immutable'

import * as auth from 'client/auth'
import * as clientAuthorise from 'utils/clientAuthorise'

describe('client/auth', () => {
	let store
	let sandbox, authoriseStub

	beforeEach(() => {
		sandbox = sinon.sandbox.create()

		authoriseStub = sandbox
			.stub(clientAuthorise, 'authorise')
			.returns(Promise.resolve('ok'))
	})

	afterEach(() => {
		sandbox.restore()
	})

	describe('clientAuthorise', () => {
		test('should call utils/clientAuthorise.authorise', async () => {
			const result = await auth.clientAuthorise('store...')

			expect(result).toEqual('ok')
		})
	})
})
