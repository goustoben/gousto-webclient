import * as Immutable from 'immutable'

export function formatRecipeTitle(recipe: Immutable.Map<string, any>) {
  const title = recipe.get('title')
  const boxType = recipe.get('boxType', '')
  const dietType = recipe.get('dietType', '')

  if (dietType.toLowerCase() === 'vegan') {
    return `${title} (V)`
  }
  if (boxType.toLowerCase() === 'vegetarian' && dietType.toLowerCase() === 'vegetarian') {
    return `${title} (V)`
  }

  return `${title}`
}
