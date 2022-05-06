import { UserOrdersMockV2 } from '../mock/ordersV2.mock'
import { transformOrderV2ToOrderV1 } from '../ordersV2toV1'

jest.mock('moment', () => jest.requireActual('moment').utc)

describe('transformOrderV2ToOrderV1', () => {
  const result = transformOrderV2ToOrderV1(UserOrdersMockV2.data[0], UserOrdersMockV2.included)

  test('should transform id correctly', () => {
    expect(result.id).toEqual('1234')
  })

  test('should transform state correctly', () => {
    expect(result.state).toEqual('pending')
  })

  test('should transform phase correctly', () => {
    expect(result.phase).toEqual('open')
  })

  test('should transform updatedAt correctly', () => {
    expect(result.updatedAt).toEqual('2021-06-19 15:00:00')
  })

  test('should transform shouldCutoffAt correctly', () => {
    expect(result.shouldCutoffAt).toEqual('2021-06-23 23:00:00')
  })

  test('should transform whenCutoff correctly', () => {
    expect(result.whenCutoff).toEqual('2021-06-23 23:00:00')
  })

  test('should transform default correctly', () => {
    expect(result.default).toEqual(true)
  })

  test('should transform deliveryDayId correctly', () => {
    expect(result.deliveryDayId).toEqual('55')
  })

  test('should transform deliveryDate correctly', () => {
    expect(result.deliveryDate).toEqual('2021-06-26 00:00:00')
  })

  test('should transform humanDeliveryDate correctly', () => {
    expect(result.humanDeliveryDate).toEqual('Saturday 26th June')
  })

  test('should transform deliverySlotId correctly', () => {
    expect(result.deliverySlotId).toEqual('66')
  })

  test('should transform whenLive correctly', () => {
    expect(result.whenLive).toEqual('2021-06-14 12:00:00')
  })

  test('should transform daySlotLeadTimeId correctly', () => {
    expect(result.daySlotLeadTimeId).toEqual('77')
  })

  test('should transform deliveryTariffId correctly', () => {
    expect(result.deliveryTariffId).toEqual('88')
  })

  test('should transform deliverySlot correctly', () => {
    expect(result.deliverySlot).toEqual({
      id: '66',
      deliveryStart: '2021-06-25T00:00:00Z',
      deliveryEnd: '2021-06-27T00:00:00Z',
    })
  })

  test('should transform shippingAddress correctly', () => {
    expect(result.shippingAddress).toEqual({
      id: '44',
      deleted: false,
      name: 'Bob',
      companyname: '',
      line1: '21 Some Street',
      line2: 'A Road',
      line3: '',
      town: 'Townsville',
      county: 'Countyshire',
      postcode: 'W3 7UP',
      deliveryInstructions: 'bla bla bla',
      shippingDefault: true,
      billingDefault: false,
    })
  })

  test('should transform box correctly', () => {
    expect(result.box).toEqual({
      sku: 'box-id',
      numPortions: '4',
      numRecipes: '3',
    })
  })

  describe('recipeItems', () => {
    const { recipeItems } = result

    test('should transform 4 recipeItems', () => {
      expect(recipeItems).toHaveLength(4)
    })

    test('should transform first recipeItem correctly', () => {
      expect(recipeItems[0]).toEqual({
        id: 'recipe-id-1',
        itemableId: 'recipe-id-1-core',
        recipeId: 'recipe-id-1-core',
        recipeUuid: 'recipe-id-1',
        itemableType: 'Recipe',
        media: [
          {
            title: 'Steak and Chips image',
            description: 'A lovely nice photo',
            type: 'mood-image',
            urls: [
              { src: 'crop/url.jpg', width: '500' },
              { src: 'crop/url2.jpg', width: '300' },
            ],
          },
        ],
        quantity: '2',
        recipeGoustoReference: 'recipe-goustoref-1',
        title: 'Steak and Chips',
        updatedAt: '2020-07-22 00:00:00',
      })
    })

    test('should transform second recipeItem correctly', () => {
      expect(recipeItems[1]).toEqual({
        id: 'recipe-id-2',
        itemableId: 'recipe-id-2-core',
        recipeId: 'recipe-id-2-core',
        recipeUuid: 'recipe-id-2',
        itemableType: 'Recipe',
        media: [
          {
            title: 'Nice lasagne image',
            description: 'This lasagne is tasty',
            type: 'mood-image',
            urls: [
              { src: 'lasagne/url.jpg', width: '400' },
              { src: 'lasagne/url2.jpg', width: '200' },
            ],
          },
        ],
        quantity: '2',
        recipeGoustoReference: 'recipe-goustoref-2',
        title: 'Lasagne',
        updatedAt: '2020-01-01 00:00:00',
      })
    })

    test('should transform third recipeItem correctly', () => {
      expect(recipeItems[2]).toEqual({
        id: 'recipe-id-3',
        itemableId: 'recipe-id-3-core',
        recipeId: 'recipe-id-3-core',
        recipeUuid: 'recipe-id-3',
        itemableType: 'Recipe',
        media: [
          {
            title: 'Salmon & Spicy Stir-Fried Greens',
            description: 'A succulent meal',
            type: 'mood-image',
            urls: [
              { src: 'imgs/a.jpg', width: '600' },
              { src: 'imgs/b.jpg', width: '400' },
            ],
          },
          {
            title: 'Second image',
            description: 'This one is better',
            type: 'mood-image',
            urls: [
              { src: 'imgs/c.jpg', width: '400' },
              { src: 'imgs/d.jpg', width: '200' },
            ],
          },
        ],
        quantity: '4',
        recipeGoustoReference: 'recipe-goustoref-3',
        title: 'Salmon & Spicy Stir-Fried Greens',
        updatedAt: '2020-02-01 00:00:00',
      })
    })

    test('should transform fourth recipeItem correctly', () => {
      expect(recipeItems[3]).toEqual({
        id: 'recipe-id-4',
        itemableId: 'recipe-id-4-core',
        recipeId: 'recipe-id-4-core',
        recipeUuid: 'recipe-id-4',
        itemableType: 'Recipe',
        media: [
          {
            title: "Tomato & Goats' Cheese Gnocchi",
            description: 'Very delicious, and good photography',
            type: 'headshot-image',
            urls: [{ src: 'https://example.com/gnocchi/first-pic.jpg', width: '600' }],
          },
          {
            title: "Tomato & Goats' Cheese Gnocchi",
            description: 'More delicious photos',
            type: 'mood-image',
            urls: [{ src: 'https://example.com/foo/second-pic.jpg', width: '200' }],
          },
        ],
        quantity: '2',
        recipeGoustoReference: 'recipe-goustoref-4',
        title: "Tomato & Goats' Cheese Gnocchi",
        updatedAt: '2020-06-22 00:00:00',
      })
    })
  })

  describe('productItems', () => {
    const { productItems } = result

    test('should return 2 productItems', () => {
      expect(productItems).toHaveLength(2)
    })

    test('should return first product correctly', () => {
      expect(productItems[0]).toEqual({
        id: 'product-id-1',
        itemableType: 'Product',
        itemableId: 'product-id-1',
        productId: 'product-id-1',

        quantity: '1',
        listPrice: '9.99',
        title: 'A lovely product',
        media: [
          {
            description: 'Product media description bla bla bla',
            title: 'This is the media title',
            type: 'mood-image',
            urls: [{ src: 'product-mood-image.png', width: '50' }],
          },
        ],
      })
    })

    test('should return second product correctly', () => {
      expect(productItems[1]).toEqual({
        id: 'product-id-2',
        itemableType: 'Product',
        itemableId: 'product-id-2',
        productId: 'product-id-2',

        quantity: '2',
        listPrice: '4.49',
        title: 'Bla bla bla product',
        media: [
          {
            description: 'Cool description',
            title: 'Bla bla mood images',
            type: 'mood-image',
            urls: [
              { src: 'a.png', width: '50' },
              { src: 'b.png', width: '100' },
            ],
          },
          {
            description: 'Even more cool description this time',
            title: 'it is a headshot image',
            type: 'headshot-image',
            urls: [
              { src: 'c.png', width: '200' },
              { src: 'd.png', width: '400' },
              { src: '3.png', width: '600' },
            ],
          },
        ],
      })
    })
  })

  test('should contain empty giftItems', () => {
    expect(result.giftItems).toEqual([])
  })

  test('should transform prices correctly', () => {
    expect(result.prices).toEqual({
      flatDiscountApplied: false,
      amountOff: 1,
      percentageOff: 2,
      promoCode: 'abc-def',
      promoCodeValid: true,
      pricePerPortion: 10,
      pricePerPortionDiscounted: 9,
      productTotal: 40,
      recipeTotal: 20,
      surchargeTotal: 5.5,
      recipeDiscount: 6.5,
      deliveryTotal: 3.8,
      grossTotal: 100,
      vatCharged: 20,
      total: 120,
      totalDiscount: 19,
    })
  })

  describe('when there are no prices', () => {
    const newOrder = {
      ...UserOrdersMockV2.data[0],
      attributes: {
        ...UserOrdersMockV2.data[0].attributes,
        prices: undefined,
      },
    }
    const newResult = transformOrderV2ToOrderV1(newOrder, UserOrdersMockV2.included)

    test('should transform prices correctly', () => {
      expect(newResult.prices).toEqual({
        flatDiscountApplied: undefined,
        amountOff: undefined,
        percentageOff: undefined,
        promoCode: undefined,
        promoCodeValid: undefined,
        pricePerPortion: undefined,
        pricePerPortionDiscounted: undefined,
        productTotal: undefined,
        recipeTotal: undefined,
        surchargeTotal: undefined,
        recipeDiscount: undefined,
        deliveryTotal: undefined,
        grossTotal: undefined,
        vatCharged: undefined,
        total: undefined,
        totalDiscount: undefined,
      })
    })
  })

  describe('when there is an original delivery day', () => {
    const newOrder = {
      ...UserOrdersMockV2.data[0],
      attributes: {
        ...UserOrdersMockV2.data[0].attributes,
        original_delivery_day: {
          date: '2021-04-15T00:00:00Z',
          rescheduledReason: 'run out of sellotape',
        },
      },
    }
    const newResult = transformOrderV2ToOrderV1(newOrder, UserOrdersMockV2.included)

    test('should transform originalDeliveryDay correctly', () => {
      expect(newResult.originalDeliveryDay).toEqual({
        humanDate: 'Thursday 15th April',
        unavailableReason: 'run out of sellotape',
      })
    })
  })

  test('should transform period correctly', () => {
    expect(result.period).toEqual({
      whenStart: '2021-01-01 00:00:00',
      whenCutoff: '2021-01-14 23:59:00',
    })
  })
})
