import { useSelector } from 'react-redux'
import { getFilterFn, getInStockRecipes, getRecipeComparatorFactory, getRecipeListRecipesLogic } from 'routes/Menu/selectors/recipeList'
import { getCurrentMenuVariants, getSelectedRecipeVariants } from 'routes/Menu/selectors/variants'
import { getCurrentMenuRecipes } from '../../../selectors/menu'

export const useGetRecipesForCollectionId = (collections) => {
  // these selectors are to pass down to the base logic - reselect would usually do this
  // this pattern was for lowest-impact implementation of the old logic. to be refactored

  const currentMenuRecipes = useSelector(getCurrentMenuRecipes)
  const inStockRecipes = useSelector(getInStockRecipes)
  const currentMenuVariants = useSelector(getCurrentMenuVariants)
  const selectedVariants = useSelector(getSelectedRecipeVariants)
  const filterFn = useSelector(getFilterFn)
  const recipeComparatorFactory = useSelector(getRecipeComparatorFactory)

  const getRecipesForCollectionId = (collectionId) => (
    getRecipeListRecipesLogic(currentMenuRecipes, collections, inStockRecipes, currentMenuVariants, selectedVariants, collectionId, filterFn, recipeComparatorFactory)
  )

  return {
    getRecipesForCollectionId
  }
}
