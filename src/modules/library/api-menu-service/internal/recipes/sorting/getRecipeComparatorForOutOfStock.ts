import { TransformedRecipe } from '../../transformer'

const SORT_A_FIRST = -1
const SORT_B_FIRST = 1
const SORT_NO_SWAP = 0

export const getRecipeComparatorForOutOfStock = (
  isRecipeInStock: (coreRecipeId: string, numPortions: number) => boolean,
  numPortions: number
) => {
  return function comparator(
    itemA?: { recipe: TransformedRecipe },
    itemB?: { recipe: TransformedRecipe },
  ) {
    if (!itemA || !itemB) {
      return SORT_NO_SWAP
    }

    const { recipe: recipeA } = itemA
    const { recipe: recipeB } = itemB

    const aInStock = isRecipeInStock(recipeA.id, numPortions)
    const bInStock = isRecipeInStock(recipeB.id, numPortions)

    if (aInStock && !bInStock) {
      return SORT_A_FIRST
    }

    if (bInStock && !aInStock) {
      return SORT_B_FIRST
    }

    return SORT_NO_SWAP
  }
}
