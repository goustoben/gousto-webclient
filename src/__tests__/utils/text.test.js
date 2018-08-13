import { textReducer } from 'utils/text'

describe('text utils', () => {
	describe('textReducer', () => {
		test('when nothing is passed should return an empty string ', () => {
			expect(textReducer()).toEqual('')
		})

		test('when item is passed should return the item', () => {
			expect(textReducer('', 'c')).toEqual('c')
		})

		test('when text is passed should return the text', () => {
			expect(textReducer('a, b', '')).toEqual('a, b')
		})

		test('when both text and item are passed should return the text appended with the item ', () => {
			expect(textReducer('a, b', 'c')).toEqual('a, b, c')
		})
	})
})
