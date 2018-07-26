import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */

describe('content actions', function() {
	describe('contentLoadContentByPageSlug', function() {
		let fetchContentMock
		let dispatchSpy
		let getStateSpy
		let contentActions

		beforeEach(function() {
			fetchContentMock = sinon.stub().returns(Promise.resolve({
				data: ['welcome', ['sections', ['components', ['fields', ['attributes']]]]],
			}))
			dispatchSpy = sinon.spy()
			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'accessToken' }),
				content: {},
			})

			contentActions = require('inject-loader?apis/content&./status&!actions/content')({
				'apis/content': { fetchContentBySlug: fetchContentMock },
			}).default
		})

		it('should fetch content for the specified page and variation', async function() {
			await contentActions.contentLoadContentByPageSlug('welcome', 'variation-a')(dispatchSpy, getStateSpy)
			expect(dispatchSpy).to.have.been.calledThrice
			const dispatchSpyCallFirst = dispatchSpy.getCall(0)
			const dispatchSpyCallSecond = dispatchSpy.getCall(1)
			const dispatchSpyCallThird = dispatchSpy.getCall(2)
			expect(dispatchSpyCallFirst.args[0]).to.deep.equal({ key: actionTypes.CONTENT_RECEIVE, type: 'PENDING', value: true })
			expect(dispatchSpyCallSecond.args[0]).to.deep.equal({ type: actionTypes.CONTENT_RECEIVE, content: ['welcome', ['sections', ['components', ['fields', ['attributes']]]]] })
			expect(dispatchSpyCallThird.args[0]).to.deep.equal({ key: actionTypes.CONTENT_RECEIVE, type: 'PENDING', value: false })

			expect(fetchContentMock).to.have.been.calledOnce
			const fetchContentMockCalls = fetchContentMock.getCall(0).args
			expect(fetchContentMockCalls[0]).to.equal('accessToken')
			expect(fetchContentMockCalls[1]).to.equal('welcome')
			expect(fetchContentMockCalls[2]).to.deep.equal({ vars: 'variation-a' })
		})

		it('should fetch content for the specified page with the default variation', async function() {
			await contentActions.contentLoadContentByPageSlug('welcome_default')(dispatchSpy, getStateSpy)
			expect(dispatchSpy).to.have.been.calledThrice
			const dispatchSpyCalls = dispatchSpy.getCall(0)
			expect(dispatchSpyCalls.args[0]).to.deep.equal({ key: actionTypes.CONTENT_RECEIVE, type: 'PENDING', value: true })

			expect(fetchContentMock).to.have.been.calledOnce
			const fetchContentMockCalls = fetchContentMock.getCall(0).args
			expect(fetchContentMockCalls[0]).to.equal('accessToken')
			expect(fetchContentMockCalls[1]).to.equal('welcome_default')
			expect(fetchContentMockCalls[2]).to.deep.equal({ vars: ['default'] })
		})
	})
})
