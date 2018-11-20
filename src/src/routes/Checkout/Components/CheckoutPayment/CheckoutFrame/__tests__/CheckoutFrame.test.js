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
    describe('with checkout script not ready', () => {
      beforeEach(() => {
        wrapper = mount(<CheckoutFrame />)
        wrapper.instance().componentDidMount()
      })

      test('should not call Frames.init', () => {
        expect(Frames.init).not.toHaveBeenCalled()
      })
    })

    describe('with checkout script loaded', () => {
      describe('should call Frames.init', () => {
        beforeEach(() => {
          wrapper = mount(<CheckoutFrame checkoutReady />)
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
  })

  describe('componentDidUpdate', () => {
    describe('with a pending checkout script', () => {
      beforeEach(() => {
        wrapper = mount(<CheckoutFrame />)
        wrapper.setProps({ checkoutReady: false })
      })

      test('should call Frames.init', () => {
        expect(Frames.init).not.toHaveBeenCalled()
      })
    })

    describe('updating to a ready checkout script', () => {
      beforeEach(() => {
        wrapper = mount(<CheckoutFrame />)
        wrapper.setProps({ checkoutReady: true })
      })

      test('should call Frames.init', () => {
        expect(Frames.init).toHaveBeenCalled()
      })
    })

    describe('with a ready checkout script', () => {
      beforeEach(() => {
        wrapper = mount(<CheckoutFrame checkoutReady />)
        Frames.init.mockClear()
        wrapper.setProps({ checkoutReady: true })
      })

      test('should not call Frames.init', () => {
        expect(Frames.init).not.toHaveBeenCalled()
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
