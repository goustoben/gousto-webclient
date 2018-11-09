import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import DeliveryDetailsComponent from 'routes/Checkout/Components/Delivery/DeliveryDetails/DeliveryDetails'

import DeliveryInstruction from 'routes/Checkout/Components/Delivery/DeliveryDetails/DeliveryInstruction'
import DeliveryPhoneNumber from 'routes/Checkout/Components/Delivery/DeliveryDetails/DeliveryPhoneNumber'
import DeliveryAddressType from 'routes/Checkout/Components/Delivery/DeliveryDetails/DeliveryAddressType'

describe('DeliveryDetails', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<DeliveryDetailsComponent />)
  })

  test('should return div', () => {
    expect(wrapper.type()).toEqual('div')
  })

  describe('rendering', () => {
    test('should render 1 <DeliveryInstruction> component(s)', () => {
      expect(wrapper.find(DeliveryInstruction).length).toEqual(1)
    })

    test('should render 1 <DeliveryPhoneNumber> component(s)', () => {
      expect(wrapper.find(DeliveryPhoneNumber).length).toEqual(1)
    })

    test('should render 1 <DeliveryAddressType> component(s)', () => {
      expect(wrapper.find(DeliveryAddressType).length).toEqual(1)
    })
  })
})
