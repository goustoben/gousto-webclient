import React from 'react'
import { shallow } from 'enzyme'
import { CheckoutName } from '../CheckoutName'

describe('given CheckoutName', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <CheckoutName
        sectionName="payment"
        receiveRef={jest.fn()}
      />
    )
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('FormSection').exists()).toBeTruthy()
    expect(wrapper.find('.cardDetails')).toHaveLength(1)
  })

  describe('when isCheckoutOverhaulEnabled is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        isCheckoutOverhaulEnabled: true
      })
    })

    test('then should be rendered correctly', () => {
      expect(wrapper.find('.checkoutOverhaulContainer')).toHaveLength(1)
    })
  })
})
