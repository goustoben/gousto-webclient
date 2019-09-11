import Immutable from 'immutable'

import React from 'react'
import { shallow } from 'enzyme'

import Address from 'routes/Checkout/Components/Address/Address'
import { Button } from 'goustouicomponents'
import Postcode from 'routes/Checkout/Components/Address/Postcode'
import AddressInputs from 'routes/Checkout/Components/Address/AddressInputs'

describe('Address', () => {
  let wrapper

  beforeEach(() => {
    const selectedAddresses = Immutable.Map({})
    wrapper = shallow(<Address selectedAddress={selectedAddresses} registerField={jest.fn()} />)
  })

  test('should return div', () => {
    expect(wrapper.type()).toBe('div')
  })

  describe('rendering', () => {
    beforeEach(() => {
      wrapper.setState({ addressSaved: false })
    })

    test('should render 1 <Postcode> component(s)', () => {
      expect(wrapper.find(Postcode).length).toBe(1)
    })

    test('should not render <AddressInputs> component(s)', () => {
      expect(wrapper.find(AddressInputs)).toHaveLength(0)
    })

    test('should render 1 <Button> component(s)', () => {
      expect(wrapper.find(Button)).toHaveLength(1)
    })
  })

})
