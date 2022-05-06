const SORT_A_FIRST = -1
const SORT_B_FIRST = 1
const SORT_NO_SWAP = 0

export const getRecipeComparatorForOutOfStock = (recipesInStock = []) => {
  const recipesInStockIds = new Set(recipesInStock.map((recipe) => recipe.get('id')))

  return ({ recipe: recipeA }, { recipe: recipeB }) => {
    const aInStock = recipesInStockIds.has(recipeA.get('id'))
    const bInStock = recipesInStockIds.has(recipeB.get('id'))

    if (aInStock && !bInStock) {
      return SORT_A_FIRST
    }

    if (bInStock && !aInStock) {
      return SORT_B_FIRST
    }

    return SORT_NO_SWAP
  }
}
