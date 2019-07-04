import Immutable from 'immutable'

import { orderCancel, projectedOrderCancel } from 'actions/order'
import { fetchOrderSkipContent } from 'apis/orderSkipRecovery'
import { redirect } from 'actions/redirect'
import actionTypes from 'actions/actionTypes'
import logger from 'utils/logger'

import {
  modalVisibilityChange,
  keepOrder,
  cancelPendingOrder,
  cancelProjectedOrder,
  getSkipRecoveryContent,
} from 'actions/onScreenRecovery'

jest.mock('actions/order', () => ({
  orderCancel: jest.fn(),
  projectedOrderCancel: jest.fn(),
}))

jest.mock('actions/redirect', () => ({
  redirect: jest.fn(),
}))

jest.mock('apis/orderSkipRecovery', () => ({
  fetchOrderSkipContent: jest.fn(),
}))

jest.mock('utils/logger', () => ({
  error: jest.fn()
}))

describe('onScreenRecovery', () => {
  const dispatchSpy = jest.fn()
  const getStateSpy = jest.fn()

  afterEach(() => {
    dispatchSpy.mockClear()
    getStateSpy.mockClear()
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
        type: actionTypes.ON_SCREEN_RECOVERY_MODAL_VISIBILITY_CHANGE,
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
    beforeEach(() => {
      getStateSpy.mockReturnValue({
        onScreenRecovery: Immutable.Map({
          modalVisibility: true,
          orderId: '',
          valueProposition: null,
          offer: null,
        }),
        features: Immutable.Map({
          skipRecovery: Immutable.Map({
            value: false,
          })
        })
      })
    })

    test('should set modal cancelOrder visibility to false', async () => {
      keepOrder({ orderId: '83632', deliveryDayId: '123', status: 'pending' })(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'ON_SCREEN_RECOVERY_MODAL_VISIBILITY_CHANGE',
        modalVisibility: false,
        orderId: '83632',
        trackingData: expect.objectContaining({delivery_day_id: '123',})
      }))
    })

    test('should set modal cancelOrder visibility to false', async () => {
      keepOrder({ orderId: '23214', deliveryDayId: '123', status: 'projected' })(dispatchSpy, getStateSpy)
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

  describe('cancelOrder', () => {
    test('should call the order cancel action with the orderId', () => {
      cancelPendingOrder('64521', '123', 'default')(dispatchSpy)
      expect(orderCancel).toHaveBeenCalledWith('64521', '123', 'default')
    })

    test('should toggle the cancel order modal visibility', () => {
      cancelPendingOrder('64521')(dispatchSpy)
      setTimeout(() => {
        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
          type: 'ON_SCREEN_RECOVERY_MODAL_VISIBILITY_CHANGE',
          modalVisibility: false,
        }))
      }, 500)
    })

    test('should redirect to my-deliveries', () => {
      cancelPendingOrder('64521', 'default')(dispatchSpy)
      expect(redirect).toHaveBeenCalledWith('/my-deliveries')
    })
  })

  describe('cancelProjectedOrder', () => {
    getStateSpy.mockReturnValue({
      onScreenRecovery: Immutable.Map({
        modalVisibility: true,
        orderId: '',
        deliveryDayId: '',
        orderType: '',
      }),
    })

    test('should call the skip cancel action with the deliveryDayId', () => {
      cancelProjectedOrder('1234')(dispatchSpy)
      expect(projectedOrderCancel).toHaveBeenCalledWith('1234', '1234', 'default')
    })

    test('should toggle the skip order modal visibility', () => {
      cancelProjectedOrder('1234')(dispatchSpy)
      setTimeout(() => {
        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
          type: 'ON_SCREEN_RECOVERY_MODAL_VISIBILITY_CHANGE',
          modalVisibility: false,
        }))
      }, 500)
    })

    test('should redirect to my-deliveries', () => {
      cancelProjectedOrder('1234')(dispatchSpy)
      expect(redirect).toHaveBeenCalledWith('/my-deliveries')
    })
  })

  describe('getSkipRecoveryContent', () => {
    beforeEach(() => {
      getStateSpy.mockReturnValue({
        auth: Immutable.Map({
          accessToken: 'token',
        }),
      })
    })

    test('should dispatch a fetchOrderSkipContent request', () => {
      getSkipRecoveryContent({
        orderId: '31520',
      })(dispatchSpy, getStateSpy)

      expect(fetchOrderSkipContent).toHaveBeenCalled()
    })

    describe('when the response is to intervene', () => {
      test('display the modal', async () => {
        fetchOrderSkipContent.mockReturnValue(Promise.resolve({
          data: {
            intervene: true,
          },
        }))

        await getSkipRecoveryContent({
          orderId: '31520',
        })(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalled()
      })
    })

    describe('when the response is to *not* intervene', () => {
      describe('and status is pending', () => {
        test('should cancel the pending order', async () => {
          fetchOrderSkipContent.mockReturnValue(Promise.resolve({
            data: {
              intervene: false,
            },
          }))

          await getSkipRecoveryContent({
            orderId: '12223',
            status: 'pending',
          })(dispatchSpy, getStateSpy)

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
})
