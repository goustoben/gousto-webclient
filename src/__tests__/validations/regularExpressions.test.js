import sinon from 'sinon'

import regExp from 'validations/regularExpressions'

describe('validations/regularExpressions', () => {
	const regex = regExp.latin

	test('should pass validation', () => {
		expect(regex.test('gfgf ghgh ń g    ')).toEqual(true)
		expect(regex.test(' gfĦû	ģ gf ghgłò ń g ')).toEqual(true)
		expect(regex.test('Ģ éǞǽ')).toEqual(true)
		expect(regex.test('')).toEqual(true)
	})

	test('should not pass validation', () => {
		expect(regex.test('gQ££@^£%   ')).toEqual(false)
		expect(regex.test('gQ:">,;i ')).toEqual(false)
		expect(regex.test('[]{}')).toEqual(false)
		expect(regex.test('gfgf ghgh234234234 ń g    ')).toEqual(false)
	})
})
