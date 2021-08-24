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
import { GetHelpContainer } from 'routes/GetHelp/GetHelpContainer'

jest.mock('apis/getHelp')
jest.mock('apis/recipes')
jest.mock('apis/orders')

describe('<GetHelpContainer />', () => {
  describe('behaviour', () => {
    let store
    const RECIPES = [
      {
        id: '3',
        title: 'a-title',
        ingredients: [{
          uuid: '321',
          label: 'my-ingredient-label',
          media: {
            images: [{
              urls: [{ src: '', width: 50}]
            }]
          },
        }]
      },
      {
        id: '4',
        title: 'b-title',
        ingredients: [{
          uuid: '322',
          label: 'my-ingredient-label',
          media: {
            images: [{
              urls: [{ src: '', width: 50}]
            }]
          },
        }]
      }]
    beforeAll(() => {
      const initialState = {
        auth: authDefaultState(),
        getHelp: getHelpInitialState,
        user: userDefaultState,
        error: Map({}),
        pending: Map({}),
      }

      store = createStore(
        combineReducers({
          getHelp,
          ...contentReducer,
          ...authReducer,
          ...userReducer,
          ...status,
        }),
        initialState,
        compose(applyMiddleware(thunk))
      )

      fetchOrder.mockResolvedValue({
        data: {
          id: '788',
          recipeItems: [{ id: '1', recipeId: '3' }, { id: '2', recipeId: '4' }],
          deliverySlot: {
            deliveryEnd: '18:59:59',
            deliveryStart: '08:00:00',
          }
        }
      })

      fetchRecipes.mockResolvedValue({ data: RECIPES })

      mount(
        <GetHelpContainer
          location={{ query: { orderId: '788' }, pathname: 'get-help' }}
          store={store}
          params={{ userId: '123', orderId: '456' }}
        >
          <div>Required Child</div>
        </GetHelpContainer>
      )
    })
    test('order id passed as prop ends up in store', () => {
      expect(store.getState().getHelp.getIn(['order', 'id'])).toBe('788')
    })

    test('fetched order ends up in the store', () => {
      const expectedResult = fromJS(['3', '4'])

      expect(
        store.getState().getHelp.getIn(['order', 'recipeItems'])
      ).toEqual(expectedResult)
    })

    test('fetched recipes ends up in the store', () => {
      const EXPECTED_RECIPES = [
        {
          id: '3',
          title: 'a-title',
          ingredients: [{
            uuid: '321',
            label: 'my-ingredient-label',
            urls: [{ src: '', width: 50}],
          }]
        },
        {
          id: '4',
          title: 'b-title',
          ingredients: [{
            uuid: '322',
            label: 'my-ingredient-label',
            urls: [{ src: '', width: 50}],
          }]
        }]
      expect(
        store.getState().getHelp.get('recipes').toJS()
      ).toEqual(EXPECTED_RECIPES)
    })
  })
})
