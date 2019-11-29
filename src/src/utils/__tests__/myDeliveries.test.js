import Immutable from 'immutable'
import moment from 'moment'
import { filterOrders, getOrderState, getDeliveryDayRescheduledReason, transformPendingOrders, transformProjectedDeliveries } from '../myDeliveries'

jest.mock('moment')

describe('myDeliveries utils', () => {
  const mockOrders = Immutable.fromJS({
    '1234': {
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
      isCurrentPeriod: false,
      shippingAddress: {
        id: '34820671',
      }
    },
    '5678': {
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
      deliverySlotId: '6',
      deliveryDate: '2019-10-26 00:00:00',
      deliverySlot: {
        deliveryStart: '08:00:00',
        deliveryEnd: '19:00:00',
      },
      shouldCutoffAt: '2019-10-23 11:59:59',
      whenLive: '2019-10-15 12:00:00',
      isCurrentPeriod: true,
      originalDeliveryDay: {
        date: '2019-10-15 12:00:00',
        unavailableReason: 'holiday'
      },
      shippingAddress: {
        id: '34820671',
      }
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
      const phase = 'pre-menu'
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
    test('should return rescheduled reason message if delivery day has been moved', () => {
      const originalDeliveryDay = Immutable.Map({
        unavailableReason: 'holiday'
      })

      const result = getDeliveryDayRescheduledReason(originalDeliveryDay)

      expect(result).toEqual('We\'ve had to change your regular delivery day due to the bank holiday.')
    })

    test('should return choose recipes message if delivery day has NOT been moved', () => {
      const originalDeliveryDay = Immutable.Map({
        unavailableReason: 'other reason'
      })

      const result = getDeliveryDayRescheduledReason(originalDeliveryDay)

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
          isCurrentPeriod: true,
          shippingAddressId: '34820671',
          coreDeliveryDayId: '1903',
          deliveryDay: '2019-10-26 00:00:00',
          deliveryDayRescheduled: Immutable.Map({
            date: '2019-10-15 12:00:00',
            unavailableReason: 'holiday'
          }),
          deliveryDayRescheduledReason: "We've had to change your regular delivery day due to the bank holiday.",
          deliverySlotId: '6',
          deliverySlotStart: '08:00:00',
          deliverySlotEnd: '19:00:00',
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
          availableTo: '2019-10-29T11:59:59+00:00'
        })
      })

      expect(transformedOrders.toJS()).toEqual(result.toJS())
      expect(Immutable.is(transformedOrders, result)).toEqual(true)
    })
  })

  describe('transformProjectedDeliveries', () => {
    const dummyProjectedDeliveries = Immutable.fromJS({
      '1917': {
        deliveryDate: '2019-11-09 00:00:00',
        deliveryWeekId: '304',
        whenMenuLive: '2019-10-29 12:00:00',
        active: '1',
        dayOfWeek: 'Saturday',
        whenCutoff: '2019-11-06 11:59:59',
        deliverySlotId: '6',
        alternateDeliveryDay: null,
        date: '2019-11-09 00:00:00',
        state: 'scheduled',
        deliverySlot: {
          default: true,
          deliveryEnd: '19:00:00',
          humanDeliveryDayTime: 'Saturday 08:00 - 19:00',
          number: '2',
          deliveryStart: '08:00:00',
          cutoffDay: 'Wednesday',
          deprecated: false,
          premium: false,
          cutoffTime: '11:59:59',
          id: '6',
          defaultDay: 'Saturday'
        },
        humanWhenMenuLive: 'Tuesday 29th October',
        numPortions: '4',
        unavailableReason: '',
        isCutoff: false,
        id: '1917',
        humanDate: 'Saturday 9th November',
        numRecipes: '4'
      },
      '1924': {
        deliveryDate: '2019-11-16 00:00:00',
        deliveryWeekId: '305',
        whenMenuLive: '2019-11-05 12:00:00',
        active: '1',
        dayOfWeek: 'Saturday',
        whenCutoff: '2019-11-13 11:59:59',
        deliverySlotId: '6',
        alternateDeliveryDay: null,
        date: '2019-11-16 00:00:00',
        state: 'scheduled',
        deliverySlot: {
          default: true,
          deliveryEnd: '19:00:00',
          humanDeliveryDayTime: 'Saturday 08:00 - 19:00',
          number: '2',
          deliveryStart: '08:00:00',
          cutoffDay: 'Wednesday',
          deprecated: false,
          premium: false,
          cutoffTime: '11:59:59',
          id: '6',
          defaultDay: 'Saturday'
        },
        humanWhenMenuLive: 'Tuesday 5th November',
        numPortions: '4',
        unavailableReason: '',
        isCutoff: false,
        id: '1924',
        humanDate: 'Saturday 16th November',
        numRecipes: '4'
      }
    })
    test('should transform projected deliveries as expected', () => {
      expect(transformProjectedDeliveries(dummyProjectedDeliveries)).toEqual(
        Immutable.Map({
          1917: Immutable.fromJS({
            id: '1917',
            orderState: 'scheduled',
            deliveryDay: dummyProjectedDeliveries.getIn(['1917', 'date']),
            whenCutoff: dummyProjectedDeliveries.getIn(['1917', 'whenCutoff']),
            whenMenuOpen: dummyProjectedDeliveries.getIn([
              '1917',
              'whenMenuLive'
            ]),
            deliverySlotStart: dummyProjectedDeliveries.getIn([
              '1917',
              'deliverySlot',
              'deliveryStart'
            ]),
            deliverySlotEnd: dummyProjectedDeliveries.getIn([
              '1917',
              'deliverySlot',
              'deliveryEnd'
            ]),
            deliveryDayRescheduledReason: dummyProjectedDeliveries.getIn(
              ['1917', 'deliveryDayRescheduledReason'],
              undefined
            ),
            alternateDeliveryDay: dummyProjectedDeliveries.getIn([
              '1917',
              'alternateDeliveryDay'
            ]),
            isProjected: true,
            restorable: false,
            cancellable: true,
            deliveryDayId: '1917',
          }),
          1924: Immutable.fromJS({
            id: '1924',
            orderState: 'scheduled',
            deliveryDay: dummyProjectedDeliveries.getIn(['1924', 'date']),
            whenCutoff: dummyProjectedDeliveries.getIn(['1924', 'whenCutoff']),
            whenMenuOpen: dummyProjectedDeliveries.getIn([
              '1924',
              'whenMenuLive'
            ]),
            deliverySlotStart: dummyProjectedDeliveries.getIn([
              '1924',
              'deliverySlot',
              'deliveryStart'
            ]),
            deliverySlotEnd: dummyProjectedDeliveries.getIn([
              '1924',
              'deliverySlot',
              'deliveryEnd'
            ]),
            deliveryDayRescheduledReason: dummyProjectedDeliveries.getIn(
              ['1924', 'deliveryDayRescheduledReason'],
              undefined
            ),
            alternateDeliveryDay: dummyProjectedDeliveries.getIn([
              '1924',
              'alternateDeliveryDay'
            ]),
            isProjected: true,
            restorable: false,
            cancellable: true,
            deliveryDayId: '1924',
          })
        })
      )
    })
    describe('when unavailableReason is "holiday"', () => {
      const dummyProjectedDeliveriesHoliday = dummyProjectedDeliveries.setIn(
        ['1917', 'unavailableReason'],
        'holiday'
      )
      test('should set deliveryDayRescheduledReason to the expected string', () => {
        expect(
          transformProjectedDeliveries(dummyProjectedDeliveriesHoliday).getIn([
            '1917',
            'deliveryDayRescheduledReason'
          ])
        ).toEqual(
          "We've had to change your regular delivery day due to the bank holiday."
        )
      })
    })
    describe('when unavailableReason exist but is NOT "holiday"', () => {
      const dummyProjectedDeliveriesUnavailable = dummyProjectedDeliveries.setIn(
        ['1917', 'unavailableReason'],
        'other reason'
      )
      test('should set deliveryDayRescheduledReason to the "Recipes available from…" message', () => {
        expect(
          transformProjectedDeliveries(
            dummyProjectedDeliveriesUnavailable
          ).getIn(['1917', 'deliveryDayRescheduledReason'])
        ).toEqual(
          `Recipes available from ${dummyProjectedDeliveries.getIn(['1917', 'humanWhenMenuLive'])}`
        )
      })
    })
  })
})
