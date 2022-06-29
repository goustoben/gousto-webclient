import Immutable from 'immutable'

import { createGetBestTierPricePerPortion } from '../actionBarSelectors'

describe('Given: createGetNextTierPricePerPortion selector', () => {
  describe('When: selector is called', () => {
    test('It should return pricePerPortionDiscounted for 4 recipes as default', () => {
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
      const selector = createGetBestTierPricePerPortion()
      const result = selector(state)

      expect(result).toBe('12.34')
    })

    test('It should return pricePerPortionDiscounted for 5 recipes based on given arg', () => {
      const state = {
        basket: Immutable.fromJS({
          numPortions: 4,
        }),
        menuBoxPrices: Immutable.fromJS({
          4: {
            5: {
              gourmet: {
                pricePerPortionDiscounted: '55.99',
              },
            },
          },
        }),
      }
      const selector = createGetBestTierPricePerPortion(5)
      const result = selector(state)

      expect(result).toBe('55.99')
    })

    // FYI: This case nor going to happen. Added this just to test selector option
    test('It should return pricePerPortionDiscounted for 2 recipes based on given arg', () => {
      const state = {
        basket: Immutable.fromJS({
          numPortions: 4,
        }),
        menuBoxPrices: Immutable.fromJS({
          4: {
            2: {
              gourmet: {
                pricePerPortionDiscounted: '2.00',
              },
            },
          },
        }),
      }
      const selector = createGetBestTierPricePerPortion(2)
      const result = selector(state)

      expect(result).toBe('2.00')
    })
  })
})
