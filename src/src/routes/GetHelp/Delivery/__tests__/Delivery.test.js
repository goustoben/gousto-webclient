import React from 'react'
import Immutable from 'immutable'
import moment from 'moment'
import { browserHistory } from 'react-router'
import { mount } from 'enzyme'
import * as windowUtils from 'utils/window'
import { Delivery } from '../Delivery'

const deliveryDateFormat = 'YYYY-MM-DD HH:mm:ss'
const upcomingOrders = Immutable.fromJS({
  100: {
    deliveryDate: moment().add(2, 'minutes').format(deliveryDateFormat),
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
  }
})

describe('given Delivery is rendered', () => {
  const userLoadOrders = jest.fn()
  let wrapper

  beforeEach(() => {
    userLoadOrders.mockClear()

    wrapper = mount(
      <Delivery
        trackDeliveryOther={() => {}}
        trackDeliveryStatus={() => {}}
        trackNextBoxTrackingClick={() => {}}
        loadOrderTrackingInfo={() => {}}
        userLoadOrders={userLoadOrders}
      />
    )
  })

  test('the page title is being rendered correctly', () => {
    expect(wrapper.find('GetHelpLayout2').prop('headingText')).toEqual('Get help with box issue?')
  })

  test('the userOrder is fetched', () => {
    expect(userLoadOrders).toHaveBeenCalledTimes(1)
  })

  describe('when delivery tracking link is fetched', () => {
    describe('and when expanded', () => {
      const trackDeliveryStatus = jest.fn()
      const trackNextBoxTrackingClick = jest.fn()
      const loadOrderTrackingInfo = jest.fn()

      beforeEach(() => {
        trackDeliveryStatus.mockClear()

        wrapper.setProps({
          loadOrderTrackingInfo,
          trackNextBoxTrackingClick,
          trackDeliveryStatus,
        })

        wrapper.find('ItemExpandable').find('ItemPresentation').simulate('click')
      })

      test('the tracking (analytics) is called', () => {
        expect(trackDeliveryStatus).toHaveBeenCalledTimes(1)
      })

      describe('when the delivery tracking link is not available', () => {
        let deliveryStatusContent

        beforeEach(() => {
          wrapper.setProps({
            orders: previousOrders,
          })

          deliveryStatusContent = wrapper.find('ItemExpandable').find('.deliveryStatusContent')
        })

        test('the loadOrderTrackingInfo is not being called', () => {
          expect(loadOrderTrackingInfo).toHaveBeenCalledTimes(0)
        })

        test('the copy is being displayed correctly', () => {
          expect(deliveryStatusContent.find('p').text()).toEqual(
            'The tracking link is available on your day of delivery and this can be found on the "My Gousto" page under your next box delivery.'
          )
        })

        describe('and when clicking on the CTA', () => {
          beforeEach(() => {
            browserHistory.push = jest.fn()

            const CTA = wrapper.find('ItemExpandable').find('CTA')
            CTA.simulate('click')
          })

          test('the button points to My Gousto page', () => {
            expect(browserHistory.push).toHaveBeenCalledWith('/my-gousto')
          })

          test('the button is calling the tracking function correctly', () => {
            expect(trackDeliveryStatus).toHaveBeenCalledTimes(1)
          })
        })
      })

      describe('when the delivery tracking link is available', () => {
        const TRACKING_URL = 'https://test-tracking-url/order-id'
        let deliveryStatusContent

        beforeEach(() => {
          windowUtils.windowOpen = jest.fn()

          wrapper.setProps({
            orders: upcomingOrders,
            nextOrderTracking: TRACKING_URL,
          })

          deliveryStatusContent = wrapper.find('ItemExpandable').find('.deliveryStatusContent')
        })

        test('the loadOrderTrackingInfo is being passed the order id', () => {
          expect(loadOrderTrackingInfo).toHaveBeenCalledWith('100')
        })

        test('the copy is being displayed correctly', () => {
          expect(deliveryStatusContent.find('p').text()).toEqual(
            'The tracking link is now available, this can usually be found on the "My Gousto" page under your next box delivery.'
          )
        })

        test('the CTA is being called correctly', () => {
          expect(deliveryStatusContent.find('CTA').exists()).toBe(true)
        })

        describe('and when clicking on the CTA', () => {
          beforeEach(() => {
            const CTA = wrapper.find('ItemExpandable').find('CTA')
            CTA.simulate('click')
          })

          test('the URL is opened on a new window with the delivery tracking URL in', () => {
            expect(windowUtils.windowOpen).toHaveBeenCalledWith(TRACKING_URL)
          })

          test('tracking for analytics is called correctly', () => {
            expect(trackNextBoxTrackingClick).toHaveBeenCalledWith('100')
          })
        })
      })
    })
  })

  describe('when Other button renders', () => {
    const trackDeliveryOther = jest.fn()
    let ItemLink

    beforeEach(() => {
      wrapper.setProps({
        trackDeliveryOther,
      })

      ItemLink = wrapper.find('ItemLink')
    })

    test('the button points to the Get Help Contact page', () => {
      expect(ItemLink.prop('to')).toEqual('/get-help/contact')
    })

    test('the button is calling the tracking function correctly', () => {
      ItemLink.find('Item').simulate('click')

      expect(trackDeliveryOther).toHaveBeenCalledTimes(1)
    })
  })
})
