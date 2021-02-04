import React from 'react'
import { shallow } from 'enzyme'
import { checkoutClickContinueToPayment } from 'actions/trackingKeys'
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
    beforeEach(() => {
      expect(trackUTMAndPromoCode).not.toBeCalled()
      expect(submit).not.toBeCalled()
      wrapper.find(CheckoutButton).simulate('click')
    })

    test('should dispatch trackUTMAndPromoCode actions with proper parameters', () => {
      expect(trackUTMAndPromoCode).toHaveBeenCalledWith(checkoutClickContinueToPayment, 'desktop')
      expect(submit).toBeCalled()
    })
  })
})
