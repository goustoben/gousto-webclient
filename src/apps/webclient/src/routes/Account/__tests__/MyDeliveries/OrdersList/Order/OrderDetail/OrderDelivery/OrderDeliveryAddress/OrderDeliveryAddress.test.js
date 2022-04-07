import Immutable from 'immutable'
import React from 'react'
import { shallow } from 'enzyme'
import { Alert, Button } from 'goustouicomponents'
import Link from 'Link'
import { getUserShippingAddressFromCustomerService } from 'selectors/user'
import { LinkButton } from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/LinkButton'
import { OrderDeliveryAddress } from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDeliveryAddress/OrderDeliveryAddress'
import { Address } from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDeliveryAddress/Address'
import { buildUserAddresses } from '../../../../../../../__testUtils__'

describe('OrderDeliveryAddress', () => {
  let wrapper

  const customShippingAddresses = {
    100: {
      companyName: null,
      county: null,
      name: 'My Address',
      postcode: 'W3 7UP',
      state: 'unset',
      town: 'LONDON',
      deleted: false,
      customerId: '1',
      deliveryInstructions: 'Front Porch',
      type: 'shipping',
      id: '100',
      line1: 'Unit 1, Morris House',
      line2: 'Swainson Road',
      line3: ''
    },
    101: {
      companyName: '',
      county: 'Greater London',
      name: 'Test Address',
      postcode: 'W3 7UP',
      state: 'valid',
      town: 'London',
      deleted: false,
      customerId: '1',
      deliveryInstructions: 'Front Porch',
      type: 'shipping',
      id: '101',
      line1: 'Unit 2, Test Building',
      line2: 'Test Street',
      line3: ''
    }
  }
  const { state } = buildUserAddresses({
    hasShipping: true,
    customShippingAddress: customShippingAddresses
  })

  const addresses = getUserShippingAddressFromCustomerService(state)

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when addresses and orders are defined', () => {
    const orderAddressChangeMock = jest.fn()
    const userTrackToggleEditAddressSectionMock = jest.fn()
    const mockOrderShippingAddress = Immutable.fromJS({
      companyName: '',
      county: 'Greater London',
      name: 'Test temporary address for my order',
      postcode: 'W3 7UP',
      state: 'valid',
      town: 'London',
      deleted: false,
      customerId: '1',
      deliveryInstructions: 'Front Porch',
      type: 'shipping',
      id: '999',
      line1: 'Unit 2, Test Building 2',
      line2: 'Test Random Street for my order',
      line3: ''
    })

    beforeEach(() => {
      wrapper = shallow(<OrderDeliveryAddress
        orderId="8"
        orderState="menu open"
        shippingAddressId="999"
        addresses={addresses}
        orderAddressChange={orderAddressChangeMock}
        hasError={false}
        isPendingUpdateAddress={false}
        userTrackToggleEditAddressSection={userTrackToggleEditAddressSectionMock}
        userTrackAddressSelected={() => {}}
        shippingAddress={mockOrderShippingAddress}
      />)
    })

    test('should render the shipping address from order', () => {
      expect(wrapper.find('.currentAddress').text()).toContain('Test temporary address for my order')
      expect(wrapper.find('.currentAddress').text()).toContain('Unit 2, Test Building 2, Test Random Street for my order, London, W3 7UP')
    })

    test('should not render a <LinkButton/> if state is scheduled', () => {
      wrapper.setProps({orderState: 'scheduled'})
      expect(wrapper.find(LinkButton).length).toEqual(0)
    })

    test('should render a <LinkButton/> if state is menu open', () => {
      expect(wrapper.find(LinkButton).length).toEqual(1)
    })

    test('should not render <Address/> if editDeliveryMode is false', () => {
      expect(wrapper.find(Address).length).toEqual(0)
    })

    test('clicking change button should toggle editAddressOpen and fire tracking', () => {
      wrapper.find(LinkButton).simulate('click')
      expect(wrapper.state('editAddressOpen')).toEqual(true)
      expect(userTrackToggleEditAddressSectionMock).toHaveBeenCalledWith('8')
    })

    describe('when editAddressOpen state is true', () => {
      beforeEach(() => {
        wrapper.setState({editAddressOpen: true})
      })

      test('should render the correct number of <Address/>', () => {
        expect(wrapper.find(Address).length).toEqual(3)
      })

      test('should render the link to add a new address', () => {
        const link = wrapper.find(Link)
        expect(link.length).toEqual(1)
        expect(link.childAt(0).text()).toContain('Add new address to your account')
      })

      test('should call orderAddressChange when the submit button is clicked', () => {
        wrapper.setState({selectedAddressId: '101'})
        wrapper.find(Button).simulate('click')
        expect(orderAddressChangeMock).toHaveBeenCalledWith('8', '101')
      })

      describe('and when addresses from customer service is still loading', () => {
        beforeEach(() => {
          wrapper.setProps({ isFetchingUserAddresses: true })
        })

        test('should render <Loading/>', () => {
          expect(wrapper.find('Loading').length).toEqual(1)
        })
      })

      describe('and when customer service responds with errors', () => {
        beforeEach(() => {
          wrapper.setProps({ didErrorFetchingAddresses: { errors: ['error-description'] } })
        })

        test('should render Alert', () => {
          expect(wrapper.find(Alert).length).toEqual(1)
        })
      })
    })
  })

  describe('when order shipping address is null', () => {
    const orderAddressChangeMock = jest.fn()
    const userTrackToggleEditAddressSectionMock = jest.fn()

    beforeEach(() => {
      wrapper = shallow(<OrderDeliveryAddress
        orderId="8"
        orderState="menu open"
        shippingAddressId="101"
        addresses={addresses}
        orderAddressChange={orderAddressChangeMock}
        hasError={false}
        isPendingUpdateAddress={false}
        userTrackToggleEditAddressSection={userTrackToggleEditAddressSectionMock}
        userTrackAddressSelected={() => {}}
        shippingAddress={null}
      />)
    })

    test('should render the shipping address from customer services', () => {
      expect(wrapper.find('.currentAddress').text()).toContain('Test Street')
      expect(wrapper.find('.currentAddress').text()).toContain('Unit 2, Test Building')
    })
  })

  describe('when no shipping address is defined', () => {
    const orderAddressChangeMock = jest.fn()
    const userTrackToggleEditAddressSectionMock = jest.fn()
    const emptyAddressFromCustomerService = Immutable.Map({})
    const emptyAddressFromOrder = null

    beforeEach(() => {
      wrapper = shallow(<OrderDeliveryAddress
        orderId="8"
        orderState="menu open"
        shippingAddressId="101"
        addresses={emptyAddressFromCustomerService}
        orderAddressChange={orderAddressChangeMock}
        hasError={false}
        isPendingUpdateAddress={false}
        userTrackToggleEditAddressSection={userTrackToggleEditAddressSectionMock}
        userTrackAddressSelected={() => {}}
        shippingAddress={emptyAddressFromOrder}
      />)
    })

    test('should render Alert', () => {
      expect(wrapper.find(Alert).length).toEqual(1)
    })
  })
})
