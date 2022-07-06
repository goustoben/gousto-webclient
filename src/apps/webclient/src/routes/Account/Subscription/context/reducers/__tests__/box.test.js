import { reduceBoxData, reduceBoxPricesData, reduceFourByFiveModal } from '../box'

let result

const mockState = {
  initial: 'state'
}

const mockBoxData = {
  box: {
    boxType: 'gourmet',
    numPortions: 2,
    numRecipes: 3,
  },
}

const mockBoxPricesData = {
  2: {
    2: {
      gourmet: {
        price_per_portion: '3.45',
        price_per_portion_discounted: '2.34'
      }
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
              },
              showFourByFiveModal: false,
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
                  gourmet: {
                    pricePerPortion: '3.45',
                    pricePerPortionDiscounted: '2.34'
                  }
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

  describe('reduceFourByFiveModal', () => {
    it('returns box state with showFourByFiveModal set to True if "mealsPerBox" is 5 and "selectedBoxSize" is 4', () => {
      expect(
        reduceFourByFiveModal(
          { box: { mealsPerBox: { currentValue: 5 } } },
          { selectedBoxSize: 4 }
        )).toEqual({
        box: {
          mealsPerBox: { currentValue: 5, },
          showFourByFiveModal: true,
        }
      })
    })

    it('returns box state with showFourByFiveModal set to False if "mealsPerBox" is not 5', () => {
      expect(
        reduceFourByFiveModal(
          { box: { mealsPerBox: { currentValue: 4 } } },
          { selectedBoxSize: 4 }
        )).toEqual({
        box: {
          mealsPerBox: { currentValue: 4, },
          showFourByFiveModal: false,
        }
      })
    })
  })
})
