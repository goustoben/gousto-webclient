import sinon from 'sinon'

import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import OrderDetail from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail'
import OrderCancelButton from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderCancelButton'
import OrderRecipes from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderRecipes'
import OrderProducts from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderProducts'
import OrderDelivery from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery'
import OrderPricingDetail from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderPricingDetail'

describe('OrderDetail', () => {
  let sandbox
  let wrapper
  const periodMap = Immutable.fromJS({
    id: 54
  })
  const products = Immutable.fromJS([
    {
      id: '1'
    },
    {
      id: '2'
    },
  ])

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })
  afterEach(done => {
    sandbox.restore()
    done()
  })
  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(<OrderDetail />)
    })

    test('should render a <div>', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should render <OrderCancelButton> when the order is cancellable', () => {
      wrapper = shallow(<OrderDetail cancellable />)
      expect(wrapper.find(OrderCancelButton)).toHaveLength(1)
    })

    test('should NOT render <OrderCancelButton> when the order state is not cancellable', () => {
      wrapper = shallow(<OrderDetail cancellable={false} />)
      expect(wrapper.find(OrderCancelButton)).toHaveLength(0)
    })

    test('should NOT render <OrderCancelButton> by default', () => {
      wrapper = shallow(<OrderDetail orderState="something" />)
      expect(wrapper.find(OrderCancelButton)).toHaveLength(0)
    })

    test('should render a specific list of subcomponents when the order is menu open', () => {
      wrapper = shallow(<OrderDetail orderState="menu open" />)
      expect(wrapper.find(OrderRecipes)).toHaveLength(1)
      expect(wrapper.find(OrderDelivery)).toHaveLength(1)
    })

    test('should render a specific list of subcomponents when the order is dispatched', () => {
      wrapper = shallow(<OrderDetail orderState="dispatched" />)
      expect(wrapper.find(OrderRecipes)).toHaveLength(1)
      expect(wrapper.find(OrderPricingDetail)).toHaveLength(1)
      expect(wrapper.find(OrderDelivery)).toHaveLength(1)
    })

    test('should render a specific list of subcomponents when the order is confirmed', () => {
      wrapper = shallow(
        <OrderDetail orderState="confirmed" period={periodMap} />
      )
      expect(wrapper.find(OrderRecipes)).toHaveLength(1)
      expect(wrapper.find(OrderPricingDetail)).toHaveLength(1)
      expect(wrapper.find(OrderDelivery)).toHaveLength(1)
    })

    describe('when the order is recipes chosen', () => {
      test('should render a specific list of subcomponents', () => {
        wrapper = shallow(
          <OrderDetail orderState="recipes chosen" period={periodMap} />
        )
        expect(wrapper.find(OrderRecipes)).toHaveLength(1)
        expect(wrapper.find(OrderProducts)).toHaveLength(1)
        expect(wrapper.find(OrderPricingDetail)).toHaveLength(1)
        expect(wrapper.find(OrderDelivery)).toHaveLength(1)
      })
    })
  })
})
