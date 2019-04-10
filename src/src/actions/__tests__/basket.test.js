import Immutable from 'immutable'
import basket from 'actions/basket'
import actionTypes from 'actions/actionTypes'

describe('basket actions', () => {
  const dispatch = jest.fn()
  const { portionSizeSelectedTracking, basketCheckedOut, basketOrderItemsLoad } = basket

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('portionSizeSelectedTracking', () => {
    it('should dispatch a PORTION_SIZE_SELECTED_TRACKING action with the correct tracking params', async () => {
      const num_portion = 2
      const order_id = 5
      const numPortionChangeTracking = {
        type: actionTypes.PORTION_SIZE_SELECTED_TRACKING,
        trackingData: {
          actionType: 'PortionSize Selected',
          num_portion,
          order_id: order_id ? order_id : null,
        },
      }
      await portionSizeSelectedTracking(num_portion, order_id)(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(numPortionChangeTracking)
    })

  })

  describe('basketCheckedOut', () => {
    let getState = () => ({
      auth: Immutable.Map({
        isAuthenticated: true,
      }),
      basket: Immutable.fromJS({
        orderId: '178',
      }),
      user: Immutable.fromJS({
        orders: {
          '178': {
            'recipeItems': [
              '1234'
            ]
          },
        },
        subscription: {
          state: 'active',
        }
      }),
      pricing: Immutable.fromJS({
        prices: {
          total: '24.00',
          grossTotal: '24.00',
          promoCode: false,
        }
      }),
      temp: Immutable.fromJS({
        originalGrossTotal: "24.99",
        originalNetTotal: "24.99"
      })
    })

    test('should dispatch Order Edited tracking action for subscription box', async() => {
      await basketCheckedOut(2, 'grid')(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'Order Edited',
          order_id: '178',
          order_total: '24.00',
          promo_code: false,
          signp: false,
          subscription_active: true,
        },
        optimizelyData: {
          eventName: 'order_edited_gross',
          tags: {
            revenue: '-0.99'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          eventName: 'order_edited_net',
          tags: {
            revenue: '-0.99'
          }
        }
      })
    })

    test('should dispatch Order Edited tracking action for transactional box', async() => {
      getState = () => ({
        auth: Immutable.Map({
          isAuthenticated: true,
        }),
        basket: Immutable.fromJS({
          orderId: '178',
        }),
        user: Immutable.fromJS({
          orders: {
            '178': {
              'recipeItems': [
                '1234'
              ]
            },
          },
          subscription: {
            state: 'inactive',
          }
        }),
        pricing: Immutable.fromJS({
          prices: {
            total: '24.00',
            grossTotal: '24.00',
            promoCode: false,
          }
        }),
        temp: Immutable.fromJS({
          originalGrossTotal: "24.99",
          originalNetTotal: "24.99"
        })
      })

      await basketCheckedOut(2, 'grid')(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'Order Edited',
          order_id: '178',
          order_total: '24.00',
          promo_code: false,
          signp: false,
          subscription_active: false,
        },
        optimizelyData: {
          eventName: 'order_edited_gross',
          tags: {
            revenue: '-0.99'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          eventName: 'order_edited_net',
          tags: {
            revenue: '-0.99'
          }
        }
      })
    })

    test('should dispatch Order Place tracking action for transactional box', async() => {
      getState = () => ({
        auth: Immutable.Map({
          isAuthenticated: true,
        }),
        basket: Immutable.fromJS({
          orderId: '',
        }),
        user: Immutable.fromJS({
          orders: {
            '178': {
              'recipeItems': [
                '1234'
              ]
            },
          },
          subscription: {
            state: 'active',
          }
        }),
        pricing: Immutable.fromJS({
          prices: {
            total: '24.00',
            grossTotal: '24.00',
            promoCode: false,
          }
        }),
        temp: Immutable.fromJS({
          originalGrossTotal: "24.99",
          originalNetTotal: "24.99"
        })
      })
      await basketCheckedOut(2, 'grid')(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'Order Placed',
          order_id: '',
          order_total: '24.00',
          promo_code: false,
          signp: false,
          subscription_active: true,
        },
        optimizelyData: {
          eventName: 'order_placed_gross',
          tags: {
            revenue: '24.00'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          eventName: 'order_placed_net',
          tags: {
            revenue: '24.00'
          }
        }
      })
    })

    test('should dispatch Order Place tracking action for subscription box', async() => {
      getState = () => ({
        auth: Immutable.Map({
          isAuthenticated: true,
        }),
        basket: Immutable.fromJS({
          orderId: '179',
        }),
        user: Immutable.fromJS({
          orders: {
            '179': {
              'recipeItems': []
            },
          },
          subscription: {
            state: 'active',
          }
        }),
        pricing: Immutable.fromJS({
          prices: {
            total: '22.00',
            grossTotal: '22.00',
            promoCode: false,
          }
        }),
        temp: Immutable.fromJS({
          originalGrossTotal: "24.99",
          originalNetTotal: "24.99"
        })
      })
      await basketCheckedOut(2, 'grid')(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'Order Placed',
          order_id: '179',
          order_total: '22.00',
          promo_code: false,
          signp: false,
          subscription_active: true,
        },
        optimizelyData: {
          eventName: 'order_placed_gross',
          tags: {
            revenue: '22.00'
          }
        }
      })

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        optimizelyData: {
          eventName: 'order_placed_net',
          tags: {
            revenue: '22.00'
          }
        }
      })
    })
  })

  describe('basketOrderItemsLoad', () => {
    let basketProductAddSpy
    let basketRecipeAddSpy
    let basketGiftAddSpy
    let getStateSpy
    let dispatchSpy
    beforeEach(() => {
      getStateSpy = () => ({
        basket: Immutable.fromJS({ orderId: '456' }),
        products: Immutable.fromJS({
          p1: { id: 'p1' },
          p2: { id: 'p2' },
          p3: { id: 'p3' },
        }),
        user: Immutable.fromJS({
          orders: [
            {
              id: '123',
              box: {
                numPortions: 2,
              },
              giftItems: [
                { id: 'gp1', itemableId: 'p1', itemableType: 'Product', quantity: 1 },
                { id: 'gp3', itemableId: 'p1', itemableType: 'Gift', quantity: 1 },
              ],
              productItems: [
                { id: 'p2', itemableId: 'p2', quantity: 3 },
                { id: 'p3', itemableId: 'p3', quantity: 2 },
              ],
              recipeItems: [
                { id: 'r1', itemableId: 'r1', quantity: 2 },
                { id: 'r2', itemableId: 'r2', quantity: 4 },
              ],
            },
            { id: '456' },
          ],
        }),
      })

      basketProductAddSpy = jest.spyOn(basket, 'basketProductAdd')
      basketRecipeAddSpy = jest.spyOn(basket, 'basketRecipeAdd')
      basketGiftAddSpy = jest.spyOn(basket, 'basketGiftAdd')
      dispatchSpy = jest.fn()
    })

    test('should call basketProductAdd for each product in the given order if order is not already loaded', () => {
      basketOrderItemsLoad('123')(dispatchSpy, getStateSpy)
      expect(basketProductAddSpy).toHaveBeenCalledTimes(5)
      expect(basketProductAddSpy.mock.calls[0]).toEqual(['p2', null, '123'])
      expect(basketProductAddSpy.mock.calls[1]).toEqual(['p2', null, '123'])
      expect(basketProductAddSpy.mock.calls[2]).toEqual(['p2', null, '123'])
      expect(basketProductAddSpy.mock.calls[3]).toEqual(['p3', null, '123'])
      expect(basketProductAddSpy.mock.calls[4]).toEqual(['p3', null, '123'])
    })

    test('should call basketRecipeAdd for each recipe set (total recipes / number portions ) in the given order if order is not already loaded', () => {
      basketOrderItemsLoad('123')(dispatchSpy, getStateSpy)
      expect(basketRecipeAddSpy).toHaveBeenCalledTimes(3)
      expect(basketRecipeAddSpy.mock.calls[0]).toEqual(['r1', null, '123'])
      expect(basketRecipeAddSpy.mock.calls[1]).toEqual(['r2', null, '123'])
      expect(basketRecipeAddSpy.mock.calls[2]).toEqual(['r2', null, '123'])
    })

    test('should call basketGiftAdd for each gift product in the given order if order is not already loaded', () => {
      basketOrderItemsLoad('123')(dispatchSpy, getStateSpy)
      expect(basketGiftAddSpy).toHaveBeenCalledTimes(2)
      expect(basketGiftAddSpy.mock.calls[0]).toEqual(['p1', 'Product'])
      expect(basketGiftAddSpy.mock.calls[1]).toEqual(['p1', 'Gift'])
    })

    test('should NOT call basketProductAdd, basketRecipeAdd, or basketGiftAdd if order is already loaded', () => {
      basketOrderItemsLoad('456')(dispatchSpy, getStateSpy)
      expect(basketProductAddSpy).not.toHaveBeenCalled()
      expect(basketRecipeAddSpy).not.toHaveBeenCalled()
      expect(basketGiftAddSpy).not.toHaveBeenCalled()
    })
  })
})
