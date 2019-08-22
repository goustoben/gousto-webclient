import Immutable from 'immutable'

import { fetchOrderSkipContent, fetchSubscriptionPauseContent } from 'apis/onScreenRecovery'
import { orderCancel, projectedOrderCancel } from 'actions/order'
import { redirect } from 'actions/redirect'
import subPauseActions from 'actions/subscriptionPause'
import actionTypes from 'actions/actionTypes'
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
} from 'actions/onScreenRecovery'

jest.mock('actions/order', () => ({
  orderCancel: jest.fn(),
  projectedOrderCancel: jest.fn(),
}))

jest.mock('actions/redirect', () => ({
  redirect: jest.fn(),
}))

jest.mock('actions/subscriptionPause', () => ({
  subscriptionDeactivate: jest.fn(),
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
        trackingData: expect.objectContaining({delivery_day_id: '123',})
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
    beforeEach(() => {
      getStateSpy.mockReturnValue({
        onScreenRecovery: Immutable.Map({
          orderId: '64521',
          deliveryDayId: '123',
        })
      })
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

    test('should redirect to my-deliveries', async () => {
      await cancelPendingOrder()(dispatchSpy, getStateSpy)
      expect(redirect).toHaveBeenCalledWith('/my-deliveries')
    })
  })

  describe('cancelProjectedOrder', () => {
    beforeEach(()=>{
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

    test('should redirect to my-deliveries', async () => {
      await cancelProjectedOrder()(dispatchSpy, getStateSpy)
      expect(redirect).toHaveBeenCalledWith('/my-deliveries')
    })
  })

  describe('pauseSubscription', () => {
    beforeEach(() => {
      getStateSpy.mockReturnValue({
        user: Immutable.Map({
          id: '123',
        }),
        features: Immutable.Map({
          subscriptionPauseOsr: false
        }),
      })
    })
    test('should call the subscriptionDeactivate action', async () => {
      await pauseSubscription()(dispatchSpy, getStateSpy)
      expect(subPauseActions.subscriptionDeactivate).toHaveBeenCalled()
    })

    test('should toggle the pause subscription modal visibility', async () => {
      await pauseSubscription()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE',
        modalVisibility: false,
      }))
    })

    test('should redirect to my-subscription', async () => {
      await pauseSubscription()(dispatchSpy, getStateSpy)
      expect(redirect).toHaveBeenCalledWith('/my-subscription')
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

        expect(dispatchSpy).toHaveBeenCalledTimes(1)
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
                number: 10,
                state: 'committed',
              }),
              2: Immutable.Map({
                number: 11,
                state: 'committed',
              }),
              5: Immutable.Map({
                number: 12,
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
            actionType: 'Subscription Pause',
            orderCount: 11,
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
            actionType: 'Subscription Pause',
            orderCount: 0,
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
            actionType: 'Subscription Pause',
            orderCount: 0,
            hasPendingPromo: '1%',
            hasPendingPromoWithSubCondition: true,
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
    test('when modalType is subscription, should toggle OSR modal visibility with Subscription KeptActive tracking action', async () => {
      getStateSpy.mockReturnValue({
        onScreenRecovery: Immutable.Map({
          modalType: 'subscription',
        }),
        user: Immutable.Map({
          id: '1234'
        })
      })
      await onKeep()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE',
        modalVisibility: false,
        trackingData: expect.objectContaining({
          actionType: 'Subscription KeptActive',
        })
      }))
    })
  })

  describe('onConfirm', () => {
    test('should call order cancel when modal type is "order"', async() => {
      getStateSpy.mockReturnValue({
        onScreenRecovery: Immutable.Map({
          modalType: 'order'
        }),
      })

      await onConfirm()(dispatchSpy, getStateSpy)

      expect(projectedOrderCancel).toHaveBeenCalled()
    })

    test('should call pause subscription when modal type is "subscription"', async() => {
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

      expect(fetchSubscriptionPauseContent).toHaveBeenCalledWith('token')
    })
  })
})
