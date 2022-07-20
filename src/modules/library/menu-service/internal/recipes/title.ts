import { TransformedRecipe } from '../transformer'

export function formatRecipeTitle(recipe: TransformedRecipe) {
  const title = recipe.title
  const boxType = recipe.boxType || ''
  const dietType = recipe.dietType || ''

  if (dietType.toLowerCase() === 'vegan') {
    return `${title} (V)`
  }
  if (boxType.toLowerCase() === 'vegetarian' && dietType.toLowerCase() === 'vegetarian') {
    return `${title} (V)`
  }

  return `${title}`
}
