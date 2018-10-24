import DOMPurify from 'dompurify'
import * as DOMPurifyUtil from 'utils/DOMPurify'
import globals from 'config/globals'
import jsdom from 'jsdom'

describe('DOMPurify util', () => {
	let defaultGlobalServer
	let jsdomSpy

	beforeEach(() => {
		defaultGlobalServer = globals.server
		jsdomSpy = jest.spyOn(jsdom, 'JSDOM')
	})

	afterEach(() => {
		jsdomSpy.mockClear()
		globals.__defineGetter__('server', () => defaultGlobalServer)
	})

	test('should return DOMPurify by default', function() {
		expect(DOMPurifyUtil.default).toEqual(DOMPurify)
	})

	test('should not call jsdom if on client', function() {
		globals.__defineGetter__('server', () => false)
		DOMPurifyUtil.getDOMPurify()
		expect(jsdomSpy).toHaveBeenCalledTimes(0)
	})

	test.skip('should call jsdom once if on server', function() {
		globals.__defineGetter__('server', () => true)
		DOMPurifyUtil.getDOMPurify()
		expect(jsdomSpy).toHaveBeenCalledTimes(1)
	})
})
