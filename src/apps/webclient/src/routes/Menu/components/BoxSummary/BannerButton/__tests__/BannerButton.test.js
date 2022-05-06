import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { boxSummaryViews } from 'utils/boxSummary'
import { basketSum, okRecipes } from 'utils/basket'
import { BannerButton } from '../BannerButton'

import { CheckoutContainer } from '../Checkout'

jest.mock('../Checkout', () => ({
  CheckoutContainer: () => <div />,
}))

jest.mock('utils/basket', () => ({
  basketSum: jest.fn(),
  okRecipes: jest.fn(),
}))

jest.mock('config/basket', () => ({
  minRecipesNum: 900,
}))

describe('BannerButton', () => {
  let openSpy

  const mockStore = configureMockStore()
  const mockedStore = mockStore({
    auth: Immutable.fromJS({
      isAuthenticated: false,
    }),
    basket: Immutable.fromJS({
      recipes: {},
      numPortions: 2,
    }),
    boxSummaryDeliveryDays: Immutable.fromJS({}),
    error: Immutable.fromJS({}),
    user: Immutable.fromJS({
      orders: {},
    }),
    experiments: Immutable.fromJS({
      experiments: {},
    }),
    pending: Immutable.fromJS({}),
    features: Immutable.fromJS({}),
  })

  const props = {
    view: 'mobile',
    open: () => {},
  }
  beforeEach(() => {
    openSpy = jest.fn()
    basketSum.mockReturnValue(10)
    okRecipes.mockReturnValue(10)
  })

  describe('when boxSummaryCurrentView is Details', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(
        <Provider store={mockedStore}>
          <BannerButton {...props} boxSummaryCurrentView={boxSummaryViews.DETAILS} open={openSpy} />
        </Provider>,
      )
    })

    test('should show CheckoutContainer if boxSummaryCurrentView', () => {
      expect(wrapper.find(CheckoutContainer)).toHaveLength(1)
    })

    test('should show CheckoutContainer on mobile with the view prop as "mobile"', () => {
      expect(wrapper.find(CheckoutContainer)).toHaveLength(1)
      expect(wrapper.find(CheckoutContainer).prop('view')).toEqual('mobile')
    })

    test('should show CheckoutContainer on desktop with the view prop as "desktop"', () => {
      wrapper = mount(
        <Provider store={mockedStore}>
          <BannerButton
            {...props}
            boxSummaryCurrentView={boxSummaryViews.DETAILS}
            open={openSpy}
            view="desktop"
          />
        </Provider>,
      )
      expect(wrapper.find(CheckoutContainer)).toHaveLength(1)
      expect(wrapper.find(CheckoutContainer).prop('view')).toEqual('desktop')
    })
  })

  describe('when hovered', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(
        <Provider store={mockedStore}>
          <BannerButton {...props} boxSummaryCurrentView={boxSummaryViews.DETAILS} open={openSpy} />
        </Provider>,
      )

      wrapper.simulate('mouseEnter')
    })

    test('should pass the information down', () => {
      expect(wrapper.find('CheckoutContainer').prop('isButtonHovered')).toBe(true)
    })

    describe('and when unhovered', () => {
      beforeEach(() => {
        wrapper.simulate('mouseLeave')
      })

      test('should pass the information down', () => {
        expect(wrapper.find('CheckoutContainer').prop('isButtonHovered')).toBe(false)
      })
    })
  })
})
