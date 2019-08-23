import React from 'react'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { Map, fromJS } from 'immutable'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'

import status from 'reducers/status'
import authReducer, { initialState as authDefaultState } from 'reducers/auth'
import contentReducer from 'reducers/content'
import userReducer, { defaultState as userDefaultState } from 'reducers/user'
import { fetchRecipes } from 'apis/recipes'
import { fetchOrder } from 'apis/orders'
import { getHelp, getHelpInitialState } from 'reducers/getHelp'
import GetHelpContainer from 'routes/GetHelp/GetHelpContainer'

jest.mock('apis/getHelp')
jest.mock('apis/recipes')
jest.mock('apis/orders')

describe('<GetHelpContainer />', () => {
  describe('behaviour', () => {
    let store
    beforeAll(() => {
      const initialState = {
        auth: authDefaultState(),
        getHelp: getHelpInitialState,
        user: userDefaultState,
        error: Map({}),
        pending: Map({}),
      }

      store = createStore(
        combineReducers(Object.assign(
          {},
          { getHelp },
          { ...contentReducer },
          { ...authReducer },
          { ...userReducer },
          { ...status },
        )),
        initialState,
        compose(applyMiddleware(thunk))
      )

      fetchOrder.mockResolvedValue({
        data: { id: '788', recipeItems: [{ id: '1' }, { id: '2' }] }
      })

      fetchRecipes.mockResolvedValue({
        data: [{ id: 'recipeIdX', ingredients: [{ id: '321', label: 'my-ingredient-label' }], title: 'a-title' }]
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
      expect(
        store.getState().getHelp.get('recipes').toJS()
      ).toEqual([{ id: 'recipeIdX', ingredients: [{ id: '321', label: 'my-ingredient-label' }], title: 'a-title' }])
    })
  })
})
