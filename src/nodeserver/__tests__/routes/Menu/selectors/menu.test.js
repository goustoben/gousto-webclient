import Immutable from 'immutable'

import { getIsMenuRecommended } from 'routes/Menu/selectors/menu'

describe('menu memoized selectors', () => {
	let state

	describe('isMenuRecommended', () => {
		test('when state contains recommended recipes it should return true', () => {
			state = {
				recipes: Immutable.fromJS({
					1: { id: '1', isRecommended: true },
					2: { id: '2', isRecommended: true },
					3: { id: '3', isRecommended: false },
				}),
			}
			expect(getIsMenuRecommended(state)).toBe(true)
		})

		test('when state does not contain recommended recipes it should return  false', () => {
			state = {
				recipes: Immutable.fromJS({
					4: { id: '4', isRecommended: false },
					5: { id: '5', isRecommended: false },
					6: { id: '6', isRecommended: false },
				}),
			}
			expect(getIsMenuRecommended(state)).toBe(false)
		})
	})
})
