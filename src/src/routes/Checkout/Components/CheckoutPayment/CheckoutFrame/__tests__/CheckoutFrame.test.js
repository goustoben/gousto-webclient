import React from 'react'
import { mount } from 'enzyme'

import { CheckoutFrame } from 'routes/Checkout/Components/CheckoutPayment/CheckoutFrame'

jest.mock('routes/Checkout/Components/CheckoutPayment/config', () => ({
  publicKey: 'checkout-com-public-key',
}))

describe('CheckoutFrame', () => {
  let wrapper
  const Frames = {
    init: jest.fn(),
  }
  global.Frames = Frames

  afterEach(() => {
    Frames.init.mockClear()
  })

  describe('componentDidMount', () => {
    describe('should call Frames.init', () => {
      beforeEach(() => {
        wrapper = mount(<CheckoutFrame />)
        wrapper.instance().componentDidMount()
      })

      test('with the correct container selector', () => {
        const selector = wrapper.find('div').first().prop('className')

        expect(Frames.init).toHaveBeenCalledWith(expect.objectContaining({
          containerSelector: `.${selector}`,
        }))
      })

      test('with the correct public key', () => {
        expect(Frames.init).toHaveBeenCalledWith(expect.objectContaining({
          publicKey: 'checkout-com-public-key',
        }))
      })
    })
  })

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = mount(<CheckoutFrame />)
    })

    test('should create a frames-container for the iframe', () => {
      expect(wrapper.find('.frames-container')).toHaveLength(1)
    })
  })
})
