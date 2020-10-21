import React from 'react'
import { mount } from 'enzyme'
import { Delivery } from '../Delivery'

describe('given Delivery is rendered', () => {
  const userLoadOrders = jest.fn()
  const trackDeliveryOther = jest.fn()
  const trackDeliveryStatus = jest.fn()

  let wrapper

  const PROPS = {
    isNewSSRDeliveriesEnabled: false,
    nextOrderTracking: '',
    params: {
      userId: '123',
      orderId: '456',
    },
    trackDeliveryOther,
    trackDeliveryStatus,
    trackNextBoxTrackingClick: () => {},
    loadOrderTrackingInfo: () => {},
    userLoadOrders,
  }

  beforeEach(() => {
    userLoadOrders.mockClear()

    wrapper = mount(
      <Delivery {...PROPS} />
    )
  })

  describe('when the isNewSSRDeliveriesEnabled flag is disabled', () => {
    beforeEach(() => {
      wrapper.setProps({ isNewSSRDeliveriesEnabled: false })
    })

    test('loads the DeliverySimple component', () => {
      expect(wrapper.find('DeliverySimple').exists()).toBe(true)
    })
  })

  describe('when the isNewSSRDeliveriesEnabled flag is enabled', () => {
    beforeEach(() => {
      wrapper.setProps({ isNewSSRDeliveriesEnabled: true })
    })

    test('the page title is being rendered correctly', () => {
      expect(wrapper.find('GetHelpLayout2').prop('headingText')).toEqual('Get help with box issue?')
    })

    test('the userOrder is fetched', () => {
      expect(userLoadOrders).toHaveBeenCalled()
    })

    test('each item has the correct `to` and `label` set to them', () => {
      const items = wrapper.find('ItemLink')
      const ITEMS = [
        {
          label: 'I don\'t know when my box will arrive',
          to: `/get-help/user/${PROPS.params.userId}/order/${PROPS.params.orderId}/delivery/dont-know-when`,
        },
        {
          label: 'My box did not arrive',
          to: `/get-help/user/${PROPS.params.userId}/order/${PROPS.params.orderId}/delivery/didnt-arrive`,
        },
        {
          label: 'I had another issue',
          to: '/get-help/contact',
        },
      ]

      items.forEach((item, index) => {
        expect(item.prop('label')).toBe(ITEMS[index].label)
        expect(item.prop('to')).toBe(ITEMS[index].to)
      })
    })

    describe('and "I had another issue" button is clicked', () => {
      let ItemLink

      beforeEach(() => {
        ItemLink = wrapper.find('ItemLink').last()
        ItemLink.find('Item').simulate('click')
      })

      test('the button is calling the tracking function correctly', () => {
        expect(trackDeliveryOther).toHaveBeenCalledTimes(1)
      })
    })
  })
})
