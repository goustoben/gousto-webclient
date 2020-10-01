import React from 'react'
import { shallow } from 'enzyme'

import { PaymentMethod } from 'config/signup'
import { PaymentMethodSelector } from '../PaymentMethodSelector'
import { PaymentMethodSelectorListItem } from '../PaymentMethodSelectorListItem'

describe('given PaymentMethodSelector is rendered', () => {
  let wrapper
  let onPaymentMethodChanged

  beforeEach(() => {
    onPaymentMethodChanged = jest.fn()
    wrapper = shallow(
      <PaymentMethodSelector
        currentPaymentMethod={PaymentMethod.Unchosen}
        onPaymentMethodChanged={onPaymentMethodChanged}
      />
    )
  })

  test('it renders correctly', () => {
    expect(wrapper.find('.header')).toHaveLength(1)
    expect(wrapper.find(PaymentMethodSelectorListItem)).toHaveLength(2)
    expect(wrapper.find(PaymentMethodSelectorListItem).at(0).prop('paymentMethod')).toBe(PaymentMethod.Card)
    expect(wrapper.find(PaymentMethodSelectorListItem).at(1).prop('paymentMethod')).toBe(PaymentMethod.Paypal)
  })
})
