import sinon from 'sinon'

import DOMPurify from 'dompurify'
import * as DOMPurifyUtil from 'utils/DOMPurify'
import globals from 'config/globals'
import jsdom from 'jsdom'

describe('DOMPurify util', () => {
	let sandbox
	let jsdomSpy

	beforeEach(() => {
		sandbox = sinon.sandbox.create()
		jsdomSpy = sandbox.spy(jsdom, 'jsdom')
	})

	afterEach(() => {
		sandbox.restore()
	})

	xit('should return DOMPurify by default', function() {
		expect(DOMPurifyUtil.default).toEqual(DOMPurify)
	})

	xit('should not call jsdom if on client', function() {
		sinon.stub(globals, 'server').get(function() {
			return false
		})
		DOMPurifyUtil.getDOMPurify()
		expect(jsdomSpy.callCount).toEqual(0)
	})

	xit('should call jsdom once if on server', function() {
		sinon.stub(globals, 'server').get(function() {
			return true
		})
		DOMPurifyUtil.getDOMPurify()
		expect(jsdomSpy.callCount).toEqual(1)
	})
})
