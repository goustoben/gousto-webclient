import { createSelector } from 'reselect'
import moment from 'moment'
import { actionTypes } from 'actions/actionTypes'
import { getRecipes, getMenuRecipeIds } from 'selectors/root'
import { getNumPortions, getBasketMenuId , getBasketRecipes } from 'selectors/basket'
import { getMenuLimits } from 'selectors/menu'
import { getMenuCategoryIdForDetails } from './menuRecipeDetails'

export const getMenuLoadingErrorMessage = state => state.menu.get('menuLoadingErrorMessage')
export const getRecipeCount = state => getRecipes(state).size

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
    moment(date) <= moment(menu.attributes.ends_at)
  )
}

export const getActiveMenuIdForOrderDate = createSelector(
  [
    (state, props) => props.cutoffDate,
    (state, props) => props.menus
  ],
  (date, menuServiceData) => {
    if (!menuServiceData) {
      return undefined
    }

    const activeMenu = menuServiceData.find((menu) =>
      moment(date) <= moment(menu.attributes.ends_at) // ends_at is the last cutoff date for the menu
    )

    if (!activeMenu) {
      return undefined
    }
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

export const validateMenuLimitsForBasket = createSelector([
  (_, recipeId) => recipeId || null,
  getBasketRecipes,
  getMenuLimitsForBasket
], (recipeId, basketRecipes, menuLimitsForBasket) => {
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
})

export const isMenuLoading = createSelector(
  [
    state => state.boxSummaryShow.get('show'),
    state => state.menuBrowseCTAShow,
    state => state.pending.get(actionTypes.MENU_FETCH_DATA, false),
    state => state.pending.get(actionTypes.OPTIMIZELY_ROLLOUT_LOADING, false),
    state => state.menu.get('forceLoad', false)
  ],
  (boxSummaryShow, menuBrowseCTAShow, menuLoading, isOptimizelyLoading, forceLoad) => {
    const overlayShow = boxSummaryShow || menuBrowseCTAShow

    return ((menuLoading || isOptimizelyLoading) && !overlayShow) || forceLoad
  }
)

export const getCategoryIdForVariants = createSelector(
  getMenuCategoryIdForDetails,
  (_, props) => props.categoryId,
  (_, props) => props.isOnDetailScreen,
  (categoryIdFromDetailsScreen, categoryIdFromProps, isOnDetailScreen) => {
    if (isOnDetailScreen) {
      return categoryIdFromDetailsScreen
    }

    return categoryIdFromProps || null
  }
)
