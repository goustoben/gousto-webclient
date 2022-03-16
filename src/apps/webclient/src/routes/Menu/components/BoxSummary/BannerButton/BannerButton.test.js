import { mount } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'

import { boxSummaryViews } from 'utils/boxSummary'
import { basketSum, okRecipes } from 'utils/basket'
import { BannerButton } from './BannerButton'

import { CheckoutContainer } from './Checkout'

jest.mock('../BannerButton/Checkout', () => ({
  CheckoutContainer: () => <div />
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
  const getState = jest.fn().mockReturnValue({
    auth: Immutable.fromJS({
      isAuthenticated: false,
    }),
    basket: Immutable.fromJS({
      recipes: {},
      numPortions: 2
    }),
    boxSummaryDeliveryDays: Immutable.fromJS({}),
    error: Immutable.fromJS({}),
    user: Immutable.fromJS({
      orders: {}
    }),
    experiments: Immutable.fromJS({
      experiments: {}
    }),
    pending: Immutable.fromJS({
    })
  })
  const props = {
    open: () => { }
  }
  beforeEach(() => {
    openSpy = jest.fn()
    basketSum.mockReturnValue(10)
    okRecipes.mockReturnValue(10)
  })

  describe('when boxSummaryCurrentView is Details', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(<BannerButton {...props} boxSummaryCurrentView={boxSummaryViews.DETAILS} open={openSpy} />, {
        context: {
          store: {
            getState,
            dispatch: jest.fn(),
            subscribe: jest.fn()
          }
        },
        childContextTypes: {
          store: {
            getState,
            dispatch: jest.fn(),
            subscribe: jest.fn()
          }
        }
      })
    })

    test('should show CheckoutContainer if boxSummaryCurrentView', () => {
      expect(wrapper.find(CheckoutContainer)).toHaveLength(1)
    })

    test('should show CheckoutContainer on mobile with the view prop as "mobile"', () => {
      wrapper.setProps({ view: 'mobile' })
      expect(wrapper.find(CheckoutContainer)).toHaveLength(1)
      expect(wrapper.find(CheckoutContainer).prop('view')).toEqual('mobile')
    })

    test('should show CheckoutContainer on mobile with the view prop as "mobile"', () => {
      wrapper.setProps({ view: 'desktop' })
      expect(wrapper.find(CheckoutContainer)).toHaveLength(1)
      expect(wrapper.find(CheckoutContainer).prop('view')).toEqual('desktop')
    })
  })
})
