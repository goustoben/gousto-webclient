const mockFetchRecipeStock = jest.fn()

jest.mock('apis/recipes', () => ({
  fetchRecipeStock: mockFetchRecipeStock
}))

describe('recipe stock', () => {
  describe('getRecipeStock', () => {
    // this require here is so that the mock above is picked up correctly
    const { getRecipeStock } = require('../recipeStock')

    describe('when useMenuService is false', () => {
      const recipeStock = [
        { recipeId: 1234 },
        { recipeId: 5678 }
      ]
      const date = '2019-09-17T16:00:00'
      const accessCode = 'ABC'

      beforeEach(() => {
        mockFetchRecipeStock.mockReset()
        mockFetchRecipeStock.mockImplementation((givenAccessCode, targetDate, useMenuService) => {
          if (givenAccessCode !== accessCode) {
            throw Error('invalid access code')
          }

          if (targetDate !== date) {
            throw Error('invalid date')
          }

          if (useMenuService) {
            throw Error('useMenuService should be false')
          }

          return ({
            data: recipeStock
          })
        })
      })

      test('should return the result of fetchRecipeStock.data', async () => {
        const response = await getRecipeStock(accessCode, date, false)

        expect(response).toEqual(recipeStock)
      })
    })
  })
})
