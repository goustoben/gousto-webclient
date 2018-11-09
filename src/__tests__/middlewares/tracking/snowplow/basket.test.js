import sinon from 'sinon'

import Immutable from 'immutable'
import basketTracking from 'middlewares/tracking/snowplow/basket'

describe('snowplow basketOrderLoaded data', () => {
  const action = {
    type: 'ACTION_TYPE_STRING',
    orderId: 'order-123',
  }
  const gifts = Immutable.Map({})
  const products = Immutable.fromJS({
    'product-123': 1,
    'product-234': 2,
  })
  const recipes = Immutable.fromJS({
    'recipe-123': 2,
    'recipe-2': 2,
    'recipe-3': 2,
  })
  const state = {
    basket: Immutable.Map({ gifts, products, recipes }),
  }
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  test('should return data with numGifts, numProducts, & numRecipes given basket state', () => {
    expect(basketTracking.basketOrderLoaded(action, state)).toEqual({
      type: 'ACTION_TYPE_STRING',
      data: {
        numGifts: 0,
        numProducts: 3,
        numRecipes: 6,
      },
    })
  })
})
