import React from 'react'
import { shallow } from 'enzyme'

import { PaymentMethod } from 'config/signup'
import { PaymentMethodSelectorListItem } from '../PaymentMethodSelectorListItem'

describe('PaymentMethodSelectorListItem', () => {
  let wrapper
  let onPaymentMethodChanged

  beforeEach(() => {
    onPaymentMethodChanged = jest.fn()
    wrapper = shallow(
      <PaymentMethodSelectorListItem
        paymentMethod={PaymentMethod.Card}
        currentPaymentMethod={PaymentMethod.PayPal}
        onPaymentMethodChanged={onPaymentMethodChanged}
      >
        content
      </PaymentMethodSelectorListItem>
    )
  })

  describe('when is rendered', () => {
    test('it renders correctly', () => {
      expect(wrapper.hasClass('isActive')).toBeFalsy()
      expect(wrapper.find('InputRadio')).toHaveLength(1)

      expect(wrapper.find('InputRadio .content')).toHaveLength(1)
      expect(wrapper.find('InputRadio .content').text()).toBe('content')
    })

    describe('when it represents the current payment method', () => {
      beforeEach(() => {
        wrapper.setProps({ currentPaymentMethod: PaymentMethod.Card })
      })

      test('then it should be active', () => {
        expect(wrapper.hasClass('isActive')).toBeTruthy()
      })
    })

    describe('when clicked', () => {
      test('it should invoke the callback', () => {
        wrapper.find('InputRadio').simulate('change')
        expect(onPaymentMethodChanged).toHaveBeenCalledWith(PaymentMethod.Card)
      })
    })
  })
})
