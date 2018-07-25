

const windowUtils = require('../../js/utils/windowUtils')

const unencodedQueryString = '?order_id=23&description=This%20is%20an%20awkward%20query%20string&recipe_ids[]=123&recipe_ids[]=234&recipe_ids[]=345&brokenVar&nullString=null'
const unencodedQueryStringIndexed = '?order_id=23&description=This%20is%20an%20awkward%20query%20string&recipe_ids[0]=123&recipe_ids[1]=234&recipe_ids[2]=345&brokenVar&nullString=null'

const encodedQueryString = '?order_id=23&description=This%20is%20an%20awkward%20query%20string&recipe_ids%5B%5D=123&recipe_ids%5B%5D=234&recipe_ids%5B%5D=345&brokenVar&nullString=null'
const encodedQueryStringIndexed = '?order_id=23&description=This%20is%20an%20awkward%20query%20string&recipe_ids%5B0%5D=123&recipe_ids%5B1%5D=234&recipe_ids%5B2%5D=345&brokenVar&nullString=null'

describe('windowUtils', () => {

	describe('getQueryParamByName', () => {
		it('should return a query string value from a single key', () => {
			function executeAssertions(queryString) {
				expect(windowUtils.getQueryParamByName('order_id', queryString)).toEqual('23')
				expect(windowUtils.getQueryParamByName('description', queryString)).toEqual('This is an awkward query string')
				expect(windowUtils.getQueryParamByName('brokenVar', queryString)).not.toBeDefined()
				expect(windowUtils.getQueryParamByName('nonExistingKey', queryString)).not.toBeDefined()
				expect(windowUtils.getQueryParamByName('nullString', queryString)).toBe('null')
			}
			executeAssertions(unencodedQueryString)
			executeAssertions(encodedQueryString)
		})
	})

	describe('getQueryParamsAsObj', () => {
		it('should return an object of query string variables', () => {
			function executeAssertions(queryString) {
				let expected = {
					'order_id': ['23'],
					'description': ['This is an awkward query string'],
					'recipe_ids[]': ['123', '234', '345'],
					'brokenVar': [undefined],
					'nullString': ['null']
				}
				let actual = windowUtils.getQueryParamsAsObj(queryString)
				expect(expected).toEqual(actual)
			}
			executeAssertions(unencodedQueryString)
			executeAssertions(unencodedQueryStringIndexed)

			executeAssertions(encodedQueryString)
			executeAssertions(encodedQueryStringIndexed)
		})
	})
})
