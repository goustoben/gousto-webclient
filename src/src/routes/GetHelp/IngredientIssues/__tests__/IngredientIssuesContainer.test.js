import React from 'react'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { Map, fromJS } from 'immutable'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { fetchOrderIssuesMockResponse } from 'apis/__mocks__/getHelp'

import authReducer, { initialState as authDefaultState } from 'reducers/auth'
import status from 'reducers/status'
import contentReducer from 'reducers/content'
import { getHelp } from 'reducers/getHelp'
import { IngredientIssuesContainer } from 'routes/GetHelp/IngredientIssues/IngredientIssuesContainer'

jest.mock('apis/getHelp')

describe('<IngredientIssuesContainer />', () => {
  describe('behaviour', () => {
    let wrapper
    let store

    beforeAll(() => {
      const initialState = {
        auth: authDefaultState(),
        error: Map({}),
        pending: Map({}),
        getHelp: fromJS({
          order: {
            id: '6765330',
            recipeItems: ['1917', '1494'],
          },
          recipes: [
            {
              id: '1917',
              title: 'Ten-Min Chilli Con Carne',
              ingredients: [
                { id: 'aaa', label: '1 beef stock cube' },
                { id: 'bbb', label: '1 can of chopped tomatoes (210g)' },
                { id: 'ccc', label: '1 can of kidney beans' },
              ],
            },
            {
              id: '1494',
              title: 'Creamy Chicken & Pesto Farfalle With Basil',
              ingredients: [
                { id: 'eee', label: '1/2 chicken stock cube' },
              ]
            },
          ],
          selectedIngredients: [
            { recipeId: '1917', ingredientId: 'bbb' },
            { recipeId: '1494', ingredientId: 'eee' },
          ],
        }),
      }

      store = createStore(
        combineReducers(Object.assign(
          {},
          { ...authReducer },
          { ...status },
          { ...contentReducer },
          { getHelp },
        )),
        initialState,
        compose(applyMiddleware(thunk))
      )

      wrapper = mount(
        <IngredientIssuesContainer
          store={store}
        />
      )
    })

    test('only selected ingredients are passed down', () => {
      expect(wrapper.text()).toContain('1 can of chopped tomatoes (210g)')
      expect(wrapper.text()).toContain('1/2 chicken stock cube')
      expect(wrapper.text()).not.toContain('1 beef stock cube')
      expect(wrapper.text()).not.toContain('1 can of kidney beans')
    })

    test('ingredient issues are fetched and placed in the store when mount', () => {
      expect(store.getState().getHelp.get('ingredientIssues').toJS())
        .toEqual(fetchOrderIssuesMockResponse)
    })
  })
})
