import { getNumPortions } from 'selectors/basket'
import {
  getUserId,
  getUserFirstName,
  getUserLastName,
  getUserEmail,
  getUserShippingAddress,
  getUserOrders,
} from 'selectors/user'
import { ResourceType } from 'routes/Menu/constants/resources'
import { getRecipeById, getRecipeTitle } from 'selectors/recipe'

export const getUserDetails = (state) => {
  const id = getUserId(state)

  if (!id) {
    return {}
  }

  const shippingAddress = getUserShippingAddress(state)
  const orders = getUserOrders(state)

  return {
    id,
    email: getUserEmail(state),
    first_name: getUserFirstName(state),
    last_name: getUserLastName(state),
    postcode: shippingAddress.get('postcode'),
    city: shippingAddress.get('town'),
    country: 'GB',
    number_of_orders: orders.size,
  }
}

export const getProductDetailsFields = (recipeId, state, options = {}) => {
  const { routing } = state

  const urlCollection = routing.locationBeforeTransitions.query
  const collection = urlCollection.collection || 'all-recipes'
  const { quantity } = options

  const recipe = getRecipeById(state, recipeId)
  const recipeTitle = getRecipeTitle(recipe)

  return {
    name: recipeTitle,
    id: recipeId,
    category: options.collectionSlug || collection,
    quantity,
  }
}

export const getProductsValueForSingleRecipeById = (recipeId, state) => [
  getProductDetailsFields(recipeId, state, { quantity: 1 }),
]

export const getRecipeIdsFromBasketRecipes = (basketRecipes) => Array.from(basketRecipes.keys())

export const getProductsValueFromRecipeIdToQuantity = (recipeIdToQuantity, state, options = {}) => {
  const { collectionSlug } = options

  return Object.entries(recipeIdToQuantity).map(([recipeId, quantity]) =>
    getProductDetailsFields(recipeId, state, { quantity, collectionSlug }),
  )
}

export const getProductsValueForMultipleRecipes = (basketRecipes, state) =>
  getProductsValueFromRecipeIdToQuantity(basketRecipes.toJS(), state)

export const convertRecipeIdsToHashOfQuantities = (recipeIds) =>
  recipeIds.reduce((result, recipeId) => {
    if (!result[recipeId]) {
      return { ...result, [recipeId]: 1 }
    } else {
      return { ...result, [recipeId]: result[recipeId] + 1 }
    }
  }, {})

export const getProductsValueForRecipeIds = (recipeIds, state, options = {}) => {
  const { collectionSlug } = options
  const recipeIdToQuantity = convertRecipeIdsToHashOfQuantities(recipeIds)

  return getProductsValueFromRecipeIdToQuantity(recipeIdToQuantity, state, { collectionSlug })
}

export const getBoxTypeValue = (state) => getNumPortions(state)

const getV1OrderAPIKeys = (order) => {
  const recipes = order.recipeItems || []
  const recipeIds = recipes.map((recipe) => recipe.recipeId)
  const recipeCount = order.box.numRecipes
  const totalPrice = order.prices.total
  const orderId = order.id.toString()

  return {
    recipeIds,
    recipeCount,
    totalPrice,
    orderId,
  }
}

const getV2OrderAPIKeys = (order) => {
  const recipes = order.relationships.components.data.filter((i) => i.type === ResourceType.Recipe)
  const recipeIds = recipes.map((recipe) => recipe.meta.coreRecipeId)
  const recipeCount = recipes.length
  const totalPrice = order.attributes.prices.total
  const orderId = order.id.toString()

  return {
    recipeIds,
    recipeCount,
    totalPrice,
    orderId,
  }
}

export const getOrderDetails = (order) => {
  const fn = order.relationships ? getV2OrderAPIKeys : getV1OrderAPIKeys

  return fn(order)
}
