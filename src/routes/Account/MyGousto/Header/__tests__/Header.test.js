import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import moment from 'moment'
import config from 'config'
import { Header } from '../Header.logic'

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
const orderForToday = Immutable.fromJS({
  100: {
    deliveryDate: moment().format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '100',
  }
})
let wrapper
const mockLoadOrderTrackingInfo = jest.fn()

describe('MyGousto - Header', () => {
  describe('when no orders are passed in', () => {
    beforeEach(() => {
      wrapper = mount(
        <Header
          loadOrderTrackingInfo={mockLoadOrderTrackingInfo}
        />
      )
    })

    test('should not render any messages', () => {
      expect(wrapper.find('.headerText').length).toEqual(0)
    })

  })

  describe('when a user has upcoming orders', () => {
    let nextDeliveryDetails

    beforeEach(() => {
      wrapper = mount(
        <Header
          loadOrderTrackingInfo={mockLoadOrderTrackingInfo}
          orders={upcomingOrders}
        />
      )
      nextDeliveryDetails = wrapper.find('OrderDetails').first()
    })

    test('should show the correct date of the next order to be delivered', () => {
      const expectedDateString = moment().add(2, 'days').format('dddd Do MMMM')
      expect(nextDeliveryDetails.find('.message').first().text()).toBe(expectedDateString)
    })

    test('should show the correct delivery times of the next order to be delivered', () => {
      expect(nextDeliveryDetails.find('.message').last().text()).toBe('8am - 7pm')
    })

    test('does not render a tracking button if a tracking URL is not available', () => {
      expect(wrapper.find('CardWithLink').first().find('Button').exists()).toBe(false)
    })

    describe('and the next order is today', () => {
      beforeEach(() => {
        wrapper = mount(
          <Header
            loadOrderTrackingInfo={mockLoadOrderTrackingInfo}
            orders={orderForToday}
          />
        )
        nextDeliveryDetails = wrapper.find('OrderDetails').first()
      })

      test('explicitly shows that the order is arriving today', () => {
        expect(nextDeliveryDetails.find('.message').first().text()).toBe('Today')
      })
    })

    describe('and a tracking URL is available for the next order', () => {
      const TRACKING_URL = 'https://test-tracking-url/order-id'
      const mockTrackNextBoxTrackingClick = jest.fn()

      beforeEach(() => {
        wrapper = mount(
          <Header
            loadOrderTrackingInfo={mockLoadOrderTrackingInfo}
            trackNextBoxTrackingClick={mockTrackNextBoxTrackingClick}
            orders={upcomingOrders}
            nextOrderTracking={TRACKING_URL}
          />
        )
      })

      test('renders a track my box button', () => {
        expect(wrapper.find('CardWithLink').first().find('Button').text()).toBe('Track my box')
      })

      describe('and the tracking button is clicked', () => {
        beforeEach(() => {
          global.open = jest.fn()
          wrapper.find('CardWithLink').find('SegmentPresentation').last().simulate('click')
        })

        afterEach(() => {
          jest.resetAllMocks()
        })

        test('opens the tracking page in a new tab', () => {
          expect(global.open).toHaveBeenCalledWith(TRACKING_URL, 'rel="noopener noreferrer"')
        })

        test('dispatches the tracking action', () => {
          expect(mockTrackNextBoxTrackingClick).toHaveBeenCalledTimes(1)
        })
      })
    })
  })

  describe('when a user has no upcoming orders', () => {
    test('should show the no upcoming orders message', () => {
      wrapper = mount(
        <Header
          loadOrderTrackingInfo={mockLoadOrderTrackingInfo}
          orders={previousOrders}
        />
      )
      const nextDeliveryDetails = wrapper.find('OrderDetails').first()
      expect(nextDeliveryDetails.find('.message').first().text()).toBe('No boxes scheduled')
    })
  })

  describe('when a user has previously delivered orders', () => {
    let previousDeliveryDetails

    beforeEach(() => {
      wrapper = mount(
        <Header
          loadOrderTrackingInfo={mockLoadOrderTrackingInfo}
          orders={previousOrders}
        />
      )
      previousDeliveryDetails = wrapper.find('OrderDetails').at(1)
    })

    test('should show the correct date of the next order to be delivered', () => {
      const expectedDateString = moment().subtract(2, 'days').format('dddd Do MMMM')
      expect(previousDeliveryDetails.find('.message').first().text()).toContain(expectedDateString)
    })

    describe('and the most recent order > 7 days ago', () => {
      test('should link to general help contact page', () => {
        wrapper = mount(
          <Header
            loadOrderTrackingInfo={mockLoadOrderTrackingInfo}
            orders={onlyOldOrders}
          />
        )
        const linkUrl = wrapper.find('CardWithLink').last().prop('linkUrl')
        expect(linkUrl.includes(config.routes.client.getHelp.contact)).toBe(true)
      })
    })

    describe('and the most recent order < 7 days ago', () => {
      test('should link to help page with order id', () => {
        const linkUrl = wrapper.find('CardWithLink').last().prop('linkUrl')
        expect(linkUrl.includes('?orderId=101')).toBe(true)
      })
    })
  })

  describe('when a user has no previously delivered orders', () => {
    test('does not show details of previous deliveries', () => {
      wrapper = mount(
        <Header
          loadOrderTrackingInfo={mockLoadOrderTrackingInfo}
          orders={upcomingOrders}
        />
      )
      expect(wrapper.find('OrderDetails')).toHaveLength(1)
    })
  })

  describe('fetching the tracking URL for an order', () => {
    beforeEach(() => {
      wrapper = mount(
        <Header
          loadOrderTrackingInfo={mockLoadOrderTrackingInfo}
          orders={Immutable.Map({})}
        />
      )
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    describe('when the user has an upcoming order', () => {
      describe('and the order is due to be delivered today', () => {
        test('fetches the tracking URL for the next order', () => {
          wrapper.setProps({ orders: orderForToday })
          expect(mockLoadOrderTrackingInfo).toHaveBeenCalledTimes(1)
          expect(mockLoadOrderTrackingInfo).toHaveBeenCalledWith('100')
        })
      })

      describe('and the order is not due to be delivered today', () => {
        test('does not try to fetch the tracking URL for any orders', () => {
          wrapper.setProps({ orders: upcomingOrders })
          expect(mockLoadOrderTrackingInfo).toHaveBeenCalledTimes(0)
        })
      })
    })

    describe('when the user has no upcoming orders', () => {
      test('does not try to fetch the tracking URL for any orders', () => {
        wrapper.setProps({ orders: previousOrders })
        expect(mockLoadOrderTrackingInfo).toHaveBeenCalledTimes(0)
      })
    })
  })
})
