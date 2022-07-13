import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import Immutable from 'immutable'
import * as Redux from 'react-redux'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { filterProductCategory } from 'actions/filters'
import { marketCategory } from 'actions/trackingKeys'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'

import {
  mockMarketProducts,
  mockProducts,
  mockProductCategories,
  mockProductsStock,
} from '../../config'
import { Market } from '../Market'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
}))

jest.mock('actions/products', () => ({
  ...jest.requireActual('actions/products'),
}))

jest.mock('actions/tracking', () => ({
  ...jest.requireActual('actions/tracking'),
  trackPairingsData: jest.fn(),
}))

jest.mock('actions/filters', () => ({
  ...jest.requireActual('actions/filters'),
  filterProductCategory: jest.fn(),
}))

jest.mock('../../OrderSummary/OrderSummaryContainer', () => ({
  OrderSummaryContainer: jest.fn(() => 'OrderSummaryContainer'),
}))

jest.mock('../../ProductList', () => ({
  ProductList: jest.fn(() => 'ProductList'),
}))

jest.mock('../../ReferAFriend', () => ({
  ReferAFriend: jest.fn(() => 'ReferAFriend'),
}))

jest.mock('Overlay', () => jest.fn(() => 'Overlay'))

describe('Market', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  const mockStore = configureMockStore()
  const state = {
    products: mockMarketProducts,
    productsCategories: mockProductCategories,
    productsStock: mockProductsStock,
    basket: Immutable.fromJS({
      products: mockProducts,
      orderDetails: {
        period: {
          whenStart: '2022-05-17T11:00:00Z',
        },
      },
      numPortions: 2,
    }),
    pending: Immutable.fromJS({}),
    error: Immutable.fromJS({}),
    auth: Immutable.fromJS({
      accessToken: 'test-access-token',
    }),
    temp: Immutable.fromJS({}),
  }
  const mockedStore = mockStore(state)
  const dispatch = jest.fn()
  jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)

  test('should render MarketPresentation correctly', () => {
    ;(useIsOptimizelyFeatureEnabled as jest.Mock).mockReturnValue(false)

    render(
      <Provider store={mockedStore}>
        <Market ageVerified toggleAgeVerificationPopUp={jest.fn()} />
      </Provider>,
    )

    expect(screen.getByTestId('MarketPresentation')).toBeInTheDocument()
    expect(screen.getByText(/All Products/i)).toBeInTheDocument()
    expect(screen.getByText(/Snacks/i)).toBeInTheDocument()
    expect(screen.getByText(/Drinks Cabinet/i)).toBeInTheDocument()
    expect(screen.getByText(/Open Order Summary/i)).toBeInTheDocument()
    expect(screen.getByText('ProductList')).toBeInTheDocument()
    expect(screen.getByText('OrderSummaryContainer')).toBeInTheDocument()
    expect(screen.getByText('ReferAFriend')).toBeInTheDocument()
    expect(screen.getByText('Overlay')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /^Snacks \(\d\)$/i }))
    expect(filterProductCategory).toBeCalledWith(
      marketCategory,
      'clicked',
      'secondary_action',
      'Snacks',
      expect.any(Number),
      '17eb3f8e-bf7e-11e5-ab63-02fada0dd3b9',
    )

    fireEvent.click(screen.getByRole('button', { name: /^Drinks Cabinet \(\d\)$/i }))
    expect(filterProductCategory).toBeCalledWith(
      marketCategory,
      'clicked',
      'secondary_action',
      'Drinks Cabinet',
      expect.any(Number),
      'faeedf8a-bf7d-11e5-a0f9-02fada0dd3b9',
    )

    fireEvent.click(screen.getByRole('button', { name: /^All Products \(\d\)$/i }))
    expect(filterProductCategory).toBeCalledWith(
      marketCategory,
      'clicked',
      'secondary_action',
      'All Products',
      expect.any(Number),
      'all-products',
    )
  })
})
