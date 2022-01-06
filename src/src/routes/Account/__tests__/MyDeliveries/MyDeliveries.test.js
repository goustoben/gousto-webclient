import React from 'react'
import { shallow } from 'enzyme'

import MyDeliveries from 'routes/Account/MyDeliveries/MyDeliveries'

const userLoadAddressesMock = jest.fn()
const userLoadNewOrdersMock = jest.fn()
const userLoadData = jest.fn()

describe('MyDeliveries', () => {
  let wrapper
  const requiredProps = {
    userLoadAddresses: userLoadAddressesMock,
    userLoadNewOrders: userLoadNewOrdersMock,
    userId: 'user-test-id',
    userLoadData,
  }

  beforeEach(() => {
    wrapper = shallow(<MyDeliveries {...requiredProps} />)
  })

  describe('fetchOrdersAndAddresses', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    test('should call userLoadAddresses', () => {
      expect(userLoadAddressesMock).toHaveBeenCalled()
    })

    test('should call userLoadAddresses', () => {
      expect(userLoadNewOrdersMock).toHaveBeenCalled()
    })

    describe('when user id is undefined', () => {
      beforeEach(() => {
        shallow(<MyDeliveries {...requiredProps} userId="" />)
      })

      test('should call userLoadData', () => {
        expect(userLoadData).toHaveBeenCalled()
      })
    })
  })

  describe('rendering', () => {
    const expectAlertAndRetryButton = (container, errorMessage) => {
      const alert = container.find('Alert')
      const buttons = container.find('Button')
      expect(alert.length).toEqual(1)
      expect(alert.find('p').prop('children')).toEqual(errorMessage)
      expect(buttons.length).toEqual(1)
      expect(buttons.at(0).childAt(0).text()).toEqual('Retry')
    }

    beforeEach(() => {
      wrapper.setProps({
        isFetchingOrders: false,
        isFetchingAddresses: false,
        didErrorFetchingPendingOrders: null,
        didErrorFetchingProjectedOrders: null,
        didErrorFetchingAddresses: null,
      })
    })

    test('should render a <div> with no props', () => {
      expect(wrapper.type()).toEqual('div')
    })

    test('should render 1 <CTA> component to add more boxes', () => {
      const cta = wrapper.find('CTA')
      expect(cta.length).toEqual(1)
      expect(cta.prop('children')).toEqual('Order another box')
    })

    test('should render 1 <OrdersList> component(s) when neither fetching orders or addresses is pending', () => {
      expect(wrapper.find('Connect(OrdersList)').length).toEqual(1)
      expect(wrapper.find('Loading').length).toEqual(0)
    })

    test('should render the Loading component instead of OrderList one when fetching orders is pending', () => {
      wrapper.setProps({ isFetchingOrders: true })
      expect(wrapper.find('Connect(OrdersList)').length).toEqual(0)
      expect(wrapper.find('Loading').length).toEqual(1)
    })

    test('should NOT render the Loading component when fetching addresses is pending', () => {
      wrapper.setProps({
        isFetchingAddresses: true
      })
      expect(wrapper.find('Connect(OrdersList)').length).toEqual(1)
      expect(wrapper.find('Loading').length).toEqual(0)
    })

    test('should render a specific error Alert and retry button when fetching orders fails', () => {
      const errorMessage = 'We\'re not able to display your upcoming orders right now. Please try again later.'
      wrapper.setProps({
        didErrorFetchingPendingOrders: 'error'
      })
      expectAlertAndRetryButton(wrapper, errorMessage)
    })

    test('should render a specific error Alert and retry button when fetching projected orders fails', () => {
      const errorMessage = 'We\'re not able to display your future deliveries right now. Please try again later.'
      wrapper.setProps({
        didErrorFetchingProjectedOrders: 'error'
      })
      expectAlertAndRetryButton(wrapper, errorMessage)
    })

    test('should render a specific error Alert and retry button when fetching addresses fails', () => {
      const errorMessage = 'We\'re not able to display your deliveries right now due to an issue retrieving your address. Please try again later.'
      wrapper.setProps({
        didErrorFetchingAddresses: 'error'
      })
      expectAlertAndRetryButton(wrapper, errorMessage)
    })

    test('should render a generic error Alert and retry button when fetching addresses and orders fails', () => {
      const errorMessage = 'We\'re not able to display your deliveries right now. Please try again later.'
      wrapper.setProps({
        didErrorFetchingAddresses: 'error',
        didErrorFetchingProjectedOrders: 'error',
        didErrorFetchingPendingOrders: 'error'
      })
      expectAlertAndRetryButton(wrapper, errorMessage)
    })
  })

  describe('when isGoustoOnDemandEnabled is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        isGoustoOnDemandEnabled: true
      })
    })

    test('then should render DeliveryCard', () => {
      expect(wrapper.find('DeliveryCard').exists()).toBeTruthy()
    })
  })
})
