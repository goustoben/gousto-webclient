import React from 'react'
import { shallow } from 'enzyme'
import { Address } from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDeliveryAddress/Address'

describe('Address', () => {
  let wrapper
  const selectAddressMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when address is selected', () => {
    beforeEach(() => {
      wrapper = shallow(<Address
        addressName="Home"
        formattedAddress="Flat 4, Morris House, London, W3 7UP"
        isSelected
        addressId="33"
        selectAddress={selectAddressMock}
      />)
    })

    it('should render the address content', () => {
      expect(wrapper.find('.addressName').text()).toEqual('Home')
      expect(wrapper.find('.addressDetails').text()).toEqual('Flat 4, Morris House, London, W3 7UP')
    })

    it('should NOT call selectAddress when input clicked', () => {
      const input = wrapper.find('input')
      input.simulate('click')
      expect(selectAddressMock).not.toHaveBeenCalled()
    })
  })

  describe('when address is NOT selected', () => {
    beforeEach(() => {
      wrapper = shallow(<Address
        addressName="Home"
        formattedAddress="Flat 4, Morris House, London, W3 7UP"
        isSelected={false}
        addressId="33"
        selectAddress={selectAddressMock}
      />)
    })

    it('should call selectAddress when input clicked', () => {
      const input = wrapper.find('input')
      input.simulate('click')
      expect(selectAddressMock).toHaveBeenCalledWith('33')
    })
  })
})
