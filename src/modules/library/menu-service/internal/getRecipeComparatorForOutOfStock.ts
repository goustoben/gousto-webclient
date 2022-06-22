import Immutable from 'immutable'

const SORT_A_FIRST = -1
const SORT_B_FIRST = 1
const SORT_NO_SWAP = 0

export const getRecipeComparatorForOutOfStock = (
  recipesInStockIds: Set<string>,
) => {
  return function comparator(
    itemA?: { recipe: Immutable.Map<string, any> },
    itemB?: { recipe: Immutable.Map<string, any> },
  ) {
    if (!itemA || !itemB) {
      return SORT_NO_SWAP
    }

    const { recipe: recipeA } = itemA
    const { recipe: recipeB } = itemB

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
