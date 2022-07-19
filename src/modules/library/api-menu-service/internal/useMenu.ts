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
  const menuServiceData = useMenuService(requestArgs)
  const menuData = useTransformedMenuForDate(menuServiceData, date)

  const getRecipesForCollectionId = useGetRecipesForCollectionId(menuServiceData, menuData, deps)
  const getOptionsForRecipe = useGetOptionsForRecipe(menuServiceData, menuData, deps)

  return {
    getRecipesForCollectionId,
    getOptionsForRecipe,
    menuRecipes: menuData.recipes
  }
}
