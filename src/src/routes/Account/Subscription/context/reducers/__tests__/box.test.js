import { reduceBoxData, reduceBoxPricesData } from '../box'

let result

const mockState = {
  initial: 'state'
}

const mockBoxData = {
  box: {
    box_type: 'gourmet',
    num_portions: 2,
    num_recipes: 3,
    price: '29.99',
    sku: 'SKU-GMT-3-2'
  },
}

const mockBoxPricesData = {
  2: {
    2: {
      gourmet: {}
    }
  }
}

describe('box reducers', () => {
  describe('reduceBoxData', () => {
    describe('Given invalid data is passed', () => {
      beforeEach(() => {
        result = reduceBoxData(mockState, { notBox: 123 })
      })

      test('Then it returns initial state', () => {
        expect(result).toEqual(mockState)
      })
    })

    describe('Given no data is passed', () => {
      beforeEach(() => {
        result = reduceBoxData(mockState, undefined)
      })

      test('Then it returns initial state', () => {
        expect(result).toEqual(mockState)
      })
    })

    describe('Given valid data is passed', () => {
      describe('And there is no existing box data', () => {
        beforeEach(() => {
          result = reduceBoxData(mockState, mockBoxData)
        })

        test('Then box data is reduced as expected', () => {
          expect(result).toEqual({
            initial: 'state',
            box: {
              dietaryPreference: { currentValue: 'gourmet' },
              mealsPerBox: { currentValue: '3' },
              numPortions: '2',
              requestState: {
                isLoaded: true,
                isLoading: false
              }
            },
          })
        })
      })
    })
  })

  describe('reduceBoxPricesData', () => {
    describe('Given no data is passed', () => {
      beforeEach(() => {
        result = reduceBoxPricesData(mockState, undefined)
      })

      test('Then it returns initial state', () => {
        expect(result).toEqual(mockState)
      })
    })

    describe('Given valid data is passed', () => {
      describe('And there is no existing box prices data', () => {
        beforeEach(() => {
          result = reduceBoxPricesData(mockState, mockBoxPricesData)
        })

        test('Then box data is reduced as expected', () => {
          expect(result).toEqual({
            initial: 'state',
            boxPrices: {
              2: {
                2: {
                  gourmet: {}
                }
              },
              requestState: {
                isLoaded: true,
                isLoading: false
              }
            },
          })
        })
      })
    })
  })
})
