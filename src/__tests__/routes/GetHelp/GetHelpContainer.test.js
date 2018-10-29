import React from 'react'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { Map } from 'immutable'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'

import recipesReducer from 'reducers/recipes'
import userReducer, { defaultState } from 'reducers/user'
import { getHelp, getHelpInitialState } from 'reducers/getHelp'
import GetHelpContainer from 'routes/GetHelp/GetHelpContainer'

describe('<GetHelpContainer />', () => {
	describe('behaviour', () => {
		test('order id passed as prop ends up in Redux store', () => {
			const initialState = {
				getHelp: getHelpInitialState,
				user: defaultState,
				recipes: Map({})
			}
			const store = createStore(
				combineReducers(Object.assign(
					{},
					{ getHelp },
					{ ...userReducer },
					{ recipes: recipesReducer.recipes },
				)),
				initialState,
				compose(applyMiddleware(thunk))
			)
			mount(
				<GetHelpContainer location={{ query: { orderId: '788' } }} store={store}>
					<div>Required Child</div>
				</GetHelpContainer>
			)

			expect(store.getState().getHelp.getIn(['order', 'id'])).toBe('788')
		})
	})
})
