import fetchContentOnChange from 'routes/fetchContentOnChange'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('fetchContentOnChange', function() {
	let dispatchSpy
	let store
	let sandbox
	const testPath = '/jobs'

	beforeEach(function() {
		sandbox = sinon.sandbox.create()

		dispatchSpy = sinon.spy()
		store = {
			dispatch: dispatchSpy,
		}
	})

	afterEach(function() {
		sandbox.restore()
	})

	it('should call dispatch', function() {
		fetchContentOnChange(testPath, store)
		expect(dispatchSpy).to.have.been.calledOnce
	})
})
