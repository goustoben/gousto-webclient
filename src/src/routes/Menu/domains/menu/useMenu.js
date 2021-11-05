import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getRecipesInCollection } from 'routes/Menu/selectors/collections'
import { getCurrentMenuRecipes } from 'routes/Menu/selectors/menu'
import { getInStockRecipes } from 'routes/Menu/selectors/recipeList'
import { useCollections } from '../collections'
import { getRecipeComparatorForOutOfStock } from './getRecipeComparatorForOutOfStock'

export const useMenu = () => {
  const { allCollections } = useCollections()
  const recipes = useSelector(getCurrentMenuRecipes)
  const recipesInStock = useSelector(getInStockRecipes)

  const recipeComparatorForOutOfStock = useMemo(
    () => getRecipeComparatorForOutOfStock(recipesInStock),
    [recipesInStock]
  )

  const getRecipesForCollectionId = (collectionId) => {
    const recipeIdsInCollection = getRecipesInCollection(allCollections, collectionId)

    if (!recipeIdsInCollection) {
      return []
    }

    return recipes
      .filter(r => recipeIdsInCollection.includes(r.get('id')))
      .sort(recipeComparatorForOutOfStock)
  }

  return {
    getRecipesForCollectionId
  }
}
