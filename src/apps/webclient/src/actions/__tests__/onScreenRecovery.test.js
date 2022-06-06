import Immutable from 'immutable'

import { fetchOrderSkipContent, fetchSubscriptionPauseContent } from 'apis/onScreenRecovery'
import { orderCancel, projectedOrderCancel } from 'actions/order'
import { redirect } from 'actions/redirect'
import * as windowUtils from 'utils/window'
import subPauseActions from 'actions/subscriptionPause'
import { actionTypes } from 'actions/actionTypes'
import userActions from 'actions/user'
import logger from 'utils/logger'

import {
  modalVisibilityChange,
  keepOrder,
  cancelPendingOrder,
  cancelProjectedOrder,
  getSkipRecoveryContent,
  getPauseRecoveryContent,
  cancelOrder,
  pauseSubscription,
  onKeep,
  onConfirm,
  getRecoveryContent,
  orderCancelStart,
  generateModalTrackingData,
  trackViewDiscountReminder,
  startOnScreenRecoverySubscriptionFlow,
} from 'actions/onScreenRecovery'

jest.mock('actions/order', () => ({
  orderCancel: jest.fn(),
  projectedOrderCancel: jest.fn(),
}))

jest.mock('utils/window', () => ({
  redirect: jest.fn(),
}))

jest.mock('actions/redirect', () => ({
  redirect: jest.fn(),
}))

jest.mock('actions/subscriptionPause', () => ({
  subscriptionDeactivate: jest.fn(),
}))

jest.mock('actions/user', () => ({
  userPromoApplyCode: jest.fn()
}))

jest.mock('apis/onScreenRecovery', () => ({
  fetchOrderSkipContent: jest.fn(),
  fetchSubscriptionPauseContent: jest.fn(),
}))

jest.mock('utils/logger', () => ({
  error: jest.fn()
}))

describe('onScreenRecovery', () => {
  const dispatchSpy = jest.fn()
  const getStateSpy = jest.fn()

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('generateModalTrackingData', () => {
    let mockParams

    const defaultParams = {
      modalVisibility: true,
      status: 'pending',
      modalType: 'not-subscription',
      orderId: 'mock-order-id',
      deliveryDayId: 'mock-delivery-day-id',
      data: {
        valueProposition: 'mock-value-proposition',
        offer: 'mock-offer',
        variation: 'mock-variation'
      }
    }

    const generateMockParams = (params) => {
      mockParams = {
        ...defaultParams,
        ...params
      }
    }

    describe('given modalType is subscription', () => {
      beforeEach(() => {
        generateMockParams({
          modalType: 'subscription'
        })
      })

      describe('and modalVisibility is false', () => {
        beforeEach(() => {
          generateMockParams({
            modalVisibility: false,
            modalType: 'subscription'
          })
        })

        test('returns the expected action', () => {
          expect(generateModalTrackingData(mockParams)).toEqual({
            actionType: 'recover_subscription'
          })
        })
      })

      describe('and modalVisibility is true', () => {
        test('returns null', () => {
          expect(generateModalTrackingData(mockParams)).toEqual(null)
        })
      })
    })

    describe('and modalType is not subscription', () => {
      describe('and variation is not passed', () => {
        beforeEach(() => {
          generateMockParams({
            modalType: 'not-subscription',
            data: {
              ...defaultParams.data,
              variation: null,
            }
          })
        })

        test('then the variation is defaulted', () => {
          expect(generateModalTrackingData(mockParams).cms_variation).toEqual('default')
        })
      })

      describe('and order status is pending', () => {
        beforeEach(() => {
          generateMockParams()
        })

        test('should return the expected action', () => {
          expect(generateModalTrackingData(mockParams)).toEqual({
            actionType: 'Order Cancel',
            order_id: 'mock-order-id',
            delivery_day_id: 'mock-delivery-day-id',
            order_state: 'pending',
            cms_variation: 'mock-variation',
            recovery_reasons: [
              'mock-value-proposition',
              'mock-offer'
            ]
          })
        })
      })

      describe('and order status is not pending', () => {
        beforeEach(() => {
          generateMockParams({ status: 'not-pending' })
        })

        test('should return the expected action if status is not pending', () => {
          expect(generateModalTrackingData(mockParams)).toEqual({
            actionType: 'Order Skip',
            order_id: 'mock-order-id',
            delivery_day_id: 'mock-delivery-day-id',
            order_state: 'not-pending',
            cms_variation: 'mock-variation',
            recovery_reasons: [
              'mock-value-proposition',
              'mock-offer'
            ]
          })
        })
      })
    })
  })

  describe('tracking actions', () => {
    describe('trackViewDiscountReminder', () => {
      test('returns the expected action', () => {
        trackViewDiscountReminder()(dispatchSpy)

        expect(dispatchSpy).toHaveBeenCalledWith({
          type: actionTypes.TRACKING,
          trackingData: {
            actionType: 'view_pause_discount_reminder_offer_screen'
          }
        })
      })
    })
  })

  describe('modalVisibilityChange', () => {
    test('should show order skip recovery modal', async () => {
      const orderId = '234234'
      const status = 'pending'
      const actionTriggered = null // used for tracking
      const title = 'Are you sure you want to skip?'
      const offer = {
        basis: 'percentage_discount',
        details: {
          message: 'You only have 10% on all your orders until the 19th of October',
          formattedValue: '10%',
          rawMessage: {
            text: 'You only have {:value:} on all your orders until the {:date:}',
            values: [
              { key: 'date', value: '19th of October' },
              { key: 'value', value: '£13' }
            ]
          }
        }
      }
      const valueProposition = {
        title: 'value proposition title',
        message: 'value proposition message',
      }
      const callToActions = {
        confirm: 'confirm',
        keep: 'keep',
      }
      const data = {
        title,
        offer,
        valueProposition,
        callToActions,
      }
      getStateSpy.mockReturnValue({
        features: Immutable.Map({
          skipRecovery: Immutable.Map({
            value: false,
          })
        })
      })

      modalVisibilityChange({
        orderId,
        status,
        actionTriggered,
        data,
      })(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: true,
        orderId,
        title: 'Are you sure you want to skip?',
        offer,
        valueProposition,
        callToActions,
      }))
    })
  })

  describe('keepOrder', () => {
    test('should set modal cancelOrder visibility to false for pending order', () => {
      getStateSpy.mockReturnValue({
        onScreenRecovery: Immutable.Map({
          modalVisibility: true,
          orderId: '83632',
          valueProposition: null,
          offer: null,
          deliveryDayId: '123',
          orderType: 'pending'
        })
      })
      keepOrder()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE',
        modalVisibility: false,
        orderId: '83632',
        trackingData: expect.objectContaining({ delivery_day_id: '123', })
      }))
    })

    test('should set relevant tracking data', () => {
      getStateSpy.mockReturnValue({
        onScreenRecovery: Immutable.Map({
          modalVisibility: true,
          orderId: '23214',
          valueProposition: null,
          offer: null,
          deliveryDayId: '123',
          orderType: 'projected'
        })
      })

      keepOrder()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        trackingData: {
          actionType: 'Order Kept',
          order_id: '23214',
          delivery_day_id: '123',
          order_state: 'projected',
          recovery_reasons: [
            null,
            null,
          ],
        }
      }))
    })
  })

  describe('cancelPendingOrder', () => {
    let state
    beforeEach(() => {
      state = {
        onScreenRecovery: Immutable.Map({
          orderId: '64521',
          deliveryDayId: '123',
        }),
        user: Immutable.fromJS({
          newOrders: {
            64521: {
              number: '10'
            }
          }
        })
      }
      getStateSpy.mockReturnValue(state)
    })
    test('should call the order cancel action with the orderId', () => {
      cancelPendingOrder('default')(dispatchSpy, getStateSpy)
      expect(orderCancel).toHaveBeenCalledWith('64521', '123', 'default')
    })

    test('should toggle the cancel order modal visibility', async () => {
      await cancelPendingOrder()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE',
        modalVisibility: false,
      }))
    })

    test('should log if an error occur', async () => {
      const error = new Error('error')

      dispatchSpy.mockRejectedValueOnce(error)

      await cancelPendingOrder()(dispatchSpy, getStateSpy)

      expect(logger.error).toHaveBeenCalledWith(error)
    })

    describe('when forceRefresh = true', () => {
      beforeEach(() => {
        state.onScreenRecovery = Immutable.Map({
          orderId: '64521',
          deliveryDayId: '123',
          forceRefresh: true
        })
        getStateSpy.mockReturnValue(state)
      })

      test('should redirect to my-deliveries if forceRefresh is true', async () => {
        await cancelPendingOrder()(dispatchSpy, getStateSpy)
        expect(redirect).toHaveBeenCalledWith('/my-deliveries')
      })
    })

    describe('when forceRefresh = false', () => {
      beforeEach(() => {
        state.onScreenRecovery = Immutable.Map({
          orderId: '64521',
          deliveryDayId: '123',
          forceRefresh: false
        })
        getStateSpy.mockReturnValue(state)
      })

      test('should NOT redirect to my-deliveries', async () => {
        await cancelPendingOrder()(dispatchSpy, getStateSpy)
        expect(redirect).not.toHaveBeenCalled()
      })
    })
  })

  describe('cancelProjectedOrder', () => {
    beforeEach(() => {
      getStateSpy.mockReturnValue({
        onScreenRecovery: Immutable.Map({
          deliveryDayId: '1234',
        }),
      })
    })

    test('should call the skip cancel action with the deliveryDayId', () => {
      cancelProjectedOrder()(dispatchSpy, getStateSpy)
      expect(projectedOrderCancel).toHaveBeenCalledWith('1234', '1234', 'default')
    })

    test('should toggle the skip order modal visibility', async () => {
      await cancelProjectedOrder()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE',
        modalVisibility: false,
      }))
    })

    test('should redirect to my-deliveries if forceRefresh is true', async () => {
      getStateSpy.mockReturnValue({
        onScreenRecovery: Immutable.Map({
          deliveryDayId: '1234',
          forceRefresh: true
        })
      })
      await cancelProjectedOrder()(dispatchSpy, getStateSpy)
      expect(redirect).toHaveBeenCalledWith('/my-deliveries')
    })

    test('should NOT redirect to my-deliveries if forceRefresh is false', async () => {
      await cancelProjectedOrder()(dispatchSpy, getStateSpy)
      expect(redirect).not.toHaveBeenCalled()
    })

    test('should log if an error occur', async () => {
      const error = new Error('error')

      dispatchSpy.mockRejectedValueOnce(error)

      await cancelProjectedOrder()(dispatchSpy, getStateSpy)

      expect(logger.error).toHaveBeenCalledWith(error)
    })
  })

  describe('pauseSubscription', () => {
    const initialState = (createdAt = '2020-01-10 10:00:00', currentBoxNumber = '10') => ({
      user: Immutable.Map({
        id: '123',
        subscription: Immutable.Map({
          createdAt,
        }),
      }),
      subscription: Immutable.Map({
        subscription: Immutable.Map({
          currentBoxNumber,
        }),
      }),
      onScreenRecovery: Immutable.Map({
        modalType: 'subscription',
        offer: {
          promoCode: 'OSR-PROMO-CODE',
        },
      }),
      features: Immutable.Map({
        subscriptionPauseOsr: {
          experiment: false,
          value: true
        }
      }),
    })

    describe('given an in-life user with an OSR promo code and multiple orders', () => {
      beforeEach(() => {
        getStateSpy.mockReturnValue(initialState())
      })

      describe('when a user pauses their subscription', () => {
        beforeEach(() => {
          pauseSubscription()(dispatchSpy, getStateSpy)
        })

        test('then the subscriptionDeactivate action should be called', async () => {
          expect(subPauseActions.subscriptionDeactivate).toHaveBeenCalled()
        })

        test('then the pause subscription modal visibility should be toggled off', async () => {
          expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
            type: 'ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE',
            modalVisibility: false,
          }))
        })

        test('then the tracking data for osr promo code and eligibility should be in the dispatched action', async () => {
          expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
            type: 'ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE',
            trackingData: expect.objectContaining({
              actionType: 'pause_subscription_complete',
              osrDiscount: 'OSR-PROMO-CODE',
            })
          }))
        })

        test('then the user should be redirected to subscription-settings', async () => {
          expect(windowUtils.redirect).toHaveBeenCalledWith('/subscription-settings')
        })
      })
    })
  })

  describe('getSkipRecoveryContent', () => {
    beforeEach(() => {
      getStateSpy.mockReturnValue({
        auth: Immutable.Map({
          accessToken: 'token',
        }),
        onScreenRecovery: Immutable.Map({
          orderId: '31520',
        }),
      })
    })

    test('should dispatch a fetchOrderSkipContent request', () => {
      getSkipRecoveryContent()(dispatchSpy, getStateSpy)

      expect(fetchOrderSkipContent).toHaveBeenCalled()
    })

    describe('when the response is to intervene', () => {
      test('display the modal', async () => {
        fetchOrderSkipContent.mockReturnValue(Promise.resolve({
          data: {
            intervene: true,
          },
        }))

        await getSkipRecoveryContent()(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalled()
      })
    })

    describe('when the response is to *not* intervene', () => {
      beforeEach(() => {
        fetchOrderSkipContent.mockReturnValue(Promise.resolve({
          data: {
            intervene: false,
          },
        }))
      })

      describe('and status is pending', () => {
        test('should cancel the pending order', async () => {
          getStateSpy.mockReturnValue({
            auth: Immutable.Map({
              accessToken: 'token',
            }),
            onScreenRecovery: Immutable.Map({
              orderId: '12223',
              orderType: 'pending',
            }),
            user: Immutable.Map()
          })

          await getSkipRecoveryContent()(dispatchSpy, getStateSpy)

          expect(orderCancel).toHaveBeenCalled()
        })
      })

      describe('and status is projected', () => {
        test('should skip the projected order', async () => {
          fetchOrderSkipContent.mockReturnValue(Promise.resolve({
            data: {
              intervene: false,
            },
          }))

          await getSkipRecoveryContent({
            orderId: '92839',
            deliveryDayId: '582651',
            status: 'pending',
          })(dispatchSpy, getStateSpy)

          expect(projectedOrderCancel).toHaveBeenCalled()
        })
      })
    })

    describe('when the service returns with an Error', () => {
      test('should display a default cancel modal', async () => {
        const error = new Error('error from the lambda')
        fetchOrderSkipContent.mockReturnValue(Promise.reject(
          error,
        ))

        await getSkipRecoveryContent({
          orderId: '33101',
          deliveryDayId: '287420',
          status: 'projected',
        })(dispatchSpy, getStateSpy)

        expect(logger.error).toHaveBeenCalledWith(error)
      })
    })
  })

  describe('getPauseRecoveryContent', () => {
    beforeEach(() => {
      getStateSpy.mockReturnValue({
        auth: Immutable.Map({
          accessToken: 'token',
        }),
        onScreenRecovery: Immutable.Map({
          orderId: '31520',
        }),
      })
    })

    test('should dispatch a fetchSubscriptionPauseContent request', () => {
      getPauseRecoveryContent()(dispatchSpy, getStateSpy)

      expect(fetchSubscriptionPauseContent).toHaveBeenCalled()
    })

    describe('when the response is to intervene', () => {
      test('display the modal', async () => {
        fetchSubscriptionPauseContent.mockReturnValue(Promise.resolve({
          data: {
            intervene: true,
          },
        }))

        await getPauseRecoveryContent()(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalled()
      })

      test.each([500, 502, 503])('should pause the subscription if discounts endpoint is not reachable', async (code) => {
        const error = new Error(`${code} Server Error`)

        error.code = code
        fetchSubscriptionPauseContent.mockRejectedValue(error)
        getStateSpy.mockReturnValue({
          auth: Immutable.Map({
            accessToken: 'token',
          }),
          user: {
            get: () => null
          },
          onScreenRecovery: {
            get: () => null
          }
        })

        await getPauseRecoveryContent({ data: { intervene: true } })(async (action) => {
          if (typeof action === 'function') {
            await action(dispatchSpy, getStateSpy)
          }

          dispatchSpy(action)
        }, getStateSpy)

        expect(subPauseActions.subscriptionDeactivate).toHaveBeenCalled()
      })
      test('should trigger tracking of subscription pause event', async () => {
        fetchSubscriptionPauseContent.mockReturnValue(Promise.resolve({
          data: {
            intervene: true,
          },
        }))
        getStateSpy.mockReturnValue({
          auth: Immutable.Map({
            accessToken: 'token',
          }),
          onScreenRecovery: Immutable.Map({
            modalType: 'subscription',
            offer: null
          }),
          user: Immutable.Map({
            id: '12345',
            orders: Immutable.Map({
              1: Immutable.Map({
                state: 'committed',
              }),
              2: Immutable.Map({
                state: 'committed',
              }),
              5: Immutable.Map({
                state: 'pending',
              }),
            })
          }),
          features: Immutable.Map({
            subscriptionPauseOsr: Immutable.fromJS({
              experiment: false,
              value: true,
            }),
          }),
        })
        await getPauseRecoveryContent()(dispatchSpy, getStateSpy)
        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
          type: 'TRACKING',
          trackingData: expect.objectContaining({
            actionType: 'pause_subscription_attempt',
            hasPendingPromo: null,
            hasPendingPromoWithSubCondition: null,
          })
        }))
      })

      test('should trigger tracking of subscription pause event with zero order count when a user has no order', async () => {
        fetchSubscriptionPauseContent.mockReturnValue(Promise.resolve({
          data: {
            intervene: true,
          },
        }))
        getStateSpy.mockReturnValue({
          auth: Immutable.Map({
            accessToken: 'token',
          }),
          onScreenRecovery: Immutable.Map({
            modalType: 'subscription',
            offer: null
          }),
          user: Immutable.Map({
            id: '12345',
            orders: Immutable.List([
            ]),
          }),
          features: Immutable.Map({
            subscriptionPauseOsr: Immutable.fromJS({
              experiment: false,
              value: true,
            }),
          }),
        })
        await getPauseRecoveryContent()(dispatchSpy, getStateSpy)
        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
          type: 'TRACKING',
          trackingData: expect.objectContaining({
            actionType: 'pause_subscription_attempt',
            hasPendingPromo: null,
            hasPendingPromoWithSubCondition: null,
          })
        }))
      })

      test('should trigger tracking of subscription pause event with promotion details when a user has a promotion which requires active subscription', async () => {
        fetchSubscriptionPauseContent.mockReturnValue(Promise.resolve({
          data: {
            intervene: true,
          },
        }))
        getStateSpy.mockReturnValue({
          auth: Immutable.Map({
            accessToken: 'token',
          }),
          onScreenRecovery: Immutable.Map({
            modalType: 'subscription',
            offer: {
              message: 'You have 1% off on your next order. If you pause you’ll miss out on your discount',
              formattedValue: '1%',
              rawMessage: {
                text: 'You have {:value:} off on your next order. If you pause you’ll miss out on your discount',
                values: [
                  {
                    value: '1%',
                    key: 'value'
                  }
                ]
              },
              requireActiveSubscription: true
            },
          }),
          user: Immutable.Map({
            id: '12345',
            orders: Immutable.List([
            ]),
          }),
          features: Immutable.Map({
            subscriptionPauseOsr: Immutable.fromJS({
              experiment: false,
              value: true,
            }),
          }),
        })
        await getPauseRecoveryContent()(dispatchSpy, getStateSpy)
        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
          type: 'TRACKING',
          trackingData: expect.objectContaining({
            actionType: 'pause_subscription_attempt',
            hasPendingPromo: '1%',
            hasPendingPromoWithSubCondition: true,
          })
        }))
      })

      test('should trigger tracking of subscription pause event with osrDiscount provided when a user is eligible for osr discount', async () => {
        fetchSubscriptionPauseContent.mockReturnValue(Promise.resolve({
          data: {
            intervene: true,
          },
        }))
        getStateSpy.mockReturnValue({
          auth: Immutable.Map({
            accessToken: 'token',
          }),
          onScreenRecovery: Immutable.Map({
            modalType: 'subscription',
            offer: {
              promoCode: 'OSR-PROMO-CODE',
            },
          }),
          user: Immutable.Map({
            id: '12345',
            orders: Immutable.List([
            ]),
          }),
          features: Immutable.Map({
            subscriptionPauseOsr: Immutable.fromJS({
              experiment: false,
              value: true,
            }),
          }),
        })
        await getPauseRecoveryContent()(dispatchSpy, getStateSpy)
        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
          type: 'TRACKING',
          trackingData: expect.objectContaining({
            actionType: 'pause_subscription_attempt',
            osrDiscount: 'OSR-PROMO-CODE',
          })
        }))
      })
    })

    describe('when the response is to *not* intervene', () => {
      test('should pause the subscription', async () => {
        fetchSubscriptionPauseContent.mockReturnValue(Promise.resolve({
          data: {
            intervene: false,
          },
        }))

        getStateSpy.mockReturnValue({
          auth: Immutable.Map({
            accessToken: 'token',
          }),
        })

        await getPauseRecoveryContent()(dispatchSpy, getStateSpy)

        expect(subPauseActions.subscriptionDeactivate).toHaveBeenCalled()
      })

      test.each([500, 502, 503])('should not attempt to deactivate the subscription more than once if discounts endpoint is not reachable', async (code) => {
        const error = new Error(`${code} Server Error`)

        error.code = code
        subPauseActions.subscriptionDeactivate.mockRejectedValue(error)
        fetchSubscriptionPauseContent.mockResolvedValue({
          data: {
            intervene: false,
          },
        })
        getStateSpy.mockReturnValue({
          auth: Immutable.Map({
            accessToken: 'token',
          }),
        })

        await getPauseRecoveryContent()(dispatchSpy, getStateSpy)

        expect(subPauseActions.subscriptionDeactivate).toHaveBeenCalledTimes(1)
      })
    })

    describe('when the service returns with an Error', () => {
      test('should log the error', async () => {
        const error = new Error('error from the lambda')
        fetchSubscriptionPauseContent.mockReturnValue(Promise.reject(
          error,
        ))

        await getPauseRecoveryContent({
          orderId: '33101',
          deliveryDayId: '287420',
          status: 'projected',
        })(dispatchSpy, getStateSpy)

        expect(logger.error).toHaveBeenCalledWith(error)
      })
    })
  })

  describe('cancelOrder', () => {
    test('should call order cancel when order type is pending', async () => {
      getStateSpy.mockReturnValue({
        onScreenRecovery: Immutable.Map({
          orderId: '1234',
          deliveryDayId: '567',
          orderType: 'pending'
        }),
        user: Immutable.Map()
      })

      await cancelOrder()(dispatchSpy, getStateSpy)

      expect(orderCancel).toHaveBeenCalledWith('1234', '567', 'default')
    })

    test('should call projected order cancel when order type is not pending', async () => {
      getStateSpy.mockReturnValue({
        onScreenRecovery: Immutable.Map({
          orderId: '1234',
          deliveryDayId: '567',
          orderType: 'projected'
        }),
      })
      await cancelOrder()(dispatchSpy, getStateSpy)

      expect(projectedOrderCancel).toHaveBeenCalledWith('567', '567', 'default')
    })
  })

  describe('onKeep', () => {
    test('when modalType is order, should toggle OSR modal visibility with Order Kept tracking action', async () => {
      getStateSpy.mockReturnValue({
        onScreenRecovery: Immutable.Map({
          modalType: 'order',
        }),
      })
      await onKeep()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE',
        modalVisibility: false,
        trackingData: expect.objectContaining({
          actionType: 'Order Kept',
        })
      }))
    }
    )
    describe('when modalType is subscription', () => {
      test('should toggle OSR modal visibility with Subscription KeptActive tracking action', async () => {
        getStateSpy.mockReturnValue({
          onScreenRecovery: Immutable.Map({
            modalType: 'subscription',
          }),
          user: Immutable.Map({
            id: '1234'
          }),
        })
        await onKeep()(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
          type: 'ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE',
          modalVisibility: false,
          trackingData: expect.objectContaining({
            actionType: 'recover_subscription',
          })
        }))
      })

      describe('when offer has a promo code', () => {
        test('should toggle OSR modal visibility with Subscription KeptActive tracking action when it applies the promo code successfully ', async () => {
          getStateSpy.mockReturnValue({
            onScreenRecovery: Immutable.Map({
              modalType: 'subscription',
              offer: {
                promoCode: 'OSR-PROMO-CODE',
              },
            }),
            user: Immutable.Map({
              id: '1234'
            }),
          })
          await onKeep()(dispatchSpy, getStateSpy)
          expect(userActions.userPromoApplyCode).toHaveBeenCalledTimes(1)
          expect(userActions.userPromoApplyCode).toHaveBeenCalledWith('OSR-PROMO-CODE')
          expect(dispatchSpy).toHaveBeenLastCalledWith(expect.objectContaining({
            type: 'ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE',
            modalVisibility: false,
            trackingData: expect.objectContaining({
              actionType: 'recover_subscription',
              osrDiscount: 'OSR-PROMO-CODE',
            })
          }))
        })

        test('should keep OSR modal open with Failed-in-applying-osr-code tracking action when it fails in applying the promo code', async () => {
          getStateSpy.mockReturnValue({
            onScreenRecovery: Immutable.Map({
              modalType: 'subscription',
              offer: {
                promoCode: 'OSR-PROMO-CODE'
              },
            }),
            user: Immutable.Map({
              id: '1234'
            }),
            error: Immutable.Map({
              PROMO_APPLY: 'Error applying promotion from code'
            })
          })
          await onKeep()(dispatchSpy, getStateSpy)

          expect(dispatchSpy).not.toHaveBeenCalledWith(expect.objectContaining({
            type: 'ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE',
            modalVisibility: false,
            trackingData: expect.objectContaining({
              actionType: 'Subscription KeptActive',
            })
          }))
          expect(dispatchSpy).toHaveBeenLastCalledWith(expect.objectContaining({
            type: 'TRACKING',
            trackingData: expect.objectContaining({
              actionType: 'Failed in applying OSR promo code',
              osrDiscount: 'OSR-PROMO-CODE',
            })
          }))
        })
      })
    })
  })

  describe('onConfirm', () => {
    test('should call order cancel when modal type is "order"', async () => {
      getStateSpy.mockReturnValue({
        onScreenRecovery: Immutable.Map({
          modalType: 'order'
        }),
      })

      await onConfirm()(dispatchSpy, getStateSpy)

      expect(projectedOrderCancel).toHaveBeenCalled()
    })

    test('should call pause subscription when modal type is "subscription"', async () => {
      getStateSpy.mockReturnValue({
        onScreenRecovery: Immutable.Map({
          modalType: 'subscription'
        }),
      })

      await onConfirm()(dispatchSpy, getStateSpy)

      expect(subPauseActions.subscriptionDeactivate).toHaveBeenCalled()
    })
  })

  describe('getRecoveryContent', () => {
    test('should call fetchOrderSkipContent when modal type is "order"', async () => {
      getStateSpy.mockReturnValue({
        auth: Immutable.Map({
          accessToken: 'token',
        }),
        onScreenRecovery: Immutable.Map({
          orderId: '1234',
          orderDate: 'date',
          modalType: 'order',
        }),
      })

      await getRecoveryContent()(dispatchSpy, getStateSpy)

      expect(fetchOrderSkipContent).toHaveBeenCalledWith('token', '1234', 'date')
    })

    test('should call fetchOrderSkipContent when modal type is "subscription"', async () => {
      getStateSpy.mockReturnValue({
        auth: Immutable.Map({
          accessToken: 'token',
        }),
        onScreenRecovery: Immutable.Map({
          orderId: '1234',
          orderDate: 'date',
          modalType: 'subscription',
        }),
      })

      await getRecoveryContent()(dispatchSpy, getStateSpy)

      expect(fetchSubscriptionPauseContent).toHaveBeenCalledWith('token', true)
    })
  })

  describe('orderCancelStart', () => {
    const mockResponse = {
      type: actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED,
      triggered: true,
      orderId: '12345',
      deliveryDayId: '34567',
      orderDate: '2019-11-17 00:00:00',
      modalType: 'order',
    }

    test('should call dispatch with correct parameters', () => {
      orderCancelStart('12345', '34567', '2019-11-17 00:00:00')(dispatchSpy)

      expect(dispatchSpy).toHaveBeenCalledWith(mockResponse)
    })
  })

  describe('startOnScreenRecoverySubscriptionFlow', () => {
    const mockResponse = {
      type: actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED,
      triggered: true,
      modalType: 'subscription',
    }

    test('should call dispatch with correct parameters', () => {
      startOnScreenRecoverySubscriptionFlow()(dispatchSpy)

      expect(dispatchSpy).toHaveBeenCalledWith(mockResponse)
    })
  })
})
