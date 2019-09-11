import { mount } from 'enzyme'
import React from 'react'
import Immutable from 'immutable'

import { Button, Segment } from 'goustouicomponents'
import BoxSummaryButton from 'BoxSummary/BoxSummaryButton/BoxSummaryButton'
import CheckoutButton from 'BoxSummary/CheckoutButton'
import { boxSummaryViews } from 'utils/boxSummary'
import { basketSum, okRecipes } from 'utils/basket'

jest.mock('utils/basket', () => ({
  basketSum: jest.fn(),
  okRecipes: jest.fn(),
}))

jest.mock('config/basket', () => ({
  minRecipesNum: 900,
}))

describe('BoxSummaryButton', () => {
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
    })
  })
  const props = {
    open: () => { },
    numPortions: 2,
    stock: Immutable.Map(),
    menuRecipes: Immutable.List(),
    boxSummaryNext: () => { },

  }
  beforeEach(() => {
    openSpy = jest.fn()
    basketSum.mockReturnValue(10)
    okRecipes.mockReturnValue(10)
  })

  describe('when boxSummaryCurrentView is Details', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(<BoxSummaryButton {...props} boxSummaryCurrentView={boxSummaryViews.DETAILS} open={openSpy} showRecipeCountButton={false} />, {
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

    test('should show CheckoutButton if boxSummaryCurrentView', () => {
      expect(wrapper.find(CheckoutButton)).toHaveLength(1)
    })

    test('should show CheckoutButton on mobile with the view prop as "mobileNextButton"', () => {
      wrapper.setProps({ view: 'mobile' })
      expect(wrapper.find(CheckoutButton)).toHaveLength(1)
      expect(wrapper.find(CheckoutButton).prop('view')).toEqual('mobileNextButton')
    })

    test('should show CheckoutButton on mobile with the view prop as "mobileNextButton"', () => {
      wrapper.setProps({ view: 'desktop' })
      expect(wrapper.find(CheckoutButton)).toHaveLength(1)
      expect(wrapper.find(CheckoutButton).prop('view')).toEqual('desktopNextButton')
    })

    test('should show a pending Button if checkoutPending prop is set to true', () => {
      wrapper.setProps({ view: 'desktop', checkoutPending: true })
      expect(wrapper.find(Button).prop('pending')).toEqual(true)
    })

    test('should show a not pending Button if checkoutPending prop is set to false', () => {
      expect(wrapper.find(Button).prop('pending')).toEqual(false)
    })
    test('should disable the checkout button if the number of ok recipes is < min number', () => {
      expect(wrapper.find(Button).prop('disabled')).toEqual(true)
    })

    test('should enable the checkout button if the number of ok recipes is > min number', () => {
      basketSum.mockReturnValue(1000)
      okRecipes.mockReturnValue(1000)
      wrapper.setProps({ view: 'desktop', checkoutPending: false })
      expect(wrapper.find(Button).prop('disabled')).toEqual(false)
    })

    test('should disable the checkout button if the checkoutPending prop is true', () => {
      expect(wrapper.find(Button).prop('disabled')).toEqual(true)
    })

  })

  describe('when boxSummaryCurrentView is not set', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(<BoxSummaryButton {...props} open={openSpy} />, {
        context: {
          store: {
            getState,
            subscribe: jest.fn()
          }
        },
        childContextTypes: {
          store: {
            getState,
            subscribe: jest.fn()
          }
        }
      })
    })
    test('should not show a CheckoutButton', () => {
      expect(wrapper.find(CheckoutButton)).toHaveLength(0)
    })

    test('should show me a next button which opens the box summary if I have not put my postcode or delivery slot in on desktop', () => {
      expect(wrapper.find(Segment).at(1).text()).toEqual('Next')
      wrapper.find(Segment).at(1).simulate('click')
      expect(openSpy).toHaveBeenCalled()
    })
  })

  describe('with pricingPending', () => {
    const wrapper = mount(<BoxSummaryButton {...props} />, {
      context: {
        store: {
          getState,
          subscribe: jest.fn()
        }
      },
      childContextTypes: {
        store: {
          getState,
          subscribe: jest.fn()
        }
      }
    })

    test('should show the Button as not pending by default', () => {
      expect(wrapper.find(Button).prop('pending')).toBe(false)
    })

    test('should show the Button as pending when set to true', () => {
      wrapper.setProps({ pricingPending: true })
      expect(wrapper.find(Button).prop('pending')).toBe(true)
    })

    test('should show the Button as pending in the Details View when set to true', () => {
      wrapper.setProps({ pricingPending: true, view: boxSummaryViews.DETAILS })

      expect(wrapper.find(Button).prop('pending')).toBe(true)
    })
  })
})
