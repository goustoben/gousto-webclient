const mockFetchRecipes = jest.fn()

jest.mock('apis/recipes', () => ({
  fetchRecipes: mockFetchRecipes
}))

describe('recipes', () => {
  describe('getRecipes', () => {
    // this require here is so that the mock above is picked up correctly
    const { getRecipes } = require('../recipes')
    
    describe('when useMenuService is false', () => {
      const recipes = [
        { id: '1234' },
        { id: '5678' }
      ]

      beforeEach(() => {
        mockFetchRecipes.mockReset()
        mockFetchRecipes.mockResolvedValue({ data: recipes })
      })

      test('should call fetchRecipes with access code', async () => {
        await getRecipes('abc', '2019-01-01T00:00:00', false)

        expect(mockFetchRecipes.mock.calls[0][0]).toEqual('abc')
      })

      test('should call fetchRecipes with correct path', async () => {
        await getRecipes('abc', '2019-01-01T00:00:00', false)

        expect(mockFetchRecipes.mock.calls[0][1]).toEqual('')
      })

      test('should call fetchRecipes with correct includes', async () => {
        await getRecipes('abc', '2019-01-01T00:00:00', false)

        expect(mockFetchRecipes.mock.calls[0][2]['includes[]']).toEqual(['ingredients', 'allergens'])
      })

      test('should call fetchRecipes with available_on filter', async () => {
        await getRecipes('abc', '2019-01-01T00:00:00', false)

        expect(mockFetchRecipes.mock.calls[0][2]['filters[available_on]']).toEqual('2019-01-01T00:00:00')
      })

      test('should return the result of fetchRecipes.recipes', async () => {
        const response = await getRecipes('abc', '2019-01-01T00:00:00', false)

        expect(response).toEqual(recipes)
      })
    })
  })
})
