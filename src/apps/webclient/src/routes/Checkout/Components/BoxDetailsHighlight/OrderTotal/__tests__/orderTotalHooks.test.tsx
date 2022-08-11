import React from 'react'

import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { useGetOrderTotalData } from '../orderTotalHooks'

jest.mock('utils/isomorphicEnvironment', () => ({
  getEnvironment: () => 'local',
  getProtocol: () => 'http:',
  getDomain: () => '',
}))

const mockStore = configureStore()
const mockedStore = mockStore({
  basket: Immutable.fromJS({
    orderId: 'fake-order-id',
    numPortions: 4,
  }),
  menu: Immutable.fromJS({
    menuLimits: Immutable.fromJS({}),
  }),
  menuRecipeDetails: Immutable.fromJS({
    recipeId: 'fake-recipe-id',
  }),
  tracking: Immutable.fromJS({
    utmSource: 'fake-utm-source',
  }),
  menuCollections: Immutable.fromJS({}),
  auth: Immutable.fromJS({
    accessToken: 'fake-access-token',
  }),
  menuService: { recipe: {} },
  features: Immutable.fromJS({
    ndd: null,
    isGoustoOnDemandEnabled: false,
  }),
})
type WrapperProps = { children: React.ReactNode }
const wrapper = ({ children }: WrapperProps) => <Provider store={mockedStore}>{children}</Provider>

describe('Given: useGetOrderTotalDate hook', () => {
  describe('When: hook being called', () => {
    test('Then: it should return correct data', () => {
      const {
        result: { current: hookResult },
      } = renderHook(() => useGetOrderTotalData(), { wrapper })

      expect(hookResult).toStrictEqual({
        isGoustoOnDemandEnabled: false,
        numRecipes: 4,
        prices: null,
      })
    })
  })
})
