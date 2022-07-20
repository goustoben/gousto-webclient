import Immutable from 'immutable'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import { Recipe, RecipeVariantLink } from "../types"

// TODO remove these selectors later in the Menu API epic

type legacy_ReduxState = {
  recipes: Immutable.Map<string, any>
  menuRecipes: Immutable.List<string>
  menu: Immutable.Map<string, any>
}

type legacy_RecipeVariantState =
  Immutable.Map<string, Immutable.Map<string, any>>

const getRecipes = ({ recipes }: legacy_ReduxState) => recipes
const getMenuRecipeIds = ({ menuRecipes }: legacy_ReduxState) => menuRecipes
const getMenuVariants = (state: legacy_ReduxState): legacy_RecipeVariantState => state.menu.get('menuVariants')

const getCurrentMenuRecipes = createSelector(
  [getRecipes, getMenuRecipeIds],
  (allRecipes, currentMenuIds: Immutable.List<string>) =>
    currentMenuIds &&
    currentMenuIds
      .map((recipeId) => allRecipes.get(recipeId!) || null)
      .filter((recipe) => recipe !== null) as Immutable.List<Immutable.Map<string, any>>,
)

/**
 * Legacy Redux selector: get a list of recipe IDs for the current menu
 */
export function use_legacy_CurrentMenuRecipes() {
  return useSelector(getCurrentMenuRecipes)
}

/**
 * Legacy Redux selector: get a map of all loaded recipe objects
 */
export function use_legacy_Recipes() {
  return useSelector(getRecipes)
}

/**
 * Legacy Redux selector: get a list of variant links for the current menu
 */
export function use_legacy_CurrentMenuVariants(menuId: string) {
  const variants = useSelector(getMenuVariants)

  return variants.get(menuId) || null
}
