import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import status from 'actions/status'
import actionTypes from 'actions/actionTypes'
import logger from 'utils/logger'

describe('status actions', function() {
	describe('pending', function() {
		it('should return a PENDING action', function() {
			expect(status.pending('a', 'b').type).to.equal(actionTypes.PENDING)
		})
		it('should return a PENDING action with the arguments mapped through to the `key` and `value` properties if the `key` is a valid actionType', function() {
			const type = Object.keys(actionTypes)[0]
			const result = status.pending(type, 'b')
			expect(result.type).to.equal(actionTypes.PENDING)
			expect(result.key).to.equal(type)
			expect(result.value).to.equal('b')
		})
		it('should return a PENDING action with an undefined `key` if the `key` is not a valid actionType', function() {
			const result = status.pending('a', 'b')
			expect(result.type).to.equal(actionTypes.PENDING)
			expect(result.key).to.equal(undefined)
			expect(result.value).to.equal('b')
		})
	})
	describe('error', function() {
		it('should return a ERROR action', function() {
			expect(status.error('a', 'b').type).to.equal(actionTypes.ERROR)
		})
		it('should return a ERROR action with the arguments mapped through to the `key` and `value` properties if the `key` is a valid actionType', function() {
			const type = Object.keys(actionTypes)[0]
			const result = status.error(type, 'b')
			expect(result.type).to.equal(actionTypes.ERROR)
			expect(result.key).to.equal(type)
			expect(result.value).to.equal('b')
		})
		it('should return a ERROR action with an undefined `key` if the `key` is not a valid actionType', function() {
			const result = status.error('a', 'b')
			expect(result.type).to.equal(actionTypes.ERROR)
			expect(result.key).to.equal(undefined)
			expect(result.value).to.equal('b')
		})
	})

	describe('errorLoad', function() {
		let sandbox
		let dispatch
		let loggerError
		let loggerWarning

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			dispatch = sandbox.spy()
			loggerError = sandbox.stub(logger, 'error')
			loggerWarning = sandbox.stub(logger, 'warning')
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should call logger error once with error message if error is a string', function() {
			status.errorLoad('action', 'error string')(dispatch)
			expect(loggerError).to.have.been.calledOnce
			expect(loggerError).to.have.been.calledWithExactly('error string')
		})

		it('should call logger with given level once with error message if error is an object', function() {
			status.errorLoad('action', {
				message: 'error message',
				level: 'warning',
			})(dispatch)
			expect(loggerWarning).to.have.been.calledOnce
			expect(loggerWarning).to.have.been.calledWithExactly('error message')
		})
	})
})
