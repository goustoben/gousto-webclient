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
  Frames.submitCard.mockResolvedValue({})

  const change = jest.fn()
  const cardTokenReady = jest.fn()
  const cardTokenisationFailed = jest.fn()
  const disableCardSubmission = jest.fn()

  afterEach(() => {
    Frames.init.mockClear()
    Frames.setCustomerName.mockClear()
    Frames.setBillingDetails.mockClear()
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

        test('with the correct class callbacks', () => {
          expect(Frames.init).toHaveBeenCalledWith(expect.objectContaining({
            frameActivated: wrapper.instance().frameActivated,
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

    describe('submit checkout frame ', () => {
      test('should call submitCard when updated', () => {
        wrapper = mount(<CheckoutFrame disableCardSubmission={disableCardSubmission} />)

        const submitCard = jest.fn()
        wrapper.instance().submitCard = submitCard
        wrapper.update()

        wrapper.setProps({ isSubmitCardEnabled: true })

        expect(submitCard).toHaveBeenCalled()
      })

      test('should not call submitCard when not updated', () => {
        wrapper = mount(<CheckoutFrame submitCheckoutFrame disableCardSubmission={disableCardSubmission} />)
        wrapper.setProps({ isSubmitCardEnabled: true })

        const submitCard = jest.fn()
        wrapper.instance().submitCard = submitCard
        wrapper.update()

        expect(submitCard).not.toHaveBeenCalled()
      })
    })

  })

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = mount(<CheckoutFrame />)
    })

    test('should create a framesContainer for the iframe', () => {
      expect(wrapper.find('.framesContainer')).toHaveLength(1)
    })
  })

  describe('cardTokenised', () => {
    beforeEach(() => {
      wrapper = mount(<CheckoutFrame change={change} formName={"checkout"} sectionName={"payment"} cardTokenReady={cardTokenReady} />)

      const mockEvent = {
        data: {
          cardToken: 'test-token'
        }
      }
      wrapper.instance().cardTokenised(
        mockEvent,
        wrapper.instance().paymentForm,
      )
    })

    test('should call Frames.addCardToken', () => {
      expect(Frames.addCardToken).toHaveBeenCalledWith(
        wrapper.instance().paymentForm,
        'test-token',
      )
    })

    test('should call change with the correct parameters', () => {
      expect(change).toHaveBeenCalledWith('checkout', 'payment.token', 'test-token')
    })

    test('should call the cardTokenReady prop', () => {
      expect(wrapper.find('.framesContainer')).toHaveLength(1)
    })

  })

  describe('frameActivated', () => {
    let cardName
    let billingAddress

    const mountCheckoutFrameWithProps = (props) => (
      mount(
        <CheckoutFrame
          change={change}
          formName="checkout"
          sectionName="payment"
          cardTokenReady={cardTokenReady}
          {...props}
        />
      )
    )

    describe('when props contain a valid customer name', () => {
      beforeEach(() => {
        cardName = 'Joe Bloggs'
      })

      test('should call Frames.setCustomerName', () => {
        wrapper = mountCheckoutFrameWithProps({ cardName })

        wrapper.instance().frameActivated()

        expect(Frames.setCustomerName).toHaveBeenCalledWith(cardName)
      })
    })

    describe('when props do not contain a valid customer name', () => {
      beforeEach(() => {
        cardName = ''
      })

      test('should not call Frames.setCustomerName', () => {
        wrapper = mountCheckoutFrameWithProps({ cardName })

        wrapper.instance().frameActivated()

        expect(Frames.setCustomerName).not.toHaveBeenCalled()
      })
    })

    describe('when props contain a valid billing address', () => {
      beforeEach(() => {
        billingAddress = {
          addressLine1: 'THE SHARD',
          addressLine2: '32 LONDON BRIDGE STREET',
          city: 'LONDON',
          postcode: 'SE1 9SG',
        }
      })

      test('should call Frames.setBillingDetails', () => {
        wrapper = mountCheckoutFrameWithProps({ billingAddress })

        wrapper.instance().frameActivated()

        expect(Frames.setBillingDetails).toHaveBeenCalledWith(billingAddress)
      })
    })

    describe('when props do not contain a valid billing address', () => {
      beforeEach(() => {
        billingAddress = null
      })

      test('should not call Frames.setBillingDetails', () => {
        wrapper = mountCheckoutFrameWithProps({ billingAddress })

        wrapper.instance().frameActivated()

        expect(Frames.setBillingDetails).not.toHaveBeenCalled()
      })
    })
  })

  describe('cardTokenisationFailed', () => {
    beforeEach(() => {
      wrapper = mount(<CheckoutFrame cardTokenisationFailed={cardTokenisationFailed} />)

      wrapper.instance().cardTokenisationFailed()
    })

    test('should call the cardTokenisationFailed prop', () => {
      expect(cardTokenisationFailed).toHaveBeenCalled()
    })
  })
})
