import Immutable from 'immutable'
import * as utilsDeliveries from 'utils/deliveries'
import {
  getSlotForBoxSummaryDeliveryDays,
  getOrderDetails,
  getOrderAction,
  getCouldBasketBeExpired,
  getOrderForUpdateOrderV1,
  getOrderV2,
  getUpdateOrderProductItemsOrderV1,
  getUserDeliveryTariffId,
} from '../order'

describe('order selectors', () => {
  const getSlotMockedValue = Immutable.fromJS({
    coreSlotId: '4',
    id: 'deliveries-uuid',
    daySlotLeadTimeId: 'day-slot-lead-time-uuid'
  })
  let getSlotSpy

  beforeEach(() => {
    getSlotSpy = jest.spyOn(utilsDeliveries, 'getSlot').mockReturnValue(getSlotMockedValue)
  })

  afterAll(() => {
    jest.clearAllMocks()
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
    menuService: {
      recipe: {
        'recipe-id-1': {
          id: 'recipe-uuid-1'
        },
        'recipe-id-2': {
          id: 'recipe-uuid-2'
        },
      },
      ...(partialOverwrite.menuService || {})
    },
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
        value: utilsDeliveries.deliveryTariffTypes.NON_NDD
      },
      enable3DSForSignUp: {
        value: false
      },
    }),
    user: Immutable.fromJS({
      orders: Immutable.List([]),
      deliveryTariffId: utilsDeliveries.deliveryTariffTypes.NON_NDD,
      ...(partialOverwrite.user || {})
    })
  })

  describe('getSlotForBoxSummaryDeliveryDays', () => {
    test('returns a object containing the delivery_day, slot_id day_slot_lead_time_id and chosen recipes', () => {
      const state = createState()

      const slotInformation = getSlotForBoxSummaryDeliveryDays(state)

      expect(slotInformation).toEqual([getSlotMockedValue, '4'])
    })
  })

  describe('getUserDeliveryTariffId', () => {
    describe('when tariff is set', () => {
      const tariff = utilsDeliveries.deliveryTariffTypes.FREE_NDD
      const state = createState({ user: { deliveryTariffId: tariff } })

      test('returns the user tariff id', () => {
        const tariffId = getUserDeliveryTariffId(state)

        expect(tariffId).toEqual(tariff)
      })
    })

    describe('when tariff is not set', () => {
      const state = createState({ user: { deliveryTariffId: undefined } })

      test('should return NON_NDD', () => {
        const tariffId = getUserDeliveryTariffId(state)

        expect(tariffId).toEqual(utilsDeliveries.deliveryTariffTypes.NON_NDD)
      })
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
          { id: 'recipe-id-1', quantity: 2, type: 'Recipe' },
          { id: 'recipe-id-2', quantity: 2, type: 'Recipe' },
          { id: 'recipe-id-2', quantity: 2, type: 'Recipe' }
        ],
        day_slot_lead_time_id: 'day-slot-lead-time-uuid',
        delivery_tariff_id: '9037a447-e11a-4960-ae69-d89a029569af',
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
            { id: 'recipe-id-1', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' }
          ],
          day_slot_lead_time_id: 'day-slot-lead-time-uuid',
          delivery_tariff_id: '9037a447-e11a-4960-ae69-d89a029569af',
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
            { id: 'recipe-id-1', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' }
          ],
          day_slot_lead_time_id: 'day-slot-lead-time-uuid',
          delivery_tariff_id: '9037a447-e11a-4960-ae69-d89a029569af',
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
            { id: 'recipe-id-1', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' }
          ],
          day_slot_lead_time_id: 'day-slot-lead-time-uuid',
          delivery_tariff_id: '9037a447-e11a-4960-ae69-d89a029569af',
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
        getSlotSpy.mockReturnValue(Immutable.fromJS({}))

        const state = createState()

        const couldBasketBeExpired = getCouldBasketBeExpired(state)

        expect(couldBasketBeExpired).toEqual(true)
      })
    })

    describe("when customer hasn't have chosen recipes", () => {
      test('returns false', () => {
        const state = createState({
          recipes: [],
        })

        const couldBasketBeExpired = getCouldBasketBeExpired(state)

        expect(couldBasketBeExpired).toEqual(false)
      })
    })
  })

  describe('getOrderAction', () => {
    describe('when there is the basket has no order id', () => {
      it('should returns `create`', () => {
        const state = createState()

        const orderAction = getOrderAction(state)

        expect(orderAction).toEqual('create')
      })
    })

    describe('when there is an order id and no matching user order', () => {
      it('should returns `recipe-choice`', () => {
        const state = createState({
          basket: { orderId: 'order-id' },
          user: {
            orders: Immutable.List([])
          }
        })

        const orderAction = getOrderAction(state)

        expect(orderAction).toEqual('recipe-choice')
      })
    })

    describe('when there is an order id and a matching user order with no recipes', () => {
      it('should returns `recipe-choice`', () => {
        const state = createState({
          basket: { orderId: 'order-id' },
          user: {
            orders: Immutable.List([
              Immutable.Map({ id: 'order-id', recipeItems: Immutable.List([]) })
            ])
          }
        })

        const orderAction = getOrderAction(state)

        expect(orderAction).toEqual('recipe-choice')
      })
    })

    describe('when there is an order id and a matching user order with recipes', () => {
      it('should returns `recipe-update`', () => {
        const state = createState({
          basket: { orderId: 'order-id' },
          user: {
            orders: Immutable.List([
              Immutable.Map({ id: 'order-id', recipeItems: Immutable.List([1]) })
            ])
          }
        })

        const orderAction = getOrderAction(state)

        expect(orderAction).toEqual('recipe-update')
      })
    })
  })

  describe('getOrderForUpdateOrderV1', () => {
    beforeEach(() => {
      getSlotSpy.mockReturnValue(Immutable.fromJS({
        coreSlotId: '4',
        id: 'deliveries-uuid',
        daySlotLeadTimeId: null
      }))
    })

    test('returns a object containing the delivery_day, slot_id day_slot_lead_time_id and chosen recipes', () => {
      const state = createState()

      const orderDetails = getOrderForUpdateOrderV1(state)

      expect(orderDetails).toEqual({
        delivery_day_id: '5',
        delivery_slot_id: '4',
        recipe_choices: [
          { id: 'recipe-id-1', quantity: 2, type: 'Recipe' },
          { id: 'recipe-id-2', quantity: 2, type: 'Recipe' },
          { id: 'recipe-id-2', quantity: 2, type: 'Recipe' }
        ],
        day_slot_lead_time_id: null,
        order_action: 'create',
        address_id: null
      })
    })

    describe('when customer does not have day slot lead time id', () => {
      test('returns an object containing the delivery_slot_lead_time for delivery slot lead time', () => {
        getSlotSpy.mockReturnValue(Immutable.fromJS({
          coreSlotId: '4',
          id: 'deliveries-uuid',
          daySlotLeadTimeId: 'day-slot-lead-time-uuid'
        }))

        const state = createState()

        const orderDetails = getOrderForUpdateOrderV1(state)

        expect(orderDetails).toEqual({
          delivery_day_id: '5',
          delivery_slot_id: '4',
          recipe_choices: [
            { id: 'recipe-id-1', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' }
          ],
          day_slot_lead_time_id: 'day-slot-lead-time-uuid',
          order_action: 'create',
          address_id: null
        })
      })
    })

    describe('when customer chose address', () => {
      test('returns an object containing the address_id for chosen address', () => {
        const state = createState({
          basket: {
            chosenAddress: {
              id: '1234'
            }
          }
        })

        const orderDetails = getOrderForUpdateOrderV1(state)

        expect(orderDetails).toEqual({
          delivery_day_id: '5',
          delivery_slot_id: '4',
          recipe_choices: [
            { id: 'recipe-id-1', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' }
          ],
          day_slot_lead_time_id: null,
          order_action: 'create',
          address_id: '1234'
        })
      })
    })
  })

  describe('getOrderV2', () => {
    beforeEach(() => {
      getSlotSpy.mockReturnValue(Immutable.fromJS({
        coreSlotId: '4',
        id: 'deliveries-uuid',
        daySlotLeadTimeId: null
      }))
    })

    test('returns a object containing the delivery_day, slot_id day_slot_lead_time_id and chosen recipes', () => {
      const state = createState()

      const orderDetails = getOrderV2(state)

      expect(orderDetails).toEqual({
        type: 'order',
        relationships: {
          components: {
            data: [{
              id: 'recipe-uuid-1',
              meta: {
                portion_for: 2
              },
              type: 'recipe'
            },
            {
              id: 'recipe-uuid-2',
              meta: {
                portion_for: 2
              },
              type: 'recipe'
            },
            {
              id: 'recipe-uuid-2',
              meta: {
                portion_for: 2
              },
              type: 'recipe'
            }
            ]
          },
          delivery_day: {
            data: {
              id: '5',
              type: 'delivery-day'
            }
          },
          delivery_slot: {
            data: {
              id: '4',
              type: 'delivery-slot'
            }
          },
          delivery_tariff: {
            data: {
              id: '9037a447-e11a-4960-ae69-d89a029569af',
              type: 'delivery-tariff'
            }
          }
        }
      })
    })

    describe('when customer does not have day slot lead time id', () => {
      test('returns an object containing the delivery_slot_lead_time for delivery slot lead time', () => {
        getSlotSpy.mockReturnValue(Immutable.fromJS({
          coreSlotId: '4',
          id: 'deliveries-uuid',
          daySlotLeadTimeId: 'day-slot-lead-time-uuid'
        }))

        const state = createState()

        const orderDetails = getOrderV2(state)

        expect(orderDetails).toEqual({
          type: 'order',
          relationships: {
            components: {
              data: [{
                id: 'recipe-uuid-1',
                meta: {
                  portion_for: 2
                },
                type: 'recipe'
              }, {
                id: 'recipe-uuid-2',
                meta: {
                  portion_for: 2
                },
                type: 'recipe'
              }, {
                id: 'recipe-uuid-2',
                meta: {
                  portion_for: 2
                },
                type: 'recipe'
              }]
            },
            delivery_day: {
              data: {
                id: '5',
                type: 'delivery-day'
              }
            },
            delivery_slot: {
              data: {
                id: '4',
                type: 'delivery-slot'
              }
            },
            delivery_slot_lead_time: {
              data: {
                id: 'day-slot-lead-time-uuid',
                type: 'delivery-slot-lead-time'
              }
            },
            delivery_tariff: {
              data: {
                id: '9037a447-e11a-4960-ae69-d89a029569af',
                type: 'delivery-tariff'
              }
            }
          }
        })
      })
    })

    describe('when customer chose address', () => {
      test('returns an object containing the address_id for chosen address', () => {
        const state = createState({
          basket: {
            chosenAddress: {
              id: '1234'
            }
          }
        })

        const orderDetails = getOrderV2(state)

        expect(orderDetails).toEqual({
          type: 'order',
          relationships: {
            components: {
              data: [{
                id: 'recipe-uuid-1',
                meta: {
                  portion_for: 2
                },
                type: 'recipe'
              }, {
                id: 'recipe-uuid-2',
                meta: {
                  portion_for: 2
                },
                type: 'recipe'
              }, {
                id: 'recipe-uuid-2',
                meta: {
                  portion_for: 2
                },
                type: 'recipe'
              }]
            },
            delivery_day: {
              data: {
                id: '5',
                type: 'delivery-day'
              }
            },
            delivery_slot: {
              data: {
                id: '4',
                type: 'delivery-slot'
              }
            },
            shipping_address: {
              data: {
                id: '1234',
                type: 'shipping-address'
              }
            },
            delivery_tariff: {
              data: {
                id: '9037a447-e11a-4960-ae69-d89a029569af',
                type: 'delivery-tariff'
              }
            }
          }
        })
      })
    })
  })
})

describe('getUpdateOrderProductItemsOrderV1', () => {
  let state
  beforeEach(() => {
    state = {
      basket: Immutable.fromJS({
        orderId: '23',
        products: {
          'product-1': 2,
          'product-2': 1,
        },
      })
    }
  })

  test('should call updateOrderItems api with products', () => {
    const updateOrderProductItemsOrderV1 = getUpdateOrderProductItemsOrderV1(state)

    expect(updateOrderProductItemsOrderV1).toEqual(
      {
        item_choices: [
          {
            id: 'product-1',
            quantity: 2,
            type: 'Product',
          },
          {
            id: 'product-2',
            quantity: 1,
            type: 'Product',
          },
        ],
        restrict: 'Product',
      },
    )
  })
})
