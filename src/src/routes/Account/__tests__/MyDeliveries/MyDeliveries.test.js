import React from 'react'
import { shallow } from 'enzyme'

import MyDeliveries from 'routes/Account/MyDeliveries/MyDeliveries'

const userLoadAddressesMock = jest.fn()
const userLoadNewOrdersMock = jest.fn()

describe('MyDeliveries', () => {
  describe('fetchOrdersAndAddresses', () => {
    beforeEach(() => {
      shallow(<MyDeliveries
        userLoadAddresses={userLoadAddressesMock}
        userLoadNewOrders={userLoadNewOrdersMock}
        userId="user-test-id"
        userLoadData={() => {}}
      />)
    })

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
      const userLoadData = jest.fn()

      beforeEach(() => {
        shallow(<MyDeliveries
          userLoadAddresses={userLoadAddressesMock}
          userLoadNewOrders={userLoadNewOrdersMock}
          userId=""
          userLoadData={userLoadData}
        />)
      })

      test('should call userLoadData', () => {
        expect(userLoadData).toHaveBeenCalled()
      })
    })
  })

  describe('rendering', () => {
    const expectAlertAndRetryButton = function (wrapper) {
      const alert = wrapper.find('Alert')
      const buttons = wrapper.find('Button')
      expect(alert.length).toEqual(1)
      expect(alert.find('p').prop('children')).toEqual('We\'re not able to display your deliveries right now. Please try again later.')
      expect(buttons.length).toEqual(1)
      expect(buttons.at(0).childAt(0).text()).toEqual('Retry')
    }

    let wrapper

    beforeEach(() => {
      wrapper = shallow(<MyDeliveries
        isFetchingOrders={false}
        isFetchingAddresses={false}
        didErrorFetchingOrders={null}
        didErrorFetchingAddresses={null}
        userLoadAddresses={userLoadAddressesMock}
        userLoadNewOrders={userLoadNewOrdersMock}
        userId="user-test-id"
        userLoadData={() => {}}
      />)
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
      wrapper = shallow(<MyDeliveries
        isFetchingOrders
        userLoadAddresses={userLoadAddressesMock}
        userLoadNewOrders={userLoadNewOrdersMock}
        userId="user-test-id"
        userLoadData={() => {}}
      />)
      expect(wrapper.find('Connect(OrdersList)').length).toEqual(0)
      expect(wrapper.find('Loading').length).toEqual(1)
    })

    test('should NOT render the Loading component when fetching addresses is pending', () => {
      wrapper = shallow(<MyDeliveries
        isFetchingAddresses
        userLoadAddresses={userLoadAddressesMock}
        userLoadNewOrders={userLoadNewOrdersMock}
        userId="user-test-id"
        userLoadData={() => {}}
      />)
      expect(wrapper.find('Connect(OrdersList)').length).toEqual(1)
      expect(wrapper.find('Loading').length).toEqual(0)
    })

    test('should render an error Alert and retry button when fetching orders fails', () => {
      wrapper = shallow(<MyDeliveries
        didErrorFetchingPendingOrders="error"
        userLoadAddresses={userLoadAddressesMock}
        userLoadNewOrders={userLoadNewOrdersMock}
        userId="user-test-id"
        userLoadData={() => {}}
      />)
      expectAlertAndRetryButton(wrapper)
    })

    test('should render an error Alert and retry button when fetching projected orders fails', () => {
      wrapper = shallow(<MyDeliveries
        didErrorFetchingProjectedOrders="error"
        userLoadAddresses={userLoadAddressesMock}
        userLoadNewOrders={userLoadNewOrdersMock}
        userId="user-test-id"
        userLoadData={() => {}}
      />)
      expectAlertAndRetryButton(wrapper)
    })

    test('should render an error Alert and retry button when fetching addresses fails', () => {
      wrapper = shallow(<MyDeliveries
        didErrorFetchingAddresses="error"
        userLoadAddresses={userLoadAddressesMock}
        userLoadNewOrders={userLoadNewOrdersMock}
        userId="user-test-id"
        userLoadData={() => {}}
      />)
      expectAlertAndRetryButton(wrapper)
    })
  })
})
