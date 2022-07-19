/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw'

import errorSideFixture from 'fixtures/menu/v1/sides/POST_500.json'

export const user = {
  error: 'user-with-error',
  valid: 'user-valid',
  idle: 'user-idle',
}

const getUserId = (req) => req.headers.get('x-gousto-user-id')
const url = 'https://production-api.gousto.co.uk/order/v2/prices'

export const handlers = [
  rest.post(url, (req, res, ctx) => {
    const userId = getUserId(req)

    if (userId === user.error) {
      return res(ctx.status(500), ctx.json(errorSideFixture))
    }

    if (userId === user.idle) {
      return new Promise((solve) => {
        setTimeout(() => solve(res(ctx.json(pricingMockedResponse))), 500)
      })
    }

    return res(ctx.json(pricingMockedResponse))
  }),
]

const pricingMockedResponse = {
  data: {
    id: 'order-prices-fake-id',
    type: 'order',
    attributes: {
      prices: {
        is_flat_discount_applied: false,
        amount_off: '0.00',
        percentage_off: '60.00',
        promo_code: 'DTI-SB-63',
        is_delivery_free: true,
        is_promo_code_valid: true,
        per_portion: '5.00',
        per_portion_discounted: '2.00',
        product_total: '0.00',
        recipe_total: '29.99',
        surcharge_total: '0.00',
        surcharge_count: 0,
        recipe_total_discounted: '12.00',
        recipe_discount: '17.99',
        delivery_total: '0.00',
        gross_total: '29.99',
        vat_charged: '0.00',
        total_discount: '17.99',
        total: '12.00',
      },
    },
    relationships: {},
  },
  included: [],
}
