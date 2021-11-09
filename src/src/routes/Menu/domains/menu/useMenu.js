import { useCollections } from '../collections'
import { useGetRecipesForCollectionId } from './internal/useGetRecipesForCollectionId'

export const useMenu = () => {
  const { allCollections } = useCollections()
  const { getRecipesForCollectionId } = useGetRecipesForCollectionId(allCollections)

  return {
    getRecipesForCollectionId
  }
}
