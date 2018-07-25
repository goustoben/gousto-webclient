import sinon from 'sinon'

import {
	validateBasicTextLength,
	validatePhoneFormat,
	validateDigits,
} from 'routes/Checkout/utils/validation'

describe('utils/validation', () => {
	describe('validateBasicTextLength', () => {
		test('should return false', () => {
			expect(validateBasicTextLength('')).toBe(false)
			expect(
				validateBasicTextLength(
					'Integer rhoncus porta mauris a tristique. Curabitur pulvinar velit in hendrerit aliquam. Vivamus scelerisque consequat leo et scelerisque. Sed nibh ante, suscipit eu justo a, tincidunt ornare eros. Nunc ac viverra est. Mauris eu ornare mi, et interdum leo. Proin porttitor interdum magna in egestas. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer maximus nulla lorem, vitae tempus sem auctor efficitur. Cras maximus libero consequat magna rutrum, at finibus orci consectetur. Maecenas fringilla ac nibh eu consectetur. Maecenas porttitor, nulla in fringilla laoreet, nunc augue pretium metus, et sollicitudin tortor eros ut dui. Suspendisse potenti.',
				),
			).toBe(false)
		})
		test('should return true', () => {
			expect(validateBasicTextLength('5')).toBe(true)
			expect(
				validateBasicTextLength(
					'Vivamus scelerisque consequat leo et scelerisque. Sed nibh ante, suscipit eu justo a, tincidunt ornare eros. Nunc ac viverra est.',
				),
			).toBe(true)
		})
	})

	describe('validatePhoneFormat', () => {
		test('should return false', () => {
			expect(validatePhoneFormat('')).toBe(false)
			expect(validatePhoneFormat('dsfsdf dfsdfsdfsdf')).toBe(false)
			expect(validatePhoneFormat('sdfsd 324234234')).toBe(false)
			expect(
				validatePhoneFormat(
					'354657687987665463565476879675645577887877887787877887fsdfw',
				),
			).toBe(false)
		})
		test('should return true', () => {
			expect(validatePhoneFormat(' ')).toBe(true)
			expect(validatePhoneFormat('5')).toBe(true)
			expect(validatePhoneFormat('5423434')).toBe(true)
			expect(validatePhoneFormat('54 23434')).toBe(true)
			expect(validatePhoneFormat('+48(0) 23434')).toBe(true)
		})
	})

	describe('validateDigits', () => {
		test('should return false', () => {
			expect(validateDigits('')).toBe(false)
			expect(validateDigits('dsfsdf dfsdfsdfsdf')).toBe(false)
			expect(validateDigits('sdfsd 324234234')).toBe(false)
			expect(
				validateDigits(
					'35465768798766546356547 6879675645577 887877887787877887',
				),
			).toBe(false)
			expect(
				validateDigits('3546576879876Q£&Y&Q$&Q@^@£*&*(*(87787877887'),
			).toBe(false)
			expect(validateDigits('35465 --- +877887')).toBe(false)
			expect(validateDigits('354"|{}877887')).toBe(false)
			expect(validateDigits('3=-7')).toBe(false)
			expect(validateDigits('!`~#')).toBe(false)
		})
		test('should return true', () => {
			expect(validateDigits('5')).toBe(true)
			expect(validateDigits('13213354232343243453453452343234')).toBe(true)
		})
	})
})
