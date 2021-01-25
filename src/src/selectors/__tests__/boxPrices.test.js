import Immutable from 'immutable'
import { getPricePerServing } from '../boxPrices'

describe('given getPricePerServing selector', () => {
  describe('when called', () => {
    test('then should return price per serving', () => {
      const state = {
        boxPrices: Immutable.Map({
          pricePerServing: '2.35'
        })
      }

      const result = getPricePerServing(state)

      expect(result).toEqual('2.35')
    })
  })
})
