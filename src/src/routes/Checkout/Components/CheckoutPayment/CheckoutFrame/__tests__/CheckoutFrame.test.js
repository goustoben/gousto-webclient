import React from 'react'
import { mount } from 'enzyme'

import { CheckoutFrame } from '../CheckoutFrame'

jest.mock('routes/Checkout/Components/CheckoutPayment/config', () => ({
  publicKey: 'checkout-com-public-key',
}))

describe('CheckoutFrame', () => {
  let wrapper
  const Frames = {
    init: jest.fn(),
    setCustomerName: jest.fn(),
    setBillingDetails: jest.fn(),
    submitCard: jest.fn(),
    addCardToken: jest.fn()
  }
  global.Frames = Frames
  const change = jest.fn()
  const cardTokenReady = jest.fn()

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
          wrapper = mount(<CheckoutFrame checkoutScriptReady />)
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
    describe('card name', () => {
      const testName = 'test name'
      test('should call Frames.setCustomerName when updated', () => {
        wrapper = mount(<CheckoutFrame />)
        Frames.setCustomerName.mockClear()
        wrapper.setProps({ cardName: testName })

        expect(Frames.setCustomerName).toHaveBeenCalled()
      })

      test('should not call Frames.setCustomerName when not updated', () => {
        wrapper = mount(<CheckoutFrame cardName={testName} />)
        Frames.setCustomerName.mockClear()
        wrapper.setProps({ cardName: testName })

        expect(Frames.setCustomerName).not.toHaveBeenCalled()
      })
    })

    describe('billing address ', () => {
      const testAddress = {
        addressLine1:"1 Test street",
        city:"London",
        postcode: "L0N D0N"
      }

      test('should call Frames.setBillingDetails when updated', () => {
        wrapper = mount(<CheckoutFrame />)
        Frames.setBillingDetails.mockClear()
        wrapper.setProps({ billingAddress: testAddress })

        expect(Frames.setBillingDetails).toHaveBeenCalled()
      })

      test('should not call Frames.setBillingDetails when not updated', () => {
        wrapper = mount(<CheckoutFrame billingAddress={testAddress} />)
        Frames.setBillingDetails.mockClear()
        wrapper.setProps({ billingAddress: testAddress })

        expect(Frames.setBillingDetails).not.toHaveBeenCalled()
      })
    })

    describe('checkout script ready ', () => {
      test('should call Frames.init when updated', () => {
        wrapper = mount(<CheckoutFrame />)
        wrapper.setProps({ checkoutScriptReady: true })

        expect(Frames.init).toHaveBeenCalled()
      })

      test('should not call Frames.init when not updated', () => {
        wrapper = mount(<CheckoutFrame checkoutScriptReady />)
        Frames.init.mockClear()
        wrapper.setProps({ checkoutScriptReady: true })

        expect(Frames.init).not.toHaveBeenCalled()
      })
    })

    describe('submit checkout frame ', () => {
      test('should call Frames.submitCard when updated', () => {
        wrapper = mount(<CheckoutFrame />)
        wrapper.setProps({ submitCheckoutFrame: true })

        expect(Frames.submitCard).toHaveBeenCalled()
      })

      test('should not call Frames.submitCard when not updated', () => {
        wrapper = mount(<CheckoutFrame submitCheckoutFrame />)
        Frames.submitCard.mockClear()
        wrapper.setProps({ submitCheckoutFrame: true })

        expect(Frames.submitCard).not.toHaveBeenCalled()
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

  describe('card tokenised', () => {
    beforeEach(() => {
      wrapper = mount(<CheckoutFrame change={change} formName={"checkout"} sectionName={"payment"}cardTokenReady={cardTokenReady} />)

      const mockEvent = {
        data: {
          cardToken: 'test-token'
        }
      }
      wrapper.instance().cardTokenised(mockEvent,'form')
    })

    test('should call Frames.addCardToken', () => {
      expect(Frames.addCardToken).toHaveBeenCalled()
    })

    test('should call change with the correct parameters', () => {
      expect(change).toHaveBeenCalledWith('checkout', 'payment.token', 'test-token')
    })

    test('should call the cardTokenReady prop', () => {
      expect(wrapper.find('.frames-container')).toHaveLength(1)
    })

  })
})
