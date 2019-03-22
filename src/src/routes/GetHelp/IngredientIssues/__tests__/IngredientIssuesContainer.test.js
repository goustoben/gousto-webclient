import React from 'react'
import thunk from 'redux-thunk'
import { mount} from 'enzyme'
import { Map, fromJS } from 'immutable'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import authReducer, { initialState as authDefaultState } from 'reducers/auth'
import status from 'reducers/status'
import contentReducer from 'reducers/content'
import { getHelp, getHelpInitialState } from 'reducers/getHelp'
import { IngredientIssuesContainer } from 'routes/GetHelp/IngredientIssues/IngredientIssuesContainer'

jest.mock('apis/getHelp')

describe('<IngredientIssuesContainer />', () => {
  describe('behaviour', () => {
    let wrapper
    let store

    beforeAll(async () => {
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
                { id: 'bbb', label: '1 can of chopped tomatoes (210g)' },
                { id: 'eee', label: '1/2 chicken stock cube' },
              ]
            },
          ],
          selectedIngredients: {
            '1917-bbb': {
              recipeId: '1917',
              ingredientId: 'bbb',
              label: '1 can of chopped tomatoes (210g)'
            },
            '1494-bbb': {
              recipeId:'1494',
              ingredientId: 'bbb',
              label: '1 can of chopped tomatoes (210g)'
            },
          },
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

      wrapper = await mount(
        <IngredientIssuesContainer
          store={store}
        />
      )
    })

    test('only selected ingredients are passed down', () => {
      expect(wrapper.text()).toContain('1 can of chopped tomatoes (210g)')
      expect(wrapper.text()).not.toContain('1/2 chicken stock cube')
      expect(wrapper.text()).not.toContain('1 beef stock cube')
      expect(wrapper.text()).not.toContain('1 can of kidney beans')
    })

    test('ingredient issues and subissues are fetched, formatted and placed in the store when mount', () => {
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

      expect(store.getState().getHelp.get('ingredientIssues').toJS())
        .toEqual(expectedIssuesInStore)
      expect(store.getState().getHelp.get('ingredientSubIssues').toJS())
        .toEqual(expectedSubIssuesInStore)
    })

    test('default ingredient issues options are set in the store', () => {
      const expectedSelectedIngredients = fromJS({
        '1917-bbb': {
          recipeId: '1917',
          ingredientId: 'bbb',
          label: '1 can of chopped tomatoes (210g)',
          issueId: '101',
          issueName: 'Missing ingredients',
        },
        '1494-bbb': {
          recipeId: '1494',
          ingredientId: 'bbb',
          label: '1 can of chopped tomatoes (210g)',
          issueId: '101',
          issueName: 'Missing ingredients',
        },
      })

      expect(store.getState().getHelp.get('selectedIngredients'))
        .toEqual(expectedSelectedIngredients)
    })

    test('selected ingredient issues are changed in the store when selected', () => {
      // This is a trick to have the mount prepared when the test is runing
      const expectedSelectedIngredients = fromJS({
        '1917-bbb': {
          recipeId: '1917',
          ingredientId: 'bbb',
          label: '1 can of chopped tomatoes (210g)',
          issueId: '101',
          issueName: 'Missing ingredients',
        },
        '1494-bbb': {
          recipeId: '1494',
          ingredientId: 'bbb',
          label: '1 can of chopped tomatoes (210g)',
          issueId: '104',
          issueName: 'Fruit or Veg - Mouldy',
        },
      })

      Promise.all(wrapper.find('Dropdown').at(1)).then(() => {
        const secondDropdown = wrapper.find('Dropdown').at(1)
    
        const secondOption = secondDropdown.find('option[value="104"]')
        secondOption.simulate('change')
    
        expect(store.getState().getHelp.get('selectedIngredients'))
          .toEqual(expectedSelectedIngredients)
      })
    })
  })
})
