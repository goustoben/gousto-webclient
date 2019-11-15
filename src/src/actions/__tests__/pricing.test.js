import Immutable from 'immutable'
import actionTypes from 'actions/actionTypes'
import pricing from 'apis/pricing'
import actions from 'actions/pricing'
import { deliveryTariffTypes } from 'utils/deliveries'

jest.mock('apis/pricing')

describe('pricing actions', () => {
  let dispatchSpy
  let getStateSpy

  const pricingData = {
    status: 'ok',
    data: {
      prices: {
        price_per_portion: '5.00',
        price_per_portion_discounted: '5.00',
        product_total: '0.00',
        surcharge_total: '9.98',
        recipe_total: '29.99',
        recipe_total_discounted: '29.99',
        recipe_discount: '0.00',
        flat_discount_applied: true,
        amount_off: '0.000',
        percentage_off: null,
        promo_code: false,
        promo_code_valid: false,
        delivery_total: '0.00',
        gross_total: '39.97',
        vat_charged: '0.00',
        total: '39.97',
      },
    },
  }

  const getBoxSummaryDeliveryDays = (date, slotId, daySlotLeadTimeId) => Immutable.fromJS({
    [date]: {
      slots: [{
        id: slotId,
        daySlotLeadTimeId
      }]
    }
  })

  const getFeatures = deliveryTariffId => Immutable.fromJS({
    ndd: {
      value: deliveryTariffId,
      experiment: false,
    }
  })

  beforeEach(function () {
    dispatchSpy = jest.fn()
    getStateSpy = jest.fn()
  })

  beforeEach(function () {
    jest.clearAllMocks()
  })

  describe('pricingRequest', function () {
    it('will not request prices if the number of recipes are less then 2', async function () {
      getStateSpy.mockReturnValue({
        auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
        basket: Immutable.fromJS({ recipes: { 123: 1 }, slotId: 124 }),
        features: getFeatures('a1b2c3d4')
      })

      pricing.mockReturnValue(Promise.resolve({ data: pricingData }))

      await actions.pricingRequest()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).not.toContain({
        type: actionTypes.PRICING_PENDING,
      })
      expect(dispatchSpy).not.toContain({
        type: actionTypes.PRICING_SUCCESS,
        prices: pricingData,
      })
      expect(pricing).not.toHaveBeenCalled()
    })

    it('will not request prices if the slotId is not set', async function () {
      getStateSpy.mockReturnValue({
        auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
        basket: Immutable.fromJS({ recipes: { 123: 1, 234: 1 } }),
        features: getFeatures('a1b2c3d4')
      })

      pricing.mockReturnValue(Promise.resolve({ data: pricingData }))

      await actions.pricingRequest()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).not.toHaveBeenCalledWith({
        type: actionTypes.PRICING_PENDING,
      })
      expect(dispatchSpy).not.toHaveBeenCalledWith({
        type: actionTypes.PRICING_SUCCESS,
        prices: pricingData,
      })
      expect(pricing).not.toHaveBeenCalled()
    })

    it('will return with the PRICING_SUCCESS action and data when 2 recipes and the slotId are set', async function () {
      getStateSpy.mockReturnValue({
        auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
        basket: Immutable.fromJS({ recipes: { 123: 2 }, slotId: 124 }),
        features: getFeatures('a1b2c3d4')
      })

      pricing.mockReturnValue(Promise.resolve({ data: pricingData }))

      await actions.pricingRequest()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledTimes(2)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.PRICING_PENDING,
      })
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.PRICING_SUCCESS,
        prices: pricingData,
      })
      expect(pricing).toHaveBeenCalled()
    })

    it('should return with the PRICING_SUCCESS action and data with store data set', async function () {
      const accessToken = 'accessToken'
      const date = '12-12-2029'
      const slotId = 12
      const promoCode = '1234'
      const daySlotLeadTimeId = 987
      const deliveryTariffId = deliveryTariffTypes['FREE_NDD']

      getStateSpy.mockReturnValue({
        auth: Immutable.fromJS({
          accessToken,
          refreshToken: 'refreshToken'
        }),
        basket: Immutable.fromJS({
          recipes: { 123: 1, 145: 1 },
          promoCode,
          date,
          slotId,
          numPortions: 2
        }),
        boxSummaryDeliveryDays: getBoxSummaryDeliveryDays(date, slotId, daySlotLeadTimeId),
        features: getFeatures('a1b2c3d4'),
        user: Immutable.fromJS({
          deliveryTariffId
        }),
      })

      pricing.mockReturnValue(Promise.resolve({ data: pricingData }))

      await actions.pricingRequest()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledTimes(2)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.PRICING_PENDING,
      })
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.PRICING_SUCCESS,
        prices: pricingData,
      })
      expect(pricing).toHaveBeenCalled()

      const recipeDataRequest = { 0: { id: '123', type: 'Recipe', quantity: 2 }, 1: { id: '145', type: 'Recipe', quantity: 2 } }
      expect(pricing).toHaveBeenCalledWith(
        accessToken,
        recipeDataRequest,
        date,
        slotId,
        promoCode,
        daySlotLeadTimeId,
        deliveryTariffId
      )
    })

    it('will be called with tariffId if id is provided and user is not authenticated', async function () {
      const accessToken = 'accessToken'
      const date = '12-12-2029'
      const slotId = 12
      const promoCode = '1234'
      const tariffId = '12345678'
      const daySlotLeadTimeId = 987
      const deliveryTariffId = deliveryTariffTypes['PAID_NDD']

      getStateSpy.mockReturnValue({
        auth: Immutable.fromJS({
          accessToken,
          refreshToken: 'refreshToken',
          isAuthenticated: false
        }),
        basket: Immutable.fromJS({
          recipes: { 123: 1, 145: 1 },
          promoCode,
          date,
          slotId,
          numPortions: 2,
          tariffId
        }),
        boxSummaryDeliveryDays: getBoxSummaryDeliveryDays(date, slotId, daySlotLeadTimeId),
        features: getFeatures(deliveryTariffId)
      })

      pricing.mockReturnValue(Promise.resolve({ data: pricingData }))

      await actions.pricingRequest()(dispatchSpy, getStateSpy)

      const recipeDataRequest = { 0: { id: '123', type: 'Recipe', quantity: 2 }, 1: { id: '145', type: 'Recipe', quantity: 2 } }
      expect(pricing).toHaveBeenCalledWith(
        accessToken,
        recipeDataRequest,
        date,
        slotId,
        promoCode,
        daySlotLeadTimeId,
        deliveryTariffId,
        tariffId
      )
    })

    it('will request all basket items when recipes, products and the slotId are set', async function () {
      getStateSpy.mockReturnValue({
        auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
        basket: Immutable.fromJS({
          recipes: { 123: 2 },
          products: { p1: 2, p2: 1 },
          slotId: 124,
          numPortions: 2,
        }),
        features: getFeatures('a1b2c3d4')
      })

      pricing.mockReturnValue(Promise.resolve({ data: pricingData }))

      await actions.pricingRequest()(dispatchSpy, getStateSpy)

      expect(pricing.mock.calls[0][1]).toEqual({
        0: { id: '123', quantity: 2, type: 'Recipe' },
        1: { id: '123', quantity: 2, type: 'Recipe' },
        2: { id: 'p1', quantity: 1, type: 'Product' },
        3: { id: 'p1', quantity: 1, type: 'Product' },
        4: { id: 'p2', quantity: 1, type: 'Product' },
      })
    })

    it('should return with the PRICING_FAILURE action and message', async function () {
      getStateSpy.mockReturnValue({
        auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
        basket: Immutable.fromJS({ recipes: { 123: 1, 134: 1 }, slotId: 1 }),
        features: getFeatures('a1b2c3d4')
      })

      pricing.mockReturnValue(Promise.reject('error from pricing endpoint'))

      await actions.pricingRequest()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledTimes(2)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.PRICING_PENDING,
      })
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.PRICING_FAILURE,
        message: 'error from pricing endpoint',
      })
      expect(pricing).toHaveBeenCalled()
    })
  })

  describe('pricingClear', function () {
    it('should dispatch a pricing reset event', async function () {
      getStateSpy.mockReturnValue({
        auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
        basket: Immutable.fromJS({ recipes: ['123', 1] }),
        pricing: Immutable.fromJS({ prices: [1, 2, 3] }),
        features: getFeatures('a1b2c3d4')
      })

      await actions.pricingClear()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalled()
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.PRICING_RESET,
      })
    })

    it('should not dispatch a pricing reset event when there is no items in the pricing array', async function () {
      getStateSpy.mockReturnValue({
        auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
        basket: Immutable.fromJS({ recipes: ['123', 1] }),
        pricing: Immutable.fromJS({ prices: [] }),
        features: getFeatures('a1b2c3d4')
      })

      await actions.pricingClear()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).not.toHaveBeenCalled()
    })
  })
})
