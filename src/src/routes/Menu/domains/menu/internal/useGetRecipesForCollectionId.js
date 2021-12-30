import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Immutable from 'immutable'
import { getRecipesInCollection } from 'routes/Menu/selectors/collections'
import { getCurrentMenuRecipes } from 'routes/Menu/selectors/menu'
import { getInStockRecipes } from 'routes/Menu/selectors/recipeList'
import { getCurrentMenuVariants, getSelectedRecipeVariants } from 'routes/Menu/selectors/variants'
import { getOutOfStockRecipeReplacer } from './getOutOfStockRecipeReplacer'
import { getRecipeComparatorForOutOfStock } from './getRecipeComparatorForOutOfStock'
import { getSelectedVariantsReplacer } from './getSelectedVariantsReplacer'

const getDietaryClaimsInCollection = (menuCollections, collectionId) => menuCollections.getIn(
  [collectionId, 'requirements', 'dietary_claims'],
  null
)

export const useGetRecipesForCollectionId = (collections) => {
  const recipes = useSelector(getCurrentMenuRecipes)
  const recipesInStock = useSelector(getInStockRecipes)
  const recipesVariants = useSelector(getCurrentMenuVariants)
  const selectedRecipeVariants = useSelector(getSelectedRecipeVariants)

  const recipeComparatorForOutOfStock = useMemo(
    () => getRecipeComparatorForOutOfStock(recipesInStock),
    [recipesInStock]
  )

  const getRecipesForCollectionId = (collectionId) => {
    const recipeIdsInCollection = getRecipesInCollection(collections, collectionId)
    const dietaryClaims = getDietaryClaimsInCollection(collections, collectionId)

    if (!recipeIdsInCollection || !recipes.size) {
      return { recipes: Immutable.List() }
    }

    const selectedVariantReplacer = getSelectedVariantsReplacer({
      recipes,
      replacementMap: (selectedRecipeVariants || {})[collectionId] || {},
    })

    const outOfStockRecipeReplacer = getOutOfStockRecipeReplacer({
      recipesInStock,
      recipes,
      recipesVariants,
      dietaryClaims,
    })

    // The order of mappers below matters:
    //  * ensure we prefer to show variants customer explicitly picked
    //  * ensure any out of stock recipes are replaced by in stock alternatives
    //  * ensure any remaining out of stock recipes are moved to the end of the list
    const originalRecipes = recipeIdsInCollection
      .map(id => recipes.find(other => other.get('id') === id))
      .filter(recipe => Boolean(recipe))
      .map(selectedVariantReplacer)
      .map(outOfStockRecipeReplacer)

    const resultingRecipes = originalRecipes
      .sort(recipeComparatorForOutOfStock)

    return { recipes: resultingRecipes }
  }

  return {
    getRecipesForCollectionId
  }
}
