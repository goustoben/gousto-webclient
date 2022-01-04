import { useCollections, useAllCollections } from '../collections'
import { useAlternativeOptions } from './internal/useAlternativeOptions'
import { useGetRecipesForCollectionId } from './internal/useGetRecipesForCollectionId'

export const useMenu = () => {
  const { allCollections } = useCollections()

  const { getAlternativeOptionsForRecipe } = useAlternativeOptions({allCollections})

  const { getRecipesForCollectionId } = useGetRecipesForCollectionId(allCollections)

  return {
    getRecipesForCollectionId,
    getAlternativeOptionsForRecipe,
  }
}

/**
 * Produces getter function to retrieve alternatives for a recipe.
 */
export const useGetAlternativeOptionsForRecipeLight = () => {
  const allCollections = useAllCollections()
  const { getAlternativeOptionsForRecipe } = useAlternativeOptions({allCollections})

  return getAlternativeOptionsForRecipe
}
