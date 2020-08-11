import Immutable from 'immutable'

import routes from 'config/routes'
import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import { warning } from 'utils/logger'
import { getSlot, getDeliveryTariffId, deliveryTariffTypes } from 'utils/deliveries'
import { redirect } from 'actions/redirect'
import { pending, error } from 'actions/status'
import { orderAssignToUser } from 'actions/order'
import { userSubscribe } from 'actions/user'
import { basketResetPersistent } from 'utils/basket'
import { trackAffiliatePurchase, trackUTMAndPromoCode } from 'actions/tracking'
import { fetchAddressByPostcode } from 'apis/addressLookup'
import { fetchReference } from 'apis/customers'
import { createPreviewOrder } from 'apis/orders'
import { authPayment, checkPayment } from 'apis/payments'

import checkoutActions, {
  trackPurchase,
  checkoutNon3DSSignup,
  checkout3DSSignup,
  checkPaymentAuth,
  fireCheckoutError,
  checkoutPostSignup,
  checkoutClearErrors,
  trackPromocodeChange,
  checkoutAddressLookup,
  checkoutCreatePreviewOrder,
  checkoutTransactionalOrder,
  trackCheckoutButtonPressed,
} from 'actions/checkout'

jest.mock('utils/basket', () => ({
  basketResetPersistent: jest.fn()
}))
jest.mock('utils/logger', () => ({
  warning: jest.fn(),
  error: jest.fn()
}))
jest.mock('utils/deliveries')

jest.mock('actions/login')
jest.mock('actions/menu')
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
      paymentMethod: {
        id: 'ed79add7-f7ff-41da-8524-f64b04dd9e70',
        type: 'card',
        isDefault: true,
        name: 'My Card',
        card: {
          id: '69524945',
          number: '424242#######4242',
          expiryMonth: 10,
          expiryYear: 20,
          cardToken: 'src_qvgsjghtdjjuhdznipp5najdza',
          paymentProvider: 'checkout'
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
  error: jest.fn(),
  pending: jest.fn(),
}))
jest.mock('actions/order', () => ({
  orderAssignToUser: jest.fn(),
}))
jest.mock('actions/tracking', () => ({
  trackAffiliatePurchase: jest.fn(),
  trackUTMAndPromoCode: jest.fn()
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
}))
jest.mock('apis/orders', () => ({
  createPreviewOrder: jest.fn(),
}))
jest.mock('apis/payments', () => ({
  authPayment: jest.fn(() => Promise.resolve({
    status: 'ok',
    data: {
      id: 'da850c38-c077-41cf-b860-0100ee48c0f1',
      cardToken: 'tok_7zlbjzbma4fenkbwzcxhmz5hee',
      reference: 'pay_4b55m3huev2e3pfyu5mixqecwq',
      status: 'challenge-pending',
      value: 3499,
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
    data: {
      data: sessionId === 'success_session_id'
        ? {
          id: 'pay_556fkurbopnu3ckcpk7h4a5wfi',
          amount: 3499,
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
          amount: 3499,
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
    }
  })),
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
          grossTotal: '34.99',
          total: '34.99',
          vatCharged: '0.00',
          recipeDiscount: '0.00',
          deliveryTotal: '0.00',
          pricePerPortionDiscounted: '5.83',
          pricePerPortion: '5.83',
          productTotal: '0.00',
          recipeTotalDiscounted: '34.99',
          recipeTotal: '34.99',
          promoCode: false,
        },
      },
    },
  }),
  request: Immutable.fromJS({
    browser: 'desktop',
  }),
  pricing: Immutable.fromJS({
    prices: {
      grossTotal: 28.00,
      deliveryTotal: 2.99,
      total: '34.99',
    }
  }),
  features: Immutable.fromJS({
    ndd: {
      value: deliveryTariffTypes.NON_NDD
    },
    enable3DSForSignUp: {
      value: false
    }
  }),
  ...stateOverrides,
})

const createPreviewOrderObj = (previewOrderOverrides) => ({
  delivery_day_id: '253',
  delivery_slot_id: '4',
  recipe_choices: [
    { id: 'recipe-id-1', quantity: 4, type: 'Recipe' },
    { id: 'recipe-id-2', quantity: 4, type: 'Recipe' },
    { id: 'recipe-id-2', quantity: 4, type: 'Recipe' },
  ],
  day_slot_lead_time_id: '',
  delivery_tariff_id: '',
  address_id: '123456',
  ...previewOrderOverrides
})

describe('checkout actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  const ga = jest.fn()
  let previewOrder
  let addressCollection

  beforeEach(() => {
    getState.mockReturnValue(createState())
    previewOrder = createPreviewOrderObj()
    addressCollection = [{ 1: 'a' }, { 2: 'b' }]
    fetchAddressByPostcode.mockReturnValue(
      new Promise(resolve => {
        resolve({ data: { results: addressCollection } })
      }),
    )
    createPreviewOrder.mockReturnValue(
      new Promise(resolve => {
        resolve({
          data: {
            order: {
              id: 1,
            },
            ...previewOrder,
          },
        })
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

  describe('checkoutCreatePreviewOrder', () => {
    test('should call create preview order', async () => {
      await checkoutCreatePreviewOrder()(
        dispatch,
        getState,
      )

      expect(createPreviewOrder).toHaveBeenCalledTimes(1)
      expect(createPreviewOrder).toHaveBeenCalledWith(previewOrder)
    })

    test('should call create preview order and log the error, coreDayId empty', async () => {
      getState.mockReturnValue(createState({
        boxSummaryDeliveryDays: Immutable.fromJS({
          '2016-11-21': {
            id: '3e9a2572-a778-11e6-bb0f-080027596944',
            date: '2016-11-21',
            coreDayId: '',
            slots: [
              {
                coreSlotId: '1',
                id: '3e952522-a778-11e6-8197-080027596944',
              },
            ],
          },
        }),
        auth: Immutable.fromJS({
          id: ''
        })
      }))

      await checkoutCreatePreviewOrder()(
        dispatch,
        getState,
      )

      expect(error).toHaveBeenCalledWith(
        actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
        {
          message: 'Missing data, persistent basket might be expired',
          code: 'basket-expired',
        },
      )
    })

    test('should call create preview order and log the error, boxSummaryDeliveryDays empty', async () => {
      getState.mockReturnValue(createState({
        boxSummaryDeliveryDays: null,
      }))

      await checkoutCreatePreviewOrder()(
        dispatch,
        getState,
      )

      expect(error).toHaveBeenCalledWith(
        actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
        "Cannot read property 'getIn' of null",
      )
    })

    describe('when daySlotLeadTimeId is present in box summary slots', () => {
      const targetUuid = 'some-uuid'

      beforeEach(() => {
        getState.mockReturnValue(createState({
          boxSummaryDeliveryDays: Immutable.fromJS({
            '2016-11-21': {
              id: '3e9a2572-a778-11e6-bb0f-080027596944',
              date: '2016-11-21',
              coreDayId: '253',
              slots: [
                {
                  coreSlotId: '4',
                  id: '3e952522-a778-11e6-8197-080027596944',
                  daySlotLeadTimeId: 'some-uuid' // targetUuid
                },
              ],
            },
          }),
        }))
      })

      test('should call create preview order with day_slot_lead_time_id', async () => {
        getSlot.mockReturnValue(Immutable.fromJS({
          coreSlotId: '4',
          id: '3e952522-a778-11e6-8197-080027596944',
          daySlotLeadTimeId: targetUuid
        }))

        await checkoutCreatePreviewOrder()(
          dispatch,
          getState,
        )

        previewOrder = createPreviewOrderObj({
          day_slot_lead_time_id: targetUuid
        })

        expect(createPreviewOrder).toHaveBeenCalledTimes(1)

        expect(createPreviewOrder).toHaveBeenCalledWith(previewOrder)
      })
    })

    describe('when deliveryTariffId is returned from state', () => {
      const deliveryTariffId = 'delivery-tariff-uuid'

      test('should call create preview order with delivery_tariff_id', async () => {
        getDeliveryTariffId.mockReturnValue(deliveryTariffId)

        await checkoutCreatePreviewOrder()(
          dispatch,
          getState
        )

        previewOrder = createPreviewOrderObj({
          delivery_tariff_id: deliveryTariffId
        })

        expect(createPreviewOrder).toHaveBeenCalledTimes(1)
        expect(createPreviewOrder).toHaveBeenCalledWith(previewOrder)
      })
    })
  })

  describe('checkoutAddressLookup', () => {
    test('should call fetchAddressByPostcode and dispatch pending CHECKOUT_ADDRESSES_RECEIVE with addresses', async () => {
      const postcode = 'W6 0DH'

      await checkoutAddressLookup(postcode)(dispatch)

      expect(pending).toHaveBeenCalledWith(
        actionTypes.CHECKOUT_ADDRESSES_RECEIVE,
        true,
      )
    })
  })

  describe('fireCheckoutError', () => {
    test('should dispatch an error with no value', async () => {
      getState.mockReturnValue(createState())

      await fireCheckoutError('CARD_TOKENIZATION_FAILED')(dispatch, getState)

      expect(error).toHaveBeenCalledWith(
        'CARD_TOKENIZATION_FAILED',
        true,
      )
    })

    test('should dispatch an error with an error value', async () => {
      getState.mockReturnValue(createState())
      const errorText = 'card not accepted'

      await fireCheckoutError('CARD_TOKENIZATION_FAILED', errorText)(dispatch, getState)

      expect(error).toHaveBeenCalledWith(
        'CARD_TOKENIZATION_FAILED',
        errorText,
      )
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
        amount: 3499,
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

        expect(error).toHaveBeenCalledWith(actionTypes.CHECKOUT_SIGNUP, '3ds-challenge-failed')
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

  describe('checkoutTransactionalOrder', () => {
    const createTransactionalState = ({
      auth = Immutable.Map({}),
      basket = Immutable.Map({}),
      error = Immutable.Map({}),
      user = Immutable.Map({}),
    } = {}) => ({
      ...createState(),
      auth,
      basket,
      error,
      user,
    })

    beforeEach(() => {
      getState.mockReturnValue(createTransactionalState())
    })

    test('should dispatch a preview order request', async () => {
      await checkoutTransactionalOrder()(dispatch, getState)

      const previewOrderAction = dispatch.mock.calls[0][0]
      previewOrderAction(dispatch, getState)

      expect(pending).toHaveBeenCalledWith(
        actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
        true,
      )
    })

    describe('when preview order fails', () => {
      beforeEach(() => {
        getState.mockReturnValue(createTransactionalState({
          error: Immutable.Map({
            [actionTypes.BASKET_PREVIEW_ORDER_CHANGE]: {
              message: 'Test preview order error',
              code: 'undefined-error',
            },
          }),
        }))
      })

      test('should log a warning', async () => {
        await checkoutTransactionalOrder()(dispatch, getState)

        expect(warning).toHaveBeenCalledWith(expect.stringContaining('undefined-error'))
      })

      test('should redirect to the menu', async () => {
        await checkoutTransactionalOrder()(dispatch, getState)

        expect(redirect).toHaveBeenCalledWith(
          '/menu?from=newcheckout&error=undefined-error',
          true,
        )
      })
    })

    describe('when preview order succeeds', () => {
      describe('and user is not authenticated', () => {
        beforeEach(() => {
          getState.mockReturnValue(createTransactionalState({
            auth: Immutable.Map({
              isAuthenticated: false,
            }),
            basket: Immutable.Map({
              previewOrderId: '100004',
            }),
          }))
        })

        test('should not redirect', async () => {
          await checkoutTransactionalOrder()(dispatch, getState)

          expect(redirect).not.toHaveBeenCalled()
        })

        test('should not assign order to user', async () => {
          await checkoutTransactionalOrder()(dispatch, getState)

          expect(orderAssignToUser).not.toHaveBeenCalled()
        })
      })

      describe('and user is authenticated', () => {
        describe('and user is on hold', () => {
          beforeEach(() => {
            getState.mockReturnValue(createTransactionalState({
              auth: Immutable.Map({
                isAuthenticated: true,
              }),
              basket: Immutable.Map({
                previewOrderId: '100004',
              }),
              user: Immutable.Map({
                status: 'onhold',
              }),
            }))
          })

          test('should redirect to my gousto', async () => {
            await checkoutTransactionalOrder()(dispatch, getState)

            expect(redirect).toHaveBeenCalledWith('/my-gousto')
          })
        })

        describe('and user is not on hold', () => {
          beforeEach(() => {
            getState.mockReturnValue(createTransactionalState({
              auth: Immutable.Map({
                isAuthenticated: true,
              }),
              basket: Immutable.Map({
                previewOrderId: '100004',
              }),
              user: Immutable.Map({
                status: 'active',
              }),
            }))
          })

          test('should assign order to user', async () => {
            await checkoutTransactionalOrder('transactional')(dispatch, getState)

            expect(orderAssignToUser).toHaveBeenCalledWith(
              'transactional',
              '100004'
            )
          })
        })
      })
    })
  })
})
