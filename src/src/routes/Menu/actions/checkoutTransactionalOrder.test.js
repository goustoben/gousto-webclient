import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import * as utilsDeliveries from 'utils/deliveries'
import * as actionsOrder from 'actions/order'
import * as actionsOrderConfirmation from 'actions/orderConfirmation'
import { getBasketSlotId } from 'selectors/basket'
import * as orderV2Api from '../apis/orderV2'
import { checkoutTransactionalOrder } from './checkoutTransactionalOrder'

const createState = (partialOverwrite = {}) => ({
  auth: Immutable.Map({
    id: 'auth-user-id',
    accessToken: 'auth-access-token',
    isAuthenticated: true,
    ...(partialOverwrite.auth || {})
  }),
  basket: Immutable.fromJS({
    date: '2019-10-10',
    slotId: '3e952522-a778-11e6-8197-080027596944',
    recipes: {
      'recipe-id-1': 1,
      'recipe-id-2': 2,
    },
    numPortions: 2,
    chosenAddress: {
      id: '12345555'
    },
    ...(partialOverwrite.basket || {})
  }),
  menuService: {
    recipe: {
      'recipe-id-1': {
        id: 'recipe-uuid-1'
      },
      'recipe-id-2': {
        id: 'recipe-uuid-2'
      },
    },
    ...(partialOverwrite.menuService || {})
  },
  boxSummaryDeliveryDays: Immutable.fromJS({
    '2019-10-10': {
      id: '3e9a2572-a778-11e6-bb0f-080027596944',
      date: '2016-11-21',
      coreDayId: '5',
      slots: [
        {
          coreSlotId: '1',
          id: '3e952522-a778-11e6-8197-080027596944',
          daySlotLeadTimeId: 'day-slot-lead-time-id'
        },
      ],
    },
  }),
  features: Immutable.fromJS({
    ndd: {
      value: utilsDeliveries.deliveryTariffTypes.NON_NDD
    },
    enable3DSForSignUp: {
      value: false
    },
  }),
  user: Immutable.fromJS({
    orders: Immutable.List([]),
    deliveryTariffId: utilsDeliveries.deliveryTariffTypes.NON_NDD,
    ...(partialOverwrite.user || {})
  })
})

const jsonApiSimpleObject = (resourceType, id) => ({ data: { type: resourceType, id } })
const jsonApiRecipeObject = (id, numPortions) => ({
  type: 'recipe',
  id,
  meta: { portion_for: numPortions }
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
    const getState = () => ({
      ...createState(),
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
    // these values come from the state set up in createState
    const deliveryDayId = '5'
    const deliverySlotId = '1'
    const deliverySlotLeadTimeId = 'day-slot-lead-time-id'
    const shippingAddressId = '12345555'
    const deliveryTariffId = utilsDeliveries.deliveryTariffTypes.NON_NDD
    const numPortions = 2

    const getState = () => createState()

    test('should call createOrder with correct order', async () => {
      await checkoutTransactionalOrder()(dispatch, getState)

      const expectedRequest = {
        type: 'order',
        relationships: {
          delivery_slot: jsonApiSimpleObject('delivery-slot', deliverySlotId),
          delivery_slot_lead_time: jsonApiSimpleObject('delivery-slot-lead-time', deliverySlotLeadTimeId),
          delivery_day: jsonApiSimpleObject('delivery-day', deliveryDayId),
          shipping_address: jsonApiSimpleObject('shipping-address', shippingAddressId),
          delivery_tariff: jsonApiSimpleObject('delivery-tariff', deliveryTariffId),
          components: {
            data: [
              jsonApiRecipeObject('recipe-uuid-1', numPortions),
              jsonApiRecipeObject('recipe-uuid-2', numPortions),
              jsonApiRecipeObject('recipe-uuid-2', numPortions),
            ]
          }
        }
      }

      expect(createOrder).toHaveBeenCalledWith('auth-access-token', expectedRequest, undefined, 'auth-user-id')
    })

    test('should call trackOrder with response', async () => {
      await checkoutTransactionalOrder()(dispatch, getState)

      expect(trackOrder).toHaveBeenCalledWith(undefined, mockOrder)
    })

    test('should call orderConfirmationRedirect with id from response', async () => {
      await checkoutTransactionalOrder()(dispatch, getState)

      expect(orderConfirmationRedirect).toHaveBeenCalledWith(mockOrder.id)
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
