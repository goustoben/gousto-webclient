import { useMenuService, UseMenuSWRArgs } from './http'
import { useTransformedMenuForDate } from "./transformer/useTransformedMenus";
import { UseMenuDependencies } from './types'
import { useGetOptionsForRecipe } from './useGetOptionsForRecipe';
import { useGetRecipesForCollectionId } from './useGetRecipesForCollectionId'

export function useMenu(
  requestArgs: UseMenuSWRArgs,
  date: string,
  deps: UseMenuDependencies
) {
  const { data: menuServiceData, isPending } = useMenuService(requestArgs)
  const menuData = useTransformedMenuForDate(menuServiceData, date)

  const getRecipesForCollectionId = useGetRecipesForCollectionId(menuServiceData, menuData, deps)
  const getOptionsForRecipe = useGetOptionsForRecipe(menuData, deps)

  return {
    getRecipesForCollectionId,
    getOptionsForRecipe,
    isPending,
    menuRecipes: menuData.recipes
  }
}
