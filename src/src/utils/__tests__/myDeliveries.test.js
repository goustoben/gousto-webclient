import Immutable from 'immutable'
import moment from 'moment'
import {
  filterOrders,
  getOrderState,
  getDeliveryDayRescheduledReason,
  transformPendingOrders,
  transformProjectedDeliveries,
} from '../myDeliveries'

jest.mock('moment')

describe('myDeliveries utils', () => {
  const mockOrders = Immutable.fromJS({
    1234: {
      id: '8360325',
      state: 'committed',
      phase: 'delivered',
      prices: {
        productTotal: '0.00',
        recipeTotal: '47.75',
        percentageOff: null,
        deliveryTotal: '0.00',
        grossTotal: '47.75',
        total: '47.75',
        totalDiscount: '0.000'
      },
      recipeItems: [
        {
          id: '32072784',
          title: 'Indonesian-Style Prawn Curry & Green Bean Rice ',
          recipeId: '101',
          media: [
            {
              urls: [
                { width: 50, src: 'https://cloud.com/cms/test-media/test-images/test-recipe-1-x50.jpg' },
                { width: 200, src: 'https://cloud.com/cms/test-media/test-images/test-recipe-1-x200.jpg' },
                { width: 400, src: 'https://cloud.com/cms/test-media/test-images/test-recipe-1-x400.jpg' },
              ]
            }
          ]
        },
        {
          id: '32072785',
          title: 'Indian-Spiced Chicken Tray Bake With Spinach',
          recipeId: '102',
          media: [
            {
              urls: [
                { width: 50, src: 'https://cloud.com/cms/test-media/test-images/test-recipe-2-x50.jpg' },
                { width: 200, src: 'https://cloud.com/cms/test-media/test-images/test-recipe-2-x200.jpg' },
                { width: 400, src: 'https://cloud.com/cms/test-media/test-images/test-recipe-2-x400.jpg' },
              ]
            }
          ]
        },
      ],
      productItems: [],
      box: {
        numPortions: '4',
      },
      period: {
        id: 266,
        whenStart: '2019-02-12T12:00:00+00:00',
        whenCutoff: '2019-02-19T11:59:59+00:00'
      },
      deliveryDayId: '1653',
      deliverySlotId: '11',
      deliveryDate: '2019-02-19 00:00:00',
      deliverySlot: {
        deliveryStart: '08:00:00',
        deliveryEnd: '18:59:59',
      },
      shouldCutoffAt: '2019-02-16 11:59:59',
      whenLive: '2019-02-05 12:00:00',
      shippingAddress: {
        id: '34820671',
      },
      number: '1',
    },
    5678: {
      id: '11922804',
      state: 'pending',
      phase: 'open',
      prices: {
        productTotal: '44.86',
        recipeTotal: '47.75',
        percentageOff: null,
        deliveryTotal: '4.99',
        grossTotal: '97.60',
        total: '97.60',
        totalDiscount: '0.000'
      },
      recipeItems: [
        {
          id: '46584179',
          title: 'Aubergine Yasai Curry With Sticky Rice & Edamame',
          recipeId: '103',
          media: [
            {
              urls: [
                { width: 50, src: 'https://cloud.com/cms/test-media/test-images/test-recipe-3-x50.jpg' },
                { width: 200, src: 'https://cloud.com/cms/test-media/test-images/test-recipe-3-x200.jpg' },
                { width: 400, src: 'https://cloud.com/cms/test-media/test-images/test-recipe-3-x400.jpg' },
              ]
            }
          ]
        },
        {
          id: '46584182',
          title: 'Pasta Alla Genovese',
          recipeId: '104',
          media: [
            {
              urls: [
                { width: 50, src: 'https://cloud.com/cms/test-media/test-images/test-recipe-4-x50.jpg' },
                { width: 200, src: 'https://cloud.com/cms/test-media/test-images/test-recipe-4-x200.jpg' },
                { width: 400, src: 'https://cloud.com/cms/test-media/test-images/test-recipe-4-x400.jpg' },
              ]
            }
          ]
        }
      ],
      productItems: [
        {
          id: '46584183',
          quantity: '3',
          listPrice: '29.97',
          title: 'Joseph Joseph - Garlic Rocker (Green)',
          media: [
            {
              urls: [
                { width: 50, src: 'https://cloud.com/cms/test-media/test-images/test-product-1-x50.jpg' },
                { width: 200, src: 'https://cloud.com/cms/test-media/test-images/test-product-1-x200.jpg' },
                { width: 400, src: 'https://cloud.com/cms/test-media/test-images/test-product-1-x400.jpg' },
              ]
            }
          ]
        }
      ],
      box: {
        numPortions: '4',
      },
      period: {
        whenStart: '2019-10-22T12:00:00+01:00',
        whenCutoff: '2019-10-29T11:59:59+00:00'
      },
      deliveryDayId: '1903',
      humanDeliveryDate: 'Saturday 26th October',
      deliverySlotId: '6',
      deliveryDate: '2019-10-26 00:00:00',
      deliverySlot: {
        deliveryStart: '08:00:00',
        deliveryEnd: '19:00:00',
      },
      shouldCutoffAt: '2019-10-23 11:59:59',
      whenLive: '2019-10-15 12:00:00',
      originalDeliveryDay: {
        date: '2019-10-15 12:00:00',
        humanDate: 'Tuesday 15th October',
        unavailableReason: 'holiday'
      },
      shippingAddress: {
        id: '34820671',
      },
      number: '2',
    }
  })

  describe('filterOrders', () => {
    test('should filter out all past orders', () => {
      const result = filterOrders(mockOrders)

      expect(result.size).toEqual(1)
    })
  })

  describe('getOrderState', () => {
    test('should return scheduled if phase is pre-menu', () => {
      const state = 'pending'
      const deliveryDate = '2019-11-06T00:00:00.000Z'
      const recipeItems = Immutable.List()
      const phase = 'pre_menu'
      const cancellable = true
      const result = getOrderState(state, deliveryDate, recipeItems, phase, cancellable)

      expect(result).toEqual('scheduled')
    })

    test('should return dispatched if state is committed and is day of delivery', () => {
      const state = 'committed'
      moment.mockReturnValue({
        isSame: () => true
      })

      const deliveryDate = '2019-11-06T00:00:00.000Z'
      const cancellable = false
      const result = getOrderState(state, deliveryDate, undefined, undefined, cancellable)

      expect(result).toEqual('dispatched')
    })

    test('should return confirmed if state is committed and is NOT day of delivery', () => {
      const state = 'committed'
      moment.mockReturnValue({
        isSame: () => false
      })

      const deliveryDate = '2019-11-07T00:00:00.000Z'
      const cancellable = false
      const result = getOrderState(state, deliveryDate, undefined, undefined, cancellable)

      expect(result).toEqual('confirmed')
    })

    test('should return confirmed if state is pending and the order is NOT cancellable', () => {
      const state = 'pending'
      const recipeItems = Immutable.List()
      const deliveryDate = '2019-11-07T00:00:00.000Z'
      const cancellable = false
      const result = getOrderState(state, deliveryDate, recipeItems, undefined, cancellable)

      expect(result).toEqual('confirmed')
    })

    test('should return menu open if state is pending and there are NO chosen recipe items', () => {
      const state = 'pending'
      const recipeItems = Immutable.List()
      moment.mockReturnValue({
        isSame: () => true
      })

      const deliveryDate = '2019-11-06T00:00:00.000Z'
      const cancellable = true

      const result = getOrderState(state, deliveryDate, recipeItems, undefined, cancellable)

      expect(result).toEqual('menu open')
    })

    test('should return recipes chosen if state is pending and there are chosen recipe items', () => {
      const state = 'pending'
      const recipeItems = Immutable.List([{
        id: 1
      }])
      moment.mockReturnValue({
        isSame: () => true
      })

      const deliveryDate = '2019-11-06T00:00:00.000Z'
      const cancellable = true

      const result = getOrderState(state, deliveryDate, recipeItems, undefined, cancellable)

      expect(result).toEqual('recipes chosen')
    })

    test('should return state if state is not pending or committed', () => {
      const state = 'other'

      const result = getOrderState(state)

      expect(result).toEqual(state)
    })
  })

  describe('getDeliveryDayRescheduledReason', () => {
    let unavailableReason

    test('should return rescheduled reason message if delivery day has been moved', () => {
      unavailableReason = 'holiday'

      const result = getDeliveryDayRescheduledReason(unavailableReason)

      expect(result).toEqual('We\'ve had to change your regular delivery day due to the bank holiday.')
    })

    test('should return choose recipes message if delivery day has NOT been moved', () => {
      unavailableReason = 'other reason'

      const result = getDeliveryDayRescheduledReason(unavailableReason)

      expect(result).toEqual('Choose recipes now.')
    })

    test('should return undefined if delivery day has not been moved', () => {
      const result = getDeliveryDayRescheduledReason()

      expect(result).toEqual(undefined)
    })
  })

  describe('transformPendingOrders', () => {
    let transformedOrders
    moment.mockReturnValue({
      isSame: () => true
    })

    beforeEach(() => {
      transformedOrders = transformPendingOrders(mockOrders)
    })

    test('should return the correct mapping for orders', () => {
      const result = Immutable.Map({
        11922804: Immutable.Map({
          id: '11922804',
          orderState: 'recipes chosen',
          whenMenuOpen: '2019-10-15 12:00:00',
          shouldCutoffAt: '2019-10-23 11:59:59',
          shippingAddressId: '34820671',
          coreDeliveryDayId: '1903',
          deliveryDay: '2019-10-26 00:00:00',
          humanDeliveryDay: 'Saturday 26th October',
          originalDeliveryDay: 'Tuesday 15th October',
          deliveryDayRescheduledReason: "We've had to change your regular delivery day due to the bank holiday.",
          deliverySlotId: '6',
          deliverySlotStart: '08:00:00',
          deliverySlotEnd: '19:00:00',
          phase: 'open',
          cancellable: true,
          priceBreakdown: Immutable.Map({
            grossRecipesPrice: parseFloat('47.75'),
            grossExtrasPrice: parseFloat('44.86'),
            grossShippingPrice: parseFloat('4.99'),
            grossOrderPrice: parseFloat('97.60'),
            flatDiscountAmount: parseFloat('0.000'),
            percentageDiscountAmount: parseFloat(null),
            netOrderPrice: parseFloat('97.60')
          }),
          recipes: Immutable.List(
            [
              Immutable.Map({
                id: '46584179',
                title: 'Aubergine Yasai Curry With Sticky Rice & Edamame',
                recipeId: '103',
                image: 'https://cloud.com/cms/test-media/test-images/test-recipe-3-x200.jpg',
              }),
              Immutable.Map({
                id: '46584182',
                title: 'Pasta Alla Genovese',
                recipeId: '104',
                image: 'https://cloud.com/cms/test-media/test-images/test-recipe-4-x200.jpg',
              })
            ]
          ),
          products: Immutable.Map({
            total: 1,
            elements: Immutable.List([
              Immutable.Map({
                id: '46584183',
                unitPrice: '29.97' / '3',
                quantity: '3',
                title: 'Joseph Joseph - Garlic Rocker (Green)',
                image: 'https://cloud.com/cms/test-media/test-images/test-product-1-x200.jpg',
              })
            ])
          }),
          portionsCount: '4',
          availableFrom: '2019-10-22T12:00:00+01:00',
          availableTo: '2019-10-29T11:59:59+00:00',
          number: '2',
        })
      })

      expect(transformedOrders.toJS()).toEqual(result.toJS())
      expect(Immutable.is(transformedOrders, result)).toEqual(true)
    })
  })

  describe('transformProjectedDeliveries', () => {
    beforeEach(() => {
      moment.mockReturnValue({
        format: () => 'mock-date'
      })
    })

    const mockProjectedDeliveries = Immutable.fromJS([
      {
        deliveryDate: '2021-04-11',
        menuOpenDate: '2021-03-30T12:00:00.000Z',
        skipped: false,
      },
      {
        deliveryDate: '2021-04-25',
        menuOpenDate: '2021-04-13T12:00:00.000Z',
        skipped: true,
      }
    ])

    test('should transform projected deliveries as expected', () => {
      expect(transformProjectedDeliveries(mockProjectedDeliveries)).toEqual(
        Immutable.fromJS({
          '2021-04-11': {
            id: '2021-04-11',
            orderState: 'scheduled',
            deliveryDay: '2021-04-11',
            whenMenuOpen: '2021-03-30T12:00:00.000Z',
            isProjected: true,
            restorable: false,
            cancellable: true,
            deliveryDayId: '2021-04-11',
            humanDeliveryDay: 'mock-date',
          },
          '2021-04-25': {
            id: '2021-04-25',
            orderState: 'cancelled',
            deliveryDay: '2021-04-25',
            whenMenuOpen: '2021-04-13T12:00:00.000Z',
            isProjected: true,
            restorable: true,
            cancellable: true,
            deliveryDayId: '2021-04-25',
            humanDeliveryDay: 'mock-date',
          }
        })
      )
    })
  })
})
