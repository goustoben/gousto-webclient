import Immutable from 'immutable'

const ratingSort = (a, b) => b.getIn(['rating', 'average'], 0) - a.getIn(['rating', 'average'], 0)
const isMeat = (recipe) => recipe.get('dietType', '').toLowerCase() === 'meat'
const isFish = (recipe) => recipe.get('dietType', '').toLowerCase() === 'fish'
const isOther = (recipe) => !(isFish(recipe) || isMeat(recipe))

const orderRecipes = (recipesMap) => {
  const recipes = recipesMap.toList()
  const featuredRecipes = recipes.filter((recipe) => recipe.get('isFeaturedRecipe'))
  const meatRecipes = recipes
    .filter((recipe) => !recipe.get('isFeaturedRecipe'))
    .filter(isMeat)
    .sort(ratingSort)

  const fishRecipes = recipes
    .filter((recipe) => !recipe.get('isFeaturedRecipe'))
    .filter(isFish)
    .sort(ratingSort)

  // veggie and anything else
  const otherRecipes = recipes
    .filter((recipe) => !recipe.get('isFeaturedRecipe'))
    .filter(isOther)
    .sort(ratingSort)

  const limit = Math.max(meatRecipes.size, fishRecipes.size, otherRecipes.size)

  let orderedRecipes = featuredRecipes

  for (let i = 0; i < limit; i++) {
    const meatRecipe = meatRecipes.get(i)
    const fishRecipe = fishRecipes.get(i)
    const otherRecipe = otherRecipes.get(i)
    if (meatRecipe) {
      orderedRecipes = orderedRecipes.push(meatRecipe)
    }
    if (fishRecipe) {
      orderedRecipes = orderedRecipes.push(fishRecipe)
    }
    if (otherRecipe) {
      orderedRecipes = orderedRecipes.push(otherRecipe)
    }
  }

  return orderedRecipes.reduce(
    (reducerState, recipe) => reducerState.set(recipe.get('id'), recipe),
    Immutable.OrderedMap({})
  )
}

export { orderRecipes }
