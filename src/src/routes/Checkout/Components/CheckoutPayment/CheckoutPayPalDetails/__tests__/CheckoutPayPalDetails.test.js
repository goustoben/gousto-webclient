import React from 'react'
import { shallow } from 'enzyme'

import { clickCancelPayPal, clickConfirmPayPal, clickContinuePayPal } from 'actions/trackingKeys'
import { CheckoutPayPalDetails } from '../CheckoutPayPalDetails'
import css from '../CheckoutPayPalDetails.css'

describe('CheckoutPayPalDetails', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CheckoutPayPalDetails />)
  })

  test('should hide content', () => {
    expect(wrapper.hasClass(css.hide)).toBe(false)
  })

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('when hide is true', () => {
    beforeEach(() => {
      wrapper.setProps({ hide: true })
    })

    test('then it should be hidden', () => {
      expect(wrapper.hasClass(css.hide)).toBe(true)
    })

    test('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when PayPal initialized', () => {
    beforeEach(() => {
      wrapper.setState({ isPayPalInitialized: true })
    })

    test('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when PayPal setup is done', () => {
    let resetPaymentMethod

    beforeEach(() => {
      resetPaymentMethod = jest.fn()
      wrapper.setProps({
        isPayPalSetupDone: true,
        resetPaymentMethod,
      })
    })

    test('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    describe('when the form is submitting', () => {
      beforeEach(() => {
        wrapper.setProps({
          isSubmitting: true,
        })
      })

      test('should hide "Change payment method" button', () => {
        expect(wrapper.find(`.${css.paypalAlternativeText}`).exists()).toBe(false)
      })
    })

    describe('when user clicks on "Change payment method" link', () => {
      test('should trigger payment method reset', () => {
        wrapper.find(`.${css.resetPaymentMethod}`).simulate('click')

        expect(resetPaymentMethod).toHaveBeenCalled()
      })
    })
  })

  describe('when PayPal scripts and client token are loaded ', () => {
    let initPayPalMock

    beforeEach(() => {
      initPayPalMock = jest.fn()
      wrapper.instance().initPayPal = initPayPalMock

      wrapper.setProps({
        token: 'fake-client-token',
        paypalScriptsReady: true,
      })
    })

    test('should not init paypal', () => {
      expect(initPayPalMock).toHaveBeenCalled()
    })

    test('should init PayPal only once', () => {
      wrapper.setProps({
        firePayPalError: () => {},
      })

      expect(initPayPalMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('when component unmounted', () => {
    let clientInstance

    beforeEach(() => {
      clientInstance = {
        teardown: jest.fn()
      }
      wrapper.instance().clientInstance = clientInstance
    })

    test('should teardown PayPal', () => {
      wrapper.unmount()

      expect(clientInstance.teardown).toHaveBeenCalled()
    })
  })

  describe('given initPayPal method', () => {
    let setPayPalDeviceData
    let firePayPalError
    let setPayPalNonce
    let trackEvent
    let braintree
    let paypal
    const clientInstance = {
      name: 'client-instance'
    }
    const dataCollectorInstance = {
      name: 'data-collector-instance',
      deviceData: JSON.stringify({ correlationId: 'dsfgsdfg' })
    }
    let paypalButtonsInstance = {
      name: 'data-collector-instance',
      render: jest.fn(() => Promise.resolve())
    }
    let paypalCheckoutInstance = {
      loadPayPalSDK: jest.fn(() => Promise.resolve()),
      createPayment: jest.fn(() => Promise.resolve()),
      tokenizePayment: jest.fn(() => Promise.resolve({ nonce: 'fake-nonce' }))
    }

    beforeEach(() => {
      setPayPalDeviceData = jest.fn()
      firePayPalError = jest.fn()
      setPayPalNonce = jest.fn()
      trackEvent = jest.fn()
      paypalButtonsInstance = {
        render: jest.fn(() => Promise.resolve())
      }
      paypalCheckoutInstance = {
        loadPayPalSDK: jest.fn(() => Promise.resolve()),
        createPayment: jest.fn(() => Promise.resolve()),
        tokenizePayment: jest.fn(() => Promise.resolve({ nonce: 'fake-nonce' }))
      }

      braintree = {
        client: {
          create: jest.fn(() => Promise.resolve(clientInstance))
        },
        dataCollector: {
          create: jest.fn(() => Promise.resolve(dataCollectorInstance))
        },
        paypalCheckout: {
          create: jest.fn(() => Promise.resolve(paypalCheckoutInstance))
        },
      }

      paypal = {
        FUNDING: {
          PAYPAL: 'PAYPAL',
        },
        Buttons: jest.fn(() => paypalButtonsInstance),
      }

      global.braintree = braintree
      global.paypal = paypal

      wrapper.setProps({
        token: 'fake-client-token',
        setPayPalDeviceData,
        firePayPalError,
        setPayPalNonce,
        trackEvent,
      })
    })

    describe('when called', () => {
      test('should create BrainTree client instance', async () => {
        await wrapper.instance().initPayPal()

        expect(braintree.client.create).toHaveBeenCalledWith({
          authorization: 'fake-client-token'
        })
      })

      test('should get device data', async () => {
        await wrapper.instance().initPayPal()

        expect(braintree.dataCollector.create).toHaveBeenCalledWith({
          client: clientInstance,
          paypal: true,
        })
        expect(setPayPalDeviceData).toHaveBeenCalledWith(dataCollectorInstance.deviceData)
      })

      test('should create PayPal checkout instance', async () => {
        await wrapper.instance().initPayPal()

        expect(braintree.paypalCheckout.create).toHaveBeenCalledWith({
          client: clientInstance
        })
      })

      test('should load PayPal SDK', async () => {
        await wrapper.instance().initPayPal()

        expect(paypalCheckoutInstance.loadPayPalSDK).toHaveBeenCalledWith({
          vault: true,
          commit: false,
          currency: 'GBP',
          intent: 'capture',
        })
      })

      test('should render PayPal button', async () => {
        await wrapper.instance().initPayPal()

        expect(paypal.Buttons).toHaveBeenCalledWith({
          fundingSource: paypal.FUNDING.PAYPAL,
          createBillingAgreement: expect.any(Function),
          onApprove: expect.any(Function),
          onCancel: expect.any(Function),
          onError: expect.any(Function)
        })
        expect(paypalButtonsInstance.render).toHaveBeenCalledWith('#paypal-container')
      })

      test('should update state after PayPal initialization', async () => {
        await wrapper.instance().initPayPal()

        expect(wrapper.state().isPayPalInitialized).toBe(true)
      })
    })

    describe('when PayPal initialization failed', () => {
      const error = new Error('PayPal error')

      beforeEach(() => {
        braintree.client.create = jest.fn(() => Promise.reject(error))
      })

      test('should fire PayPal error event', async () => {
        await wrapper.instance().initPayPal()

        expect(firePayPalError).toHaveBeenCalledWith(error)
      })

      test('should not update state', async () => {
        await wrapper.instance().initPayPal()

        expect(wrapper.state().isPayPalInitialized).toBe(false)
      })
    })

    describe('given PayPal button config', () => {
      let buttonConfig

      beforeEach(async () => {
        await wrapper.instance().initPayPal()

        // eslint-disable-next-line prefer-destructuring
        buttonConfig = paypal.Buttons.mock.calls[0][0]
      })

      describe('when createBillingAgreement called', () => {
        beforeEach(() => {
          buttonConfig.createBillingAgreement()
        })

        test('should trigger clickContinuePayPal event', () => {
          expect(trackEvent).toHaveBeenCalledWith(clickContinuePayPal)
        })

        test('should trigger event', () => {
          expect(paypalCheckoutInstance.createPayment).toHaveBeenCalledWith({
            flow: 'vault',
            locale: 'en_GB',
            billingAgreementDescription: 'Gousto recipe box subscription',
          })
        })
      })

      describe('when onApprove is called', () => {
        const approveData = {
          name: 'test-approve-data'
        }

        test('should trigger clickConfirmPayPal event', () => {
          buttonConfig.onApprove(approveData)

          expect(trackEvent).toHaveBeenCalledWith(clickConfirmPayPal)
        })

        test('should call fetchPayPalNonce', () => {
          const fetchPayPalNonce = jest.fn()
          wrapper.instance().fetchPayPalNonce = fetchPayPalNonce

          buttonConfig.onApprove(approveData)

          expect(fetchPayPalNonce).toHaveBeenCalledWith(approveData)
        })

        describe('when fetchPayPalNonce method is called', () => {
          describe('and it is successful', () => {
            test('should tokenize payment', async () => {
              await wrapper.instance().fetchPayPalNonce(approveData)

              expect(paypalCheckoutInstance.tokenizePayment).toHaveBeenCalledWith(approveData)
              expect(setPayPalNonce).toHaveBeenCalledWith('fake-nonce')
            })
          })

          describe('and it is failed', () => {
            test('should fire PayPal error event', async () => {
              const error = new Error('PayPal error')
              paypalCheckoutInstance.tokenizePayment = jest.fn(() => Promise.reject(error))

              await wrapper.instance().fetchPayPalNonce(approveData)

              expect(setPayPalNonce).not.toHaveBeenCalled()
              expect(firePayPalError).toHaveBeenCalledWith(error)
            })
          })
        })
      })

      describe('when onCancel called', () => {
        test('should trigger clickContinuePayPal event', () => {
          buttonConfig.onCancel()

          expect(trackEvent).toHaveBeenCalledWith(clickCancelPayPal)
        })
      })

      describe('when onError called', () => {
        test('should fire PayPal error event', () => {
          const error = new Error('PayPal error')

          buttonConfig.onError(error)

          expect(firePayPalError).toHaveBeenCalledWith(error)
        })
      })
    })
  })

  describe('when isCheckoutOverhaulEnabled is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        isCheckoutOverhaulEnabled: true
      })
    })

    test('then should be rendered correctly', () => {
      expect(wrapper.find('.checkoutOverhaul')).toHaveLength(1)
    })

    describe('and renderPayPalButton is called', () => {
      const paypalButtonsInstance = {
        name: 'data-collector-instance',
        render: jest.fn(() => Promise.resolve())
      }
      const paypalObj = {
        FUNDING: {
          PAYPAL: 'PAYPAL',
        },
        Buttons: jest.fn(() => paypalButtonsInstance),
      }

      beforeEach(() => {
        global.paypal = paypalObj
        wrapper.instance().renderPayPalButton()
      })

      test('then should have style', () => {
        expect(paypalObj.Buttons).toHaveBeenCalledWith(expect.objectContaining({
          fundingSource: 'PAYPAL',
          style: { height: 48 }
        }))
      })
    })
  })
})
