import Immutable from 'immutable'
import {
  getPricePerServing,
  getMenuBoxPrices,
  getNumPersonsToBoxDescriptors,
} from '../boxPricesSelectors'
import menuBoxPrices from './__mocks__/menuBoxPrices.json'

describe('boxPricesSelectors', () => {
  let state

  describe('given getPricePerServing is called', () => {
    test('then it should return price per serving', () => {
      state = {
        boxPrices: Immutable.Map({
          pricePerServing: '2.35',
        }),
      }

      const result = getPricePerServing(state)

      expect(result).toEqual('2.35')
    })
  })

  describe('given getMenuBoxPrices is called', () => {
    beforeEach(() => {
      state = {
        menuBoxPrices: 'box prices object',
      }
    })

    test('then it should return menuBoxPrices', () => {
      expect(getMenuBoxPrices(state)).toEqual('box prices object')
    })
  })

  describe('given getNumPersonsToBoxDescriptors is called', () => {
    describe('when menuBoxPrices is not loaded yet', () => {
      beforeEach(() => {
        state = {
          menuBoxPrices: null,
        }
      })

      test('then it should return null', () => {
        const result = getNumPersonsToBoxDescriptors(state)
        expect(result).toBeNull()
      })
    })

    describe('when menuBoxPrices exists', () => {
      beforeEach(() => {
        state = {
          menuBoxPrices: Immutable.fromJS(menuBoxPrices),
        }
      })

      test('then it should extract and group correct information', () => {
        const result = getNumPersonsToBoxDescriptors(state)

        const expected = {
          2: [
            { num_portions: '2', price_per_portion: '6.25', total: '24.99' },
            { num_portions: '3', price_per_portion: '5.00', total: '29.99' },
            { num_portions: '4', price_per_portion: '4.37', total: '34.99' },
          ],
          4: [
            { num_portions: '2', price_per_portion: '3.97', total: '31.75' },
            { num_portions: '3', price_per_portion: '3.56', total: '42.75' },
            { num_portions: '4', price_per_portion: '2.98', total: '47.75' },
          ],
        }
        expect(result).toStrictEqual(expected)
      })
    })
  })
})
