import sinon from 'sinon'

import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import OrderPricingDetail from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderPricingDetail'
import Content from 'containers/Content'

describe('OrderPricingDetail', () => {
  let sandbox
  let wrapper
  const mockInfo = {
    paymentDate: '11 June',
    numberOfRecipes: 7,
    priceBreakdown: Immutable.Map({
      grossRecipesPrice: 60.17,
      grossExtrasPrice: 10.02,
      grossShippingPrice: 5.56,
      netOrderPrice: 30.0,
    }),
  }

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })
  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(
        <OrderPricingDetail
          paymentDate={mockInfo.paymentDate}
          numberOfRecipes={mockInfo.numberOfRecipes}
          priceBreakdown={mockInfo.priceBreakdown}
        />,
      )
    })

    test('should render a <div>', () => {
      expect(wrapper.type()).toEqual('div')
    })

    test('should render "Payment on " + the date passed', () => {
      expect(wrapper.text()).toContain('Payment on 11 June')
    })

    test('should render the number of recipes passed + " recipes", followed by "£" + the amount passed', () => {
      expect(wrapper.text()).toContain('7 recipes£60.17')
    })

    test('should render "Total" followed by "£" + the amount passed', () => {
      expect(wrapper.text()).toContain('Total£30.00')
    })

    describe('discount', () => {
      test('should render the percentage discount and flat discount when both are passed', () => {
        wrapper = shallow(
          <OrderPricingDetail
            priceBreakdown={Immutable.Map({
              percentageDiscountAmount: 30,
              flatDiscountAmount: 20,
            })}
          />,
        )
        expect(wrapper.text()).toContain('30% Discount-£20.00')
      })

      test('should render only the flat discount when the flat discount is passed but the percentage discount is not passed', () => {
        wrapper = shallow(
          <OrderPricingDetail
            priceBreakdown={Immutable.Map({ flatDiscountAmount: 25.55 })}
          />,
        )
        expect(
          wrapper
            .find(Content)
            .first()
            .props().contentKeys,
        ).toEqual('mydeliveriesOrderOrderpricingDiscountcallout')
        expect(wrapper.text()).toContain('-£25.55')
      })

      test('should NOT render a discount when none of the discounts are passed', () => {
        wrapper = shallow(<OrderPricingDetail />)
        expect(wrapper.text()).not.toContain('Discount')
      })

      test('should NOT render a discount when the percentage discount passed is 0', () => {
        wrapper = shallow(<OrderPricingDetail percentageDiscountAmount={0} />)
        expect(wrapper.text()).not.toContain('Discount')
      })

      test('should NOT render a discount when the flat discount passed is 0', () => {
        wrapper = shallow(<OrderPricingDetail flatDiscountAmount={0} />)
        expect(wrapper.text()).not.toContain('Discount')
      })
    })

    describe('extras', () => {
      test('should render "Extras" followed by "£" + the amount passed, provided a totalExtras prop that is not 0 is passed', () => {
        expect(wrapper.text()).toContain('£10.02')
        expect(
          wrapper
            .find(Content)
            .at(0)
            .props().contentKeys,
        ).toEqual('mydeliveriesOrderOrderpricingExtras')
      })

      test('should NOT render the "Extras" row when no totalExtras prop is passed', () => {
        wrapper = shallow(<OrderPricingDetail />)
        expect(wrapper.text()).not.toContain('Extras')
      })

      test('should NOT render the "Extras" row when totalExtras prop is 0', () => {
        wrapper = shallow(<OrderPricingDetail totalExtras={0} />)
        expect(wrapper.text()).not.toContain('Extras')
      })
    })

    describe('shipping', () => {
      test('should render "Shipping" followed by "£" + the amount passed, provided a shipping prop that is not 0 is passed', () => {
        expect(wrapper.text()).toContain('£5.56')
      })

      test('should render "Shipping" followed by "Free" when shipping prop is not passed', () => {
        wrapper = shallow(<OrderPricingDetail />)
        expect(
          wrapper
            .find(Content)
            .at(1)
            .props().contentKeys,
        ).toEqual('mydeliveriesOrderOrderpricingDeliveryfree')
      })

      test('should render "Shipping" followed by "Free" when shipping prop is 0', () => {
        wrapper = shallow(<OrderPricingDetail shipping={0} />)
        expect(
          wrapper
            .find(Content)
            .at(1)
            .props().contentKeys,
        ).toEqual('mydeliveriesOrderOrderpricingDeliveryfree')
      })
    })
  })
})
