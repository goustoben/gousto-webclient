import { actionTypes } from 'actions/actionTypes'
import logger from 'utils/logger'
import { getBasketRecipes } from 'selectors/basket'
import { getRecipeTotalDiscounted, getTotalDiscount, getPricingPromoCode } from 'selectors/pricing'
import { getRecipesInCollection } from 'routes/Menu/selectors/collections'
import { SOCIAL_TYPES } from 'components/SocialLinks/socialReferralHelper'
import {
  getUserDetails,
  getProductsValueForSingleRecipeById,
  getProductsValueForMultipleRecipes,
  getProductsValueForRecipeIds,
  getBoxTypeValue,
  getOrderDetails,
} from './dataLayerTrackerUtils'

const sendDataLayerEvent = (event) => {
  if (!__CLIENT__ && window.dataLayer) {
    return
  }

  window.dataLayer.push(event)
}

const sendEcommerceEvent = (eventName, ecommerce, state) => {
  const event = {
    event: eventName,
    ecommerce,
    user: getUserDetails(state),
  }
  const debugEvent = {
    ...event,
    ecommerce: {
      ...ecommerce,
      ...(ecommerce.impressions
        ? {
            // Don't output a long list to console to reduce noise.
            impressions: `<...(${ecommerce.impressions.length})>`,
          }
        : {}),
    },
  }
  logger.debug({ message: 'dataLayerTracker - sendEcommerceEvent', extra: debugEvent })

  // ecommerce merges the values with the ecommerce hash of a previous call:
  // see https://developers.google.com/tag-manager/enhanced-ecommerce.  Clear
  // the old value to store only the fields we send in this particular call.
  sendDataLayerEvent({ ecommerce: null })

  sendDataLayerEvent(event)
}

export const viewRecipe = ({ recipeId }, state) => {
  if (!recipeId) {
    return
  }

  sendEcommerceEvent(
    'view_recipe',
    {
      detail: {
        products: getProductsValueForSingleRecipeById(recipeId, state),
      },
    },
    state
  )
}

export const viewCollection = ({ collectionId }, state) => {
  const { menuCollections } = state
  const recipeIdsByCollection = getRecipesInCollection(menuCollections, collectionId)
  const collectionSlug = menuCollections.getIn([collectionId, 'slug'])

  const recipeIds = recipeIdsByCollection.toArray()
  sendEcommerceEvent(
    'view_collection',
    {
      impressions: getProductsValueForRecipeIds(recipeIds, state, { collectionSlug }),
    },
    state
  )
}

export const addRecipeToBasket = ({ recipeId, orderId }, state) => {
  if (orderId) {
    // The action is dispatched just after a signup, but it wasn't the
    // interaction from user, so we shouldn't track that.
    return
  }
  sendEcommerceEvent(
    'add_to_cart',
    {
      box_type: getBoxTypeValue(state),
      add: {
        products: getProductsValueForSingleRecipeById(recipeId, state),
      },
    },
    state
  )
}

export const initiateCheckout = (_action, state) => {
  const basketRecipes = getBasketRecipes(state)

  sendEcommerceEvent(
    'initiate_checkout',
    {
      checkout: {
        actionField: {
          box_type: getBoxTypeValue(state),
        },
        products: getProductsValueForMultipleRecipes(basketRecipes, state),
      },
    },
    state
  )
}

export const signupPurchaseCompleted = (action, state) => {
  const { orderId, basketRecipes } = action

  const totalPrice = getRecipeTotalDiscounted(state)
  const totalDiscount = getTotalDiscount(state)
  const promoCode = getPricingPromoCode(state)

  sendEcommerceEvent(
    'purchase_welcome',
    {
      purchase: {
        actionField: {
          order_id: orderId,
          currency_code: 'GBP',
          box_type: getBoxTypeValue(state),
          revenue: totalPrice,
          coupon: promoCode,
          coupon_value: totalDiscount,
        },
        products: getProductsValueForMultipleRecipes(basketRecipes, state),
      },
    },
    state
  )
}

export const customerPurchaseCompleted = ({ order }, state) => {
  const { recipeIds, totalPrice, orderId } = getOrderDetails(order)

  sendEcommerceEvent(
    'purchase',
    {
      purchase: {
        actionField: {
          order_id: orderId,
          currency_code: 'GBP',
          box_type: getBoxTypeValue(state),
          revenue: totalPrice,
        },
        products: getProductsValueForRecipeIds(recipeIds, state),
      },
    },
    state
  )
}

export const referFriendLinkCopied = () => {
  const event = {
    event: 'referral_click',
    type: SOCIAL_TYPES.link,
  }
  logger.debug({ message: 'dataLayerTracker - referFriendLinkCopied', extra: event })
  sendDataLayerEvent(event)
}

export const referFriendLinkShared = (action) => {
  const { trackingData } = action
  const event = {
    event: 'referral_click',
    type: trackingData.channel,
  }
  logger.debug({ message: 'dataLayerTracker - referFriendLinkShared', extra: event })
  sendDataLayerEvent(event)
}

const callbacks = {
  [actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE]: viewRecipe,
  [actionTypes.FILTERS_COLLECTION_CHANGE]: viewCollection,
  [actionTypes.BASKET_RECIPE_ADD]: addRecipeToBasket,
  [actionTypes.BASKET_CHECKOUT]: initiateCheckout,
  [actionTypes.CHECKOUT_SIGNUP_SUCCESS]: signupPurchaseCompleted,
  [actionTypes.ORDER_CREATE_TRANSACTIONAL]: customerPurchaseCompleted,
  [actionTypes.REFER_FRIEND_LINK_COPIED]: referFriendLinkCopied,
  [actionTypes.REFER_FRIEND_LINK_SHARE]: referFriendLinkShared,
}

export const dataLayerTracker = (action, state) => {
  const { type } = action
  const callback = callbacks[type]

  if (!callback) {
    return
  }
  callback(action, state)
}
