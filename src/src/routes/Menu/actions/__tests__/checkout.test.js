import Immutable from 'immutable'

import { safeJestMock } from '_testing/mocks'
import { createPreviewOrder } from 'apis/orders'

import { actionTypes } from 'actions/actionTypes'
import { redirect } from 'actions/redirect'
import status from 'actions/status'

import logger from 'utils/logger'
import { getSlot, getDeliveryTariffId, deliveryTariffTypes } from 'utils/deliveries'

import { checkoutCreatePreviewOrder, checkoutTransactionalOrder } from '../checkout'

import * as orderActions from '../order'

const orderAssignToUser = safeJestMock(orderActions, 'orderAssignToUser')

jest.mock('apis/orders', () => ({
  createPreviewOrder: jest.fn(),
}))

jest.mock('utils/logger', () => ({
  warning: jest.fn(),
  error: jest.fn()
}))
jest.mock('utils/deliveries')

jest.mock('actions/redirect', () => ({
  redirect: jest.fn(),
}))

jest.mock('actions/status', () => ({
  error: jest.fn(() => ({ type: 'error_action' })),
  pending: jest.fn(() => ({ type: 'pending_action' })),
}))

const createState = (stateOverrides) => ({
  auth: Immutable.fromJS({
    id: '',
  }),
  basket: Immutable.fromJS({
    previewOrderId: '100004',
    address: '3 Moris House, London',
    date: '2016-11-21',
    numPortions: 4,
    recipes: {
      'recipe-id-1': 1,
      'recipe-id-2': 2,
    },
    stepsOrder: ['boxdetails', 'aboutyou', 'delivery', 'payment'],
    slotId: '33e977c1e-a778-11e6-aa8b-080027596944',
    promoCode: 'DTI-SB-P30M',
    postcode: 'W6 0DH',
    prevPostcode: 'OX18 1EN',
    chosenAddress: {
      id: '123456'
    }
  }),
  boxSummaryDeliveryDays: Immutable.fromJS({
    '2016-11-21': {
      id: '3e9a2572-a778-11e6-bb0f-080027596944',
      date: '2016-11-21',
      coreDayId: '253',
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
  }),
  ...stateOverrides,
})

const createPreviewOrderObj = (previewOrderOverrides) => ({
  delivery_day_id: '253',
  delivery_slot_id: '4',
  recipe_choices: [
    { id: 'recipe-id-1', quantity: 4, type: 'Recipe' },
    { id: 'recipe-id-2', quantity: 4, type: 'Recipe' },
    { id: 'recipe-id-2', quantity: 4, type: 'Recipe' },
  ],
  day_slot_lead_time_id: '',
  delivery_tariff_id: '',
  address_id: '123456',
  promo_code: 'DTI-SB-P30M',
  ...previewOrderOverrides
})

describe('menu checkout actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  let previewOrder

  beforeEach(() => {
    getState.mockReturnValue(createState())
    previewOrder = createPreviewOrderObj()
    createPreviewOrder.mockReturnValue(
      new Promise(resolve => {
        resolve({
          data: {
            order: {
              id: 1,
            },
            ...previewOrder,
          },
        })
      }),
    )
    getSlot.mockReturnValue(
      Immutable.Map({
        coreSlotId: '4',
        id: '3e977c1e-a778-11e6-aa8b-080027596944',
        daySlotLeadTimeId: ''
      }),
    )
    getDeliveryTariffId.mockReturnValue('')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('checkoutCreatePreviewOrder', () => {
    test('should call create preview order', async () => {
      await checkoutCreatePreviewOrder()(
        dispatch,
        getState,
      )

      expect(createPreviewOrder).toHaveBeenCalledTimes(1)
      expect(createPreviewOrder).toHaveBeenCalledWith(previewOrder)
    })

    describe('when createPreviewOrder fails', () => {
      test('should dispatch the error and log the error', async () => {
        const standardError = new Error('standard-error')
        createPreviewOrder.mockImplementation(() => Promise.reject(standardError))

        await checkoutCreatePreviewOrder()(
          dispatch,
          getState,
        )

        expect(status.error).toHaveBeenCalledWith(
          actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
          {
            message: 'standard-error',
            code: undefined,
          },
        )

        expect(logger.warning).toHaveBeenCalledWith(expect.stringContaining('standard-error'))
        expect(logger.error).toBeCalledTimes(2)
        expect(logger.error).toHaveBeenNthCalledWith(1, expect.objectContaining({
          message: 'createPreviewOrder failed, logging error below...',
        }))
        expect(logger.error).toHaveBeenNthCalledWith(2, standardError)
      })
    })

    test('should call create preview order and log the error, coreDayId empty', async () => {
      getState.mockReturnValue(createState({
        boxSummaryDeliveryDays: Immutable.fromJS({
          '2016-11-21': {
            id: '3e9a2572-a778-11e6-bb0f-080027596944',
            date: '2016-11-21',
            coreDayId: '',
            slots: [
              {
                coreSlotId: '1',
                id: '3e952522-a778-11e6-8197-080027596944',
              },
            ],
          },
        }),
        auth: Immutable.fromJS({
          id: ''
        })
      }))

      await checkoutCreatePreviewOrder()(
        dispatch,
        getState,
      )

      expect(status.error).toHaveBeenCalledWith(
        actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
        {
          message: 'Missing data, persistent basket might be expired',
          code: 'basket-expired',
        },
      )
    })

    test('should call create preview order and log the error, boxSummaryDeliveryDays empty', async () => {
      getState.mockReturnValue(createState({
        boxSummaryDeliveryDays: null,
      }))

      await checkoutCreatePreviewOrder()(
        dispatch,
        getState,
      )

      expect(status.error).toHaveBeenCalledWith(
        actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
        {
          message: 'Missing data, persistent basket might be expired',
          code: 'basket-expired',
        },
      )
    })

    describe('when daySlotLeadTimeId is present in box summary slots', () => {
      const targetUuid = 'some-uuid'

      beforeEach(() => {
        getState.mockReturnValue(createState({
          boxSummaryDeliveryDays: Immutable.fromJS({
            '2016-11-21': {
              id: '3e9a2572-a778-11e6-bb0f-080027596944',
              date: '2016-11-21',
              coreDayId: '253',
              slots: [
                {
                  coreSlotId: '4',
                  id: '3e952522-a778-11e6-8197-080027596944',
                  daySlotLeadTimeId: 'some-uuid' // targetUuid
                },
              ],
            },
          }),
        }))
      })

      test('should call create preview order with day_slot_lead_time_id', async () => {
        getSlot.mockReturnValue(Immutable.fromJS({
          coreSlotId: '4',
          id: '3e952522-a778-11e6-8197-080027596944',
          daySlotLeadTimeId: targetUuid
        }))

        await checkoutCreatePreviewOrder()(
          dispatch,
          getState,
        )

        previewOrder = createPreviewOrderObj({
          day_slot_lead_time_id: targetUuid
        })

        expect(createPreviewOrder).toHaveBeenCalledTimes(1)

        expect(createPreviewOrder).toHaveBeenCalledWith(previewOrder)
      })
    })

    describe('when deliveryTariffId is returned from state', () => {
      const deliveryTariffId = 'delivery-tariff-uuid'

      test('should call create preview order with delivery_tariff_id', async () => {
        getDeliveryTariffId.mockReturnValue(deliveryTariffId)

        await checkoutCreatePreviewOrder()(
          dispatch,
          getState
        )

        previewOrder = createPreviewOrderObj({
          delivery_tariff_id: deliveryTariffId
        })

        expect(createPreviewOrder).toHaveBeenCalledTimes(1)
        expect(createPreviewOrder).toHaveBeenCalledWith(previewOrder)
      })
    })
  })

  describe('checkoutTransactionalOrder', () => {
    const createTransactionalState = ({
      auth = Immutable.Map({}),
      basket = Immutable.Map({}),
      error = Immutable.Map({}),
      user = Immutable.Map({}),
    } = {}) => ({
      ...createState(),
      auth,
      basket,
      error,
      user,
    })

    beforeEach(() => {
      getState.mockReturnValue(createTransactionalState())
    })

    test('should dispatch a preview order request', async () => {
      await checkoutTransactionalOrder()(dispatch, getState)

      const previewOrderAction = dispatch.mock.calls[0][0]
      previewOrderAction(dispatch, getState)

      expect(status.pending).toHaveBeenCalledWith(
        actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
        true,
      )
    })

    describe('when preview order fails', () => {
      beforeEach(() => {
        getState.mockReturnValue(createTransactionalState({
          error: Immutable.Map({
            [actionTypes.BASKET_PREVIEW_ORDER_CHANGE]: {
              message: 'Test preview order error',
              code: 'undefined-error',
            },
          }),
        }))
      })

      test('should log a warning', async () => {
        await checkoutTransactionalOrder()(dispatch, getState)

        expect(logger.warning).toHaveBeenCalledWith(expect.stringContaining('undefined-error'))
      })

      test('should redirect to the menu', async () => {
        await checkoutTransactionalOrder()(dispatch, getState)

        expect(redirect).toHaveBeenCalledWith(
          '/menu?from=newcheckout&error=undefined-error',
          true,
        )
      })
    })

    describe('when preview order succeeds', () => {
      describe('and user is not authenticated', () => {
        beforeEach(() => {
          getState.mockReturnValue(createTransactionalState({
            auth: Immutable.Map({
              isAuthenticated: false,
            }),
            basket: Immutable.Map({
              previewOrderId: '100004',
            }),
          }))
        })

        test('should not redirect', async () => {
          await checkoutTransactionalOrder()(dispatch, getState)

          expect(redirect).not.toHaveBeenCalled()
        })

        test('should not assign order to user', async () => {
          await checkoutTransactionalOrder()(dispatch, getState)

          expect(orderAssignToUser).not.toHaveBeenCalled()
        })
      })

      describe('and user is authenticated', () => {
        describe('and user is on hold', () => {
          beforeEach(() => {
            getState.mockReturnValue(createTransactionalState({
              auth: Immutable.Map({
                isAuthenticated: true,
              }),
              basket: Immutable.Map({
                previewOrderId: '100004',
              }),
              user: Immutable.Map({
                status: 'onhold',
              }),
            }))
          })

          test('should redirect to my gousto', async () => {
            await checkoutTransactionalOrder()(dispatch, getState)

            expect(redirect).toHaveBeenCalledWith('/my-gousto')
          })
        })

        describe('and user is not on hold', () => {
          beforeEach(() => {
            getState.mockReturnValue(createTransactionalState({
              auth: Immutable.Map({
                isAuthenticated: true,
              }),
              basket: Immutable.Map({
                previewOrderId: '100004',
              }),
              user: Immutable.Map({
                status: 'active',
              }),
            }))
          })

          test('should assign order to user', async () => {
            await checkoutTransactionalOrder('transactional')(dispatch, getState)

            expect(orderAssignToUser).toHaveBeenCalledWith(
              'transactional',
              '100004'
            )
          })
        })
      })
    })
  })
})
