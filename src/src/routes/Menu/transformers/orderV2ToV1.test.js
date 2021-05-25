import { ResourceType } from '../constants/resources'
import { transformOrderV2ToOrderV1 } from './orderV2ToV1'

jest.mock('moment', () => {
  // this is to make moment.format work correctly with timezones in tests
  Date.now = jest.fn(() => new Date('2021-01-01T12:00:00Z'))

  return jest.requireActual('moment')
})

describe('transformOrderV2ToOrderV1', () => {
  const inputOrder = {
    id: '1234',
    attributes: {
      menu_active_from: '2021-06-14T12:00:00Z',
      state: 'pending',
      phase: 'open',
      updated_at: '2021-06-19T15:00:00Z',
      cut_off_date: '2021-06-23T23:00:00Z',
      is_waiting_on_user_choices: true,
      prices: {
        is_flat_discount_applied: false,
        amount_off: 1,
        percentage_off: 2,
        promo_code: 'abc-def',
        is_promo_code_valid: true,
        per_portion: 10,
        per_portion_discounted: 9,
        product_total: 40,
        recipe_total: 20,
        surcharge_total: 5.50,
        surcharge_count: 2,
        recipe_discount: 6.50,
        delivery_total: 3.80,
        gross_total: 100,
        vat_charged: 20,
        total_discount: 19,
        total: 120,
      },
    },
    relationships: {
      components: {
        data: [
          {
            id: 'recipe-id-1',
            type: ResourceType.Recipe,
            meta: {
              core_recipe_id: 'recipe-id-1-core',
              portion_for: 2,
              amendments: []
            }
          },
          {
            id: 'recipe-id-2',
            type: ResourceType.Recipe,
            meta: {
              core_recipe_id: 'recipe-id-2-core',
              portion_for: 2,
              amendments: []
            }
          },
          {
            id: 'recipe-id-3',
            type: ResourceType.Recipe,
            meta: {
              core_recipe_id: 'recipe-id-3-core',
              portion_for: 4,
              amendments: []
            }
          },
          {
            id: 'recipe-id-4',
            type: ResourceType.Recipe,
            meta: {
              core_recipe_id: 'recipe-id-4-core',
              portion_for: 2,
              amendments: []
            }
          },
          {
            id: 'product-id-1',
            type: ResourceType.Product,
            meta: {
              list_price: '9.99',
              quantity: 1
            }
          },
          {
            id: 'product-id-2',
            type: ResourceType.Product,
            meta: {
              list_price: '4.49',
              quantity: 2
            }
          }
        ]
      },
      box: {
        data: {
          id: 'box-id',
          type: ResourceType.Box
        }
      },
      delivery_day: {
        data: {
          id: '55',
          type: ResourceType.DeliveryDay
        }
      },
      delivery_slot: {
        data: {
          id: '66',
          type: ResourceType.DeliverySlot
        }
      },
      day_slot_lead_time: {
        data: {
          id: '77',
          type: ResourceType.DaySlotLeadTime
        }
      },
      delivery_tariff: {
        data: {
          id: '88',
          type: ResourceType.DeliveryTariff
        }
      },
      shipping_address: {
        data: {
          id: '44',
          type: ResourceType.ShippingAddress
        }
      }
    }
  }

  const included = [
    {
      type: ResourceType.Recipe,
      id: 'recipe-id-1',
      attributes: {
        core_recipe_id: 'recipe-id-1-core',
        name: 'Steak and Chips',
        gousto_reference: 'recipe-goustoref-1',
        images: [
          {
            title: 'Steak and Chips image',
            description: 'A lovely nice photo',
            type: 'mood-image',
            crops: [
              { url: 'crop/url.jpg', width: 500 },
              { url: 'crop/url2.jpg', width: 300 }
            ]
          }
        ]
      },
      published_at: '2020-07-22 00:00:00'
    },
    {
      type: ResourceType.Recipe,
      id: 'recipe-id-2',
      attributes: {
        core_recipe_id: 'recipe-id-2-core',
        name: 'Lasagne',
        gousto_reference: 'recipe-goustoref-2',
        images: [
          {
            title: 'Nice lasagne image',
            description: 'This lasagne is tasty',
            type: 'mood-image',
            crops: [
              { url: 'lasagne/url.jpg', width: 400 },
              { url: 'lasagne/url2.jpg', width: 200 }
            ]
          }
        ]
      },
      published_at: '2020-01-01 00:00:00'
    },
    {
      type: ResourceType.Recipe,
      id: 'recipe-id-3',
      attributes: {
        core_recipe_id: 'recipe-id-3-core',
        name: 'Salmon & Spicy Stir-Fried Greens',
        gousto_reference: 'recipe-goustoref-3',
        images: [
          {
            title: 'Salmon & Spicy Stir-Fried Greens',
            description: 'A succulent meal',
            type: 'mood-image',
            crops: [
              { url: 'imgs/a.jpg', width: 600 },
              { url: 'imgs/b.jpg', width: 400 }
            ]
          },
          {
            title: 'Second image',
            description: 'This one is better',
            type: 'mood-image',
            crops: [
              { url: 'imgs/c.jpg', width: 400 },
              { url: 'imgs/d.jpg', width: 200 }
            ]
          }
        ]
      },
      published_at: '2020-02-01 00:00:00'
    },
    {
      type: ResourceType.Recipe,
      id: 'recipe-id-4',
      attributes: {
        core_recipe_id: 'recipe-id-4-core',
        name: 'Tomato & Goats\' Cheese Gnocchi',
        gousto_reference: 'recipe-goustoref-4',
        images: [
          {
            title: 'Tomato & Goats\' Cheese Gnocchi',
            description: 'Very delicious, and good photography',
            type: 'headshot-image',
            crops: [
              { url: 'https://example.com/gnocchi/first-pic.jpg', width: 600 },
            ]
          },
          {
            title: 'Tomato & Goats\' Cheese Gnocchi',
            description: 'More delicious photos',
            type: 'mood-image',
            crops: [
              { url: 'https://example.com/foo/second-pic.jpg', width: 200 }
            ]
          }
        ]
      },
      published_at: '2020-06-22 00:00:00'
    },
    {
      type: ResourceType.Product,
      id: 'product-id-1',
      attributes: {
        title: 'A lovely product',
        media: [
          {
            description: 'Product media description bla bla bla',
            title: 'This is the media title',
            type: 'mood-image',
            urls: [
              { src: 'product-mood-image.png', width: '50' }
            ]
          }
        ]
      }
    },
    {
      type: ResourceType.Product,
      id: 'product-id-2',
      attributes: {
        title: 'Bla bla bla product',
        media: [
          {
            description: 'Cool description',
            title: 'Bla bla mood images',
            type: 'mood-image',
            urls: [
              { src: 'a.png', width: '50' },
              { src: 'b.png', width: '100' }
            ]
          },
          {
            description: 'Even more cool description this time',
            title: 'it is a headshot image',
            type: 'headshot-image',
            urls: [
              { src: 'c.png', width: '200' },
              { src: 'd.png', width: '400' },
              { src: '3.png', width: '600' }
            ]
          }
        ]
      }
    },
    {
      type: ResourceType.Period,
      attributes: {
        starts_at: '2021-01-01 00:00:00',
        ends_at: '2021-01-14 23:59:00'
      }
    },
    {
      type: ResourceType.ShippingAddress,
      id: '44',
      attributes: {
        deleted: false,
        name: 'Bob',
        company_name: '',
        line1: '21 Some Street',
        line2: 'A Road',
        line3: '',
        town: 'Townsville',
        county: 'Countyshire',
        postcode: 'W3 7UP',
        delivery_instructions: 'bla bla bla',
        shipping_default: true,
        billing_default: false
      }
    },
    {
      type: ResourceType.Box,
      id: 'box-id',
      attributes: {
        num_portions: 4,
        num_recipes: 3
      }
    },
    {
      type: ResourceType.DeliveryDay,
      id: '55',
      attributes: {
        date: '2021-06-26T00:00:00Z'
      }
    },
    {
      type: ResourceType.DeliverySlot,
      id: '66',
      attributes: {
        start: '2021-06-25T00:00:00Z',
        end: '2021-06-27T00:00:00Z'
      }
    }
  ]

  const result = transformOrderV2ToOrderV1(inputOrder, included)

  test('should transform id correctly', () => {
    expect(result.id).toEqual(1234)
  })

  test('should transform state correctly', () => {
    expect(result.state).toEqual('pending')
  })

  test('should transform phase correctly', () => {
    expect(result.phase).toEqual('open')
  })

  test('should transform updatedAt correctly', () => {
    expect(result.updatedAt).toEqual('2021-06-19 16:00:00')
  })

  test('should transform shouldCutoffAt correctly', () => {
    expect(result.shouldCutoffAt).toEqual('2021-06-24 00:00:00')
  })

  test('should transform whenCutoff correctly', () => {
    expect(result.whenCutoff).toEqual('2021-06-24 00:00:00')
  })

  test('should transform default correctly', () => {
    expect(result.default).toEqual(true)
  })

  test('should transform deliveryDayId correctly', () => {
    expect(result.deliveryDayId).toEqual('55')
  })

  test('should transform deliveryDate correctly', () => {
    expect(result.deliveryDate).toEqual('2021-06-26 01:00:00')
  })

  test('should transform humanDeliveryDate correctly', () => {
    expect(result.humanDeliveryDate).toEqual('Saturday 26th June')
  })

  test('should transform deliverySlotId correctly', () => {
    expect(result.deliverySlotId).toEqual('66')
  })

  test('should transform whenLive correctly', () => {
    expect(result.whenLive).toEqual('2021-06-14 13:00:00')
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
      deliveryEnd: '2021-06-27T00:00:00Z'
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
      billingDefault: false
    })
  })

  test('should transform box correctly', () => {
    expect(result.box).toEqual({
      sku: 'box-id',
      numPortions: '4',
      numRecipes: '3'
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
              { src: 'crop/url2.jpg', width: '300' }
            ]
          }
        ],
        quantity: '2',
        recipeGoustoReference: 'recipe-goustoref-1',
        title: 'Steak and Chips',
        updatedAt: '2020-07-22 00:00:00'
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
              { src: 'lasagne/url2.jpg', width: '200' }
            ]
          }
        ],
        quantity: '2',
        recipeGoustoReference: 'recipe-goustoref-2',
        title: 'Lasagne',
        updatedAt: '2020-01-01 00:00:00'
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
              { src: 'imgs/b.jpg', width: '400' }
            ]
          },
          {
            title: 'Second image',
            description: 'This one is better',
            type: 'mood-image',
            urls: [
              { src: 'imgs/c.jpg', width: '400' },
              { src: 'imgs/d.jpg', width: '200' }
            ]
          }
        ],
        quantity: '4',
        recipeGoustoReference: 'recipe-goustoref-3',
        title: 'Salmon & Spicy Stir-Fried Greens',
        updatedAt: '2020-02-01 00:00:00'
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
            title: 'Tomato & Goats\' Cheese Gnocchi',
            description: 'Very delicious, and good photography',
            type: 'headshot-image',
            urls: [
              { src: 'https://example.com/gnocchi/first-pic.jpg', width: '600' }
            ]
          },
          {
            title: 'Tomato & Goats\' Cheese Gnocchi',
            description: 'More delicious photos',
            type: 'mood-image',
            urls: [
              { src: 'https://example.com/foo/second-pic.jpg', width: '200' }
            ]
          }
        ],
        quantity: '2',
        recipeGoustoReference: 'recipe-goustoref-4',
        title: 'Tomato & Goats\' Cheese Gnocchi',
        updatedAt: '2020-06-22 00:00:00'
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
            urls: [
              { src: 'product-mood-image.png', width: '50' }
            ]
          }
        ]
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
              { src: 'b.png', width: '100' }
            ]
          },
          {
            description: 'Even more cool description this time',
            title: 'it is a headshot image',
            type: 'headshot-image',
            urls: [
              { src: 'c.png', width: '200' },
              { src: 'd.png', width: '400' },
              { src: '3.png', width: '600' }
            ]
          }
        ]
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
      surchargeTotal: 5.50,
      recipeDiscount: 6.50,
      deliveryTotal: 3.80,
      grossTotal: 100,
      vatCharged: 20,
      total: 120,
      totalDiscount: 19
    })
  })

  describe('when there are no prices', () => {
    const newOrder = {
      ...inputOrder,
      attributes: {
        ...inputOrder.attributes,
        prices: undefined
      }
    }
    const newResult = transformOrderV2ToOrderV1(newOrder, included)

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
        totalDiscount: undefined
      })
    })
  })

  describe('when there is an original delivery day', () => {
    const newOrder = {
      ...inputOrder,
      attributes: {
        ...inputOrder.attributes,
        original_delivery_day: {
          date: '2021-04-15T00:00:00Z',
          rescheduledReason: 'run out of sellotape'
        }
      }
    }
    const newResult = transformOrderV2ToOrderV1(newOrder, included)

    test('should transform originalDeliveryDay correctly', () => {
      expect(newResult.originalDeliveryDay).toEqual({
        humanDate: 'Thursday 15th April',
        unavailableReason: 'run out of sellotape'
      })
    })
  })

  test('should transform period correctly', () => {
    expect(result.period).toEqual({
      whenStart: '2021-01-01 00:00:00',
      whenCutoff: '2021-01-14 23:59:00'
    })
  })
})
