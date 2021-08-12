import Immutable from 'immutable'
import { deliveryTariffTypes } from 'utils/deliveries'
import {
  getSlotForBoxSummaryDeliveryDays,
  getOrderDetails,
  getIsOrderWithoutRecipes,
  getDetailsForOrderWithoutRecipes,
  getOrderAction,
  getCouldBasketBeExpired,
  getOrderForUpdateOrderV1,
  getOrderV2,
  getUpdateOrderProductItemsOrderV1,
  getUserDeliveryTariffId,
} from '../order'
import { createState } from '../__mocks__/order.mock'

describe('order selectors', () => {
  describe('getSlotForBoxSummaryDeliveryDays', () => {
    test('returns a object containing the delivery_day, slot_id day_slot_lead_time_id and chosen recipes', () => {
      const state = createState()

      const slotInformation = getSlotForBoxSummaryDeliveryDays(state)

      expect(slotInformation).toEqual([
        new Immutable.Map({id: 'slot-uuid', coreSlotId: 'slot-core-id', daySlotLeadTimeId: 'day-slot-lead-time-uuid'}),
        'slot-uuid'
      ])
    })
  })

  describe('getUserDeliveryTariffId', () => {
    describe('when tariff is set', () => {
      const tariff = deliveryTariffTypes.FREE_NDD
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

        expect(tariffId).toEqual(deliveryTariffTypes.NON_NDD)
      })
    })
  })

  describe('getOrderDetails', () => {
    test('returns a object containing the delivery_day, slot_id day_slot_lead_time_id and chosen recipes', () => {
      const state = createState()

      const orderDetails = getOrderDetails(state)

      expect(orderDetails).toEqual({
        delivery_day_id: 'delivery-days-id',
        delivery_slot_id: 'slot-core-id',
        recipe_choices: [
          { id: 'recipe-id-1', quantity: 2, type: 'Recipe' },
          { id: 'recipe-id-2', quantity: 2, type: 'Recipe' },
          { id: 'recipe-id-2', quantity: 2, type: 'Recipe' }
        ],
        day_slot_lead_time_id: 'day-slot-lead-time-uuid',
        delivery_tariff_id: deliveryTariffTypes.NON_NDD,
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
          delivery_day_id: 'delivery-days-id',
          delivery_slot_id: 'slot-core-id',
          recipe_choices: [
            { id: 'recipe-id-1', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' }
          ],
          day_slot_lead_time_id: 'day-slot-lead-time-uuid',
          delivery_tariff_id: deliveryTariffTypes.NON_NDD,
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
          delivery_day_id: 'delivery-days-id',
          delivery_slot_id: 'slot-core-id',
          recipe_choices: [
            { id: 'recipe-id-1', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' }
          ],
          day_slot_lead_time_id: 'day-slot-lead-time-uuid',
          delivery_tariff_id: deliveryTariffTypes.NON_NDD,
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
          delivery_day_id: 'delivery-days-id',
          delivery_slot_id: 'slot-core-id',
          recipe_choices: [
            { id: 'recipe-id-1', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' }
          ],
          day_slot_lead_time_id: 'day-slot-lead-time-uuid',
          delivery_tariff_id: deliveryTariffTypes.NON_NDD,
          address_id: null,
          promo_code: '1234'
        })
      })
    })
  })

  describe('getIsOrderWithoutRecipes', () => {
    const cases = [
      // isPaymentBeforeChoosingEnabled, isAuthenticated, expected
      [ false, false, false ],
      [ true, false, true ],
      [ false, true, false ],
      [ true, true, false ],
    ]

    describe.each(cases)('when isPaymentBeforeChoosingEnabled is %s and isAuthenticated is %s', (isPaymentBeforeChoosingEnabled, isAuthenticated, expected) => {
      const state = createState({
        features: {
          isPaymentBeforeChoosingV1Enabled: { value: isPaymentBeforeChoosingEnabled },
        },
        auth: {
          isAuthenticated
        }
      })

      test(`then should return ${expected}`, () => {
        expect(getIsOrderWithoutRecipes(state)).toBe(expected)
      })
    })
  })

  describe('getDetailsForOrderWithoutRecipes', () => {
    test('returns an object like getOrderDetails but with feature flag and additional fields', () => {
      const state = createState({
        basket: {
          numRecipes: 3,
          promoCode: '1234'
        }
      })

      const orderDetails = getDetailsForOrderWithoutRecipes(state)

      expect(orderDetails).toEqual({
        delivery_day_id: 'delivery-days-id',
        delivery_slot_id: 'slot-core-id',
        recipe_choices: [],
        promo_code: '1234',
        day_slot_lead_time_id: 'day-slot-lead-time-uuid',
        delivery_tariff_id: deliveryTariffTypes.NON_NDD,
        address_id: null,
        get_order_without_recipes: true,
        number_of_recipes: 3,
        number_of_portions: 2,
        box_type: 'gourmet',
        promocode: '1234'
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
        const state = createState({
          basket: {
            slotId: undefined
          },
          boxSummaryDeliveryDays: undefined
        })

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
    test('returns a object containing the delivery_day, slot_id day_slot_lead_time_id and chosen recipes', () => {
      const state = createState({
        slot: {
          daySlotLeadTimeId: null
        }
      })

      const orderDetails = getOrderForUpdateOrderV1(state)

      expect(orderDetails).toEqual({
        delivery_day_id: 'delivery-days-id',
        delivery_slot_id: 'slot-core-id',
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
        const state = createState()

        const orderDetails = getOrderForUpdateOrderV1(state)

        expect(orderDetails).toEqual({
          delivery_day_id: 'delivery-days-id',
          delivery_slot_id: 'slot-core-id',
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
          delivery_day_id: 'delivery-days-id',
          delivery_slot_id: 'slot-core-id',
          recipe_choices: [
            { id: 'recipe-id-1', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' },
            { id: 'recipe-id-2', quantity: 2, type: 'Recipe' }
          ],
          day_slot_lead_time_id: 'day-slot-lead-time-uuid',
          order_action: 'create',
          address_id: '1234'
        })
      })
    })
  })

  describe('getOrderV2', () => {
    test('returns a object containing the delivery_day, slot_id day_slot_lead_time_id and chosen recipes', () => {
      const state = createState({
        slot: {
          daySlotLeadTimeId: null
        }
      })

      const orderDetails = getOrderV2(state)

      expect(orderDetails).toEqual({
        type: 'order',
        attributes: {
          menu_id: '433',
        },
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
              id: 'delivery-days-id',
              type: 'delivery-day'
            }
          },
          delivery_slot: {
            data: {
              id: 'slot-core-id',
              type: 'delivery-slot',
              meta: {
                uuid: 'slot-uuid',
              },
            }
          },
          delivery_tariff: {
            data: {
              id: deliveryTariffTypes.NON_NDD,
              type: 'delivery-tariff'
            }
          }
        }
      })
    })

    describe('when menu-service recipes are not defined (have not been fetched)', () => {
      test('returns an order without recipes', () => {
        const state = createState({
          menuService: {
            recipe: undefined,
          },
          slot: {
            daySlotLeadTimeId: null
          }
        })

        const orderDetails = getOrderV2(state)

        expect(orderDetails).toEqual({
          type: 'order',
          attributes: {
            menu_id: '433',
          },
          relationships: {
            components: {
              data: []
            },
            delivery_day: {
              data: {
                id: 'delivery-days-id',
                type: 'delivery-day'
              }
            },
            delivery_slot: {
              data: {
                id: 'slot-core-id',
                type: 'delivery-slot',
                meta: {
                  uuid: 'slot-uuid',
                },
              }
            },
            delivery_tariff: {
              data: {
                id: deliveryTariffTypes.NON_NDD,
                type: 'delivery-tariff'
              }
            }
          }
        })
      })
    })

    describe('when customer does not have day slot lead time id', () => {
      test('returns an object containing the delivery_slot_lead_time for delivery slot lead time', () => {
        const state = createState()

        const orderDetails = getOrderV2(state)

        expect(orderDetails).toEqual({
          type: 'order',
          attributes: {
            menu_id: '433',
          },
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
                id: 'delivery-days-id',
                type: 'delivery-day'
              }
            },
            delivery_slot: {
              data: {
                id: 'slot-core-id',
                type: 'delivery-slot',
                meta: {
                  uuid: 'slot-uuid',
                },
              }
            },
            delivery_slot_lead_time: {
              data: {
                id: 'day-slot-lead-time-uuid',
                type: 'delivery-slot-lead-time',
              },
            },
            delivery_tariff: {
              data: {
                id: deliveryTariffTypes.NON_NDD,
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
          attributes: {
            menu_id: '433',
          },
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
                id: 'delivery-days-id',
                type: 'delivery-day'
              }
            },
            delivery_slot: {
              data: {
                id: 'slot-core-id',
                type: 'delivery-slot',
                meta: {
                  uuid: 'slot-uuid',
                },
              }
            },
            shipping_address: {
              data: {
                id: '1234',
                type: 'shipping-address'
              }
            },
            delivery_slot_lead_time: {
              data: {
                id: 'day-slot-lead-time-uuid',
                type: 'delivery-slot-lead-time',
              },
            },
            delivery_tariff: {
              data: {
                id: deliveryTariffTypes.NON_NDD,
                type: 'delivery-tariff'
              }
            }
          }
        })
      })
    })

    describe('when customer has products', () => {
      test('returns an order with products', () => {
        const state = createState({
          basket: {
            products: {
              product_1: 2,
              product_2: 1,
            }
          },
          slot: {
            daySlotLeadTimeId: null
          }
        })

        const orderDetails = getOrderV2(state)

        expect(orderDetails.relationships.components.data).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ type: 'recipe' }),
            expect.objectContaining({ type: 'recipe' }),
            expect.objectContaining({ type: 'recipe' }),
            {
              id: 'product_1',
              meta: {
                quantity: 2,
              },
              type: 'product',
            },
            {
              id: 'product_2',
              meta: {
                quantity: 1,
              },
              type: 'product',
            },
          ])
        )
      })
    })

    describe('when customer has a promo code', () => {
      const promoCode = 'ABC-XX-30M'
      const state = createState({
        basket: {
          promoCode
        }
      })

      test('order details contains promo code', () => {
        const orderDetails = getOrderV2(state)

        expect(orderDetails.attributes.prices).toEqual({
          promo_code: promoCode
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
