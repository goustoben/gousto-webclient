import React from 'react'
import { shallow } from 'enzyme'

import { PaymentMethod } from 'config/signup'
import { PaymentMethodSelector } from '../PaymentMethodSelector'
import { PaymentMethodSelectorListItem } from '../PaymentMethodSelectorListItem'

describe('PaymentMethodSelector', () => {
  let wrapper
  let onPaymentMethodChanged

  beforeEach(() => {
    onPaymentMethodChanged = jest.fn()
    wrapper = shallow(
      <PaymentMethodSelector
        currentPaymentMethod={PaymentMethod.Card}
        onPaymentMethodChanged={onPaymentMethodChanged}
        showSelector
      />
    )
  })

  describe('when is rendered', () => {
    test('should render header', () => {
      expect(wrapper.find('.header')).toHaveLength(1)
    })

    test('should render payment options', () => {
      expect(wrapper.find(PaymentMethodSelectorListItem)).toHaveLength(2)
      expect(wrapper.find(PaymentMethodSelectorListItem).at(0).prop('paymentMethod')).toBe(PaymentMethod.Card)
      expect(wrapper.find(PaymentMethodSelectorListItem).at(1).prop('paymentMethod')).toBe(PaymentMethod.PayPal)
    })
  })

  describe('when showSelector is false', () => {
    beforeEach(() => {
      wrapper = shallow(
        <PaymentMethodSelector
          currentPaymentMethod={PaymentMethod.Card}
          onPaymentMethodChanged={onPaymentMethodChanged}
          showSelector={false}
        />
      )
    })

    test('should render header', () => {
      expect(wrapper.find('.header')).toHaveLength(1)
    })

    test('should not render payment options', () => {
      expect(wrapper.find(PaymentMethodSelectorListItem)).toHaveLength(0)
    })
  })
})
