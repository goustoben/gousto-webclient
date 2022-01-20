import React from 'react'
import { shallow } from 'enzyme'
import { PayPalConfirmation } from '../PayPalConfirmation'

describe('Given PayPalConfirmation', () => {
  let wrapper
  const resetPaymentMethod = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<PayPalConfirmation resetPaymentMethod={resetPaymentMethod} />)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('Svg').exists()).toBeTruthy()
    expect(wrapper.find('.paypalAlternativeText')).toHaveLength(1)
  })

  describe('When user clicks on "change payment method" cta', () => {
    beforeEach(() => {
      wrapper.find('.resetPaymentMethod').simulate('click')
    })

    test('Then resetPaymentMethod should be called', () => {
      expect(resetPaymentMethod).toHaveBeenCalled()
    })
  })
})
