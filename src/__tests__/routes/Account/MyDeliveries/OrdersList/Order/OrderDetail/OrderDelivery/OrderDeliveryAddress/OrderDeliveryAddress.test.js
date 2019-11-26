import Immutable from 'immutable'
import React from 'react'
import { shallow } from 'enzyme'
import { Alert, Button } from 'goustouicomponents'
import Link from 'Link'
import { LinkButton } from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/LinkButton'
import { OrderDeliveryAddress } from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDeliveryAddress/OrderDeliveryAddress'
import { Address } from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDeliveryAddress/Address'

describe('OrderDeliveryAddress', () => {
  let wrapper
  const addresses = Immutable.fromJS({
    '100': {
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
    '101': {
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
  })
  const orderAddressChangeMock = jest.fn()
  const userTrackToggleEditAddressSectionMock = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<OrderDeliveryAddress
      orderId={'8'}
      orderState={'menu open'}
      shippingAddressId={'100'}
      addresses={addresses}
      orderAddressChange={orderAddressChangeMock}
      hasError={false}
      isPendingUpdateAddress={false}
      userTrackToggleEditAddressSection={userTrackToggleEditAddressSectionMock}
      userTrackAddressSelected={() => {}}
    />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('render', () => {
    test('should render the current shipping address passed', () => {
      expect(wrapper.find('.currentAddress').text()).toContain('My Address')
      expect(wrapper.find('.currentAddress').text()).toContain('Unit 1, Morris House, Swainson Road, LONDON, W3 7UP')
    })

    test('should not render a <LinkButton/> if state is scheduled', () => {
      wrapper.setProps({orderState:'scheduled'})
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
        expect(wrapper.find(Address).length).toEqual(2)
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
    })

    test('should render Alert if hasError is true', () => {
      wrapper.setProps({hasError: true})

      expect(wrapper.find(Alert).length).toEqual(1)
    })

  })
})
