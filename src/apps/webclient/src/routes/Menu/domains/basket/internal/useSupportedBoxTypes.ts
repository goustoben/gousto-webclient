import { useIsFiveRecipesEnabled } from 'hooks/useIsFiveRecipesEnabled'

import { useMenuBox, MenuBox } from './useMenuBox'

const DEFAULT_MAX_RECIPES = 4
const DEFAULT_MIN_RECIPES = 2

const menuBoxesByPortionSize = (
  menuBox: MenuBox,
  portionSize: number,
): {
  type: string
  id: string
  attributes: { number_of_portions: number; number_of_recipes: number }
}[] => Object.values(menuBox).filter((box) => box.attributes.number_of_portions === portionSize)

/**
 * Hook interface for supported Box types from Menu API box response.
 * Menu API returns Box (of type ./useMenuBox.MenuBox) that contains possible combinations of recipe count - portion size
 */

export const useSupportedBoxTypes = () => {
  const menuBox = useMenuBox()
  const { isFiveRecipesEnabled } = useIsFiveRecipesEnabled()

  const maxRecipesForPortion = (portionSize = 2) =>
    menuBox
      ? Math.max(
          ...menuBoxesByPortionSize(menuBox, portionSize).map(
            (box) => box.attributes.number_of_recipes,
          ),
        )
      : DEFAULT_MAX_RECIPES
  /**
   * FYI: this is just for A/B test https://gousto.atlassian.net/browse/TG-6597
   * Basically we need to restrict 50% of prospects to having 4 recipes, not 5
   * When experiment will be finished Beetroots will simply delete following lines:
   * 41, 42, 43. and all useIsFiveRecipesEnabled() in this file.
   * Even useIsFiveRecipesEnabled() hook will be deleted.
   */
  const experimentMaxRecipesForPortion = isFiveRecipesEnabled
    ? maxRecipesForPortion
    : () => DEFAULT_MAX_RECIPES

  const minRecipesForPortion = (portionSize = 2) =>
    menuBox
      ? Math.min(
          ...menuBoxesByPortionSize(menuBox, portionSize).map(
            (box) => box.attributes.number_of_recipes,
          ),
        )
      : DEFAULT_MIN_RECIPES

  const isPortionSizeAllowedByRecipeCount = (recipeCount: number, portionSize: number): boolean =>
    recipeCount <= maxRecipesForPortion(portionSize)

  const allowedPortionSizes = (): number[] =>
    menuBox
      ? Array.from(new Set(Object.values(menuBox).map((box) => box.attributes.number_of_portions)))
      : []

  return {
    allowedPortionSizes,
    isPortionSizeAllowedByRecipeCount,
    maxRecipesForPortion: experimentMaxRecipesForPortion,
    minRecipesForPortion,
  }
}
