import React from 'react'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { Map, fromJS } from 'immutable'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import authReducer, { initialState as authDefaultState } from 'reducers/auth'
import userReducer, { defaultState as userDefaultState } from 'reducers/user'
import status from 'reducers/status'
import contentReducer from 'reducers/content'
import { getHelp, getHelpInitialState } from 'reducers/getHelp'
import { IngredientsContainer } from 'routes/GetHelp/Ingredients/IngredientsContainer'

import { validateIngredients } from 'apis/getHelp'
import { validateOrder } from 'routes/GetHelp/apis/validateOrder'

jest.mock('apis/getHelp')
jest.mock('routes/GetHelp/apis/validateOrder')

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
        recipeDetailedItems: {
          1917: '123',
          1494: '546',
        }
      },
      recipes: [
        {
          id: '1917',
          title: 'Ten-Min Chilli Con Carne',
          ingredients: [
            { uuid: 'aaa', label: '1 beef stock cube' },
            { uuid: 'bbb', label: '1 can of chopped tomatoes (210g)' },
            { uuid: 'ccc', label: '1 can of kidney beans' },
          ],
        },
        {
          id: '1494',
          title: 'Creamy Chicken & Pesto Farfalle With Basil',
          ingredients: [
            { uuid: 'bbb', label: '1 can of chopped tomatoes (210g)' },
            { uuid: 'eee', label: '1/2 chicken stock cube' },
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
        combineReducers({
          ...authReducer,
          ...userReducer,
          ...status,
          ...contentReducer,
          getHelp,
        }),
        initialState,
        compose(applyMiddleware(thunk))
      )

      validateIngredients.mockResolvedValue({ valid: true })
      validateOrder.mockResolvedValue({ valid: true })

      wrapper = mount(
        <Provider store={store}>
          <IngredientsContainer />
        </Provider>
      )
    })

    test('selected ingredientUuid, recipeId and label are set in the store', async () => {
      await wrapper.update()

      const recipe = wrapper.find('ItemExpandable').at(0)
      recipe.find('Item').simulate('click')

      const ingredientCheckbox = wrapper.find('input[type="checkbox"]').at(0)
      ingredientCheckbox.simulate('change')

      const ContinueButton = wrapper.find('Ingredients').find('BottomFixedContentWrapper').find('Button')
      await ContinueButton.prop('onClick')()

      expect(store.getState().getHelp.get('selectedIngredients'))
        .toEqual(fromJS({'1917&aaa': {ingredientUuid: 'aaa', label: '1 beef stock cube', recipeId: '1917', recipeGoustoReference: '123'}}))
    })

    test('/v2/validate-ingredients endpoint is called correctly', async () => {
      const recipe = wrapper.find('ItemExpandable').at(1)
      recipe.find('Item').simulate('click')

      const ingredientCheckbox = wrapper.find('input[type="checkbox"]').at(0)
      ingredientCheckbox.simulate('change')

      const ContinueButton = wrapper.find('Ingredients').find('BottomFixedContentWrapper').find('Button')
      await ContinueButton.prop('onClick')()

      expect(validateIngredients).toHaveBeenCalledWith(
        '',
        { customer_id: 0, order_id: 6765330, ingredient_ids: [ 'aaa' ] }
      )
    })
  })

  describe('order validation fails', () => {
    let store

    beforeAll(() => {
      store = createStore(
        combineReducers({
          ...authReducer,
          ...userReducer,
          ...status,
          ...contentReducer,
          getHelp,
        }),
        initialState,
        compose(applyMiddleware(thunk))
      )

      browserHistory.push = jest.fn()
      validateIngredients.mockResolvedValue({ valid: true })
      validateOrder.mockRejectedValueOnce({
        message: {
          errors: {
            whatever: 'whatever'
          }
        }
      })

      mount(
        <IngredientsContainer
          store={store}
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
        combineReducers({
          ...authReducer,
          ...userReducer,
          ...status,
          ...contentReducer,
          getHelp,
        }),
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
