import React from 'react'
import Immutable from 'immutable'
import moment from 'moment'
import { browserHistory } from 'react-router'
import { redirect } from 'utils/window'
import { mount } from 'enzyme'
import { EligibilityCheck } from '../EligibilityCheck'

jest.mock('utils/window', () => ({
  documentLocation: jest.fn(),
  getWindow: jest.fn(),
  redirect: jest.fn(),
}))

const DELIVERY_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

describe('given the EligibilityCheck is rendered', () => {
  let getUserOrders
  let storeGetHelpOrder

  beforeEach(() => {
    browserHistory.push = jest.fn()
    getUserOrders = jest.fn()
    storeGetHelpOrder = jest.fn()
  })

  describe('when customer order has not been loaded', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(
        <EligibilityCheck
          isAuthenticated
          userId="123"
          getUserOrders={getUserOrders}
          storeGetHelpOrder={storeGetHelpOrder}
        />
      )
    })

    test('the getUserOrders is called', () => {
      expect(getUserOrders).toHaveBeenCalledTimes(1)
    })

    test('loading is added to the page', () => {
      expect(wrapper.find('Loading').length).toBe(1)
    })
  })

  describe('when customer is eligible', () => {
    const RECIPE_IDS = ['10', '11', '12', '13']
    const DELIVERY_SLOT = {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    }

    const eligibleOrder = Immutable.fromJS({
      100: {
        deliveryDate: moment().subtract(8, 'days').format(DELIVERY_DATE_FORMAT),
        deliverySlot: DELIVERY_SLOT,
        id: '100',
        recipeIds: RECIPE_IDS,
      }
    })

    beforeEach(() => {
      mount(
        <EligibilityCheck
          isAuthenticated
          userId="123"
          orders={eligibleOrder}
          getUserOrders={getUserOrders}
          storeGetHelpOrder={storeGetHelpOrder}
        />
      )
    })

    test('the getUserOrders is not called', () => {
      expect(getUserOrders).not.toHaveBeenCalledTimes(1)
    })

    test('redirects to the get help page', () => {
      expect(browserHistory.push).toHaveBeenCalledWith('/get-help?orderId=100')
    })

    test('the storeGetHelpOrder is called correctly', () => {
      expect(storeGetHelpOrder).toHaveBeenCalledWith({
        id: '100',
        recipeIds: Immutable.List(RECIPE_IDS),
        deliverySlot: Immutable.Map(DELIVERY_SLOT),
      })
    })
  })

  describe('when customer not is eligible', () => {
    let wrapper
    const notEligibleOrder = Immutable.fromJS({
      100: {
        deliveryDate: moment().subtract(12, 'days').format(DELIVERY_DATE_FORMAT),
        deliverySlot: {
          deliveryEnd: '18:59:59',
          deliveryStart: '08:00:00'
        },
        id: '100',
      }
    })

    beforeEach(() => {
      wrapper = mount(
        <EligibilityCheck
          isAuthenticated
          userId="123"
          orders={notEligibleOrder}
          getUserOrders={getUserOrders}
          storeGetHelpOrder={storeGetHelpOrder}
        />
      )
    })

    test('the getUserOrders is not called', () => {
      expect(getUserOrders).not.toHaveBeenCalledTimes(1)
    })

    describe('and customer is authenticated', () => {
      beforeEach(() => {
        wrapper.setProps({ isAuthenticated: true, userId: '123' })
      })

      test('redirects to the knowledge base with the user_id attached to the URL', () => {
        expect(redirect).toHaveBeenCalledWith('https://gousto.zendesk.com/hc/en-gb/?user_id=123')
      })
    })

    describe('and customer is not authenticated', () => {
      beforeEach(() => {
        wrapper.setProps({ isAuthenticated: false, userId: '' })
      })

      test('the getUserOrders is not called', () => {
        expect(getUserOrders).not.toHaveBeenCalledTimes(1)
      })

      test('redirects to the knowledge base without the user_id attached to the URL', () => {
        expect(redirect).toHaveBeenCalledWith('https://gousto.zendesk.com/hc/en-gb')
      })
    })
  })
})
