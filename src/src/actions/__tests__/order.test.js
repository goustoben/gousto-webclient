import Immutable from 'immutable'

import * as deliveriesUtils from 'utils/deliveries'
import * as menuOrderSelectors from 'routes/Menu/selectors/order'
import { fetchDeliveryDays } from 'apis/deliveries'
import {
  saveOrder,
  fetchOrder,
  checkoutOrder,
  updateOrderAddress,
} from 'apis/orders'
import actionStatus from 'actions/status'
import { actionTypes } from 'actions/actionTypes'
import { trackAffiliatePurchase } from 'actions/tracking'
import { orderConfirmationRedirect } from 'actions/orderConfirmation'
import { osrOrdersSkipped } from 'actions/trackingKeys'

import {
  trackOrder,
  orderUpdate,
  orderCheckout,
  orderGetDeliveryDays,
  orderUpdateDayAndSlot,
  clearUpdateDateErrorAndPending,
  orderAddressChange,
  cancelMultipleBoxes,
  projectedOrderRestore,
  trackCancelMultipleBoxes
} from 'actions/order'

import { skipDates, unSkipDates } from '../../routes/Account/apis/subscription'
import * as clientMetrics from '../../routes/Menu/apis/clientMetrics'
import * as rocketsOrderV2 from '../../routes/Account/MyDeliveries/apis/orderV2'
import { safeJestMock } from '../../_testing/mocks'

import { flushPromises } from '../../_testing/utils'
import { mockWindowLocationAssign } from '../../../__tests__/utils/mockWindowLocationAssign'

jest.mock('../../routes/Account/apis/subscription')
jest.mock('apis/user')
jest.mock('apis/orders')
jest.mock('utils/basket')
jest.mock('actions/status')
jest.mock('actions/tracking')
jest.mock('actions/orderConfirmation')
jest.mock('utils/logger', () => ({
  error: jest.fn()
}))

jest.mock('config/order', () => ({
  orderTrackingActions: {
    'action-no-affiliate': {
      actionType: 'A_TEST_ACTION',
      trackAffiliate: false,
    },
    'affiliate-no-action': {
      actionType: '',
      trackAffiliate: true,
    },
  }
}))

jest.mock('apis/deliveries', () => ({
  fetchDeliveryDays: jest.fn().mockReturnValue({
    data: [
      { id: 1 },
    ]
  })
}))

jest.mock('selectors/features')

const sendClientMetricMock = safeJestMock(clientMetrics, 'sendClientMetric')
const deleteOrder = jest.spyOn(rocketsOrderV2, 'deleteOrder')

const { pending, error } = actionStatus

describe('order actions', () => {
  let orderId
  let coreDayId
  let coreSlotId
  let dispatch
  const getState = jest.fn()

  beforeEach(() => {
    orderId = '12345'
    coreDayId = 3
    coreSlotId = 8
    dispatch = jest.fn()
    fetchOrder.mockClear()

    jest.spyOn(deliveriesUtils, 'getSlot')
    jest.spyOn(deliveriesUtils, 'getAvailableDeliveryDays')
    jest.spyOn(deliveriesUtils, 'transformDaySlotLeadTimesToMockSlots')

    getState.mockReturnValue({
      auth: Immutable.Map({ accessToken: 'access-token' }),
      features: Immutable.Map({
        orderConfirmation: Immutable.Map({
          value: false,
        })
      }),
      basket: Immutable.Map({
        date: '2019-10-11',
        slotId: '4',
        orderId: 'order-id',
      }),
      onScreenRecovery: Immutable.Map({
        valueProposition: 'mock-value-proposition',
        offer: 'mock-offer'
      }),
      user: Immutable.Map({
        newOrders: [Immutable.fromJS({ id: '123', orderState: 'scheduled' })]
      })
    })

    deliveriesUtils.getSlot.mockReturnValue(Immutable.fromJS({
      coreSlotId: '4',
      id: 'deliveries-uuid',
      daySlotLeadTimeId: 'day-slot-lead-time-uuid'
    }))

    sendClientMetricMock.mockReset()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('trackOrder', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        basket: Immutable.Map({
          promoCode: 'B4SK3T-ST4T3-PR0M0',
        })
      })
    })

    describe('when the orderTrackingAction does not have an actionType', () => {
      test('should not take any action', () => {
        trackOrder('test', {})(dispatch, getState)

        expect(getState).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
        expect(trackAffiliatePurchase).not.toHaveBeenCalled()
      })
    })

    describe('when the orderTrackingAction contains an actionType', () => {
      describe('when order is OrderAPI V1', () => {
        const order = {
          id: '735702932',
          prices: {
            total: 31.99,
            promo_code: false,
          }
        }

        describe('if affiliate is not configured to track', () => {
          test('should not dispatch an affiliate tracking action', () => {
            trackOrder('action-no-affiliate', order)(dispatch, getState)

            expect(getState).not.toHaveBeenCalled()
            expect(dispatch).toHaveBeenCalled()
            expect(trackAffiliatePurchase).not.toHaveBeenCalled()
          })
        })

        describe('if affiliate is configured to track', () => {
          test('should dispatch an affiliate tracking action', () => {
            trackOrder('affiliate-no-action', order)(dispatch, getState)

            expect(getState).toHaveBeenCalled()
            expect(trackAffiliatePurchase).toHaveBeenCalledWith({
              orderId: '735702932',
              total: 31.99,
              promoCode: 'B4SK3T-ST4T3-PR0M0',
              commissionGroup: 'EXISTING',
            })
          })
        })

        describe('if no action type is configured', () => {
          test('should not dispatch an affiliate tracking action', () => {
            trackOrder('affiliate-no-action', order)(dispatch, getState)

            expect(getState).toHaveBeenCalled()
            expect(trackAffiliatePurchase).toHaveBeenCalled()
          })
        })

        describe('if an action type is configured', () => {
          test('should not dispatch an affiliate tracking action', () => {
            trackOrder('action-no-affiliate', order)(dispatch, getState)

            expect(getState).not.toHaveBeenCalled()
            expect(trackAffiliatePurchase).not.toHaveBeenCalled()
            expect(dispatch).toHaveBeenCalledWith({
              type: 'A_TEST_ACTION',
              order,
            })
          })
        })
      })

      describe('when order is OrderAPI V2', () => {
        const order = {
          id: '735702932',
          attributes: {
            prices: {
              total: 31.99,
              has_promo_code: false,
            }
          }
        }

        describe('if affiliate is not configured to track', () => {
          test('should not dispatch an affiliate tracking action', () => {
            trackOrder('action-no-affiliate', order)(dispatch, getState)

            expect(getState).not.toHaveBeenCalled()
            expect(dispatch).toHaveBeenCalled()
            expect(trackAffiliatePurchase).not.toHaveBeenCalled()
          })
        })

        describe('if affiliate is configured to track', () => {
          test('should dispatch an affiliate tracking action', () => {
            trackOrder('affiliate-no-action', order)(dispatch, getState)

            expect(getState).toHaveBeenCalled()
            expect(trackAffiliatePurchase).toHaveBeenCalledWith({
              orderId: '735702932',
              total: 31.99,
              promoCode: 'B4SK3T-ST4T3-PR0M0',
              commissionGroup: 'EXISTING',
            })
          })
        })

        describe('if no action type is configured', () => {
          test('should not dispatch an affiliate tracking action', () => {
            trackOrder('affiliate-no-action', order)(dispatch, getState)

            expect(getState).toHaveBeenCalled()
            expect(trackAffiliatePurchase).toHaveBeenCalled()
          })
        })

        describe('if an action type is configured', () => {
          test('should not dispatch an affiliate tracking action', () => {
            trackOrder('action-no-affiliate', order)(dispatch, getState)

            expect(getState).not.toHaveBeenCalled()
            expect(trackAffiliatePurchase).not.toHaveBeenCalled()
            expect(dispatch).toHaveBeenCalledWith({
              type: 'A_TEST_ACTION',
              order,
            })
          })
        })
      })
    })
  })

  describe('orderUpdate', () => {
    let spyGetOrderForUpdateOrderV1

    beforeEach(() => {
      spyGetOrderForUpdateOrderV1 = jest.spyOn(menuOrderSelectors, 'getOrderForUpdateOrderV1').mockImplementation(jest.fn)
    })

    test('should mark ORDER_SAVE as pending', async () => {
      saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve) => { resolve(resolve) })
      ))

      await orderUpdate()(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(2)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_SAVE', true)
      expect(pending).toHaveBeenNthCalledWith(2, 'ORDER_SAVE', false)
    })

    test('should mark ORDER_SAVE as errored if it errors', async () => {
      const err = new Error('oops')
      saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve, reject) => { reject(err) })
      ))

      await orderUpdate()(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(3)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_SAVE', true)
      expect(pending).toHaveBeenNthCalledWith(2, 'BASKET_CHECKOUT', false)
      expect(pending).toHaveBeenNthCalledWith(3, 'ORDER_SAVE', false)

      expect(error).toHaveBeenCalledTimes(2)
      expect(error).toHaveBeenNthCalledWith(1, 'ORDER_SAVE', null)
      expect(error).toHaveBeenNthCalledWith(2, 'ORDER_SAVE', err.message)
      expect(dispatch).toBeCalledTimes(5)
    })

    test('should map the arguments through to saveOrder correctly', async () => {
      spyGetOrderForUpdateOrderV1.mockReturnValue({ id: 'order_id' })

      await orderUpdate()(dispatch, getState)

      expect(spyGetOrderForUpdateOrderV1).toBeCalledWith(getState())
      expect(spyGetOrderForUpdateOrderV1).toHaveBeenCalledTimes(1)
      expect(saveOrder).toHaveBeenCalledTimes(1)
      expect(saveOrder).toHaveBeenCalledWith('access-token', 'order-id', { id: 'order_id' })
    })

    test('should redirect the user to the order summary page if it succeeds', async () => {
      spyGetOrderForUpdateOrderV1.mockReturnValue({ id: 'not_this_order_id', order_action: 'order_action' })
      saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve) => { resolve({ data: { id: 'order_id' } }) })
      ))

      await orderUpdate()(dispatch, getState)

      expect(orderConfirmationRedirect).toHaveBeenCalledWith(
        'order_id',
        'order_action',
      )
    })

    test('should call sendClientMetric with correct details', async () => {
      saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve) => { resolve({ data: { id: 'order_id' } }) })
      ))

      await orderUpdate()(dispatch, getState)

      expect(sendClientMetricMock).toHaveBeenCalledWith('menu-edit-complete', 1, 'Count')
    })
  })

  describe('orderCheckout', () => {
    const checkoutOrderApiParams = {
      addressId: 'address-id',
      postcode: 'N1',
      numPortions: 3,
      promoCode: '',
      orderId: '',
      deliveryDayId: 'delivery-id',
      slotId: 'slot-id',
      orderAction: 'order-action',
      disallowRedirectToSummary: true,
      recipes: ['recipe-id-1', 'recipe-id-2'],
    }
    let mockAssign
    const { location } = window

    beforeEach(() => {
      mockAssign = mockWindowLocationAssign()
    })
    afterEach(() => {
      window.location = location
    })

    test('api is being called correctly', async () => {
      await orderCheckout(checkoutOrderApiParams)(dispatch, getState)

      expect(checkoutOrder).toHaveBeenCalledWith('access-token', {
        address_id: 'address-id',
        deliverypostcode: 'N1',
        num_portions: 3,
        promocode: '',
        order_id: '',
        delivery_day_id: 'delivery-id',
        delivery_slot_id: 'slot-id',
        order_action: 'order-action',
        disallow_redirect_to_summary: true,
        recipes: ['recipe-id-1', 'recipe-id-2']
      })

      expect(pending).toHaveBeenNthCalledWith(2, 'ORDER_CHECKOUT', false)
      expect(error).toHaveBeenNthCalledWith(1, 'ORDER_CHECKOUT', null)
    })

    test('status is set to pending and no error', async () => {
      await orderCheckout(checkoutOrderApiParams)(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(2)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_CHECKOUT', true)
      expect(error).toHaveBeenNthCalledWith(1, 'ORDER_CHECKOUT', null)
    })

    test('returns an order ID and url', async () => {
      checkoutOrder.mockResolvedValueOnce({
        data: {
          orderId: '123',
          url: 'summary-url',
        }
      })

      const result = await orderCheckout(
        checkoutOrderApiParams
      )(dispatch, getState)

      expect(error).toHaveBeenNthCalledWith(1, 'ORDER_CHECKOUT', null)

      expect(result).toEqual({
        orderId: '123',
        url: 'summary-url',
      })
    })

    test('api throws an error', async () => {
      checkoutOrder.mockRejectedValueOnce({
        status: 'error',
        message: 'error api',
      })

      await orderCheckout(checkoutOrderApiParams)(dispatch, getState)

      expect(error).toHaveBeenNthCalledWith(2, 'ORDER_CHECKOUT', 'error api')
      expect(pending).toHaveBeenNthCalledWith(2, 'ORDER_CHECKOUT', false)
    })

    test('throw an error when orderId is not present in the response', async () => {
      checkoutOrder.mockResolvedValueOnce({
        data: {
          orderId: '',
          url: 'summary-url',
        }
      })

      await orderCheckout(
        checkoutOrderApiParams
      )(dispatch, getState)

      expect(error).toHaveBeenNthCalledWith(2, 'ORDER_CHECKOUT', 'Error when saving the order')
    })

    test('throw an error when url is not present in the response', async () => {
      checkoutOrder.mockResolvedValueOnce({
        data: {
          orderId: 'order-id',
          url: '',
        }
      })

      await orderCheckout(
        checkoutOrderApiParams
      )(dispatch, getState)

      expect(error).toHaveBeenNthCalledWith(2, 'ORDER_CHECKOUT', 'Error when saving the order')
    })

    test('redirect is called when redirected parameter is set to true', async () => {
      checkoutOrder.mockRejectedValueOnce({
        status: 'error',
        message: 'error api',
        url: 'redirect-url',
        redirected: true,
      })

      await orderCheckout(
        checkoutOrderApiParams
      )(dispatch, getState)

      expect(mockAssign).toHaveBeenCalledWith('redirect-url')
    })

    test.skip('redirect is not called when redirected parameter is not set', async () => {
      /*
      TODO: reinstate this test
      */
      checkoutOrder.mockRejectedValueOnce({
        status: 'error',
        message: 'error api',
      })

      await orderCheckout(checkoutOrderApiParams)(dispatch, getState)

      expect(mockAssign).toHaveBeenCalledTimes(0)
    })
  })

  describe('orderAddressChange', () => {
    let addressId

    beforeEach(() => {
      orderId = '12345'
      addressId = '101'
      getState.mockReturnValue({
        auth: Immutable.Map({ accessToken: 'access-token' }),
        user: Immutable.Map({
          newOrders: Immutable.Map({
            12345: Immutable.Map({
              shippingAddressId: '100',
            })
          })
        })
      })
    })

    it('should mark ORDER_ADDRESS_CHANGE as pending', async () => {
      await orderAddressChange(orderId, addressId)(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(2)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_ADDRESS_CHANGE', '12345')
      expect(pending).toHaveBeenNthCalledWith(2, 'ORDER_ADDRESS_CHANGE', '')
    })

    it('should call updateOrderAddress and dispatch the action with the correct arguments', async () => {
      updateOrderAddress.mockReturnValueOnce(
        new Promise(resolve => resolve())
      )

      await orderAddressChange(orderId, addressId)(dispatch, getState)

      expect(updateOrderAddress).toHaveBeenCalled()
      expect(updateOrderAddress).toHaveBeenCalledWith('access-token', '12345', '101')

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.ORDER_ADDRESS_CHANGE,
        data: {
          orderId: '12345',
          addressId: '101',
        },
        trackingData: {
          actionType: 'OrderDeliveryAddress Saved',
          order_id: '12345',
          original_deliveryaddress_id: '100',
          new_deliveryaddress_id: '101'
        }
      })
    })

    describe('when updateOrderAddress call errors', () => {
      beforeEach(() => {
        const err = new Error('error message')
        updateOrderAddress.mockReturnValueOnce(
          new Promise((resolve, reject) => reject(err))
        )
      })
      it('should mark ORDER_ADDRESS_CHANGE as errored', async () => {
        await orderAddressChange(orderId, addressId)(dispatch, getState)

        expect(error).toHaveBeenCalledTimes(2)
        expect(error).toHaveBeenNthCalledWith(1, 'ORDER_ADDRESS_CHANGE', { orderId: '', errorMessage: '' })
        expect(error).toHaveBeenNthCalledWith(2, 'ORDER_ADDRESS_CHANGE', { orderId: '12345', errorMessage: 'error message' })
      })

      it('should dispatch the SaveAttemptFailed action with the correct arguments', async () => {
        await orderAddressChange(orderId, addressId)(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.TRACKING,
          trackingData: {
            actionType: 'OrderDeliveryAddress SaveAttemptFailed',
            error: 'error message',
            order_id: '12345',
            original_deliveryaddress_id: '100',
            new_deliveryaddress_id: '101'
          }
        })
      })
    })
  })

  describe('orderGetDeliveryDays', () => {
    describe('given a user who has set their postcode', () => {
      let state
      const postcode = 'AA11 2BB'
      const cutoffDatetimeFrom = '01-01-2017 10:00:01'
      const cutoffDatetimeUntil = '02-02-2017 14:23:34'
      const fetchedDays = [{ id: '4' }, { id: '5' }, { id: '6' }]
      const availableDays = [{ id: '5' }, { id: '6' }]

      beforeEach(() => {
        orderId = '123'

        state = {
          user: Immutable.fromJS({
            addresses: { 789: { postcode } },
            deliveryTariffId: 'deliveryTarriffId'
          }),
        }

        fetchDeliveryDays.mockResolvedValue({ data: fetchedDays })
        deliveriesUtils.getAvailableDeliveryDays.mockReturnValue(availableDays)
      })

      describe('and next day delivery is disabled', () => {
        const deliveryTariffId = deliveriesUtils.deliveryTariffTypes.NON_NDD

        beforeEach(() => {
          state.features = Immutable.fromJS({
            ndd: {
              value: deliveryTariffId,
              experiment: false,
            }
          })

          getState.mockReturnValue(state)
          jest.spyOn(deliveriesUtils, 'getDeliveryTariffId').mockReturnValue(deliveryTariffId)
          jest.spyOn(deliveriesUtils, 'getNDDFeatureFlagVal').mockReturnValue(false)
        })

        afterEach(() => {
          jest.clearAllMocks()
        })

        describe('when call `orderGetDeliveryDays`', () => {
          beforeEach(async () => {
            await orderGetDeliveryDays(cutoffDatetimeFrom, cutoffDatetimeUntil, '789', orderId)(dispatch, getState)
          })

          test('then `ORDER_DELIVERY_DAYS_RECEIVE` should trigger pending and not pending state', () => {
            expect(actionStatus.pending).toHaveBeenCalledTimes(2)
            expect(actionStatus.pending).toHaveBeenNthCalledWith(1, 'ORDER_DELIVERY_DAYS_RECEIVE', true)
            expect(actionStatus.pending).toHaveBeenNthCalledWith(2, 'ORDER_DELIVERY_DAYS_RECEIVE', false)
          })

          test('then `ORDER_DELIVERY_DAYS_RECEIVE` cleared of error', () => {
            expect(actionStatus.error).toHaveBeenCalledTimes(1)
            expect(actionStatus.error).toHaveBeenCalledWith('ORDER_DELIVERY_DAYS_RECEIVE', null)
          })

          test('then `fetchDeliveryDays` should have been called with correct parameters', () => {
            expect(fetchDeliveryDays).toHaveBeenCalledTimes(1)
            expect(fetchDeliveryDays).toHaveBeenCalledWith(null, cutoffDatetimeFrom, cutoffDatetimeUntil, false, deliveryTariffId, postcode)
          })

          test('then `getAvailableDeliveryDays` should have been called with correct parameters', () => {
            expect(deliveriesUtils.getAvailableDeliveryDays).toHaveBeenCalledWith(fetchedDays)
          })

          test('then dispatch should have been called 4 times', () => {
            expect(dispatch).toHaveBeenCalledTimes(4)
          })

          test('then action `ORDER_DELIVERY_DAYS_RECEIVE` should have been dispatched third', () => {
            expect(dispatch).toHaveBeenNthCalledWith(3, {
              type: actionTypes.ORDER_DELIVERY_DAYS_RECEIVE,
              orderId,
              availableDays,
            })
          })

          test('then `transformDaySlotLeadTimesToMockSlots` should not have been called', () => {
            expect(deliveriesUtils.transformDaySlotLeadTimesToMockSlots).not.toHaveBeenCalled()
          })
        })

        describe('and `fetchDeliveryDays` throws an error', () => {
          const err = new Error('oops')

          beforeEach(() => {
            fetchDeliveryDays.mockRejectedValue(err)
          })

          describe('when call `orderGetDeliveryDays`', () => {
            beforeEach(async () => {
              await orderGetDeliveryDays(cutoffDatetimeFrom, cutoffDatetimeUntil, '789', orderId)(dispatch, getState)
            })

            test('then `ORDER_DELIVERY_DAYS_RECEIVE` should trigger pending and not pending state', () => {
              expect(actionStatus.pending).toHaveBeenCalledTimes(2)
              expect(actionStatus.pending).toHaveBeenNthCalledWith(1, 'ORDER_DELIVERY_DAYS_RECEIVE', true)
              expect(actionStatus.pending).toHaveBeenNthCalledWith(2, 'ORDER_DELIVERY_DAYS_RECEIVE', false)
            })

            test('then `ORDER_DELIVERY_DAYS_RECEIVE` should be marked as errored', () => {
              expect(actionStatus.error).toHaveBeenCalledTimes(2)
              expect(actionStatus.error).toHaveBeenNthCalledWith(1, 'ORDER_DELIVERY_DAYS_RECEIVE', null)
              expect(actionStatus.error).toHaveBeenNthCalledWith(2, 'ORDER_DELIVERY_DAYS_RECEIVE', err.message)
            })

            test('then dispatch should have been called 4 times', () => {
              expect(dispatch).toHaveBeenCalledTimes(4)
            })
          })
        })
      })

      describe('and next day delivery is enabled', () => {
        const deliveryTariffId = deliveriesUtils.deliveryTariffTypes.FREE_NDD

        beforeEach(() => {
          state.features = Immutable.fromJS({
            ndd: {
              value: deliveryTariffId,
              experiment: false,
            }
          })

          getState.mockReturnValue(state)
          jest.spyOn(deliveriesUtils, 'getDeliveryTariffId').mockReturnValue(deliveryTariffId)
          jest.spyOn(deliveriesUtils, 'getNDDFeatureFlagVal').mockReturnValue(true)
        })

        describe('when call `orderGetDeliveryDays`', () => {
          beforeEach(async () => {
            await orderGetDeliveryDays(cutoffDatetimeFrom, cutoffDatetimeUntil, '789', orderId)(dispatch, getState)
          })

          test('then `ORDER_DELIVERY_DAYS_RECEIVE` should trigger pending and not pending state', () => {
            expect(actionStatus.pending).toHaveBeenCalledTimes(2)
            expect(actionStatus.pending).toHaveBeenNthCalledWith(1, 'ORDER_DELIVERY_DAYS_RECEIVE', true)
            expect(actionStatus.pending).toHaveBeenNthCalledWith(2, 'ORDER_DELIVERY_DAYS_RECEIVE', false)
          })

          test('then `ORDER_DELIVERY_DAYS_RECEIVE` cleared of error', () => {
            expect(actionStatus.error).toHaveBeenCalledTimes(2)
            expect(actionStatus.error).toHaveBeenCalledWith('ORDER_DELIVERY_DAYS_RECEIVE', null)
          })

          test('then should call `fetchDeliveryDays` with correct parameters', () => {
            expect(fetchDeliveryDays).toHaveBeenCalledTimes(1)
            expect(fetchDeliveryDays).toHaveBeenCalledWith(null, cutoffDatetimeFrom, cutoffDatetimeUntil, true, deliveryTariffId, postcode)
          })

          test('then should call `transformDaySlotLeadTimesToMockSlots`', () => {
            expect(deliveriesUtils.transformDaySlotLeadTimesToMockSlots).toHaveBeenCalled()
          })
        })
      })
    })
  })

  describe('orderUpdateDayAndSlot', () => {
    let slotId
    let slotDate
    let availableDays

    beforeEach(() => {
      orderId = '12345'
      coreDayId = 3
      coreSlotId = 8
      slotId = 'slotid123'
      slotDate = '2019-08-10'
      availableDays = [{ id: '5' }, { id: '6' }]

      getState.mockReturnValue({
        auth: Immutable.Map({ accessToken: 'access-token' }),
        user: Immutable.Map({
          newOrders: Immutable.Map({
            12345: Immutable.Map({
              deliverySlotId: 'deliverySlotId',
            })
          })
        }),
        basket: Immutable.fromJS({
          chosenAddress: {}
        })
      })
    })

    it('should mark ORDER_UPDATE_DELIVERY_DAY_AND_SLOT as pending', async () => {
      await orderUpdateDayAndSlot(orderId, coreSlotId, slotId, slotDate, availableDays)(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(2)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', true)
      expect(pending).toHaveBeenNthCalledWith(2, 'ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', false)
    })

    it('should mark ORDER_UPDATE_DELIVERY_DAY_AND_SLOT as errored if it errors', async () => {
      const err = new Error('oops')
      saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve, reject) => reject(err))
      ))

      await orderUpdateDayAndSlot(orderId, coreDayId, coreSlotId, slotId, slotDate, availableDays)(dispatch, getState)

      expect(pending).toHaveBeenCalledTimes(2)
      expect(pending).toHaveBeenNthCalledWith(1, 'ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', true)
      expect(pending).toHaveBeenNthCalledWith(2, 'ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', false)

      expect(error).toHaveBeenCalledTimes(2)
      expect(error).toHaveBeenNthCalledWith(1, 'ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', null)
      expect(error).toHaveBeenNthCalledWith(2, 'ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', err.message)
    })

    it('should map the arguments through to saveOrder and dispatch the action with the correct arguments', async () => {
      const updatedOrder = {
        data: {
          deliveryDate: '01-01-2017',
          shouldCutoffAt: '29-12-2016',
          humanDeliveryDate: 'Monday 1st January'
        },
      }

      deliveriesUtils.getSlot.mockReturnValue(Immutable.fromJS({
        coreSlotId: '4',
        id: 'deliveries-uuid',
        daySlotLeadTimeId: 'day-slot-lead-time-uuid',
        deliveryStartTime: '05:00:00',
        deliveryEndTime: '07:00:00',
      }))

      saveOrder.mockReturnValueOnce(
        new Promise(resolve => resolve(updatedOrder))
      )

      await orderUpdateDayAndSlot(orderId, coreDayId, coreSlotId, slotId, slotDate, availableDays)(dispatch, getState)

      expect(saveOrder).toHaveBeenCalled()
      const order = {
        delivery_day_id: 3,
        delivery_slot_id: 8,
        day_slot_lead_time_id: 'day-slot-lead-time-uuid',
      }

      expect(saveOrder).toHaveBeenCalledWith('access-token', '12345', order)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT,
        orderId: '12345',
        coreDayId: 3,
        slotId: 8,
        deliveryDay: '01-01-2017',
        humanDeliveryDay: 'Monday 1st January',
        shouldCutoffAt: '29-12-2016',
        deliverySlotStart: '05:00:00',
        deliverySlotEnd: '07:00:00',
        trackingData: {
          actionType: 'OrderDeliverySlot Saved',
          order_id: '12345',
          original_deliveryslot_id: 'deliverySlotId',
          new_deliveryslot_id: 'slotid123'
        }
      })
    })

    it('should dispatch the SaveAttemptFailed action with the correct arguments if saveOrder fails', async () => {
      const error = new Error('error message')

      saveOrder.mockImplementation(jest.fn().mockReturnValueOnce(
        new Promise((resolve, reject) => reject(error))
      ))

      await orderUpdateDayAndSlot(orderId, coreDayId, coreSlotId, slotId, slotDate, availableDays)(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliverySlot SaveAttemptFailed',
          error: 'error message',
          order_id: '12345',
          original_deliveryslot_id: 'deliverySlotId',
          new_deliveryslot_id: 'slotid123'
        }
      })
    })
  })

  describe('clearUpdateDateErrorAndPending', () => {
    test('should mark ORDER_UPDATE_DELIVERY_DAY_AND_SLOT as NOT pending', () => {
      clearUpdateDateErrorAndPending()(dispatch)

      expect(pending).toHaveBeenCalledWith('ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', null)
    })

    test('should mark ORDER_UPDATE_DELIVERY_DAY_AND_SLOT as NOT errored', () => {
      clearUpdateDateErrorAndPending()(dispatch)

      expect(pending).toHaveBeenCalledWith('ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', null)
    })
  })

  describe('trackCancelMultipleBoxes', () => {
    test('returns the expected tracking action, given ids are passed', () => {
      expect(trackCancelMultipleBoxes([1, 2, 3])).toEqual({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: osrOrdersSkipped,
          orders_skipped: [1, 2, 3]
        }
      })
    })

    test('returns the expected tracking action, given ids are not passed', () => {
      expect(trackCancelMultipleBoxes()).toEqual({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: osrOrdersSkipped,
          orders_skipped: []
        }
      })
    })
  })

  describe('cancelMultipleBoxes', () => {
    const queryDispatch = type => {
      const passedEvents = dispatch.mock.calls.map(([arg1]) => arg1)

      return type
        ? passedEvents.filter(param => param.type === type)
        : passedEvents
    }

    const mockSelectedOrder = {
      id: 'mock-id',
      isProjected: false,
      deliveryDayId: 'mock-delivery-day-id',
      deliveryDay: 'date time',
    }

    const mockProjectedSelectedOrder = {
      id: 'mock-id-2',
      isProjected: true,
      deliveryDayId: 'mock-delivery-day-id-2',
      deliveryDay: 'date time',
    }

    beforeEach(() => {
      deleteOrder.mockResolvedValue(null)
      skipDates.mockResolvedValue(null)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('takes a list of selected orders', async () => {
      await cancelMultipleBoxes({ selectedOrders: [mockSelectedOrder] })(dispatch, getState)

      await flushPromises()
    })

    test('dispatches the expected multiskip start action', async () => {
      await cancelMultipleBoxes({ selectedOrders: [mockSelectedOrder] })(dispatch, getState)

      await flushPromises()

      const [firstEvent] = queryDispatch(actionTypes.CANCEL_MULTIPLE_BOXES_START)
      expect(firstEvent).toEqual({
        type: actionTypes.CANCEL_MULTIPLE_BOXES_START,
      })
    })

    test.each([
      { ...mockSelectedOrder, id: null },
      { ...mockSelectedOrder, isProjected: null },
      { ...mockSelectedOrder, deliveryDayId: null }
    ])('if malformed orders passed, dispatches a multiskip error action', async (malformedSelectedOrder) => {
      expect.assertions(2)

      await cancelMultipleBoxes({
        selectedOrders: [malformedSelectedOrder]
      })(dispatch, getState)

      await flushPromises()

      const [errorAction] = queryDispatch(actionTypes.CANCEL_MULTIPLE_BOXES_ERROR)

      expect(errorAction).toEqual({
        type: actionTypes.CANCEL_MULTIPLE_BOXES_ERROR,
      })

      expect(dispatch.mock.calls).toHaveLength(1)
    })

    test('if no orders are passed, dispatches a multiskip error action', async () => {
      await cancelMultipleBoxes({
        selectedOrders: []
      })(dispatch, getState)

      await flushPromises()

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.CANCEL_MULTIPLE_BOXES_ERROR,
      })

      expect(dispatch.mock.calls).toHaveLength(1)
    })

    test('for each projected selected orders, calls the skipDates day endpoint', async () => {
      await cancelMultipleBoxes({
        selectedOrders: [
          { ...mockProjectedSelectedOrder, deliveryDayId: 'delivery-day-1', deliveryDay: 'date1 time' },
          { ...mockProjectedSelectedOrder, deliveryDayId: 'delivery-day-2', deliveryDay: 'date2 time' }
        ]
      }, 'user-id')(dispatch, getState)

      await flushPromises()

      expect(skipDates).toHaveBeenCalledTimes(2)
      expect(skipDates).toHaveBeenNthCalledWith(1,
        'access-token',
        'user-id',
        ['date1']
      )
      expect(skipDates).toHaveBeenNthCalledWith(2,
        'access-token',
        'user-id',
        ['date2']
      )
    })

    test('for any pending selected orders, calls deleteOrder', async () => {
      await cancelMultipleBoxes({
        selectedOrders: [
          { ...mockSelectedOrder, id: 'order-id-1' },
          { ...mockSelectedOrder, id: 'order-id-2' }
        ]
      }, 'user-id')(dispatch, getState)

      await flushPromises()

      expect(deleteOrder).toHaveBeenCalledTimes(2)
      expect(deleteOrder).toHaveBeenNthCalledWith(1,
        'access-token',
        'order-id-1',
        'user-id'
      )
      expect(deleteOrder).toHaveBeenNthCalledWith(2,
        'access-token',
        'order-id-2',
        'user-id'
      )
    })

    test('for each box successfully cancelled, dispatches a cancellation event', async () => {
      await cancelMultipleBoxes({
        selectedOrders: [
          mockSelectedOrder,
          mockProjectedSelectedOrder
        ]
      })(dispatch, getState)

      await flushPromises()

      const [orderCancel] = queryDispatch(actionTypes.ORDER_CANCEL)
      const [projectedOrderCancel] = queryDispatch(actionTypes.PROJECTED_ORDER_CANCEL)

      expect(orderCancel).toEqual({
        type: actionTypes.ORDER_CANCEL,
        orderId: 'mock-id',
        trackingData: {
          actionType: 'Order Cancelled',
          delivery_day_id: 'mock-delivery-day-id',
          order_state: 'pending',
          cms_variation: 'mock-id',
          recovery_reasons: [
            'mock-value-proposition',
            'mock-offer',
          ],
        }
      })
      expect(projectedOrderCancel).toEqual({
        type: actionTypes.PROJECTED_ORDER_CANCEL,
        orderId: 'mock-id-2',
        trackingData: {
          actionType: 'Order Skipped',
          delivery_day_id: 'mock-delivery-day-id-2',
          order_state: 'projected',
          cms_variation: 'mock-id-2',
          recovery_reasons: [
            'mock-value-proposition',
            'mock-offer',
          ],
        }
      })
    })

    describe('when some cancellations fail', () => {
      beforeEach(() => {
        // First should succeed, second should fail
        deleteOrder.mockResolvedValueOnce(null)
        skipDates.mockRejectedValueOnce(null)
      })

      test('only dispatches cancellation action for successes', async () => {
        await cancelMultipleBoxes({
          selectedOrders: [
            mockSelectedOrder,
            mockProjectedSelectedOrder
          ]
        })(dispatch, getState)

        const cancellationActions = queryDispatch(actionTypes.ORDER_CANCEL)

        expect(cancellationActions.length).toEqual(1)
        expect(cancellationActions[0]).toEqual({
          type: actionTypes.ORDER_CANCEL,
          orderId: 'mock-id',
          trackingData: {
            actionType: 'Order Cancelled',
            delivery_day_id: 'mock-delivery-day-id',
            order_state: 'pending',
            cms_variation: 'mock-id',
            recovery_reasons: [
              'mock-value-proposition',
              'mock-offer',
            ],
          }
        })
      })

      test('still dispatches tracking action for successes', async () => {
        await cancelMultipleBoxes({
          selectedOrders: [
            mockSelectedOrder,
            mockProjectedSelectedOrder
          ]
        })(dispatch, getState)

        const [trackingEvent] = queryDispatch(actionTypes.TRACKING)
        expect(trackingEvent).toEqual({
          type: actionTypes.TRACKING,
          trackingData: {
            actionType: osrOrdersSkipped,
            orders_skipped: ['mock-id']
          }
        })
      })
    })

    test('if boxes are successfully cancelled, dispatches a success action with count', async () => {
      await cancelMultipleBoxes({
        selectedOrders: [
          mockSelectedOrder,
          mockProjectedSelectedOrder
        ]
      })(dispatch, getState)

      await flushPromises()

      const [successAction] = queryDispatch(actionTypes.CANCEL_MULTIPLE_BOXES_SUCCESS)

      expect(successAction).toEqual({
        type: actionTypes.CANCEL_MULTIPLE_BOXES_SUCCESS,
        count: 2
      })
    })

    test('if boxes are successfully cancelled, dispatches the expected tracking action', async () => {
      await cancelMultipleBoxes({
        selectedOrders: [
          mockSelectedOrder,
          mockProjectedSelectedOrder
        ]
      })(dispatch, getState)

      await flushPromises()

      const [trackingAction] = queryDispatch(actionTypes.TRACKING)

      expect(trackingAction).toEqual({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: osrOrdersSkipped,
          orders_skipped: [
            'mock-id',
            'mock-id-2'
          ],
        }
      })
    })

    test('if any box fails to cancel, dispatches a multiskip error action', async () => {
      deleteOrder.mockRejectedValueOnce()

      await cancelMultipleBoxes({ selectedOrders: [mockSelectedOrder] })(dispatch, getState)

      await flushPromises()

      const [firstEvent] = queryDispatch(actionTypes.CANCEL_MULTIPLE_BOXES_ERROR)
      expect(firstEvent).toEqual({
        type: actionTypes.CANCEL_MULTIPLE_BOXES_ERROR,
      })
    })

    describe('projectedOrderRestore', () => {
      test('dispatches PROJECTED_ORDER_RESTORE and call unSkipDates', async () => {
        unSkipDates.mockResolvedValueOnce()
        const dispatchSpy = jest.fn()
        const getStateSpy = jest.fn().mockReturnValueOnce({
          auth: Immutable.Map({
            accessToken: 'access-token'
          }),
        })

        await projectedOrderRestore('order-id', 'user-id', 'delivery-day-id', '2021-04-14 00:00:00')(dispatchSpy, getStateSpy)

        expect(unSkipDates).toHaveBeenCalledWith('access-token', 'user-id', ['2021-04-14'])
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: actionTypes.PROJECTED_ORDER_RESTORE,
          orderId: 'order-id',
        })
      })
    })
  })
})
