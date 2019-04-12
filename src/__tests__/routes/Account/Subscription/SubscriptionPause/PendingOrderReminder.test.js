import React from 'react'
import { shallow } from 'enzyme'
import PendingOrderReminder from 'routes/Account/Subscription/SubscriptionPause/PendingOrderReminder/PendingOrderReminder'
import CallToAction from 'routes/Account/Subscription/SubscriptionPause/CallToAction'
import Immutable from 'immutable'

describe('PendingOrderReminder', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<PendingOrderReminder />)
    })

    test('should render a <div>', () => {
      expect(wrapper.type()).toEqual('div')
    })

    test('should render one <CallToAction> when there are no pending orders', () => {
      expect(wrapper.find(CallToAction).length).toEqual(1)
    })

    test('should render two <CallToAction> when there is at least 1 pending order', () => {
      let mockOrder = {
        deliveryDate: new Date(),
        id: 1,
        box: {
          numPortions: 2,
          numRecipes: 3,
        },
      }
      wrapper = shallow(
        <PendingOrderReminder pendingOrders={Immutable.fromJS([mockOrder])} />,
      )
      expect(wrapper.find(CallToAction).length).toEqual(2)
    })
  })

  describe('render commited orders', () => {
    let wrapper
    let committedOrders

    beforeEach(() => {
      committedOrders = Immutable.Map({
        1: { deliveryDate: '2017-01-23' },
        2: { deliveryDate: '2017-01-24' },
      })
      wrapper = shallow(
        <PendingOrderReminder committedOrders={committedOrders} />,
      )
    })

    test('should render a <p>', () => {
      expect(wrapper.find('p').length).toEqual(committedOrders.size)
    })
  })

  describe('render pending orders', () => {
    let wrapper
    let pendingOrders

    beforeEach(() => {
      pendingOrders = Immutable.Map({
        1: {
          id: 1,
          deliveryDate: '2017-01-23',
          box: { numPortions: 2, numRecipes: 4 },
        },
        2: {
          id: 2,
          deliveryDate: '2017-01-24',
          box: { numPortions: 2, numRecipes: 4 },
        },
        3: {
          id: 3,
          deliveryDate: '2017-01-25',
          box: { numPortions: 2, numRecipes: 4 },
        },
      })
      wrapper = shallow(<PendingOrderReminder pendingOrders={pendingOrders} />)
    })

    test('should render a <ul>', () => {
      expect(wrapper.find('ul').length).toEqual(pendingOrders.size)
    })
  })
})
