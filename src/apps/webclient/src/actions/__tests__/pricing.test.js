import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { requestPricing } from 'apis/pricing'
import * as orderV2 from 'routes/Menu/apis/orderV2'
import actions from 'actions/pricing'
import { deliveryTariffTypes } from 'utils/deliveries'
import * as optimizelyUtils from 'containers/OptimizelyRollouts/optimizelyUtils'
import { createState as createOrderState } from 'routes/Menu/selectors/__mocks__/order.mock'
import { orderV2PricesFixture } from 'routes/Menu/transformers/orderPricesV2ToV1.test'

jest.mock('apis/pricing', () => ({
  requestPricing: jest.fn(),
}))

const createState = (partialOverwrite = {}) => createOrderState({
  ...partialOverwrite,
  auth: {
    id: 'auth-user-id',
    accessToken: 'auth-access-token',
    isAuthenticated: true,
    ...(partialOverwrite.auth || {})
  }
})

describe('pricing actions', () => {
  let dispatchSpy
  let getStateSpy
  let getOrderPriceSpy

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

  beforeEach(() => {
    dispatchSpy = jest.fn()
    getStateSpy = jest.fn()
    getOrderPriceSpy = jest.spyOn(orderV2, 'getOrderPrice')
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('pricingRequest', () => {
    it('will not request prices if the number of recipes are less then 2', async () => {
      getStateSpy.mockReturnValue({
        auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
        basket: Immutable.fromJS({ recipes: { 123: 1 }, slotId: 124 }),
        features: getFeatures('a1b2c3d4')
      })

      requestPricing.mockReturnValue(Promise.resolve({ data: pricingData }))

      await actions.pricingRequest()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).not.toContain({
        type: actionTypes.PRICING_PENDING,
      })
      expect(dispatchSpy).not.toContain({
        type: actionTypes.PRICING_SUCCESS,
        prices: pricingData,
      })
      expect(requestPricing).not.toHaveBeenCalled()
      expect(getOrderPriceSpy).not.toHaveBeenCalled()
    })

    it('will not request prices if the slotId is not set', async () => {
      getStateSpy.mockReturnValue({
        auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
        basket: Immutable.fromJS({ recipes: { 123: 1, 234: 1 } }),
        features: getFeatures('a1b2c3d4')
      })

      requestPricing.mockReturnValue(Promise.resolve({ data: pricingData }))

      await actions.pricingRequest()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).not.toHaveBeenCalledWith({
        type: actionTypes.PRICING_PENDING,
      })
      expect(dispatchSpy).not.toHaveBeenCalledWith({
        type: actionTypes.PRICING_SUCCESS,
        prices: pricingData,
      })
      expect(requestPricing).not.toHaveBeenCalled()
      expect(getOrderPriceSpy).not.toHaveBeenCalled()
    })

    describe('when feature flag `radishes_order_api_pricing_web_enabled` is disabled', () => {
      it('will return with the PRICING_SUCCESS action and data when 2 recipes and the slotId are set', async () => {
        getStateSpy.mockReturnValue({
          auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
          basket: Immutable.fromJS({ recipes: { 123: 2 }, slotId: 124 }),
          features: getFeatures('a1b2c3d4')
        })

        requestPricing.mockReturnValue(Promise.resolve({ data: pricingData }))

        await actions.pricingRequest()(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalledTimes(2)
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: actionTypes.PRICING_PENDING,
        })
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: actionTypes.PRICING_SUCCESS,
          prices: pricingData,
        })
        expect(requestPricing).toHaveBeenCalled()
      })

      it('should return with the PRICING_SUCCESS action and data with store data set', async () => {
        const accessToken = 'accessToken'
        const date = '12-12-2029'
        const slotId = 12
        const promoCode = '1234'
        const daySlotLeadTimeId = 987
        const deliveryTariffId = deliveryTariffTypes.FREE_NDD

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

        requestPricing.mockReturnValue(Promise.resolve({ data: pricingData }))

        await actions.pricingRequest()(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalledTimes(2)
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: actionTypes.PRICING_PENDING,
        })
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: actionTypes.PRICING_SUCCESS,
          prices: pricingData,
        })
        expect(requestPricing).toHaveBeenCalled()

        const recipeDataRequest = { 0: { id: '123', type: 'Recipe', quantity: 2 }, 1: { id: '145', type: 'Recipe', quantity: 2 } }
        expect(requestPricing).toHaveBeenCalledWith(
          accessToken,
          recipeDataRequest,
          date,
          slotId,
          promoCode,
          daySlotLeadTimeId,
          deliveryTariffId
        )
      })

      it('will be called with tariffId if id is provided and user is not authenticated', async () => {
        const accessToken = 'accessToken'
        const date = '12-12-2029'
        const slotId = 12
        const promoCode = '1234'
        const tariffId = '12345678'
        const daySlotLeadTimeId = 987
        const deliveryTariffId = deliveryTariffTypes.PAID_NDD

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

        requestPricing.mockReturnValue(Promise.resolve({ data: pricingData }))

        await actions.pricingRequest()(dispatchSpy, getStateSpy)

        const recipeDataRequest = { 0: { id: '123', type: 'Recipe', quantity: 2 }, 1: { id: '145', type: 'Recipe', quantity: 2 } }
        expect(requestPricing).toHaveBeenCalledWith(
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

      it('will request all basket items when recipes, products and the slotId are set', async () => {
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

        requestPricing.mockReturnValue(Promise.resolve({ data: pricingData }))

        await actions.pricingRequest()(dispatchSpy, getStateSpy)

        expect(requestPricing.mock.calls[0][1]).toEqual({
          0: { id: '123', quantity: 2, type: 'Recipe' },
          1: { id: '123', quantity: 2, type: 'Recipe' },
          2: { id: 'p1', quantity: 1, type: 'Product' },
          3: { id: 'p1', quantity: 1, type: 'Product' },
          4: { id: 'p2', quantity: 1, type: 'Product' },
        })
      })

      it('should return with the PRICING_FAILURE action and message', async () => {
        getStateSpy.mockReturnValue({
          auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
          basket: Immutable.fromJS({ recipes: { 123: 1, 134: 1 }, slotId: 1 }),
          features: getFeatures('a1b2c3d4')
        })

        requestPricing.mockReturnValue(Promise.reject('error from pricing endpoint'))

        await actions.pricingRequest()(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalledTimes(2)
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: actionTypes.PRICING_PENDING,
        })
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: actionTypes.PRICING_FAILURE,
          message: 'error from pricing endpoint',
        })
        expect(requestPricing).toHaveBeenCalled()
      })
    })

    // TODO: When radishes pickup Order V2 work this flag and V1 will be removed as part of that work
    describe.skip('when feature flag `radishes_order_api_pricing_web_enabled` is enabled', () => {
      beforeEach(() => {
        jest.spyOn(optimizelyUtils, 'isOptimizelyFeatureEnabledFactory')
          .mockReturnValue(() => Promise.resolve(true))
      })

      describe('when pricing endpoint is successful', () => {
        it('will return with the PRICING_SUCCESS action and data when 2 recipes and the slotId are set', async () => {
          const getState = () => createState()
          getOrderPriceSpy.mockResolvedValue([orderV2PricesFixture, null, 200])

          await actions.pricingRequest()(dispatchSpy, getState)

          expect(dispatchSpy).toHaveBeenCalledTimes(2)
          expect(dispatchSpy).toHaveBeenCalledWith({
            type: actionTypes.PRICING_PENDING,
          })
          expect(dispatchSpy).toHaveBeenCalledWith({
            type: actionTypes.PRICING_SUCCESS,
            prices: {
              amountOff: '0.00',
              deliveryTotal: '0.00',
              flatDiscountApplied: false,
              grossTotal: '24.99',
              items: [
                {
                  type: 'Surcharge',
                },
                {
                  type: 'Surcharge',
                },
              ],
              percentageOff: '40.00',
              pricePerPortion: '6.25',
              pricePerPortionDiscounted: '3.75',
              productTotal: '0.00',
              promoCode: undefined,
              promoCodeValid: false,
              recipeDiscount: '9.99',
              recipeTotal: '24.99',
              recipeTotalDiscounted: '1.99',
              surchargeTotal: '0.00',
              total: '15.00',
              totalDiscount: '9.99',
              vatCharged: '0.00',
            },
          })
          expect(getOrderPriceSpy).toHaveBeenCalledWith('auth-access-token',
            {
              attributes: {
                menu_id: '433',
              },
              relationships: {
                components: {
                  data: [
                    {id: 'recipe-uuid-1', meta: { portion_for: 2 }, type: 'recipe'},
                    {id: 'recipe-uuid-2', meta: { portion_for: 2 }, type: 'recipe'},
                    {id: 'recipe-uuid-2', meta: { portion_for: 2 }, type: 'recipe'}]},
                delivery_day: { data: { id: 'delivery-days-id', type: 'delivery-day'}},
                delivery_slot: { data: { id: 'slot-core-id', meta: {uuid: 'slot-uuid' }, type: 'delivery-slot'}},
                delivery_tariff: { data: { id: '9037a447-e11a-4960-ae69-d89a029569af', type: 'delivery-tariff'}},
                delivery_slot_lead_time: { data: { id: 'day-slot-lead-time-uuid', type: 'delivery-slot-lead-time'}},
              },
              type: 'order'
            },
            'auth-user-id')
        })
      })

      describe('when pricing endpoint fails', () => {
        it('should return with the PRICING_FAILURE action and message', async () => {
          const getState = () => createState({ auth: { accessToken: 'token', id: 'user-id' } })

          getOrderPriceSpy.mockResolvedValue([null, 'error from pricing endpoint', 400])

          await actions.pricingRequest()(dispatchSpy, getState)

          expect(dispatchSpy).toHaveBeenCalledTimes(2)
          expect(dispatchSpy).toHaveBeenCalledWith({
            type: actionTypes.PRICING_PENDING,
          })
          expect(dispatchSpy).toHaveBeenCalledWith({
            type: actionTypes.PRICING_FAILURE,
            message: 'error from pricing endpoint',
          })
          expect(getOrderPriceSpy).toHaveBeenCalled()
        })
      })
    })
  })

  describe('pricingClear', () => {
    it('should dispatch a pricing reset event', async () => {
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

    it('should not dispatch a pricing reset event when there is no items in the pricing array', async () => {
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
