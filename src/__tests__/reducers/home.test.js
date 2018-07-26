import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import homeReducer from 'reducers/home'

describe('home reducer', () => {
	describe('homeCarouselRecipes', () => {
		test('should handle initial state', () => {
			const initialState = Immutable.OrderedMap({})
			expect(
				Immutable.is(
					homeReducer.homeCarouselRecipes(undefined, {}),
					initialState,
				),
			).toEqual(true)
		})

		test('should handle unknown actions', () => {
			const state = Immutable.OrderedMap({})
			const result = homeReducer.homeCarouselRecipes(undefined, {
				type: 'unknown',
			})

			expect(Immutable.is(result, state)).toEqual(true)
		})

		describe('HOME_CAROUSEL_LOADED', () => {
			test('should load recipes into state', () => {
				const result = homeReducer.homeCarouselRecipes(Immutable.Map({}), {
					type: actionTypes.HOME_CAROUSEL_LOADED,
					recipes: [
						{ id: '1', title: 'recipe 1' },
						{ id: '2', title: 'recipe 2' },
					],
				})
				const expectedState = Immutable.OrderedMap()
					.set('1', Immutable.Map({ id: '1', title: 'recipe 1' }))
					.set('2', Immutable.Map({ id: '2', title: 'recipe 2' }))

				expect(Immutable.is(result, expectedState)).toEqual(true)
			})
		})
	})
})
