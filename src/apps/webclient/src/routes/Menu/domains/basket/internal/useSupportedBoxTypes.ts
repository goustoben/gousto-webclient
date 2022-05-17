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

  const maxRecipesForPortion = (portionSize = 2) =>
    menuBox
      ? Math.max(
          ...menuBoxesByPortionSize(menuBox, portionSize).map(
            (box) => box.attributes.number_of_recipes,
          ),
        )
      : DEFAULT_MAX_RECIPES

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
    maxRecipesForPortion,
    minRecipesForPortion,
  }
}
