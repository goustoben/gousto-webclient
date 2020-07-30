import { createSelector } from 'reselect'
import { getRecipes, getMenuRecipeIds, getMenuService } from 'selectors/root'
import { getNumPortions, getBasketMenuId, getBasketOrderDetailDate } from 'selectors/basket'
import { getMenuLimits } from 'selectors/menu'

export const getCurrentMenuRecipes = createSelector(
  [getRecipes, getMenuRecipeIds],
  (allRecipes, currentMenuIds) => (
    currentMenuIds && currentMenuIds.map(recipeId => allRecipes.get(recipeId) || null)
      .filter(recipe => recipe !== null)
  )
)

export const activeMenuForDate = (menuServiceData, date) => {
  const isPreviewMenu = menuServiceData.meta && menuServiceData.meta.isPreviewMenu
  if (!menuServiceData.data) {
    return {}
  }

  if (isPreviewMenu || !date) {
    const defaultFallbackMenu = menuServiceData.data[0]

    return defaultFallbackMenu
  }

  return menuServiceData.data.find((menu) =>
    date <= menu.attributes.ends_at // ends_at is the last cutoff date for the menu
  )
}

export const getActiveMenuIdForOrderDate = createSelector(
  [
    getBasketOrderDetailDate,
    getMenuService
  ],
  (orderDate, menuService) => {
    const activeMenu = activeMenuForDate(menuService, orderDate)
    const menuId = activeMenu.id

    return menuId
  }
)

export const getMenuLimitsForBasket = createSelector(
  [
    getMenuLimits,
    getNumPortions,
    getBasketMenuId
  ],
  (menuLimits, numPortions, basketMenuId) => {
    const currentMenuLimits = menuLimits[basketMenuId]
    if (currentMenuLimits && currentMenuLimits.limits.length) {
      return currentMenuLimits.limits.map(limit => ({
        name: limit.name,
        limitProps: numPortions === 2 ? limit.rules.per2 : limit.rules.per4,
        items: limit.items
      }))
    }

    return []
  }
)

export const validateRecipeAgainstRule = (menuLimitsForBasket, recipeId, basketRecipes) => {
  const limitsReached = menuLimitsForBasket.map(limit => {
    const { name, limitProps, items } = limit

    if (recipeId && !items.some(item => item.core_recipe_id === recipeId)) {
      return null
    }

    const recipesInBasketIds = basketRecipes.keySeq().toArray()
    const recipesFromLimitInBasket = recipesInBasketIds && recipesInBasketIds.filter(recipe => items.some(item => item.core_recipe_id === recipe))
    // we set the count to 1 if we trigger the validation at add and 0 if we do it at checkout
    let count = recipeId ? 1 : 0

    if (recipesFromLimitInBasket) {
      recipesFromLimitInBasket.forEach(recipe => {
        if (basketRecipes.get(recipe)) {
          count += basketRecipes.get(recipe)
        }
      })
    }

    if (count > limitProps.value) {
      return {
        name,
        message: limitProps.description,
        items: recipesFromLimitInBasket
      }
    }

    return null
  })

  return limitsReached.filter(item => item !== null)
}

export const getIsEnabledRecipeTileFoundation = ({menu}) => menu.getIn(['features', 'recipe_tile_foundations'], false)
