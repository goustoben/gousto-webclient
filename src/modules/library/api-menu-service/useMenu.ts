import { use_legacy_AllCollections } from './internal/collections'
import { useAlternativeOptions } from './internal/useAlternativeOptions'
import { SelectedVariants } from "./internal/useAlternativeOptions/types"
import { useGetRecipesForCollectionId } from './internal/useGetRecipesForCollectionId'

export { recipeReferencePrefix } from './internal/getRecipeReferenceInjector'

export function useMenu({
  menuId,
  numPortions,
  selectedVariants
}: { menuId: string, numPortions: number, selectedVariants: SelectedVariants }) {
  const allCollections = use_legacy_AllCollections()

  const { getAlternativeOptionsForRecipe } = useAlternativeOptions({
    allCollections,
    menuId,
    numPortions,
  })

  const { getRecipesForCollectionId } = useGetRecipesForCollectionId(
    menuId,
    selectedVariants,
    allCollections,
    numPortions,
  )

  return {
    getRecipesForCollectionId,
    getAlternativeOptionsForRecipe,
  }
}

/**
 * Produces getter function to retrieve alternatives for a recipe.
 */
export const useGetAlternativeOptionsForRecipeLight = ({
  menuId,
  numPortions,
}: { menuId: string, numPortions: number }) => {
  const allCollections = use_legacy_AllCollections()
  const { getAlternativeOptionsForRecipe } = useAlternativeOptions({
    allCollections,
    menuId,
    numPortions,
  })

  return getAlternativeOptionsForRecipe
}
