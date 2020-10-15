import React from 'react'
import { browserHistory } from 'react-router'
import { mount } from 'enzyme'
import { safeJestMock } from '_testing/mocks'
import * as timeUtils from '../../../utils/time'
import { DidntArrive } from '..'

safeJestMock(timeUtils, 'compareTodayToDeliveryDate')
browserHistory.push = jest.fn()

const ACCESS_TOKEN = 'asdf123asdf'
const DELIVERY_DATE = '2020-10-08 01:02:03'
const DELIVERY_SLOT = {
  deliveryStart: '2020-10-08 08:00:00',
  deliveryEnd: '2020-10-08 18:00:00',
}
const ORDER_ID = '8888'
const USER_ID = '4444'
const TRACKING_URL = 'https://wonder-courier.com/order/4444'
const loadOrderByIdMock = jest.fn()
const loadTrackingUrlMock = jest.fn()
const PROPS = {
  accessToken: ACCESS_TOKEN,
  deliveryDate: DELIVERY_DATE,
  deliverySlot: DELIVERY_SLOT,
  isLoadOrderError: false,
  isOrderLoading: false,
  isTrackingUrlLoading: false,
  loadOrderById: loadOrderByIdMock,
  loadTrackingUrl: loadTrackingUrlMock,
  params: { orderId: ORDER_ID, userId: USER_ID },
  trackingUrl: TRACKING_URL,
}
let wrapper

describe('DidntArrive', () => {
  beforeEach(() => {
    mount(<DidntArrive {...PROPS} />)
  })

  test('renders without crashing', () => {})

  describe('When the component mounts and the deliveryDate is not available', () => {
    beforeEach(() => {
      mount(<DidntArrive {...PROPS} deliveryDate="" />)
    })

    test('fetches the order which Id is passed as a URL param', () => {
      expect(loadOrderByIdMock).toHaveBeenCalledWith({
        accessToken: ACCESS_TOKEN,
        orderId: ORDER_ID,
      })
    })
  })

  describe('When the component mounts and the trackingUrl is not available', () => {
    beforeEach(() => {
      mount(<DidntArrive {...PROPS} trackingUrl="" />)
    })

    test('fetches the trackingUrl of the order which Id is passed as a URL param', () => {
      expect(loadTrackingUrlMock).toHaveBeenCalledWith(ORDER_ID)
    })
  })

  describe('When the deliveryDate is available', () => {
    describe('and today is before the delivery day', () => {
      beforeEach(() => {
        timeUtils.compareTodayToDeliveryDate.mockReturnValue('before')
        wrapper = mount(<DidntArrive {...PROPS} />)
      })

      test('renders <BeforeDeliveryDay>', () => {
        expect(wrapper.find('BeforeDeliveryDay').exists()).toBe(true)
      })

      test.each([
        ['OnDeliveryDayWithTracking'],
        ['OnDeliveryDayWithoutTracking']
      ])('does not render <%s>', (componentName) => {
        expect(wrapper.find(componentName).exists()).toBe(false)
      })
    })

    describe('and today is the delivery day', () => {
      beforeEach(() => {
        timeUtils.compareTodayToDeliveryDate.mockReturnValue('on')
        wrapper = mount(<DidntArrive {...PROPS} />)
      })

      describe('and the trackingUrl is available', () => {
        beforeEach(() => {
          wrapper.setProps({ trackingUrl: TRACKING_URL })
        })

        test('renders <OnDeliveryDayWithTracking> with the right props', () => {
          const component = wrapper.find('OnDeliveryDayWithTracking')

          expect(component.prop('deliverySlot')).toBe(DELIVERY_SLOT)
          expect(component.prop('trackMyBoxLink')).toBe(TRACKING_URL)
        })

        test.each([
          ['BeforeDeliveryDay'],
          ['OnDeliveryDayWithoutTracking']
        ])('does not render <%s>', (componentName) => {
          expect(wrapper.find(componentName).exists()).toBe(false)
        })
      })

      describe('and the trackingUrl is not available', () => {
        beforeEach(() => {
          wrapper.setProps({ trackingUrl: '' })
        })

        test('renders <OnDeliveryDayWithoutTracking> with the right props', () => {
          const component = wrapper.find('OnDeliveryDayWithoutTracking')

          expect(component.prop('deliverySlot')).toBe(DELIVERY_SLOT)
        })

        test.each([
          ['BeforeDeliveryDay'],
          ['OnDeliveryDayWithTracking']
        ])('does not render <%s>', (componentName) => {
          expect(wrapper.find(componentName).exists()).toBe(false)
        })
      })
    })

    describe('and today is after the delivery day', () => {
      beforeEach(() => {
        timeUtils.compareTodayToDeliveryDate.mockReturnValue('after')
        wrapper = mount(<DidntArrive {...PROPS} />)
      })

      test('redirects to the /didnt-arrive/validation, embedding the correct userId and orderId in the URL', () => {
        expect(browserHistory.push).toHaveBeenCalledWith(
          `/get-help/user/${USER_ID}/order/${ORDER_ID}/delivery/didnt-arrive/validation`
        )
      })
    })
  })

  describe.each([
    [false, false, false],
    [false, true, true],
    [true, false, true],
    [true, true, true],
  ])('When isOrderLoading is %s and isTrackingUrlLoading is %s', (
    isOrderLoading,
    isTrackingUrlLoading,
    isLoadingRendered,
  ) => {
    beforeEach(() => {
      wrapper.setProps({ isOrderLoading, isTrackingUrlLoading })
    })

    test(isLoadingRendered ? 'renders <LoadingWrapper>' : 'does not render <LoadingWrapper>', () => {
      expect(wrapper.find('LoadingWrapper').exists()).toBe(isLoadingRendered)
    })
  })

  describe.each([[false], [true]])('When isLoadOrderError prop is %s', (isLoadOrderError) => {
    beforeEach(() => {
      wrapper.setProps({ isLoadOrderError })
    })

    test(isLoadOrderError ? 'renders <Error>' : 'does not render <Error>', () => {
      expect(wrapper.find('Error').exists()).toBe(isLoadOrderError)
    })
  })
})
