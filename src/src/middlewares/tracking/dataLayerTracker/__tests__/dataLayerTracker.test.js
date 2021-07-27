import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { dataLayerTracker } from '../dataLayerTracker'

describe('given dataLayerTracker middleware is invoked', () => {
  const state = {
    routing: {
      locationBeforeTransitions: {
        query: '',
      },
    },
    recipes: Immutable.fromJS({
      123: {
        title: 'Caponata',
      },
      739: {
        title: 'Sweet Potato Curry',
      },
      672: {
        title: 'Roasted Veg Skewers',
      },
    }),
    user: Immutable.fromJS({}),
    menuCollections: Immutable.fromJS({
      'plant-based-id': {
        recipesInCollection: ['739', '672'],
        slug: 'plant-based',
      },
    }),
    basket: Immutable.fromJS({
      numPortions: 2,
      recipes: {
        123: 2,
        739: 1,
      },
    }),
    pricing: Immutable.fromJS({
      prices: {
        recipeTotalDiscounted: '20.00',
        totalDiscount: '19.99',
        promoCode: 'JOEWICKSGOUSTO',
      },
    }),
  }

  describe('when not on the client', () => {
    beforeEach(() => {
      // eslint-disable-next-line no-global-assign
      __CLIENT__ = false
      window.dataLayer = []
    })

    test('then a request should be ignored', () => {
      const action = {
        type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
        recipeId: '123',
      }
      dataLayerTracker(action, state)

      expect(window.dataLayer).toHaveLength(0)
    })
  })

  describe('when on the client', () => {
    beforeEach(() => {
      // eslint-disable-next-line no-global-assign
      __CLIENT__ = true
      window.dataLayer = []
    })

    describe('when MENU_RECIPE_DETAIL_VISIBILITY_CHANGE is handled', () => {
      test('then it should send view_recipe', () => {
        const action = {
          type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
          recipeId: '123',
        }

        dataLayerTracker(action, state)

        expect(window.dataLayer[0]).toEqual({
          ecommerce: null,
        })
        expect(window.dataLayer[1]).toEqual({
          event: 'view_recipe',
          ecommerce: {
            detail: {
              products: [
                {
                  category: 'all-recipes',
                  id: '123',
                  name: 'Caponata',
                  quantity: 1,
                },
              ],
            },
          },
          user: {},
        })
      })

      describe('and when recipeId is missing for some reason', () => {
        test('then the event should not be sent', () => {
          const action = {
            type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
          }
          dataLayerTracker(action, state)

          expect(window.dataLayer).toHaveLength(0)
        })
      })

      describe('and when the store contains user information', () => {
        const testState = {
          ...state,
          user: Immutable.fromJS({
            shippingAddress: {
              postcode: 'E3 3EE',
              town: 'LONDON',
            },
            nameFirst: 'Jeffrey',
            nameLast: 'Lebowski',
            id: '999',
            email: 'jeffrey.lebowski@sobchaksecurity.com',
            orders: {
              333: {},
            },
          }),
        }

        test('then the event contains user information', () => {
          const action = {
            type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
            recipeId: '123',
          }
          dataLayerTracker(action, testState)

          expect(window.dataLayer[1]).toEqual({
            event: 'view_recipe',
            ecommerce: {
              detail: {
                products: [
                  {
                    category: 'all-recipes',
                    id: '123',
                    name: 'Caponata',
                    quantity: 1,
                  },
                ],
              },
            },
            user: {
              id: '999',
              first_name: 'Jeffrey',
              last_name: 'Lebowski',
              email: 'jeffrey.lebowski@sobchaksecurity.com',
              postcode: 'E3 3EE',
              city: 'LONDON',
              country: 'GB',
              number_of_orders: 1,
            },
          })
        })
      })
    })

    describe('when FILTERS_COLLECTION_CHANGE is handled', () => {
      test('then it should send view_collection', () => {
        const action = {
          type: actionTypes.FILTERS_COLLECTION_CHANGE,
          collectionId: 'plant-based-id',
        }
        dataLayerTracker(action, state)

        expect(window.dataLayer[1]).toEqual({
          event: 'view_collection',
          ecommerce: {
            impressions: [
              {
                category: 'plant-based',
                id: '672',
                name: 'Roasted Veg Skewers',
                quantity: 1,
              },
              {
                category: 'plant-based',
                id: '739',
                name: 'Sweet Potato Curry',
                quantity: 1,
              },
            ],
          },
          user: {},
        })
      })
    })

    describe('when BASKET_RECIPE_ADD is handled', () => {
      test('then it should send add_to_cart', () => {
        const action = {
          type: actionTypes.BASKET_RECIPE_ADD,
          recipeId: '123',
        }
        dataLayerTracker(action, state)

        expect(window.dataLayer[1]).toEqual({
          event: 'add_to_cart',
          ecommerce: {
            box_type: 2,
            add: {
              products: [
                {
                  category: 'all-recipes',
                  id: '123',
                  name: 'Caponata',
                  quantity: 1,
                },
              ],
            },
          },
          user: {},
        })
      })

      describe('and when it happens just after order is created', () => {
        test('then the event should not be sent', () => {
          const action = {
            type: actionTypes.BASKET_RECIPE_ADD,
            recipeId: '123',
            orderId: '333',
          }
          dataLayerTracker(action, state)

          expect(window.dataLayer).toHaveLength(0)
        })
      })
    })

    describe('when BASKET_CHECKOUT is handled', () => {
      test('then it should send initiate_checkout', () => {
        const action = {
          type: actionTypes.BASKET_CHECKOUT,
        }
        dataLayerTracker(action, state)

        expect(window.dataLayer[1]).toEqual({
          event: 'initiate_checkout',
          user: {},

          ecommerce: {
            checkout: {
              actionField: {
                box_type: 2,
              },
              products: [
                {
                  category: 'all-recipes',
                  id: '123',
                  name: 'Caponata',
                  quantity: 2,
                },
                {
                  category: 'all-recipes',
                  id: '739',
                  name: 'Sweet Potato Curry',
                  quantity: 1,
                },
              ],
            },
          },
        })
      })
    })

    describe('when CHECKOUT_SIGNUP_SUCCESS is handled', () => {
      test('then it should send purchase_welcome with recipes from the action', () => {
        const action = {
          type: actionTypes.CHECKOUT_SIGNUP_SUCCESS,
          orderId: '333',
          basketRecipes: Immutable.fromJS({
            672: 2,
          }),
        }

        dataLayerTracker(action, state)

        expect(window.dataLayer[1]).toEqual({
          event: 'purchase_welcome',
          user: {},
          ecommerce: {
            purchase: {
              actionField: {
                box_type: 2,
                coupon: 'JOEWICKSGOUSTO',
                coupon_value: '19.99',
                currency_code: 'GBP',
                order_id: '333',
                revenue: '20.00',
              },
              products: [
                {
                  category: 'all-recipes',
                  id: '672',
                  name: 'Roasted Veg Skewers',
                  quantity: 2,
                },
              ],
            },
          },
        })
      })
    })

    describe('when ORDER_CREATE_TRANSACTIONAL is handled', () => {
      describe('and when the order uses v1 order api', () => {
        test('then it should send the "purchase" event', () => {
          const action = {
            type: actionTypes.ORDER_CREATE_TRANSACTIONAL,
            order: {
              id: '333',
              recipeItems: [{ recipeId: '123' }, { recipeId: '123' }],
              box: {
                numRecipes: 2,
              },
              prices: {
                total: '39.99',
              },
            },
          }

          dataLayerTracker(action, state)

          expect(window.dataLayer[1]).toEqual({
            event: 'purchase',
            user: {},
            ecommerce: {
              purchase: {
                actionField: {
                  box_type: 2,
                  currency_code: 'GBP',
                  order_id: '333',
                  revenue: '39.99',
                },
                products: [
                  {
                    category: 'all-recipes',
                    id: '123',
                    name: 'Caponata',
                    quantity: 2,
                  },
                ],
              },
            },
          })
        })
      })

      describe('and when the order uses v2 order api', () => {
        test('then it should send the "purchase" event', () => {
          const action = {
            type: actionTypes.ORDER_CREATE_TRANSACTIONAL,
            order: {
              id: '333',
              attributes: {
                prices: {
                  total: '39.99',
                },
              },
              relationships: {
                components: {
                  data: [
                    { id: '123', type: 'recipe' },
                    { id: '123', type: 'recipe' },
                  ],
                },
              },
            },
          }

          dataLayerTracker(action, state)

          expect(window.dataLayer[1]).toEqual({
            event: 'purchase',
            user: {},
            ecommerce: {
              purchase: {
                actionField: {
                  box_type: 2,
                  currency_code: 'GBP',
                  order_id: '333',
                  revenue: '39.99',
                },
                products: [
                  {
                    category: 'all-recipes',
                    id: '123',
                    name: 'Caponata',
                    quantity: 2,
                  },
                ],
              },
            },
          })
        })
      })
    })
  })
})
