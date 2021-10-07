import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { boxPrices } from 'reducers/boxPrices'

describe('box prices reducers', () => {
  test('initial state', () => {
    const expected = Immutable.Map({
      pricePerServing: '2.87',
      lowestPricePerPortion: {},
    })

    const result = boxPrices.boxPrices(undefined, {})

    expect(result.toJS()).toStrictEqual(expected.toJS())
  })

  describe('given BOXPRICE_SET_PRICE_PER_SERVING action type', () => {
    describe('when called', () => {
      test('then pricePerServing set price value', () => {
        const lowestPricePerPortion = {
          forTwo: {
            price: '2.04',
            priceDiscounted: '02.04'
          },
          forFour: {
            price: '2.33',
            priceDiscounted: '4.04'
          }
        }
        const result = boxPrices.boxPrices(undefined, {
          type: actionTypes.BOXPRICE_SET_PRICE_PER_SERVING,
          price: '1.12',
          lowestPricePerPortion
        })

        expect(result.get('pricePerServing')).toEqual('1.12')
        expect(result.get('lowestPricePerPortion')).toStrictEqual(lowestPricePerPortion)
      })
    })
  })
})
