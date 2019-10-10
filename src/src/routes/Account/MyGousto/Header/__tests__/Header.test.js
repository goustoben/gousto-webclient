import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import moment from 'moment'
import config from 'config'
import { Header } from '..'

const deliveryDateFormat = "YYYY-MM-DD HH:mm:ss"
const upcomingOrders = Immutable.fromJS({
  100: {
    deliveryDate: moment().add(10, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '100',
  },
  101: {
    deliveryDate: moment().add(2, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '101',
  },
  102: {
    deliveryDate: moment().add(5, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '102',
  },
})
const previousOrders = Immutable.fromJS({
  100: {
    deliveryDate: moment().subtract(10, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '100',
  },
  101: {
    deliveryDate: moment().subtract(2, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '101',
  },
  102: {
    deliveryDate: moment().subtract(5, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '102',
  },
})
const onlyOldOrders = Immutable.fromJS({
  100: {
    deliveryDate: moment().subtract(10, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '100',
  }
})
let wrapper

describe('MyGousto - Header', () => {
  describe('when no orders are passed in', () => {
    beforeEach(() => {
      wrapper = mount(<Header />)
    })

    test('should not render any messages', () => {
      expect(wrapper.find('.headerText').length).toEqual(0)
    })

  })

  describe('when a user has upcoming orders', () => {
    beforeEach(() => {
      wrapper = mount(<Header orders={upcomingOrders} />)
    })
    test('should show the correct date of the next order to be delivered', () => {
      const expectedDateString = moment().add(2, 'days').format('Do MMMM')
      expect(wrapper.find('.headerText').first().text()).toContain(expectedDateString)
    })
    test('should show the correct delivery times of the next order to be delivered', () => {
      expect(wrapper.find('.headerText').first().text()).toContain('8am-7pm')
    })
  })

  describe('when a user has no upcoming orders', () => {
    test('should show the no upcoming orders message', () => {
      wrapper = mount(<Header orders={previousOrders} />)
      expect(wrapper.find('.headerText').first().text()).toContain('Looks like you don’t have any recipe boxes ordered')
    })
  })

  describe('when a user has previously delivered orders', () => {
    beforeEach(() => {
      wrapper = mount(<Header orders={previousOrders} />)
    })
    test('should show the correct date of the next order to be delivered', () => {
      const expectedDateString = moment().subtract(2, 'days').format('dddd Do MMMM')
      expect(wrapper.find('.headerText').last().text()).toContain(expectedDateString)
    })
    describe('and the most recent order > 7 days ago', () => {
      test('should link to general help contact page', () => {
        wrapper = mount(<Header orders={onlyOldOrders} />)
        expect(wrapper.find('.headerText a').last().prop('href')).toContain(`/${config.routes.client.getHelp.contact}`)
      })
    })
    describe('and the most recent order < 7 days ago', () => {
      test('should link to help page with order id', () => {
        expect(wrapper.find('.headerText a').last().prop('href')).toContain('?orderId=101')
      })
    })
  })

  describe('when a user has no previously delivered orders', () => {
    test('should not show the recent delivery message', () => {
      wrapper = mount(<Header orders={upcomingOrders} />)
      expect(wrapper.find('.headerText').first().text()).not.toContain('Your most recent box was delivered')
    })
  })

})
