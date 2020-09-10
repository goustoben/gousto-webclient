import qs from 'qs'
import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const version = routes.version.recipes
const versionMenu = routes.version.menu

export function fetchRecipes(accessToken, path, reqData) {
  return fetch(accessToken, `${endpoint('recipes', version)}/recipes/${path}`, reqData, 'GET')
}

export function fetchRecipesFromMenu(accessToken, reqData) {
  const path = `${endpoint('menu', versionMenu)}/recipes`
  const uri = reqData
    ? `${path}?${qs.stringify(reqData, { encode: false })}`
    : path

  return fetch(accessToken, uri, {}, 'GET', 'default', {}, null, false, true)
}

export function fetchRecipeStock(accessToken, deliveryDayId) {
  return fetch(accessToken, `${endpoint('core')}/delivery_day/${deliveryDayId}/stock`, {}, 'GET')
}

export function fetchRecipesStockByDate(reqData) {
  return fetch(null, `${endpoint('orders', routes.version.orders)}${routes.orders.recipesStock}`, reqData, 'GET')
}

