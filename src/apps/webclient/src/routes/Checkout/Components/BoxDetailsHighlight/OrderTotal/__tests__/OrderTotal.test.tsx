import React from 'react'

import { render, screen } from '@testing-library/react'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { OrderTotal } from '../OrderTotal'
import { useGetOrderTotalData } from '../orderTotalHooks'

const mockStore = configureStore()
const mockedStore = mockStore({
  basket: Immutable.fromJS({
    promocode: 'fake-promo',
  }),
  auth: Immutable.fromJS({
    authToken: 'fake-auth-token',
  }),
  menuService: { recipe: null },
  features: Immutable.fromJS({
    ndd: 'fake-ndd',
  }),
})
type WrapperProps = { isLoading: boolean }
const Wrapper = ({ isLoading = false }: WrapperProps) => (
  <Provider store={mockedStore}>
    <OrderTotal isLoading={isLoading} />
  </Provider>
)

jest.mock('../orderTotalHooks')
const useGetOrderTotalDataMock = jest.mocked(useGetOrderTotalData)
const orderTotalDataMock = {
  isGoustoOnDemandEnabled: false,
  prices: {
    amountOff: '0.00',
    deliveryTotal: '0.00',
    flatDiscountApplied: false,
    grossTotal: '29.99',
    isDeliveryFree: true,
    items: [],
    percentageOff: '60.00',
    pricePerPortion: '5.00',
    pricePerPortionDiscounted: '2.00',
    productTotal: '0.00',
    promoCode: 'DTI-SB-602525',
    promoCodeValid: true,
    recipeDiscount: '17.99',
    recipeTotal: '29.99',
    recipeTotalDiscounted: '12.00',
    surchargeTotal: '0.00',
    total: '12.00',
    totalDiscount: '17.99',
    vatCharged: '0.00',
  },
  numRecipes: 2,
}

describe('Given: <OrderTotal /> component', () => {
  describe('When: component is in loading state', () => {
    beforeEach(() => {
      useGetOrderTotalDataMock.mockReturnValue({
        isGoustoOnDemandEnabled: false,
        prices: null,
        numRecipes: 2,
      })
      render(<OrderTotal isLoading />)
    })
    afterAll(() => jest.clearAllMocks())

    test('Then: loading indicator should be visible', () => {
      expect(screen.getByTestId('LoadingContainer')).toBeDefined()
    })
  })

  describe('When: component data is loaded', () => {
    test('Then: even ignoring isGoustoOnDemand or isDeliveryFree values, <Receipt /> component should be presented', () => {
      useGetOrderTotalDataMock.mockReturnValue(orderTotalDataMock)
      render(<Wrapper isLoading={false} />)

      screen.logTestingPlaygroundURL()
    })

    describe('When: isGoutoOnDemand enabled', () => {})
    describe('When: isGoustoOnDemand disabled', () => {})

    describe('When: isDeliveryFree is positive', () => {})
    describe('When: isDeliveryFree is negative', () => {})
  })
})
