import Immutable from 'immutable'

import { createGetBestTierPricePerPortion } from '../actionBarSelectors'

describe('given createGetNextTierPricePerPortion is called', () => {
  test('then it should return a selector that extracts correct value', () => {
    const selector = createGetBestTierPricePerPortion()

    const state = {
      basket: Immutable.fromJS({
        numPortions: 4,
      }),
      menuBoxPrices: Immutable.fromJS({
        4: {
          4: {
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
