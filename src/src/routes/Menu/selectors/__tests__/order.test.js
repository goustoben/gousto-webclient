import Immutable from 'immutable'
import { getSlot, deliveryTariffTypes } from 'utils/deliveries'
import { getSlotForBoxSummaryDeliveryDays, getOrderDetails, getCouldBasketBeExpired } from '../order'

jest.mock('utils/deliveries')

describe.only('order selectors', () => {
  const getSlotMockedValue = Immutable.fromJS({
    coreSlotId: '4',
    id: 'deliveries-uuid',
    daySlotLeadTimeId: 'day-slot-lead-time-uuid'
  })

  beforeAll(() => {
    getSlot.mockReturnValue(getSlotMockedValue)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  const createState = (partialOverwrite = {}) => ({
    basket: Immutable.fromJS({
      date: '2019-10-10',
      slotId: '4',
      recipes: {
        'recipe-id-1': 1,
        'recipe-id-2': 2,
      },
      numPortions: 2,
      ...(partialOverwrite.basket || {})
    }),
    boxSummaryDeliveryDays: Immutable.fromJS({
      '2019-10-10': {
        id: '3e9a2572-a778-11e6-bb0f-080027596944',
        date: '2016-11-21',
        coreDayId: '5',
        slots: [
          {
            coreSlotId: '1',
            id: '3e952522-a778-11e6-8197-080027596944',
          },
        ],
      },
    }),
    features: Immutable.fromJS({
      ndd: {
        value: deliveryTariffTypes.NON_NDD
      },
      enable3DSForSignUp: {
        value: false
      },
    }),
  })

  describe('getSlotForBoxSummaryDeliveryDays', () => {
    test('returns a object containing the delivery_day, slot_id day_slot_lead_time_id and chosen recipes', () => {
      const state = createState()

      const slotInformation = getSlotForBoxSummaryDeliveryDays(state)

      expect(slotInformation).toEqual([getSlotMockedValue, '4'])
    })
  })

  describe('getOrderDetails', () => {
    test('returns a object containing the delivery_day, slot_id day_slot_lead_time_id and chosen recipes', () => {
      const state = createState()

      const orderDetails = getOrderDetails(state)

      expect(orderDetails).toEqual({
        delivery_day_id: '5',
        delivery_slot_id: '4',
        recipe_choices: [
          { id: 'recipe-id-1', quantity: 2, type: 'Recipe'},
          { id: 'recipe-id-2', quantity: 2, type: 'Recipe'},
          { id: 'recipe-id-2', quantity: 2, type: 'Recipe'}
        ],
        day_slot_lead_time_id: 'day-slot-lead-time-uuid',
        delivery_tariff_id: undefined,
        address_id: null
      })
    })

    describe('when customer chose address', () => {
      test('returns a object containing the address_id for chosen address', () => {
        const state = createState({
          basket: {
            chosenAddress: {
              id: '1234'
            }
          }
        })

        const orderDetails = getOrderDetails(state)

        expect(orderDetails).toEqual({
          delivery_day_id: '5',
          delivery_slot_id: '4',
          recipe_choices: [
            { id: 'recipe-id-1', quantity: 2, type: 'Recipe'},
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe'},
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe'}
          ],
          day_slot_lead_time_id: 'day-slot-lead-time-uuid',
          delivery_tariff_id: undefined,
          address_id: '1234'
        })
      })
    })

    describe('when order id exists', () => {
      test('returns a object containing the key order_id for the order id', () => {
        const state = createState({
          basket: {
            orderId: '1234'
          }
        })

        const orderDetails = getOrderDetails(state)

        expect(orderDetails).toEqual({
          delivery_day_id: '5',
          delivery_slot_id: '4',
          recipe_choices: [
            { id: 'recipe-id-1', quantity: 2, type: 'Recipe'},
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe'},
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe'}
          ],
          day_slot_lead_time_id: 'day-slot-lead-time-uuid',
          delivery_tariff_id: undefined,
          address_id: null,
          order_id: '1234'
        })
      })
    })

    describe('when promo code exists', () => {
      test('returns a object containing the key promo_code for the promo code', () => {
        const state = createState({
          basket: {
            promoCode: '1234'
          }
        })

        const orderDetails = getOrderDetails(state)

        expect(orderDetails).toEqual({
          delivery_day_id: '5',
          delivery_slot_id: '4',
          recipe_choices: [
            { id: 'recipe-id-1', quantity: 2, type: 'Recipe'},
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe'},
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe'}
          ],
          day_slot_lead_time_id: 'day-slot-lead-time-uuid',
          delivery_tariff_id: undefined,
          address_id: null,
          promo_code: '1234'
        })
      })
    })
  })

  describe('getCouldBasketBeExpired', () => {
    describe('when customer chosen delivery day, delivery slot and recipes', () => {
      test('returns false', () => {
        const state = createState()

        const couldBasketBeExpired = getCouldBasketBeExpired(state)

        expect(couldBasketBeExpired).toEqual(false)
      })
    })

    describe("when customer hasn't chosen delivery day", () => {
      test('returns true', () => {
        const state = createState({
          basket: {
            date: undefined
          }
        })

        const couldBasketBeExpired = getCouldBasketBeExpired(state)

        expect(couldBasketBeExpired).toEqual(true)
      })
    })

    describe("when customer hasn't have chosen delivery slot", () => {
      test('returns true', () => {
        getSlot.mockReturnValue(Immutable.fromJS({}))

        const state = createState()

        const couldBasketBeExpired = getCouldBasketBeExpired(state)

        expect(couldBasketBeExpired).toEqual(true)
      })
    })

    describe("when customer hasn't have chosen recipes", () => {
      test('returns true', () => {
        const state = createState({
          recipe_choices: [],
        })

        const couldBasketBeExpired = getCouldBasketBeExpired(state)

        expect(couldBasketBeExpired).toEqual(true)
      })
    })
  })
})
