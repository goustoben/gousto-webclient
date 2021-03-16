import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { FormSection } from 'redux-form'
import { Delivery } from 'routes/Checkout/Components/Delivery/Delivery'

describe('Delivery', () => {
  let wrapper
  const props = {
    deliveryDays: Immutable.Map([]),
    slotId: '',
    date: '',
  }

  beforeEach(() => {
    wrapper = shallow(<Delivery {...props} />)
  })

  test('should renders correctly', () => {
    expect(wrapper.type()).toEqual('div')
    expect(wrapper.find(FormSection)).toHaveLength(1)
  })

  describe('when isCheckoutOverhaulEnabled is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        isCheckoutOverhaulEnabled: true
      })
    })

    test('then should render DeliveryCard component', () => {
      expect(wrapper.find('DeliveryCard')).toHaveLength(1)
    })
  })
})
