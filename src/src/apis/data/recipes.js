import { fetchRecipes } from 'apis/recipes'

export const getRecipes = async (accessToken, availableOn) => {
  const reqData = {
    'includes[]': ['ingredients', 'allergens'],
    'filters[available_on]': availableOn
  }

  const { data } = await fetchRecipes(accessToken, '', reqData)

  return data
}
