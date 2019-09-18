import React from 'react'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { Map, fromJS } from 'immutable'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import authReducer, { initialState as authDefaultState } from 'reducers/auth'
import userReducer, { defaultState as userDefaultState } from 'reducers/user'
import status from 'reducers/status'
import contentReducer from 'reducers/content'
import { getHelp, getHelpInitialState } from 'reducers/getHelp'
import { IngredientsContainer } from 'routes/GetHelp/Ingredients/IngredientsContainer'

import { validateIngredients } from 'apis/getHelp'

jest.mock('apis/getHelp')

describe('<IngredientsContainer />', () => {
  let wrapper
  let store

  let initialState = {
    auth: authDefaultState(),
    error: Map({}),
    pending: Map({}),
    user: userDefaultState,
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
      selectedIngredients: [],
    })),
  }

  describe('experiment is turned off', () => {
    beforeAll(() => {
      store = createStore(
        combineReducers(Object.assign(
          {},
          { ...authReducer },
          { ...userReducer },
          { ...status },
          { ...contentReducer },
          { getHelp },
        )),
        initialState,
        compose(applyMiddleware(thunk))
      )

      const validateSelectedIngredients = jest.fn().mockResolvedValue({ valid: true })

      wrapper = mount(
        <IngredientsContainer
          store={store}
          validateSelectedIngredients={validateSelectedIngredients}
        />
      )
    })

    test('selected ingredientId, recipeId and label are set in the store', async () => {
      const recipe = wrapper.find('ItemExpandable').at(0)
      recipe.find('Item').simulate('click')

      const ingredientCheckbox = wrapper.find('input[type="checkbox"]').at(0)
      ingredientCheckbox.simulate('change')

      const ContinueButton = wrapper.find('Ingredients').find('BottomBar').find('Button').at(1)
      await ContinueButton.prop('onClick')()

      expect(store.getState().getHelp.get('selectedIngredients'))
        .toEqual(fromJS({"1917-aaa": {"ingredientId": "aaa", "label": "1 beef stock cube", "recipeId": "1917"}}))
    })
  })

  describe('experiment is turned on', () => {
    beforeAll(() => {
      initialState = {
        ...initialState,
      }

      store = createStore(
        combineReducers(Object.assign(
          {},
          { ...authReducer },
          { ...userReducer },
          { ...status },
          { ...contentReducer },
          { getHelp },
        )),
        initialState,
        compose(applyMiddleware(thunk))
      )

      const validateSelectedIngredients = jest.fn().mockResolvedValue({ valid: true })

      wrapper = mount(
        <IngredientsContainer
          store={store}
          validateSelectedIngredients={validateSelectedIngredients}
        />
      )
    })

    test('/v2/validate-ingredients endpoint is called correctly', async () => {
      const recipe = wrapper.find('ItemExpandable').at(0)
      recipe.find('Item').simulate('click')

      const ingredientCheckbox = wrapper.find('input[type="checkbox"]').at(0)
      ingredientCheckbox.simulate('change')

      const ContinueButton = wrapper.find('Ingredients').find('BottomBar').find('Button').at(1)
      await ContinueButton.prop('onClick')()

      expect(validateIngredients).toHaveBeenCalledWith(
        '',
        { customer_id: 0, order_id: 6765330, ingredient_ids: [ 'aaa' ] }
      )
    })
  })
})
