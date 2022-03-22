import Immutable from 'immutable'
import { createGetNextTierPricePerPortion } from '../actionBarSelectors'

describe('given createGetNextTierPricePerPortion is called', () => {
  test('then it should return a selector that extracts correct value', () => {
    const selector = createGetNextTierPricePerPortion(1)

    const state = {
      basket: Immutable.fromJS({
        numPortions: 2,
      }),
      menuBoxPrices: Immutable.fromJS({
        2: {
          2: {
            gourmet: {
              pricePerPortionDiscounted: '12.34',
            },
          },
        },
      }),
    }
    const result = selector(state)

    expect(result).toBe('12.34')
  })
})
