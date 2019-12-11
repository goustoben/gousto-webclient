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

      beforeEach(() => {
        mockFetchRecipeStock.mockReset()
        mockFetchRecipeStock.mockResolvedValue({ data: recipeStock })
      })

      test('should call fetchRecipes with access code', async () => {
        await getRecipeStock('abc', '2019-01-01T00:00:00', false)

        expect(mockFetchRecipeStock.mock.calls[0][0]).toEqual('abc')
      })

      test('should call fetchRecipes with date', async () => {
        await getRecipeStock('abc', '2019-01-01T00:00:00', false)

        expect(mockFetchRecipeStock.mock.calls[0][1]).toEqual('2019-01-01T00:00:00')
      })

      test('should return the result of fetchRecipeStock.data', async () => {
        const response = await getRecipeStock('abc', '2019-01-01T00:00:00', false)

        expect(response).toEqual(recipeStock)
      })
    })
  })
})
