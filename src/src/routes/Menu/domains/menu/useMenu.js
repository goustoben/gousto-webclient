import { useCollections } from '../collections'
import { useAlternativeOptions } from './internal/useAlternativeOptions'
import { useGetRecipesForCollectionId } from './internal/useGetRecipesForCollectionId'
import { useGetRecipesForCollectionId as useGetRecipesForCollectionIdV2 } from './internal/useGetRecipesForCollectionIdV2'

export const useMenu = () => {
  const { allCollections } = useCollections()

  // When it comes to enable new implementation of getRecipesForCollectionId
  // swap line below for version 2
  const { getRecipesForCollectionId } = useGetRecipesForCollectionId(allCollections)
  const { getAlternativeOptionsForRecipe } = useAlternativeOptions({allCollections})

  // eslint-disable-next-line no-unused-vars
  const { getRecipesForCollectionId: getRecipesForCollectionIdV2 } = useGetRecipesForCollectionIdV2(allCollections)

  return {
    getRecipesForCollectionId,
    getAlternativeOptionsForRecipe,
  }
}

