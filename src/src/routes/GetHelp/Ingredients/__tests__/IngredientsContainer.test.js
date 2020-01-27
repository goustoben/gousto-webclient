import React from 'react'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { Map, fromJS } from 'immutable'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import authReducer, { initialState as authDefaultState } from 'reducers/auth'
import userReducer, { defaultState as userDefaultState } from 'reducers/user'
import status from 'reducers/status'
import contentReducer from 'reducers/content'
import { getHelp, getHelpInitialState } from 'reducers/getHelp'
import { IngredientsContainer } from 'routes/GetHelp/Ingredients/IngredientsContainer'

import { validateIngredients, validateOrder } from 'apis/getHelp'

jest.mock('apis/getHelp')

describe('<IngredientsContainer />', () => {
  const initialState = {
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

  describe('order and ingredients are passing validation', () => {
    let wrapper
    let store

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

      validateIngredients.mockResolvedValue({ valid: true })
      validateOrder.mockResolvedValue({ valid: true })

      wrapper = mount(
        <IngredientsContainer
          store={store}
        />
      )
    })

    test('selected ingredientId, recipeId and label are set in the store', async () => {
      await wrapper.update()

      const recipe = wrapper.find('ItemExpandable').at(0)
      recipe.find('Item').simulate('click')

      const ingredientCheckbox = wrapper.find('input[type="checkbox"]').at(0)
      ingredientCheckbox.simulate('change')

      const ContinueButton = wrapper.find('Ingredients').find('BottomBar').find('Button').at(1)
      await ContinueButton.prop('onClick')()

      expect(store.getState().getHelp.get('selectedIngredients'))
        .toEqual(fromJS({"1917-aaa": {"ingredientId": "aaa", "label": "1 beef stock cube", "recipeId": "1917"}}))
    })

    test('/v2/validate-ingredients endpoint is called correctly', async () => {
      const recipe = wrapper.find('ItemExpandable').at(1)
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

  describe('order validation fails', () => {
    let store
    let trackUserCannotGetCompensation

    beforeAll(() => {
      trackUserCannotGetCompensation = jest.fn()
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

      browserHistory.push = jest.fn()
      validateIngredients.mockResolvedValue({ valid: true })
      validateOrder.mockRejectedValueOnce({
        message: {
          errors: {
            criteria: {
              daysSinceLastCompensation: 0
            }
          }
        }
      })

      mount(
        <IngredientsContainer
          store={store}
          trackUserCannotGetCompensation={trackUserCannotGetCompensation}
        />
      )
    })

    test('redirects to /contact if order validation request fails', () => {
      expect(browserHistory.push).toHaveBeenCalledWith('/get-help/contact')
    })
  })

  describe('order validation is loading', () => {
    let wrapper
    let store

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

      validateIngredients.mockResolvedValue({ valid: true })
      validateOrder.mockImplementationOnce(() => {})

      wrapper = mount(
        <IngredientsContainer
          store={store}
        />
      )
    })

    test('the <IngredientsPresentation /> is not rendered', () => {
      expect(wrapper.find('IngredientsPresentation').length).toBe(0)
    })
  })
})
