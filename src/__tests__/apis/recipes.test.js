import { fetchRecipeStepsById } from 'apis/recipes'
import fetch from 'utils/fetch'

jest.mock('utils/fetch')

describe('recipes api', () => {
  let fetchResponse

  beforeEach( async () => {
    fetchResponse = await fetchRecipeStepsById('123')
    fetch.mockResolvedValue('fetch response')
  })

  describe('fetchRecipeStepsById', () => {
    test('should call the correct url with specific data', () => {
      expect(fetch).toHaveBeenCalledWith(null, expect.stringMatching('/recipes/v2/recipes/123/steps'), {}, 'GET')
    })

    test('should return the results unchanged', () => {
      expect(fetchResponse).toEqual('fetch response')
    })
  })
})
