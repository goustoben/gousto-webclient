import { fetch } from 'utils/fetch'
import { fetchRecipesWithIngredients } from './menu'

const MOCK_FETCH_RESULT = { data: [1, 2, 3] }
const RECIPE_IDS = ['ab1', 'ab2', 'ab3']

jest.mock('utils/fetch', () => ({
  fetch: jest.fn().mockResolvedValue({ data: [1, 2, 3] })
}))

describe('fetchRecipesWithIngredients', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  test('fetches the correct url', async () => {
    await fetchRecipesWithIngredients(RECIPE_IDS)
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      null,
      'https://production-api.gousto.co.uk/menu/v1/recipes?recipeIds=ab1,ab2,ab3&include=ingredients',
      {},
      'GET',
      'default',
      {},
      null,
      false,
      true
    )
  })

  test('returns the result of the fetch unchanged', async () => {
    const result = await fetchRecipesWithIngredients(RECIPE_IDS)
    expect(result).toEqual(MOCK_FETCH_RESULT)
  })
})
