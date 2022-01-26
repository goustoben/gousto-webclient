import qs from 'qs'
import { fetch } from 'utils/fetch'
import endpoint from 'config/endpoint'

export function fetchRecipesWithIngredients(recipeIds) {
  const recipeIdsString = qs.stringify({ recipeIds: recipeIds.join(',')}, { encode: false })
  const uri = `${endpoint('menu')}/recipes?${recipeIdsString}&include=ingredients`

  return fetch(null, uri, {}, 'GET', 'default', {}, null, false, true)
}
