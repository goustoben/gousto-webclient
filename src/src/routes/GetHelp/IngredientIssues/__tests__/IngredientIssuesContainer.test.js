import React from 'react'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'

import contentReducer from 'reducers/content'
import { getHelp } from 'reducers/getHelp'
import { IngredientIssuesContainer } from 'routes/GetHelp/IngredientIssues/IngredientIssuesContainer'

describe('<IngredientIssuesContainer />', () => {
  describe('behaviour', () => {
    let wrapper

    beforeAll(() => {
      const initialState = {
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

      const store = createStore(
        combineReducers(Object.assign(
          {},
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
  })
})
