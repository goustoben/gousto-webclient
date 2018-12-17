import React from 'react'
import { mount } from 'enzyme'

import actionTypes from 'actions/actionTypes'
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
    addCardToken: jest.fn(),
    unblockFields: jest.fn()
  }

  beforeEach(() => {
    global.Frames = Frames
  })
  Frames.submitCard.mockResolvedValue({})

  const change = jest.fn()
  const cardTokenReady = jest.fn()
  const fireCheckoutError = jest.fn()
  const disableCardSubmission = jest.fn()
  const fireCheckoutPendingEvent = jest.fn()

  afterEach(() => {
    Frames.init.mockClear()
    Frames.setCustomerName.mockClear()
    Frames.setBillingDetails.mockClear()
    Frames.submitCard.mockClear()
    Frames.addCardToken.mockClear()
    Frames.unblockFields.mockClear()
    change.mockClear()
    cardTokenReady.mockClear()
    fireCheckoutError.mockClear()
    disableCardSubmission.mockClear()
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
        wrapper = mount(<CheckoutFrame checkoutScriptReady />)
        Frames.setCustomerName.mockClear()
        wrapper.setProps({ cardName: testName })

        expect(Frames.setCustomerName).toHaveBeenCalled()
      })

      test('should not call Frames.setCustomerName when not updated', () => {
        wrapper = mount(<CheckoutFrame checkoutScriptReady cardName={testName} />)
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
        wrapper = mount(<CheckoutFrame checkoutScriptReady />)
        Frames.setBillingDetails.mockClear()
        wrapper.setProps({ billingAddress: testAddress })

        expect(Frames.setBillingDetails).toHaveBeenCalled()
      })

      test('should not call Frames.setBillingDetails when not updated', () => {
        wrapper = mount(<CheckoutFrame checkoutScriptReady billingAddress={testAddress} />)
        Frames.setBillingDetails.mockClear()
        wrapper.setProps({ billingAddress: testAddress })

        expect(Frames.setBillingDetails).not.toHaveBeenCalled()
      })
    })

    describe('has checkout error ', () => {
      const hasCheckoutError = true

      test('should call Frames.unblockFields when updated and value is true', () => {
        wrapper = mount(<CheckoutFrame checkoutScriptReady />)
        Frames.unblockFields.mockClear()
        wrapper.setProps({ hasCheckoutError: hasCheckoutError })

        expect(Frames.unblockFields).toHaveBeenCalled()
      })

      test('should call Frames.unblockFields when updated and value is false', () => {
        wrapper = mount(<CheckoutFrame checkoutScriptReady />)
        Frames.unblockFields.mockClear()
        wrapper.setProps({ hasCheckoutError: false })

        expect(Frames.unblockFields).not.toHaveBeenCalled()
      })

      test('should not call Frames.unblockFields when not updated', () => {
        wrapper = mount(<CheckoutFrame checkoutScriptReady hasCheckoutError={hasCheckoutError} />)
        Frames.unblockFields.mockClear()
        wrapper.setProps({ hasCheckoutError: hasCheckoutError })

        expect(Frames.unblockFields).not.toHaveBeenCalled()
      })
    })

    describe('submit checkout frame', () => {
      test('should call submitCard when updated', () => {
        wrapper = mount(<CheckoutFrame checkoutScriptReady disableCardSubmission={disableCardSubmission} fireCheckoutPendingEvent={fireCheckoutPendingEvent} />)

        const submitCard = jest.fn()
        wrapper.instance().submitCard = submitCard
        wrapper.update()

        wrapper.setProps({ isSubmitCardEnabled: true })

        expect(submitCard).toHaveBeenCalled()
      })

      test('should not call submitCard when not updated', () => {
        wrapper = mount(<CheckoutFrame checkoutScriptReady submitCheckoutFrame disableCardSubmission={disableCardSubmission} fireCheckoutPendingEvent={fireCheckoutPendingEvent}/>)
        wrapper.setProps({ isSubmitCardEnabled: true })

        const submitCard = jest.fn()
        wrapper.instance().submitCard = submitCard
        wrapper.update()

        expect(submitCard).not.toHaveBeenCalled()
      })
    })

  })

  describe('componentWillUnmount', () => {
    const reloadCheckoutScript = jest.fn()

    beforeEach(() => {
      wrapper = mount(<CheckoutFrame
        reloadCheckoutScript={reloadCheckoutScript}
      />)
      wrapper.unmount()
    })

    test('should remove the global Frames reference', () => {
      expect(global.Frames).toBe(undefined)
    })

    test('should call reloadCheckoutScript', () => {
      expect(reloadCheckoutScript).toHaveBeenCalled()
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
      wrapper = mount(<CheckoutFrame
        change={change}
        formName={"checkout"}
        sectionName={"payment"}
        cardTokenReady={cardTokenReady}
        trackingCardTokenisationSuccessfully={jest.fn()}
        trackingCardTokenisationFailed={jest.fn()}
        fireCheckoutPendingEvent={fireCheckoutPendingEvent}
      />)

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
      expect(change).toHaveBeenCalledWith('payment', 'payment.token', 'test-token')
    })

    test('should call the cardTokenReady prop', () => {
      expect(wrapper.find('.framesContainer')).toHaveLength(1)
    })

  })

  describe('frameActivated', () => {
    let cardName
    let billingAddress
    const checkoutFrameReady = jest.fn()

    const mountCheckoutFrameWithProps = (props) => (
      mount(
        <CheckoutFrame
          change={change}
          formName="checkout"
          sectionName="payment"
          cardTokenReady={cardTokenReady}
          checkoutFrameReady={checkoutFrameReady}
          {...props}
        />
      )
    )

    test('should call checkoutFrameReady prop', () => {
      wrapper = mountCheckoutFrameWithProps()

      wrapper.instance().frameActivated()

      expect(checkoutFrameReady).toHaveBeenCalled()
    })

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
      wrapper = mount(<CheckoutFrame
        fireCheckoutError={fireCheckoutError}
        trackingCardTokenisationSuccessfully={jest.fn()}
        trackingCardTokenisationFailed={jest.fn()}
        fireCheckoutPendingEvent={fireCheckoutPendingEvent}
      />)
    })

    test('should call the fireCheckoutError prop with correct action type when no error code in the event', () => {
      const event = {
        data: {
          errorCode:'',
          message:''
        }
      }
      wrapper.instance().cardTokenisationFailed(event)

      expect(fireCheckoutError).toHaveBeenCalledWith(actionTypes.NETWORK_FAILURE)
    })

    test('should call the fireCheckoutError prop with correct action type when error code in the event', () => {
      const event = {
        data: {
          errorCode:'82031',
          message:'card tokenisation failure'
        }
      }
      wrapper.instance().cardTokenisationFailed(event)

      expect(fireCheckoutError).toHaveBeenCalledWith(actionTypes.CARD_TOKENISATION_FAILED)
    })
  })

  describe('submit card', () => {
    beforeEach(async () => {
      wrapper = mount(<CheckoutFrame disableCardSubmission={disableCardSubmission} fireCheckoutError={fireCheckoutError} fireCheckoutPendingEvent={fireCheckoutPendingEvent}/>)

      await wrapper.instance().submitCard()
    })

    test('should call Frames.submitCard', () => {
      expect(Frames.submitCard).toHaveBeenCalled()
    })

    test('should call fireCheckoutError if the Frames.submitCard call fails', async () => {
      Frames.submitCard.mockClear()
      Frames.submitCard.mockRejectedValue({})

      wrapper = mount(<CheckoutFrame disableCardSubmission={disableCardSubmission} fireCheckoutError={fireCheckoutError} fireCheckoutPendingEvent={fireCheckoutPendingEvent}/>)

      await wrapper.instance().submitCard()
      expect(fireCheckoutError).toHaveBeenCalledWith(actionTypes.VALID_CARD_DETAILS_NOT_PROVIDED)
    })

    test('should call the disableCardSubmission prop', () => {
      expect(disableCardSubmission).toHaveBeenCalled()
    })
  })
})
