import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import OrderStatus from 'routes/Account/MyDeliveries/OrdersList/Order/OrderStatus'
import Content from 'containers/Content'

describe('OrderStatus', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })
  afterEach(done => {
    sandbox.restore()
    done()
  })
  describe('rendering', () => {
    let wrapper
    let orderStateSample
    let whenCutoff = 'in 6 days'
    let whenMenuOpen = 'in 7 days'

    test('should render a <p> with the correct copy for orderState=scheduled', () => {
      orderStateSample = 'scheduled'

      wrapper = shallow(
        <OrderStatus
          orderState={orderStateSample}
          whenCutoff={whenCutoff}
          whenMenuOpen={whenMenuOpen}
        />,
      )
      expect(wrapper.type()).toContain('div')
      expect(wrapper.text()).toContain('Menu open in 7 days')
    })

    test('should render a <p> with the correct copy for orderState=menu open', () => {
      orderStateSample = 'menu open'

      wrapper = shallow(
        <OrderStatus
          orderState={orderStateSample}
          whenCutoff={whenCutoff}
          whenMenuOpen={whenMenuOpen}
        />,
      )
      expect(wrapper.type()).toContain('div')
      expect(wrapper.text()).toContain('6 days left to choose recipes')
    })

    test('should render a <p> with the correct copy for orderState=recipes chosen', () => {
      orderStateSample = 'recipes chosen'

      wrapper = shallow(
        <OrderStatus
          orderState={orderStateSample}
          whenCutoff={whenCutoff}
          whenMenuOpen={whenMenuOpen}
        />,
      )
      expect(wrapper.type()).toContain('div')
      expect(wrapper.text()).toContain('6 days left to edit this box')
    })

    test('should render a <p> with the correct copy for orderState=confirmed', () => {
      orderStateSample = 'confirmed'

      wrapper = shallow(
        <OrderStatus
          orderState={orderStateSample}
          whenCutoff={whenCutoff}
          whenMenuOpen={whenMenuOpen}
        />,
      )
      expect(wrapper.type()).toContain('div')
      expect(
        wrapper
          .find(Content)
          .first()
          .props().contentKeys,
      ).toEqual('myDeliveriesOrderOrderStatusConfirmed')
    })

    test('should render a <p> with the correct copy for orderState=dispatched', () => {
      orderStateSample = 'dispatched'

      wrapper = shallow(
        <OrderStatus
          orderState={orderStateSample}
          whenCutoff={whenCutoff}
          whenMenuOpen={whenMenuOpen}
        />,
      )
      expect(wrapper.type()).toContain('div')
      expect(
        wrapper
          .find(Content)
          .first()
          .props().contentKeys,
      ).toEqual('myDeliveriesOrderOrderStatusDispatched')
    })

    test('should render a <p> with the correct copy for orderState=cancelled', () => {
      orderStateSample = 'cancelled'

      wrapper = shallow(
        <OrderStatus
          orderState={orderStateSample}
          whenCutoff={whenCutoff}
          whenMenuOpen={whenMenuOpen}
        />,
      )
      expect(wrapper.type()).toContain('div')
      expect(
        wrapper
          .find(Content)
          .first()
          .props().contentKeys,
      ).toEqual('myDeliveriesOrderOrderStatusCancelled')
    })
  })
})
