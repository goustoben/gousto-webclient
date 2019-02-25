import Immutable from 'immutable'
import basket from 'actions/basket'

import actionTypes from 'actions/actionTypes'

describe('basket actions', () => {
  const dispatch = jest.fn()
  const { portionSizeSelectedTracking, basketCheckedOut } = basket

  afterEach(() => {
    dispatch.mockClear()
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
        type: 'Order Edited',
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
        type: 'Order Edited',
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
        type: 'Order Edited',
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
        type: 'Order Edited',
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
        type: 'Order Placed',
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
        type: 'Order Placed',
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
        type: 'Order Placed',
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
        type: 'Order Placed',
        optimizelyData: {
          eventName: 'order_placed_net',
          tags: {
            revenue: '22.00'
          }
        }
      })
    })
  })
})
