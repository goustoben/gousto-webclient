import { useCollections } from '../collections'
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
