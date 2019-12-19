import React from 'react'
import { shallow } from 'enzyme'
import { FormSection } from 'redux-form'
import DeliveryComponent from 'routes/Checkout/Components/Delivery/Delivery'

import DeliveryAddress from 'routes/Checkout/Components/Delivery/DeliveryAddress'

describe('Delivery', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<DeliveryComponent />)
  })

  test('should return div', () => {
    expect(wrapper.type()).toEqual('div')
  })

  describe('rendering', () => {
    test('should render 1 <FormSection> component(s)', () => {
      expect(wrapper.find(FormSection).length).toEqual(1)
    })

    test('should render 1 <DeliveryAddress> component(s)', () => {
      expect(wrapper.find(DeliveryAddress).length).toEqual(1)
    })
  })
})
