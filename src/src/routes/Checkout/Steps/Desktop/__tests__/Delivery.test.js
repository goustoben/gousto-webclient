import React from 'react'
import { shallow } from 'enzyme'

import { DeliveryStep } from '../Delivery/Delivery'
import CheckoutButton from '../../../Components/CheckoutButton'

describe('DeliveryStep', () => {
  let wrapper
  const trackUTMAndPromoCode = jest.fn()
  const submit = jest.fn()
  const props = {
    trackUTMAndPromoCode,
    submit,
    stepName: '',
    formValues: {
      delivery: {
        confirmed: true
      }
    }
  }

  beforeEach(() => {
    wrapper = shallow(<DeliveryStep {...props} />)
  })

  test('should render by default', () => {
    expect(wrapper).toBeDefined()
  })

  test('should have CheckoutButton button', () => {
    expect(wrapper.find(CheckoutButton)).toHaveLength(1)
  })

  describe('when Button clicked', () => {
    test('should dispatch trackUTMAndPromoCode actions with proper parameters', () => {
      expect(trackUTMAndPromoCode).not.toBeCalled()
      expect(submit).not.toBeCalled()
      wrapper.find(CheckoutButton).simulate('click')
      expect(trackUTMAndPromoCode).toHaveBeenCalledWith('clickNextPayment', 'desktop')
      expect(submit).toBeCalled()
    })
  })
})
