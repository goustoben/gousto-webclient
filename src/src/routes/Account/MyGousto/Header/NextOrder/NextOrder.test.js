import React from 'react'
import { mount } from 'enzyme'
import * as windowUtils from 'utils/window'
import { safeJestMock } from '_testing/mocks'
import { NextOrder } from '.'

jest.mock('utils/window', () => ({
  windowOpen: jest.fn()
}))

describe('the NextOrder component', () => {
  let wrapper
  const LABEL = 'This is a label'
  const URL = 'this/is/a/path'
  const PRIMARY_MESSAGE = 'This is a message'
  const SECONDARY_MESSAGE = 'This is another message'
  const ORDER_ID = '1234'
  const trackButtonClick = jest.fn()
  const trackLinkClick = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <NextOrder
        boxTrackingUrl={null}
        hasDeliveryToday
        hasTooltip
        linkLabel={LABEL}
        linkUrl={URL}
        orderId={ORDER_ID}
        primaryMessage={PRIMARY_MESSAGE}
        secondaryMessage={SECONDARY_MESSAGE}
        trackButtonClick={trackButtonClick}
        trackLinkClick={trackLinkClick}
      />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {})

  test('should show the primary message', () => {
    expect(wrapper.find('OrderDetails').find('.message').at(0).text())
      .toBe(PRIMARY_MESSAGE)
  })

  test('should show the secondary message', () => {
    expect(wrapper.find('OrderDetails').find('.message').at(1).text())
      .toBe(SECONDARY_MESSAGE)
  })

  test('passes the linkLabel to CardWithLink"', () => {
    const linkLabel = wrapper.find('CardWithLink').prop('linkLabel')
    expect(linkLabel).toBe(LABEL)
  })

  test('passes the linkUrl to CardWithLink', () => {
    const linkUrl = wrapper.find('CardWithLink').prop('linkUrl')
    expect(linkUrl).toBe(URL)
  })

  test('passes the correct testingSelector to CardWithLink', () => {
    expect(wrapper.find('CardWithLink').prop('testingSelector')).toBe('nextBoxDeliveryHelp')
  })

  test('the clientRouted prop of CardWithLink is true', () => {
    expect(wrapper.find('CardWithLink').prop('clientRouted')).toBe(true)
  })

  test('passes the correct heading to OrderDetails', () => {
    expect(wrapper.find('OrderDetails').prop('heading')).toBe('Your next box delivery')
  })

  describe('When hasTooltip is true', () => {
    beforeEach(() => {
      wrapper.setProps({ hasTooltip: true })
    })

    test('passes the correct tooltipContent to CardWithLink', () => {
      expect(wrapper.find('CardWithLink').prop('tooltipContent'))
        .toBe('Any issues with this box? Let us know and we\'ll sort it out.')
    })
  })

  describe('When hasTooltip is false', () => {
    beforeEach(() => {
      wrapper.setProps({ hasTooltip: false })
    })

    test('does not pass tooltipContent to CardWithLink', () => {
      expect(wrapper.find('CardWithLink').prop('tooltipContent')).toBe(false)
    })
  })

  describe('When hasDeliveryToday is true', () => {
    beforeEach(() => {
      wrapper.setProps({ hasDeliveryToday: true })
    })

    describe('And CardWithLink prop "trackClick" is called', () => {
      beforeEach(() => {
        wrapper.find('CardWithLink').prop('trackClick')()
      })

      test('calls trackLinkClick with orderId', () => {
        expect(trackLinkClick).toHaveBeenCalledWith(ORDER_ID)
      })
    })
  })

  describe('When hasDeliveryToday is false', () => {
    beforeEach(() => {
      wrapper.setProps({ hasDeliveryToday: false })
    })

    test('trackLinkClick is not passed to CardWithLink', () => {
      expect(wrapper.find('CardWithLink').prop('trackClick')).toBe(null)
    })
  })

  describe('When boxTrackingUrl is passed', () => {
    const BOX_TRACKING_URL = 'www.courier.com/order/asdf'

    beforeEach(() => {
      wrapper.setProps({ boxTrackingUrl: BOX_TRACKING_URL })
    })

    test('renders the tracking button with the right copy', () => {
      expect(wrapper.find('Button').text()).toBe('Track my box')
    })

    describe('And the tracking button is clicked', () => {
      const windowOpen = safeJestMock(windowUtils, 'windowOpen')

      beforeEach(() => {
        wrapper.find('Button').prop('onClick')()
      })

      test('the trackButtonClick function is called with the orderId', () => {
        expect(trackButtonClick).toHaveBeenCalledWith(ORDER_ID)
      })

      test('opens the boxTrackingUrl', () => {
        expect(windowOpen).toHaveBeenCalledWith(BOX_TRACKING_URL)
      })
    })
  })
})
