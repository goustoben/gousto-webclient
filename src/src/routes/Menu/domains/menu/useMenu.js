import { useSelector } from 'react-redux'
import { getRecipesInCollection } from 'routes/Menu/selectors/collections'
import { getCurrentMenuRecipes } from 'routes/Menu/selectors/menu'
import { useCollections } from '../collections'

export const useMenu = () => {
  const { collections } = useCollections()
  const recipes = useSelector(getCurrentMenuRecipes)

  const getRecipesForCollectionId = (collectionId) => {
    const recipeIdsInCollection = getRecipesInCollection(collections, collectionId)

    if (!recipeIdsInCollection) {
      return []
    }

    return recipes.filter(r => recipeIdsInCollection.includes(r.get('id')))
  }

  return {
    getRecipesForCollectionId
  }
}
