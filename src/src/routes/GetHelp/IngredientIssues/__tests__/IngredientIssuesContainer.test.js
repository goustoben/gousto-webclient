import React from 'react'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { Map, fromJS } from 'immutable'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import authReducer, { initialState as authDefaultState } from 'reducers/auth'
import status from 'reducers/status'
import contentReducer from 'reducers/content'
import { getHelp, getHelpInitialState } from 'reducers/getHelp'
import { IngredientIssuesContainer } from 'routes/GetHelp/IngredientIssues/IngredientIssuesContainer'

jest.mock('apis/getHelp')

const expectedIssuesInStore = [
  {
    id: '101',
    label: 'Missing ingredients',
    requireDescription: false,
  },
  {
    id: '102',
    label: 'Wrong ingredients',
    requireDescription: false,
  },
]

const expectedSubIssuesInStore = [
  {
    id: '104',
    label: 'Fruit or Veg - Mouldy',
    groupLabel: 'Ingredient quality',
    requireDescription: true,
  },
  {
    id: '105',
    label: 'Fruit or Veg - not fresh',
    groupLabel: 'Ingredient quality',
    requireDescription: false,
  },
  {
    id: '107',
    label: 'Meat - gristle or bones',
    groupLabel: 'Another group',
    requireDescription: true,
  },
]

describe('<IngredientIssuesContainer />', () => {
  describe('behaviour', () => {
    let wrapper
    let store

    beforeAll(() => {
      const initialState = {
        auth: authDefaultState(),
        error: Map({}),
        pending: Map({}),
        getHelp: getHelpInitialState.merge(fromJS({
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
        })),
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

    test('ingredient issues and subissues are fetched, formatted and placed in the store when mount', () => {
      expect(store.getState().getHelp.get('ingredientIssues').toJS())
        .toEqual(expectedIssuesInStore)
      expect(store.getState().getHelp.get('ingredientSubIssues').toJS())
        .toEqual(expectedSubIssuesInStore)
    })
  })
})
