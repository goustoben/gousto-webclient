import React from 'react'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { Map, fromJS } from 'immutable'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'

import recipesReducer from 'reducers/recipes'
import authReducer, { initialState as authDefaultState } from 'reducers/auth'
import contentReducer from 'reducers/content'
import userReducer, { defaultState as userDefaultState } from 'reducers/user'
import { fetchRecipes } from 'apis/recipes'
import { fetchOrder } from 'apis/orders'
import { getHelp, getHelpInitialState } from 'reducers/getHelp'
import GetHelpContainer from 'routes/GetHelp/GetHelpContainer'

jest.mock('apis/recipes')
jest.mock('apis/orders')

describe('<GetHelpContainer />', () => {
	describe('behaviour', () => {
		let store
		beforeAll(() => {
			const initialState = {
				auth: authDefaultState(),
				getHelp: getHelpInitialState,
				recipes: Map({}),
				user: userDefaultState,
			}

			store = createStore(
				combineReducers(Object.assign(
					{},
					{ getHelp },
					{ ...contentReducer },
					{ ...authReducer },
					{ ...userReducer },
					{ recipes: recipesReducer.recipes },
				)),
				initialState,
				compose(applyMiddleware(thunk))
			)

			fetchOrder.mockResolvedValue({
				data: { id: '788', recipeItems: [{ id: '1' }, { id: '2' }] }
			})

			fetchRecipes.mockResolvedValue({
				data: [{ id: '123', ingredients: [{ id: '321' }] }]
			})

			mount(
				<GetHelpContainer
					location={{ query: { orderId: '788' } }}
					store={store}
				>
					<div>Required Child</div>
				</GetHelpContainer>
			)
		})
		test('order id passed as prop ends up in store', () => {
			expect(store.getState().getHelp.getIn(['order', 'id'])).toBe('788')
		})

		test('fetched order ends up in the store', () => {
			const expectedResult = fromJS([{ id: '1' }, { id: '2' }])

			expect(
				store.getState().user.getIn(['orders', '788', 'recipeItems'])
			).toEqual(expectedResult)
		})

		test('fetched recipes ends up in the store', () => {
			const expectedResult = fromJS([{ id: '321' }])

			expect(
				store.getState().recipes.getIn(['123', 'ingredients'])
			).toEqual(expectedResult)
		})
	})
})
