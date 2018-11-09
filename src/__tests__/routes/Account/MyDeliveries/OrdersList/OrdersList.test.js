import sinon from 'sinon'

import Immutable from 'immutable' // eslint-disable-line no-caps

import React from 'react'
import { shallow } from 'enzyme'
import OrdersList from 'routes/Account/MyDeliveries/OrdersList/OrdersList'

describe('OrdersList', () => {
  let sandbox
  let ordersSample

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    ordersSample = Immutable.fromJS({
      1: {
        id: 1,
        date: 'date1',
      },
      2: {
        id: 2,
        date: 'date2',
      },
      3: {
        id: 3,
        date: 'date3',
      },
    })
  })
  afterEach(done => {
    sandbox.restore()
    done()
  })
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<OrdersList orders={ordersSample} />)
    })

    test('should render a <div> with no props', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should render as many <Connect(Order)> as projected orders passed', () => {
      expect(wrapper.find('Connect(Order)')).toHaveLength(ordersSample.size)
    })
  })
})

describe('OrdersList with no orders', () => {
  let sandbox
  let ordersSample

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    ordersSample = Immutable.fromJS({})
  })
  afterEach(done => {
    sandbox.restore()
    done()
  })
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<OrdersList orders={ordersSample} />)
    })

    test('should render a <div> with no props', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should render no <Connect(Order)>', () => {
      expect(wrapper.find('Connect(Order)')).toHaveLength(0)
    })

    test('should render a <NoOrders>', () => {
      expect(wrapper.find('NoOrders')).toHaveLength(1)
    })
  })
})
