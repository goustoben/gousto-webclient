import { actionTypes } from 'actions/actionTypes'
import * as actionsOrder from 'actions/order'
import * as actionsOrderConfirmation from 'actions/orderConfirmation'
import { getBasketSlotId } from 'selectors/basket'
import { createState as createOrderState } from 'routes/Menu/selectors/__tests__/order.test'
import * as orderV2Api from '../apis/orderV2'
import { checkoutTransactionalOrder } from './checkoutTransactionalOrder'

const createState = (partialOverwrite = {}) => createOrderState({
  ...partialOverwrite,
  auth: {
    id: 'auth-user-id',
    accessToken: 'auth-access-token',
    isAuthenticated: true,
    ...(partialOverwrite.auth || {})
  }
})

describe('Menu > actions > checkoutTransactionalOrder', () => {
  const mockOrder = {
    type: 'order',
    id: '1234',
    relationships: {
      components: [
        { type: 'recipe', id: 'some-cool-recipe-guid-1' },
        { type: 'recipe', id: 'another-cool-recipe-guid' },
        { type: 'recipe', id: 'guid-guid-guid' }
      ]
    },
    attributes: { state: 'pending' }
  }
  let createOrder
  let trackOrder
  let orderConfirmationRedirect
  let dispatch

  beforeEach(() => {
    createOrder = jest.spyOn(orderV2Api, 'createOrder').mockImplementation(() => mockOrder)
    trackOrder = jest.spyOn(actionsOrder, 'trackOrder').mockImplementation(() => { })
    orderConfirmationRedirect = jest.spyOn(actionsOrderConfirmation, 'orderConfirmationRedirect').mockImplementation(() => { })
    dispatch = jest.fn()
  })

  describe('when not authenticated', () => {
    const getState = () => createState({ auth: { isAuthenticated: false } })

    test('should not call createOrder', async () => {
      await checkoutTransactionalOrder()(dispatch, getState)
      expect(createOrder).not.toHaveBeenCalled()
    })
  })

  describe('when no slot', () => {
    const getState = () => createState({
      basket: {
        slotId: undefined
      },
      boxSummaryDeliveryDays: undefined
    })

    test('should not call createOrder', async () => {
      await checkoutTransactionalOrder()(dispatch, getState)
      expect(createOrder).not.toHaveBeenCalled()
    })

    test('should clear pending', async () => {
      await checkoutTransactionalOrder()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.PENDING,
        key: actionTypes.ORDER_SAVE,
        value: false
      })
    })

    test('should set error', async () => {
      await checkoutTransactionalOrder()(dispatch, getState)

      const errorMessage = `Can't find any slot with id: ${getBasketSlotId(getState())}`

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.ERROR,
        key: actionTypes.ORDER_SAVE,
        value: errorMessage
      })
    })
  })

  describe('when in valid state', () => {
    const getState = () => createState()

    test('should call createOrder with correct order', async () => {
      await checkoutTransactionalOrder()(dispatch, getState)

      expect(createOrder).toHaveBeenCalledWith('auth-access-token',
        {
          relationships: {
            components: {
              data: [
                {id: 'recipe-uuid-1', meta: { portion_for: 2 }, type: 'recipe'},
                {id: 'recipe-uuid-2', meta: { portion_for: 2 }, type: 'recipe'},
                {id: 'recipe-uuid-2', meta: { portion_for: 2 }, type: 'recipe'}]},
            delivery_day: { data: { id: 'delivery-days-id', type: 'delivery-day'}},
            delivery_slot: { data: { id: 'slot-core-id', meta: {uuid: 'slot-uuid' }, type: 'delivery-slot'}},
            delivery_tariff: { data: { id: '9037a447-e11a-4960-ae69-d89a029569af', type: 'delivery-tariff'}},
            delivery_slot_lead_time: { data: { id: 'day-slot-lead-time-uuid', type: 'delivery-slot-lead-time'}},
          },
          type: 'order'
        },
        'auth-user-id')
    })

    test('should call trackOrder with response', async () => {
      await checkoutTransactionalOrder()(dispatch, getState)

      expect(trackOrder).toHaveBeenCalledWith(undefined, mockOrder)
    })

    test('should call orderConfirmationRedirect with id from response', async () => {
      await checkoutTransactionalOrder()(dispatch, getState)

      expect(orderConfirmationRedirect).toHaveBeenCalledWith(mockOrder.id, 'create')
    })

    test('should clear pending', async () => {
      await checkoutTransactionalOrder()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.PENDING,
        key: actionTypes.ORDER_SAVE,
        value: false
      })
    })

    describe('when createOrder throws an error', () => {
      const message = 'oops something broke'
      const code = '500'
      beforeEach(() => {
        createOrder.mockImplementation(() => {
          // eslint-disable-next-line no-throw-literal
          throw { message, code }
        })
      })

      afterEach(() => {
        createOrder.mockClear()
      })

      test('should dispatch error', async () => {
        await checkoutTransactionalOrder()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.ERROR,
          key: actionTypes.ORDER_SAVE,
          value: { message, code }
        })
      })
    })
  })
})
