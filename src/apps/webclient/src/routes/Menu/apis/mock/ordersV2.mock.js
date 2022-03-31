import { ResourceType } from 'routes/Menu/constants/resources'

const data = [{
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
}]

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

export const UserOrdersMockV2 = {
  data, included
}

export const OrderMockV2 = {
  data: data[0], included
}
