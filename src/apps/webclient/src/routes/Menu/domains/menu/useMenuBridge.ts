import { useSelector } from 'react-redux'

import {
  useMenu as useMenuBase,
  useGetAlternativeOptionsForRecipeLight,
} from '@library/menu-service'

import { getSelectedRecipeVariants } from 'routes/Menu/selectors/variants'
import { getNumPortions, getBasketMenuId } from 'selectors/basket'

/**
 * Bridge hook for interfacing between webclient and the menu-service module
 * to be removed later in the epic
 */
export function useMenu() {
  const numPortions = useSelector(getNumPortions)
  const selectedVariants = useSelector(getSelectedRecipeVariants)
  const menuId = useSelector(getBasketMenuId)

  return useMenuBase({
    numPortions,
    selectedVariants,
    menuId,
  })
}

/**
 * Bridge hook for interfacing between webclient and the menu-service module
 * to be removed later in the epic
 */
export function useGetAlternativeOptionsForRecipe() {
  const numPortions = useSelector(getNumPortions)
  const menuId = useSelector(getBasketMenuId)

  return useGetAlternativeOptionsForRecipeLight({
    numPortions,
    menuId,
  })
}
