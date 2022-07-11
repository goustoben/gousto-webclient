import { UseMenuSWRArgs } from './http'
import { UseMenuDependencies } from './types'
import { useGetOptionsForRecipe } from './useGetOptionsForRecipe';
import { useGetRecipesForCollectionId } from './useGetRecipesForCollectionId'

export function useMenu(
    requestArgs: UseMenuSWRArgs,
    date: string,
    deps: UseMenuDependencies
) {
  const getRecipesForCollectionId = useGetRecipesForCollectionId(requestArgs, date, deps)

  const getOptionsForRecipe = useGetOptionsForRecipe(requestArgs, date, deps)

  return {
    getRecipesForCollectionId,
    getOptionsForRecipe
  }
}
