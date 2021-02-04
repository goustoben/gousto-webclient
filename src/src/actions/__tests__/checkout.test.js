import Immutable from 'immutable'

import { fetchAddressByPostcode } from 'apis/addressLookup'
import { fetchReference, fetchPromoCodeValidity } from 'apis/customers'
import { authPayment, checkPayment, fetchPayPalToken } from 'apis/payments'

import { actionTypes } from 'actions/actionTypes'
import pricingActions from 'actions/pricing'
import { basketPromoCodeAppliedChange, basketPromoCodeChange } from 'actions/basket'
import { trackAffiliatePurchase, trackUTMAndPromoCode } from 'actions/tracking'
import * as trackingKeys from 'actions/trackingKeys'
import status from 'actions/status'
import { userSubscribe } from 'actions/user'

import routes from 'config/routes'
import { PaymentMethod } from 'config/signup'

import { getSlot, getDeliveryTariffId, deliveryTariffTypes } from 'utils/deliveries'
import { basketResetPersistent } from 'utils/basket'

import checkoutActions, {
  trackPurchase,
  checkoutNon3DSSignup,
  checkout3DSSignup,
  checkPaymentAuth,
  fireCheckoutError,
  fireCheckoutPendingEvent,
  checkoutPostSignup,
  checkoutClearErrors,
  trackPromocodeChange,
  checkoutAddressLookup,
  trackCheckoutButtonPressed,
  fetchPayPalClientToken,
  clearPayPalErrors,
  clearPayPalClientToken,
  setCurrentPaymentMethod,
  setPayPalDeviceData,
  setPayPalNonce,
  firePayPalError,
} from 'actions/checkout'

jest.mock('utils/basket', () => ({
  basketResetPersistent: jest.fn()
}))
jest.mock('utils/deliveries')

jest.mock('actions/login')
jest.mock('actions/menu')
jest.mock('actions/pricing')
jest.mock('actions/user', () => ({
  userSubscribe: jest.fn(() => Promise.resolve({
    status: 'ok',
    data: {
      orderId: '18057148',
      customer: {
        id: '41892653',
        authUserId: '1bc752cc-98d0-4937-a2a6-6e9cad21749d',
        email: 'john.doe@test.com',
        nameFirst: 'John',
        nameLast: 'Doe',
        phone: '07503075906',
        goustoReference: 2007339011,
        cancelled: false,
        createdAt: '2020-07-20T15:59:27+01:00',
        vip: false,
        marketingDoAllowThirdparty: false,
        marketingDoAllowEmail: false,
        marketingDoAllowSms: false,
        marketingDoAllowPost: false,
        marketingDoAllowPhone: false,
        shippingAddressId: '84350206',
        billingAddressId: '84350207',
        deliveryTariffId: '9037a447-e11a-4960-ae69-d89a029569af',
        salutation: {id: 1, label: 'Miss.', slug: 'miss'}
      },
      addresses: {
        billingAddress: {
          id: '84350207',
          customerId: '41892653',
          name: 'My Address',
          companyName: '',
          line1: 'FLAT 15, MORRIS HOUSE',
          line2: 'SWAINSON ROAD',
          line3: '',
          town: 'LONDON',
          county: 'MIDDLESEX',
          postcode: 'W3 7UP',
          deliveryInstructions: '',
          state: 'unset',
          type: 'billing',
          deleted: false
        },
        shippingAddress: {
          id: '84350206',
          customerId: '41892653',
          name: 'My Address',
          companyName: '',
          line1: 'FLAT 15, MORRIS HOUSE',
          line2: 'SWAINSON ROAD',
          line3: '',
          town: 'LONDON',
          county: 'MIDDLESEX',
          postcode: 'W3 7UP',
          deliveryInstructions: 'Front Porch',
          state: 'unset',
          type: 'shipping',
          deleted: false
        }
      },
      subscription: {
        id: '36613038',
        stateReason: null,
        interval: {id: '1', slug: 'weekly', title: 'Weekly', description: 'Our most popular option!'},
        status: {id: 1, slug: 'active'},
        box: {id: '18', portions: 2, recipes: 4},
        slot: null
      }
    }
  }))
}))
jest.mock('actions/basket')
jest.mock('actions/redirect', () => ({
  redirect: jest.fn(),
}))
jest.mock('actions/status', () => ({
  error: jest.fn(() => ({ type: 'error_action' })),
  pending: jest.fn(() => ({ type: 'pending_action' })),
}))
jest.mock('actions/tracking', () => ({
  trackAffiliatePurchase: jest.fn(() => ({ type: 'trackAffiliatePurchase' })),
  trackUTMAndPromoCode: jest.fn(() => ({ type: 'trackUTMAndPromoCode' }))
}))
jest.mock('apis/addressLookup', () => ({
  fetchAddressByPostcode: jest.fn(),
}))
jest.mock('apis/customers', () => ({
  fetchReference: jest.fn(() => Promise.resolve({
    status: 'ok',
    data: {
      goustoRef: '105979923'
    }
  })),
  fetchPromoCodeValidity: jest.fn((request) => Promise.resolve({
    status: 'ok',
    data: {
      valid: request.promo_code === 'DTI-SB-P30M'
    }
  })),
}))
jest.mock('apis/payments', () => ({
  authPayment: jest.fn(() => Promise.resolve({
    status: 'ok',
    data: {
      id: 'da850c38-c077-41cf-b860-0100ee48c0f1',
      cardToken: 'tok_7zlbjzbma4fenkbwzcxhmz5hee',
      reference: 'pay_4b55m3huev2e3pfyu5mixqecwq',
      status: 'challenge-pending',
      value: 3448,
      message: 'Requested redirect link for 3ds authorisation',
      responsePayload: {
        transactionId: 'pay_4b55m3huev2e3pfyu5mixqecwq',
        reference: 'da850c38-c077-41cf-b860-0100ee48c0f1',
        redirectLink: 'https://bank.uk/3dschallenge',
        message: 'Requested redirect link for 3ds authorisation',
        paymentStatus: 'challenge-pending',
      },
      createdAt: '2020-07-20 14:52:09.661152+00:00',
      updatedAt: '2020-07-20 14:52:10.242845+00:00',
    }
  })),
  checkPayment: jest.fn((sessionId) => Promise.resolve({
    status: 'ok',
    data: sessionId === 'success_session_id'
      ? {
        id: 'pay_556fkurbopnu3ckcpk7h4a5wfi',
        amount: 3448,
        approved: true,
        status: 'Authorized',
        sourceId: 'src_qvgsjghtdjjuhdznipp5najdza',
        source: {
          id: 'src_qvgsjghtdjjuhdznipp5najdza',
          type: 'card',
          billingAddress: {
            addressLine1: 'FLAT 15, MORRIS HOUSE',
            addressLine2: 'SWAINSON ROAD',
            city: 'LONDON',
            zip: 'W3 7UP'
          },
          expiryMonth: 10,
          expiryYear: 2020,
          name: 'test test',
          scheme: 'Visa',
          last4: '4242',
          fingerprint: '6ADEB6E4F3630B445463D74D2CF2ADAE3F63EEF505345895407053C020A5B931',
          bin: '424242',
          cardType: 'Credit',
          cardCategory: 'Consumer',
          issuer: 'JPMORGAN CHASE BANK NA',
          issuerCountry: 'US',
          productId: 'A',
          productType: 'Visa Traditional',
          avsCheck: 'S',
          cvvCheck: 'Y',
          payouts: true,
          fastFunds: 'd'
        }
      }
      : {
        id: 'pay_4b55m3huev2e3pfyu5mixqecwq',
        amount: 3448,
        approved: false,
        status: 'Declined',
        sourceId: '',
        source: {
          type: 'card',
          billingAddress: {
            addressLine1: 'FLAT 15, MORRIS HOUSE',
            addressLine2: 'SWAINSON ROAD',
            city: 'LONDON',
            zip: 'W3 7UP'
          },
          expiryMonth: 10,
          expiryYear: 2020,
          name: 'test test',
          scheme: 'Visa',
          last4: '4242',
          fingerprint: '6ADEB6E4F3630B445463D74D2CF2ADAE3F63EEF505345895407053C020A5B931',
          bin: '424242',
          cardType: 'Credit',
          cardCategory: 'Consumer',
          issuer: 'JPMORGAN CHASE BANK NA',
          issuerCountry: 'US',
          productId: 'A',
          productType: 'Visa Traditional'
        }
      }
  })),
  fetchPayPalToken: jest.fn(() => Promise.resolve({
    data: {
      clientToken: 'fake-client-token'
    }
  }))
}))

const createState = (stateOverrides) => ({
  auth: Immutable.fromJS({
    id: '',
  }),
  basket: Immutable.fromJS({
    previewOrderId: '100004',
    address: '3 Moris House, London',
    date: '2016-11-21',
    numPortions: 4,
    recipes: {
      'recipe-id-1': 1,
      'recipe-id-2': 2,
    },
    stepsOrder: ['boxdetails', 'aboutyou', 'delivery', 'payment'],
    slotId: '33e977c1e-a778-11e6-aa8b-080027596944',
    promoCode: 'DTI-SB-P30M',
    postcode: 'W6 0DH',
    prevPostcode: 'OX18 1EN',
    chosenAddress: {
      id: '123456'
    }
  }),
  boxSummaryDeliveryDays: Immutable.fromJS({
    '2016-11-21': {
      id: '3e9a2572-a778-11e6-bb0f-080027596944',
      date: '2016-11-21',
      coreDayId: '253',
      slots: [
        {
          coreSlotId: '1',
          id: '3e952522-a778-11e6-8197-080027596944',
        },
      ],
    },
  }),
  checkout: Immutable.fromJS({
    deliveryAddresses: Immutable.fromJS([
      {
        id: '2000287',
        count: 1,
      },
    ]),
    email: 'test@example.com',
    password: 'testpassword',
    validations: {
      boxdetails: true,
      aboutyou: true,
      delivery: true,
      payment: true,
    },
    goustoRef: null,
  }),
  form: {
    aboutyou: {
      values: {
        aboutyou: {
          email: 'test@test.com',
        },
      }
    },
    delivery: {
      values: {
        delivery: {
          phone: '01234567890',
          cardNumber: '1234567890',
          cardExpiryDate: '12/24',
        },
      },
    },
    payment: {
      values: {
        payment: Immutable.Map({
          token: 'tok_7zlbjzbma4fenkbwzcxhmz5hee',
          postcode: 'w37un',
          houseNo: '1',
        })
      }
    }
  },
  menuBoxPrices: Immutable.fromJS({
    2: {
      4: {
        gourmet: {
          promoCodeValid: false,
          grossTotal: '34.48',
          total: '34.48',
          vatCharged: '0.00',
          recipeDiscount: '0.00',
          deliveryTotal: '0.00',
          pricePerPortionDiscounted: '5.83',
          pricePerPortion: '5.83',
          productTotal: '0.00',
          recipeTotalDiscounted: '34.48',
          recipeTotal: '34.48',
          promoCode: false,
        },
      },
    },
  }),
  payment: Immutable.fromJS({
    paymentNonce: 'sdfgs8sdfg',
    paymentMethod: PaymentMethod.Card
  }),
  request: Immutable.fromJS({
    browser: 'desktop',
  }),
  pricing: Immutable.fromJS({
    prices: {
      grossTotal: 28.00,
      deliveryTotal: 2.99,
      total: '34.48',
    }
  }),
  features: Immutable.fromJS({
    ndd: {
      value: deliveryTariffTypes.NON_NDD
    },
    enable3DSForSignUp: {
      value: false
    },
  }),
  ...stateOverrides,
})

describe('checkout actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  const ga = jest.fn()
  let addressCollection

  beforeEach(() => {
    getState.mockReturnValue(createState())
    addressCollection = [{ 1: 'a' }, { 2: 'b' }]
    fetchAddressByPostcode.mockReturnValue(
      new Promise(resolve => {
        resolve({ data: { results: addressCollection } })
      }),
    )
    getSlot.mockReturnValue(
      Immutable.Map({
        coreSlotId: '4',
        id: '3e977c1e-a778-11e6-aa8b-080027596944',
        daySlotLeadTimeId: ''
      }),
    )
    getDeliveryTariffId.mockReturnValue('')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('checkoutClearErrors', () => {
    test('should dispatch CHECKOUT_ERRORS_CLEAR', async () => {
      const result = checkoutClearErrors()

      expect(result.type).toBe(actionTypes.CHECKOUT_ERRORS_CLEAR)
    })
  })

  describe('checkoutAddressLookup', () => {
    test('should call fetchAddressByPostcode and dispatch pending CHECKOUT_ADDRESSES_RECEIVE with addresses', async () => {
      const postcode = 'W6 0DH'

      await checkoutAddressLookup(postcode)(dispatch)

      expect(status.pending).toHaveBeenCalledWith(
        actionTypes.CHECKOUT_ADDRESSES_RECEIVE,
        true,
      )
    })
  })

  describe('fireCheckoutError', () => {
    test('should dispatch an error with no value', async () => {
      getState.mockReturnValue(createState())

      await fireCheckoutError('CARD_TOKENIZATION_FAILED')(dispatch, getState)

      expect(status.error).toHaveBeenCalledWith(
        'CARD_TOKENIZATION_FAILED',
        true,
      )
    })

    test('should dispatch an error with an error value', async () => {
      getState.mockReturnValue(createState())
      const errorText = 'card not accepted'

      await fireCheckoutError('CARD_TOKENIZATION_FAILED', errorText)(dispatch, getState)

      expect(status.error).toHaveBeenCalledWith(
        'CARD_TOKENIZATION_FAILED',
        errorText,
      )
    })
  })

  describe('fireCheckoutPendingEvent', () => {
    test('should dispatch pending with proper parameters', async () => {
      getState.mockReturnValue(createState())
      const pendingName = 'pending name'
      const checkoutValue = true

      await fireCheckoutPendingEvent(pendingName)(dispatch, getState)

      expect(status.pending).toHaveBeenCalledWith(pendingName, checkoutValue)
    })
  })

  describe('checkoutSignup', () => {
    let checkout3DSSignupOrig
    let checkoutNon3DSSignupOrig
    let trackSignupPageChangeOrig

    beforeEach(() => {
      checkout3DSSignupOrig = checkoutActions.checkout3DSSignup
      checkoutNon3DSSignupOrig = checkoutActions.checkoutNon3DSSignup
      trackSignupPageChangeOrig = checkoutActions.trackSignupPageChange

      checkoutActions.checkout3DSSignup = jest.fn()
      checkoutActions.checkoutNon3DSSignup = jest.fn()
      checkoutActions.trackSignupPageChange = jest.fn()
    })

    afterEach(() => {
      checkoutActions.checkout3DSSignup = checkout3DSSignupOrig
      checkoutActions.checkoutNon3DSSignup = checkoutNon3DSSignupOrig
      checkoutActions.trackSignupPageChange = trackSignupPageChangeOrig
    })

    describe('when 3DS enabled', () => {
      beforeEach(() => {
        getState.mockReturnValue(createState({
          features: Immutable.fromJS({
            enable3DSForSignUp: {
              value: true
            }
          })
        }))
      })

      test('should send "Submit" tracking event', async () => {
        await checkoutActions.checkoutSignup()(dispatch, getState)

        expect(checkoutActions.trackSignupPageChange).toHaveBeenCalledWith('Submit')
      })

      test('should init 3DS signup flow', async () => {
        await checkoutActions.checkoutSignup()(dispatch, getState)

        expect(checkoutActions.checkout3DSSignup).toHaveBeenCalled()
      })

      describe('when PayPal payment method selected', () => {
        beforeEach(() => {
          getState.mockReturnValue(createState({
            features: Immutable.fromJS({
              enable3DSForSignUp: {
                value: true
              },
            }),
            payment: Immutable.fromJS({
              paymentMethod: PaymentMethod.PayPal,
            })
          }))
        })

        test('should init non 3DS signup flow', async () => {
          await checkoutActions.checkoutSignup()(dispatch, getState)

          expect(checkoutActions.checkoutNon3DSSignup).toHaveBeenCalled()
        })
      })
    })

    describe('when 3DS disabled', () => {
      test('should send "Submit" tracking event', async () => {
        await checkoutActions.checkoutSignup()(dispatch, getState)

        expect(checkoutActions.trackSignupPageChange).toHaveBeenCalledWith('Submit')
      })

      test('should init non-3DS signup flow', async () => {
        await checkoutActions.checkoutSignup()(dispatch, getState)

        expect(checkoutActions.checkoutNon3DSSignup).toHaveBeenCalled()
      })
    })

    describe('when PayPal enabled and PayPal payment method selected', () => {
      beforeEach(() => {
        getState.mockReturnValue(createState({
          features: Immutable.fromJS({
            enable3DSForSignUp: {
              value: true
            },
          }),
          payment: Immutable.fromJS({
            paymentMethod: PaymentMethod.PayPal,
          })
        }))
      })

      test('should send "Submit" tracking event', async () => {
        await checkoutActions.checkoutSignup()(dispatch, getState)

        expect(checkoutActions.trackSignupPageChange).toHaveBeenCalledWith('Submit')
      })

      test('should init non 3DS signup flow', async () => {
        await checkoutActions.checkoutSignup()(dispatch, getState)

        expect(checkoutActions.checkoutNon3DSSignup).toHaveBeenCalled()
      })
    })
  })

  describe('checkoutNon3DSSignup', () => {
    beforeEach(() => {
      getState.mockReturnValue(createState())
    })

    test('should subscribe user', async () => {
      await checkoutNon3DSSignup()(dispatch, getState)

      expect(userSubscribe).toHaveBeenCalled()
    })

    test('should dispatch CHECKOUT_SIGNUP_SUCCESS event', async () => {
      await checkoutNon3DSSignup()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.CHECKOUT_SIGNUP_SUCCESS, orderId: '100004' })
    })
  })

  describe('checkout3DSSignup', () => {
    beforeEach(() => {
      getState.mockReturnValue(createState())
    })

    describe('when promo code is not applied', () => {
      beforeEach(() => {
        const state = createState()
        state.basket = state.basket.set('promoCode', false)
        getState.mockReturnValue(state)
      })

      test('should not validate it', async () => {
        await checkout3DSSignup()(dispatch, getState)

        expect(fetchPromoCodeValidity).not.toHaveBeenCalled()
      })
    })

    describe('when valid promo code is applied', () => {
      test('should validate it', async () => {
        await checkout3DSSignup()(dispatch, getState)

        expect(fetchPromoCodeValidity).toHaveBeenCalled()
      })

      test('should continue signup process', async () => {
        await checkout3DSSignup()(dispatch, getState)

        expect(authPayment).toHaveBeenCalled()
      })
    })

    describe('when invalid promo code is applied', () => {
      beforeEach(() => {
        const state = createState()
        state.basket = state.basket.set('promoCode', 'FF6-AX-KD')
        getState.mockReturnValue(state)
      })

      test('should validate it', async () => {
        await checkout3DSSignup()(dispatch, getState)

        expect(fetchPromoCodeValidity).toHaveBeenCalled()
      })

      test('should reset promo code', async () => {
        await checkout3DSSignup()(dispatch, getState)

        expect(basketPromoCodeChange).toHaveBeenCalled()
        expect(basketPromoCodeAppliedChange).toHaveBeenCalled()
      })

      test('should show duplicated promo code error', async () => {
        await checkout3DSSignup()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(status.error(actionTypes.CHECKOUT_SIGNUP, '409-duplicate-details'))
        expect(dispatch).toHaveBeenCalledWith(status.error(actionTypes.CHECKOUT_ERROR_DUPLICATE, true))
      })

      test('should update pricing', async () => {
        await checkout3DSSignup()(dispatch, getState)

        expect(pricingActions.pricingRequest).toHaveBeenCalled()
      })

      test('should discard pending signup', async () => {
        await checkout3DSSignup()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(status.pending(actionTypes.CHECKOUT_SIGNUP, false))
      })

      test('should prevent signup process', async () => {
        await checkout3DSSignup()(dispatch, getState)

        expect(authPayment).not.toHaveBeenCalled()
      })
    })

    describe('when gousto reference is not retrieved', () => {
      test('should retrieve gousto reference', async () => {
        await checkout3DSSignup()(dispatch, getState)

        expect(fetchReference).toHaveBeenCalled()
      })

      test('should store gousto reference', async () => {
        await checkout3DSSignup()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.CHECKOUT_SET_GOUSTO_REF,
          goustoRef: '105979923'
        })
      })
    })

    describe('when gousto reference has been already retrieved', () => {
      beforeEach(() => {
        const checkoutState = createState()
          .checkout.set('goustoRef', '105979923')
        getState.mockReturnValue(createState({
          checkout: checkoutState
        }))
      })

      test('should not retrieve new reference', async () => {
        await checkout3DSSignup()(dispatch, getState)

        expect(fetchReference).not.toHaveBeenCalled()
      })

      test('should not store new reference', async () => {
        await checkout3DSSignup()(dispatch, getState)

        expect(dispatch).not.toHaveBeenCalledWith({
          type: actionTypes.CHECKOUT_SET_GOUSTO_REF,
          goustoRef: expect.any(Number)
        })
      })
    })

    test('should make payment auth request', async () => {
      const expected = {
        order_id: '100004',
        card_token: 'tok_7zlbjzbma4fenkbwzcxhmz5hee',
        amount: 3448,
        gousto_ref: '105979923',
        '3ds': true,
        success_url: `http://localhost${routes.client.payment.success}`,
        failure_url: `http://localhost${routes.client.payment.failure}`,
      }

      await checkout3DSSignup()(dispatch, getState)

      expect(authPayment).toHaveBeenCalledWith(expected)
    })

    test('should show 3ds challenge modal', async () => {
      await checkout3DSSignup()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.PAYMENT_SHOW_MODAL,
        challengeUrl: 'https://bank.uk/3dschallenge',
      })
    })

    test('should trigger 3dsmodal_display event', async () => {
      await checkout3DSSignup()(dispatch, getState)

      expect(trackUTMAndPromoCode).toHaveBeenCalledWith(trackingKeys.signupChallengeModalDisplay)
    })
  })

  describe('checkPaymentAuth', () => {
    beforeEach(() => {
      getState.mockReturnValue(createState())
    })

    describe('when payment authorization successful', () => {
      const successSessionId = 'success_session_id'

      test('should hide 3ds challenge modal', async () => {
        await checkPaymentAuth(successSessionId)(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.PAYMENT_HIDE_MODAL })
      })

      test('should check payment result', async () => {
        await checkPaymentAuth(successSessionId)(dispatch, getState)

        expect(checkPayment).toHaveBeenCalledWith(successSessionId)
      })

      test('should subscribe user', async () => {
        await checkPaymentAuth(successSessionId)(dispatch, getState)

        expect(userSubscribe).toHaveBeenCalledWith(true, 'src_qvgsjghtdjjuhdznipp5najdza')
      })

      test('should dispatch CHECKOUT_SIGNUP_SUCCESS event', async () => {
        await checkPaymentAuth(successSessionId)(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.CHECKOUT_SIGNUP_SUCCESS, orderId: '100004' })
      })

      test('should trigger 3ds_success event', async () => {
        await checkPaymentAuth(successSessionId)(dispatch, getState)

        expect(trackUTMAndPromoCode).toHaveBeenCalledWith(trackingKeys.signupChallengeSuccessful)
      })

      test('should not trigger 3ds_failed event', async () => {
        await checkPaymentAuth(successSessionId)(dispatch, getState)

        expect(trackUTMAndPromoCode).not.toHaveBeenCalledWith(trackingKeys.signupChallengeFailed)
      })

      test('should clear gousto reference', async () => {
        await checkPaymentAuth(successSessionId)(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.CHECKOUT_SET_GOUSTO_REF, goustoRef: null })
      })
    })

    describe('when payment authorization failed', () => {
      const failedSessionId = 'failed_session_id'

      test('should hide 3ds challenge modal', async () => {
        await checkPaymentAuth(failedSessionId)(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.PAYMENT_HIDE_MODAL })
      })

      test('should check payment result', async () => {
        await checkPaymentAuth(failedSessionId)(dispatch, getState)

        expect(checkPayment).toHaveBeenCalledWith(failedSessionId)
      })

      test('should trigger signup error', async () => {
        await checkPaymentAuth(failedSessionId)(dispatch, getState)

        expect(status.error).toHaveBeenCalledWith(actionTypes.CHECKOUT_SIGNUP, '3ds-challenge-failed')
      })

      test('should not trigger 3ds_success event', async () => {
        await checkPaymentAuth(failedSessionId)(dispatch, getState)

        expect(trackUTMAndPromoCode).not.toHaveBeenCalledWith(trackingKeys.signupChallengeSuccessful)
      })

      test('should trigger 3ds_failed event', async () => {
        await checkPaymentAuth(failedSessionId)(dispatch, getState)

        expect(trackUTMAndPromoCode).toHaveBeenCalledWith(trackingKeys.signupChallengeFailed)
      })

      test('should not clear gousto reference', async () => {
        await checkPaymentAuth(failedSessionId)(dispatch, getState)

        expect(dispatch).not.toHaveBeenCalledWith({ type: actionTypes.CHECKOUT_SET_GOUSTO_REF, goustoRef: null })
      })
    })

    test('should show payment modal', async () => {
      await checkout3DSSignup()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.PAYMENT_SHOW_MODAL,
        challengeUrl: 'https://bank.uk/3dschallenge',
      })
    })
  })

  describe('trackPurchase', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        basket: Immutable.fromJS({
          previewOrderId: 'test-order-id',
          promoCode: 'TEST123'
        }),
        pricing: Immutable.fromJS({
          prices: {
            total: 31.99,
            grossTotal: 28.00,
            deliveryTotal: 2.99,
          }
        }),
      })
    })

    afterEach(() => {
      ga.mockClear()
    })

    describe('when ga is undefined', () => {
      beforeEach(() => {
        global.ga = undefined
      })

      test('should not call ga with order details', async () => {
        trackPurchase()(dispatch, getState)

        expect(ga).not.toHaveBeenCalled()
      })
    })

    describe('when ga is defined', () => {
      beforeEach(() => {
        global.ga = ga
      })

      test('should call ga with order details', async () => {
        trackPurchase()(dispatch, getState)

        expect(ga).toHaveBeenCalled()
        expect(ga).toHaveBeenCalledWith('gousto.ec:setAction', 'purchase', {
          id: 'test-order-id',
          revenue: 28.00,
          shipping: 2.99,
          coupon: 'TEST123',
        })
      })
    })

    test('should call trackAffiliatePurchase with order details', () => {
      trackPurchase()(dispatch, getState)

      expect(trackAffiliatePurchase).toHaveBeenCalled()
      expect(trackAffiliatePurchase).toHaveBeenCalledWith({
        orderId: 'test-order-id',
        total: 31.99,
        commissionGroup: 'FIRSTPURCHASE',
        promoCode: 'TEST123',
      })
    })
  })

  describe('checkoutPostSignup', () => {
    beforeEach(() => {
      getState.mockReturnValue(createState())
    })

    afterEach(() => {
      ga.mockClear()
    })

    test('should call post signup', async () => {
      await checkoutPostSignup()(dispatch, getState)

      expect(basketResetPersistent).toHaveBeenCalledTimes(1)
    })

    test('should dispatch a call to trackPurchase', async () => {
      global.ga = ga

      await checkoutPostSignup()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledTimes(8)
    })
  })

  describe('trackCheckoutButtonPressed', () => {
    describe('should dispatch a TRACKING action with tracking data (snowplow and gtm)', () => {
      test('with property if provided', () => {
        const trackingData = {
          actionType: 'DeliveryAddress Confirmed',
          seCategory: 'Checkout',
          position: 'first',
        }

        expect(trackCheckoutButtonPressed('DeliveryAddress Confirmed', { position: 'first' })).toEqual({
          type: 'TRACKING',
          trackingData,
          gtmEvent: trackingData
        })
      })

      test('with no property if not provided', () => {
        const trackingData = {
          actionType: 'NextCTA Clicked',
          seCategory: 'Checkout',
        }

        expect(trackCheckoutButtonPressed('NextCTA Clicked')).toEqual({
          type: 'TRACKING',
          trackingData,
          gtmEvent: trackingData
        })
      })
    })
  })

  describe('trackPromocodeChange', () => {
    test('should dispatch trackPromocodeChange with actionType Promocode Applied', () => {
      trackPromocodeChange('promo', true)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING_PROMOCODE_CHANGE',
        trackingData: {
          actionType: 'Promocode Applied',
          promocode: 'promo'
        }
      })
    })

    test('should dispatch trackPromocodeChange with actionType Promocode Removed', () => {
      trackPromocodeChange('promo', false)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING_PROMOCODE_CHANGE',
        trackingData: {
          actionType: 'Promocode Removed',
          promocode: 'promo'
        }
      })
    })
  })

  describe('given fetchPayPalClientToken action', () => {
    describe('when successfully fetched client token', () => {
      test('should dispatch PAYMENT_SET_PAYPAL_CLIENT_TOKEN', async () => {
        await fetchPayPalClientToken()(dispatch)

        expect(fetchPayPalToken).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.PAYMENT_SET_PAYPAL_CLIENT_TOKEN,
          token: 'fake-client-token'
        })
      })
    })
  })

  describe('given clearPayPalErrors action', () => {
    describe('when called', () => {
      test('should dispatch CHECKOUT_PAYPAL_ERRORS_CLEAR', () => {
        clearPayPalErrors()(dispatch)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.CHECKOUT_PAYPAL_ERRORS_CLEAR,
        })
      })
    })
  })

  describe('given clearPayPalClientToken action', () => {
    describe('when called', () => {
      test('should dispatch PAYMENT_SET_PAYPAL_CLIENT_TOKEN with empty token', () => {
        clearPayPalClientToken()(dispatch)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.PAYMENT_SET_PAYPAL_CLIENT_TOKEN,
          token: null
        })
      })
    })
  })

  describe('given setCurrentPaymentMethod action', () => {
    describe('when called', () => {
      test('should dispatch PAYMENT_SET_PAYMENT_METHOD', () => {
        setCurrentPaymentMethod(PaymentMethod.Card)(dispatch)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.PAYMENT_SET_PAYMENT_METHOD,
          paymentMethod: PaymentMethod.Card
        })
      })
    })

    describe('when payment method is Card', () => {
      test('should dispatch trackUTMAndPromoCode with select_card_payment type', () => {
        setCurrentPaymentMethod(PaymentMethod.Card)(dispatch)

        expect(dispatch).toHaveBeenCalledWith({ type: 'trackUTMAndPromoCode' })
        expect(trackUTMAndPromoCode).toHaveBeenCalledWith(trackingKeys.selectCardPayment)
      })
    })

    describe('when payment method is PayPal', () => {
      test('should dispatch trackUTMAndPromoCode with select_paypal type', () => {
        setCurrentPaymentMethod(PaymentMethod.PayPal)(dispatch)

        expect(dispatch).toHaveBeenCalledWith({ type: 'trackUTMAndPromoCode' })
        expect(trackUTMAndPromoCode).toHaveBeenCalledWith(trackingKeys.selectPayPalPayment)
      })
    })
  })

  describe('given setPayPalDeviceData action', () => {
    describe('when called', () => {
      test('should dispatch PAYMENT_SET_PAYPAL_DEVICE_DATA', () => {
        const deviceData = JSON.stringify({ correlationId: 'dfasdfa'})

        setPayPalDeviceData(deviceData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.PAYMENT_SET_PAYPAL_DEVICE_DATA,
          deviceData
        })
      })
    })
  })

  describe('given setPayPalNonce action', () => {
    describe('when called', () => {
      let checkoutSignupOrig
      let trackingOrderPlaceAttemptSucceededOrig
      const nonce = 'fake-nonce'

      beforeEach(() => {
        checkoutSignupOrig = checkoutActions.checkoutSignup
        trackingOrderPlaceAttemptSucceededOrig = checkoutActions.trackingOrderPlaceAttemptSucceeded

        checkoutActions.checkoutSignup = jest.fn()
        checkoutActions.trackingOrderPlaceAttemptSucceeded = jest.fn()
      })

      afterEach(() => {
        checkoutActions.checkoutSignup = checkoutSignupOrig
        checkoutActions.trackingOrderPlaceAttemptSucceeded = trackingOrderPlaceAttemptSucceededOrig
      })

      test('should dispatch PAYMENT_SET_PAYPAL_NONCE', () => {
        setPayPalNonce(nonce)(dispatch)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.PAYMENT_SET_PAYPAL_NONCE,
          nonce
        })
      })

      test('should dispatch trackingOrderPlaceAttemptSucceeded action', () => {
        setPayPalNonce(nonce)(dispatch)

        expect(checkoutActions.trackingOrderPlaceAttemptSucceeded).toHaveBeenCalled()
      })

      test('should dispatch checkoutSignup action', () => {
        setPayPalNonce(nonce)(dispatch)

        expect(checkoutActions.checkoutSignup).toHaveBeenCalled()
      })
    })
  })

  describe('given firePayPalError action', () => {
    describe('when called', () => {
      test('should dispatch PAYPAL_ERROR', () => {
        const err = new Error('PayPal error')

        firePayPalError(err)(dispatch)

        expect(dispatch).toHaveBeenCalledWith({ type: 'error_action' })
        expect(status.error).toHaveBeenCalledWith(actionTypes.PAYPAL_ERROR, true)
      })
    })
  })
})
