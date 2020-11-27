import { reduceBoxData } from '../box'

let result

const mockState = {
  initial: 'state'
}

const mockData = {
  box: {
    box_type: 'gourmet',
    num_portions: '2',
    num_recipes: '3',
    price: '29.99',
    sku: 'SKU-GMT-3-2'
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
          result = reduceBoxData(mockState, mockData)
        })

        test('Then box data is reduced as expected', () => {
          expect(result).toEqual({
            initial: 'state',
            box: {
              dietaryPreference: { currentValue: 'gourmet' },
              numPortions: '2',
              numRecipes: '3'
            },
          })
        })
      })
    })
  })
})
