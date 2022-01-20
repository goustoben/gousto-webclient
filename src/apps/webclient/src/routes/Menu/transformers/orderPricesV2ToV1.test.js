import { transformOrderPricesV2ToOrderV1 } from './orderPricesV2ToV1'

export const orderV2PricesFixture = {
  data: {
    id: 'order-prices-fake-id',
    type: 'order',
    attributes: {
      prices: {
        is_flat_discount_applied: false,
        amount_off: '0.00',
        percentage_off: '40.00',
        is_promo_code_valid: false,
        per_portion: '6.25',
        per_portion_discounted: '3.75',
        product_total: '0.00',
        recipe_total: '24.99',
        recipe_total_discounted: '1.99',
        surcharge_total: '0.00',
        surcharge_count: 2,
        recipe_discount: '9.99',
        delivery_total: '0.00',
        gross_total: '24.99',
        vat_charged: '0.00',
        total_discount: '9.99',
        total: '15.00',
      },
    },
    relationships: {},
  },
  included: [],
}

describe('transformOrderPricesV2ToOrderV1', () => {
  test('should transform deliverySlot correctly', () => {
    expect(
      transformOrderPricesV2ToOrderV1(orderV2PricesFixture)
    ).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "amountOff": "0.00",
    "deliveryTotal": "0.00",
    "flatDiscountApplied": false,
    "grossTotal": "24.99",
    "items": Array [
      Object {
        "type": "Surcharge",
      },
      Object {
        "type": "Surcharge",
      },
    ],
    "percentageOff": "40.00",
    "pricePerPortion": "6.25",
    "pricePerPortionDiscounted": "3.75",
    "productTotal": "0.00",
    "promoCode": undefined,
    "promoCodeValid": false,
    "recipeDiscount": "9.99",
    "recipeTotal": "24.99",
    "recipeTotalDiscounted": "1.99",
    "surchargeTotal": "0.00",
    "total": "15.00",
    "totalDiscount": "9.99",
    "vatCharged": "0.00",
  },
}
`)
  })
})
