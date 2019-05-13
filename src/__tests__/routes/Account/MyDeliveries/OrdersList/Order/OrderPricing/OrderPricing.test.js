import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import OrderPricing from 'routes/Account/MyDeliveries/OrdersList/Order/OrderPricing'
import Immutable from 'immutable'

describe('OrderPricing', () => {
  let sandbox
  let wrapper
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })
  afterEach(done => {
    sandbox.restore()
    done()
  })
  describe('rendering', () => {
    const pricing = Immutable.Map({
      grossOrderPrice: 15,
      netOrderPrice: 12,
    })

    test('should render prices when state is confirmed', () => {
      const orderState = 'confirmed'
      wrapper = shallow(
        <OrderPricing pricing={pricing} orderState={orderState} />,
      )
      expect(wrapper.type()).toEqual('div')
      expect(wrapper.text()).toContain(pricing.get('grossOrderPrice'))
      expect(wrapper.text()).toContain(pricing.get('netOrderPrice'))
    })

    test('should render no prices when state is scheduled', () => {
      const orderState = 'scheduled'
      wrapper = shallow(
        <OrderPricing pricing={pricing} orderState={orderState} />,
      )
      expect(wrapper.type()).toEqual('div')
      expect(wrapper.text()).toContain('')
    })

    test('should render discount badge if there is a discount and state is menu open', () => {
      const orderState = 'menu open'
      const pricingBreakdown = Immutable.Map({
        flatDiscountAmount: 15,
        percentageDiscountAmount: null,
      })
      wrapper = shallow(
        <OrderPricing pricing={pricingBreakdown} orderState={orderState} />,
      )
      expect(wrapper.text()).toEqual('<DiscountBadge />')
    })

    test('should not render discount badge if there is no discount and state is menu open', () => {
      const orderState = 'menu open'
      const pricingBreakdown = Immutable.Map({
        flatDiscountAmount: null,
        percentageDiscountAmount: null,
      })
      wrapper = shallow(
        <OrderPricing pricing={pricingBreakdown} orderState={orderState} />,
      )
      expect(wrapper.text()).toEqual('')
    })
    test('should not render discount badge if there is a discount and state is not menu open', () => {
      const orderState = 'scheduled'
      const pricingBreakdown = Immutable.Map({
        flatDiscountAmount: null,
        percentageDiscountAmount: null,
      })
      wrapper = shallow(
        <OrderPricing pricing={pricingBreakdown} orderState={orderState} />,
      )
      expect(wrapper.text()).toEqual('')
    })
  })
})
