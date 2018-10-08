import React from 'react'
import { mount } from 'enzyme'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import getHelpReducer, { getHelpInitialState } from 'reducers/getHelp'
import GetHelpContainer from 'routes/GetHelp/GetHelpContainer'

describe('<GetHelpContainer />', () => {
	describe('behaviour', () => {
		test('order id passed as prop ends up in Redux store', () => {
			const initialState = { getHelp: getHelpInitialState }
			const store = createStore(
				combineReducers(Object.assign({}, getHelpReducer)),
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
