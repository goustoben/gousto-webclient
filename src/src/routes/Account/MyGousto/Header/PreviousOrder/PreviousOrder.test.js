import React from 'react'
import { mount } from 'enzyme'
import { PreviousOrder } from '.'

describe('the PreviousOrder component', () => {
  let wrapper
  const URL = 'this/is/a/path'
  const MESSAGE = 'Please click here, I beg you'
  const ORDER_ID = '4455'
  const trackClick = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <PreviousOrder
        hasTooltip
        linkUrl={URL}
        orderId={ORDER_ID}
        message={MESSAGE}
        trackClick={trackClick}
      />
    )
  })

  test('renders without crashing', () => {})

  test('should show the primary message', () => {
    expect(wrapper.find('OrderDetails').find('.message').text())
      .toBe(MESSAGE)
  })

  test('renders CardWithLink with the right linkLabel', () => {
    const linkLabel = wrapper.find('CardWithLink').prop('linkLabel')
    expect(linkLabel).toBe('Get help with this box')
  })

  test('passes the linkUrl prop down to CardWithLink', () => {
    const linkUrl = wrapper.find('CardWithLink').prop('linkUrl')
    expect(linkUrl).toBe(URL)
  })

  test('the clientRouted prop of CardWithLink is true', () => {
    expect(wrapper.find('CardWithLink').prop('clientRouted')).toBe(true)
  })

  test('passes the correct heading to OrderDetails', () => {
    expect(wrapper.find('OrderDetails').prop('heading')).toBe('Your most recent box delivery')
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

  describe('When CardWithLink prop "trackClick" is called', () => {
    beforeEach(() => {
      wrapper.find('CardWithLink').prop('trackClick')()
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('calls trackClick with orderId', () => {
      expect(trackClick).toHaveBeenCalledWith(ORDER_ID)
    })
  })
})
