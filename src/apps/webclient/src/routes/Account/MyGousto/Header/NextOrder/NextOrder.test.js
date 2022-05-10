import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import * as windowUtils from 'utils/window'
import configRoutes from 'config/routes'
import { safeJestMock } from '_testing/mocks'
import { NextOrder } from './NextOrder'

jest.mock('utils/window', () => ({
  windowOpen: jest.fn()
}))

jest.mock('../../../../GetHelp/utils/orders', () => ({
  getClientOrderState: (state, deliveryDate, recipeItems, phase) => {
    if (
      state === 'pending'
      && deliveryDate === '2021-07-17 00:00:00'
      && recipeItems.size === 2
      && phase === 'open'
    ) {
      return 'recipes chosen'
    }

    return 'getClientOrderState was not called with the right params, make the the test fail'
  }
}))

describe('the NextOrder component', () => {
  let wrapper
  const ORDER_ID = '1234'
  const ORDER_HUMAN_DELIVERY_DATE = 'Saturday 17th July'
  const ORDER_DELIVERY_DATE = '2021-07-17 00:00:00'
  const ORDER_PHASE = 'open'
  const ORDER_STATE = 'pending'
  const ORDER_TOTAL_PRICE = '25.12'
  const ORDER_IMAGE1_URL = 's3.image1.url'
  const ORDER_IMAGE2_URL = 's3.image2.url'
  const ORDER_IMAGE1_TITLE = 'Pineapple Pizza'
  const ORDER_IMAGE2_TITLE = 'Paella with chorizo'
  const ORDER = Immutable.fromJS({
    id: ORDER_ID,
    deliveryDate: ORDER_DELIVERY_DATE,
    humanDeliveryDate: ORDER_HUMAN_DELIVERY_DATE,
    phase: ORDER_PHASE,
    prices: {
      total: ORDER_TOTAL_PRICE,
    },
    recipeItems: [
      {
        title: ORDER_IMAGE1_TITLE,
        media: [
          {
            type: 'wrong-type',
            urls: [],
          },
          {
            type: 'mood-image',
            urls: [
              { src: 'Irrelevant, the first one is not selected' },
              { src: ORDER_IMAGE1_URL }
            ]
          }
        ],
      },
      {
        title: ORDER_IMAGE2_TITLE,
        media: [
          {
            type: 'wrong-type',
            urls: [],
          },
          {
            type: 'mood-image',
            urls: [
              { src: 'Irrelevant, the first one is not selected' },
              { src: ORDER_IMAGE2_URL }
            ]
          }
        ],
      },
    ],
    state: ORDER_STATE,
  })
  const trackNextBoxTrackingClick = jest.fn()
  const trackClickGetHelpWithThisBox = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <NextOrder
        boxTrackingUrl={null}
        hasDeliveryToday={false}
        hasTooltip
        order={ORDER}
        trackNextBoxTrackingClick={trackNextBoxTrackingClick}
        trackClickGetHelpWithThisBox={trackClickGetHelpWithThisBox}
      />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {})

  test('renders OrderDetails with the right props inside a Card', () => {
    const orderDetails = wrapper.find('Card').find('OrderDetails')

    expect(orderDetails.prop('deliveryDate')).toBe(ORDER_DELIVERY_DATE)
    expect(orderDetails.prop('orderState')).toBe('recipes chosen')
    expect(orderDetails.prop('price')).toBe(ORDER_TOTAL_PRICE)
    expect(orderDetails.prop('recipeImages')).toEqual([
      {
        alt: ORDER_IMAGE1_TITLE,
        src: ORDER_IMAGE1_URL,
      },
      {
        alt: ORDER_IMAGE2_TITLE,
        src: ORDER_IMAGE2_URL,
      },
    ])
  })

  describe('When hasTooltip is true', () => {
    beforeEach(() => {
      wrapper.setProps({ hasTooltip: true })
    })

    test('renders the tooltip', () => {
      expect(wrapper.find('InfoTip').text())
        .toBe('Any issues with this box? Let us know and we\'ll sort it out.')
    })

    test('renders the close button in the tooltip', () => {
      expect(wrapper.find('InfoTip').prop('isCloseIconVisible')).toBe(true)
    })
  })

  describe('When hasTooltip is false', () => {
    beforeEach(() => {
      wrapper.setProps({ hasTooltip: false })
    })

    test('does not render the tooltip', () => {
      expect(wrapper.find('InfoTip').exists()).toBe(false)
    })
  })

  describe('When hasDeliveryToday is true', () => {
    beforeEach(() => {
      wrapper.setProps({ hasDeliveryToday: true })
    })

    test('renders correct Heading', () => {
      expect(wrapper.find('Heading').contains('Today\'s delivery')).toBe(true)
    })

    test('renders the link to My deliveries next to the heading', () => {
      const myDeliveriesLink = wrapper.find('.headingWrapper').find('GoustoLink')
      expect(myDeliveriesLink.text()).toBe('View deliveries')
    })

    test('the link next to the Heading points to My Deliveries', () => {
      const myDeliveriesLink = wrapper.find('.headingWrapper').find('GoustoLink')
      expect(myDeliveriesLink.prop('to')).toBe(configRoutes.client.myDeliveries)
    })

    test('renders a Link pointing to Get Help', () => {
      expect(wrapper.find('.cta').find('GoustoLink').prop('to')).toBe(`/get-help?orderId=${ORDER_ID}`)
    })

    test('renders a CTA with the correct copy, within the Link ', () => {
      expect(wrapper.find('.cta').find('GoustoLink').find('CTA').text()).toBe('Any issues with this box?')
    })

    describe('And the Get Help CTA is clicked', () => {
      beforeEach(() => {
        wrapper.find('CTA').simulate('click')
      })

      test('calls trackClickGetHelpWithThisBox with orderId', () => {
        expect(trackClickGetHelpWithThisBox).toHaveBeenCalledWith(ORDER_ID)
      })
    })
  })

  describe('When hasDeliveryToday is false', () => {
    beforeEach(() => {
      wrapper.setProps({ hasDeliveryToday: false })
    })

    test('renders correct Heading', () => {
      expect(wrapper.find('Heading').contains('Upcoming delivery')).toBe(true)
    })

    test('does not render the link to My deliveries next to the heading', () => {
      expect(wrapper.find('.headingWrapper').find('GoustoLink').exists()).toBe(false)
    })

    test('renders a Link pointing to My Deliveries', () => {
      expect(wrapper.find('.cta').find('GoustoLink').prop('to')).toBe('/my-deliveries')
    })

    test('renders a CTA with the correct copy, within the Link ', () => {
      expect(wrapper.find('.cta').find('GoustoLink').find('CTA').text()).toBe('View my upcoming deliveries')
    })

    describe('And the Get Help CTA is clicked', () => {
      beforeEach(() => {
        wrapper.find('CTA').simulate('click')
      })

      test('trackClickGetHelpWithThisBox is not called', () => {
        expect(trackClickGetHelpWithThisBox).not.toHaveBeenCalled()
      })
    })
  })

  describe('When boxTrackingUrl is passed', () => {
    const BOX_TRACKING_URL = 'www.courier.com/order/asdf'

    beforeEach(() => {
      wrapper.setProps({ boxTrackingUrl: BOX_TRACKING_URL })
    })

    test('renders the tracking button with the right copy', () => {
      expect(wrapper.find('CTA').at(0).text()).toBe('Track my box')
    })

    test('renders the tracking button with primary style', () => {
      expect(wrapper.find('CTA').at(0).prop('variant')).toBe('primary')
    })

    test('renders the non tracking button as secondary', () => {
      expect(wrapper.find('CTA').at(1).prop('variant')).toBe('secondary')
    })

    describe('And the tracking button is clicked', () => {
      const windowOpen = safeJestMock(windowUtils, 'windowOpen')

      beforeEach(() => {
        wrapper.find('CTA').at(0).prop('onClick')()
      })

      test('the trackNextBoxTrackingClick function is called with the orderId', () => {
        expect(trackNextBoxTrackingClick).toHaveBeenCalledWith(ORDER_ID)
      })

      test('opens the boxTrackingUrl', () => {
        expect(windowOpen).toHaveBeenCalledWith(BOX_TRACKING_URL)
      })
    })
  })

  describe('When boxTrackingUrl is not passed', () => {
    beforeEach(() => {
      wrapper.setProps({ boxTrackingUrl: null })
    })

    test('does not render the tracking button', () => {
      expect(wrapper.find('CTA')).toHaveLength(1)
    })

    describe('and the delivery is today', () => {
      beforeEach(() => {
        wrapper.setProps({ hasDeliveryToday: true })
      })

      test('renders the non tracking button as primary', () => {
        expect(wrapper.find('CTA').prop('variant')).toBe('primary')
      })
    })

    describe('and the delivery is not today', () => {
      beforeEach(() => {
        wrapper.setProps({ hasDeliveryToday: false })
      })

      test('renders the non tracking button as secondary', () => {
        expect(wrapper.find('CTA').prop('variant')).toBe('secondary')
      })
    })
  })
})
