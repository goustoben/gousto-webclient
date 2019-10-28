import Immutable from 'immutable'
import { transformPendingOrders } from '../myDeliveries'

describe('transformPendingOrders', () => {
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
        },
        {
          id: '32072785',
          title: 'Indian-Spiced Chicken Tray Bake With Spinach',
        }
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
      whenCutoff: '2019-02-16 11:59:59',
      whenLive: '2019-02-05 12:00:00',
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
        },
        {
          id: '46584182',
          title: 'Pasta Alla Genovese',
        }
      ],
      productItems: [
        {
          id: '46584183',
          quantity: '3',
          listPrice: '29.97',
          title: 'Joseph Joseph - Garlic Rocker (Green)',
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
      whenCutoff: '2019-10-23 11:59:59',
      whenLive: '2019-10-15 12:00:00',
      originalDeliveryDay: {
        date: '2019-10-15 12:00:00',
        unavailableReason: 'holiday'
      },
      shippingAddress: {
        id: '34820671',
      }
    }
  })

  const transformedOrders = transformPendingOrders(mockOrders)

  test('should filter out all past orders', () => {
    const result = transformedOrders.filter(order => {
      return order.get('id') === '8360325'
    })

    expect(result.size).toEqual(0)
  })

  test('should map the phases to its corresponding order state', () => {
    expect(transformedOrders.getIn(['11922804', 'orderState'])).toEqual('recipes chosen')
  })

  test('should return the correct mapping for orders', () => {
    const result = Immutable.fromJS({
      11922804: {
        id: '11922804',
        orderState: 'recipes chosen',
        whenMenuOpen: '2019-10-15 12:00:00',
        whenCutoff: '2019-10-23 11:59:59',
        shippingAddressId: '34820671',
        coreDeliveryDayId: '1903',
        deliveryDay: '2019-10-26 00:00:00',
        deliveryDayRescheduled: {
          date: '2019-10-15 12:00:00',
          unavailableReason: 'holiday'
        },
        deliveryDayRescheduledReason: "We've had to change your regular delivery day due to the bank holiday.",
        deliverySlotId: '6',
        deliverySlotStart: '08:00:00',
        deliverySlotEnd: '19:00:00',
        cancellable: true,
        priceBreakdown: {
          grossRecipesPrice: parseFloat('47.75'),
          grossExtrasPrice: parseFloat('44.86'),
          grossShippingPrice: parseFloat('4.99'),
          grossOrderPrice: parseFloat('97.60'),
          flatDiscountAmount: parseFloat('0.000'),
          percentageDiscountAmount: parseFloat(null),
          netOrderPrice: parseFloat('97.60')
        },
        recipes: [{
          id: '46584179',
          title: 'Aubergine Yasai Curry With Sticky Rice & Edamame',
          image:
            'https://production-media.gousto.co.uk/cms/mood-image/1186---Annabels-Scrummy-Fish-Chowder-2-x300.jpg'
        },
        {
          id: '46584182',
          title: 'Pasta Alla Genovese',
          image:
            'https://production-media.gousto.co.uk/cms/mood-image/1186---Annabels-Scrummy-Fish-Chowder-2-x300.jpg'
        }],
        products: {
          total: 1,
          elements: [{
            id: '46584183',
            unitPrice: '29.97' / '3',
            quantity: '3',
            title: 'Joseph Joseph - Garlic Rocker (Green)',
            image:
              'https://production-media.gousto.co.uk/cms/mood-image/1186---Annabels-Scrummy-Fish-Chowder-2-x300.jpg'
          }]
        },
        portionsCount: '4',
        availableFrom: '2019-10-22T12:00:00+01:00',
        availableTo: '2019-10-29T11:59:59+00:00'
      }
    })

    expect(Immutable.is(transformedOrders, result)).toEqual(true)
  })
})

