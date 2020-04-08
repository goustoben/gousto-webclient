import config from 'config'
import { getSlot } from 'utils/deliveries'
import { getAllBasketProducts, getFirstProductCategoryAtLimit, getProductItemLimitReached, productsOverallLimitReached } from 'utils/basketProductLimits'
import { unset } from './cookieHelper2'

export function basketSum(items) {
  return Array.from(items.values()).reduce((sum, qty) => sum + qty, 0)
}

export function getOrderDetails(basket, deliveryDays) {
  const date = basket.get('date')
  const slotId = basket.get('slotId')
  const slot = getSlot(deliveryDays, date, slotId)

  const deliverySlotId = slot.get('coreSlotId', '')
  const daySlotLeadTimeId = slot.get('daySlotLeadTimeId', '')

  const deliveryDayId = deliveryDays.getIn([date, 'coreDayId'])

  const recipes = basket.get('recipes')
  const quantity = basket.get('numPortions')

  const recipeChoices = (
    recipes.reduce((recipesArray, qty, id) => {
      for (let i = 1; i <= qty; i++) {
        recipesArray.push({
          id,
          quantity,
          type: 'Recipe',
        })
      }

      return recipesArray
    }, [])
  )

  return {
    delivery_day_id: deliveryDayId,
    delivery_slot_id: deliverySlotId,
    recipe_choices: recipeChoices,
    day_slot_lead_time_id: daySlotLeadTimeId
  }
}

export function okRecipes(recipes, menuRecipes, menuRecipeStock, numPortions) {
  const notOnMenuRecipes = recipes.filter((_, recipeId) => !menuRecipes.contains(recipeId))

  const outOfStockRecipes = recipes
    .map((_, recipeId) => [menuRecipeStock.get(recipeId), recipeId])
    .filter(([stock, recipeId]) => !stock || ((stock.get(String(numPortions), 0) + (recipes.get(recipeId) * numPortions)) <= config.menu.stockThreshold))

  const unavailableRecipes = notOnMenuRecipes.merge(outOfStockRecipes)

  const okRecipesList = recipes.filter((_, recipeId) => !unavailableRecipes.has(recipeId))

  return okRecipesList
}

export const naiveLimitReached = (basket, maxRecipesNum = config.basket.maxRecipesNum) => basketSum(basket.get('recipes')) >= maxRecipesNum

export function limitReached(basket, menuRecipes, menuRecipeStock, naive = false, maxRecipesNum = config.basket.maxRecipesNum) {
  if (naive) {
    return naiveLimitReached(basket, maxRecipesNum)
  }

  const recipes = basket.get('recipes')
  const numPortions = basket.get('numPortions')
  const okRecipeIds = okRecipes(recipes, menuRecipes, menuRecipeStock, numPortions)
  const recipeCount = basketSum(okRecipeIds)

  return recipeCount >= maxRecipesNum
}

export function getProductsQtyInCategory(categoryId, basket, products, includeGiftProducts = true) {
  const productQtys = includeGiftProducts ? getAllBasketProducts(basket) : basket.get('products')

  return productQtys.reduce((workingSumInCategory, itemQty, productId) => {
    const categoryFound = products.getIn([productId, 'categories'], []).some(category => category.get('id') === categoryId)

    return workingSumInCategory + (categoryFound ? itemQty : 0)
  }, 0)
}

export function getProductLimitReached(productId, basket, products, productsCategories) {
  const overallLimitReached = productsOverallLimitReached(basket)
  if (overallLimitReached) {
    return { type: 'box', value: config.basket.maxProductsNum }
  }

  const productItemAtLimit = getProductItemLimitReached(productId, basket, products)
  if (productItemAtLimit) {
    return { type: 'item', value: productItemAtLimit }
  }

  const categoryAtLimit = getFirstProductCategoryAtLimit(productId, basket, products, productsCategories)
  if (categoryAtLimit) {
    return { type: 'category', value: categoryAtLimit }
  }

  return false
}

export function basketResetPersistent(cookie) {
  unset(cookie, 'goustoStateStore_basket_slotId')
  unset(cookie, 'goustoStateStore_basket_recipes')
  unset(cookie, 'goustoStateStore_basket_previewOrderId')
  unset(cookie, 'goustoStateStore_basket_postcode')
  unset(cookie, 'goustoStateStore_basket_numPortions')
  unset(cookie, 'goustoStateStore_basket_date')
}
