import { push } from 'react-router-redux'

import config from 'config'
import basketActions from 'actions/basket'
import * as trackingKeys from 'actions/trackingKeys'
import { limitReached, naiveLimitReached } from 'utils/basket'
import { productCanBeAdded } from 'utils/basketProductLimits'
import { getUserOrderById } from 'utils/user'
import logger from 'utils/logger'
import { getUserOrders } from 'selectors/user'
import { getBasketRecipes } from 'selectors/basket'
import { getTransactionType , getUTMAndPromoCode } from 'selectors/tracking'
import statusActions from './status'
import { menuLoadMenu, menuLoadStock } from './menu'
import { boxSummaryDeliveryDaysLoad } from './boxSummary'
import { actionTypes } from './actionTypes'
import { basketRecipeAdd } from '../routes/Menu/actions/basketRecipes'
import { trackingOrderCheckout } from './tracking'
import { getIsAuthenticated } from '../selectors/auth'

export const basketOrderLoaded = (orderId) => (
  (dispatch, getState) => {
    const editBox = getState().basket.get('recipes').size !== 0
    dispatch({
      type: actionTypes.BASKET_ORDER_LOADED,
      orderId,
      editBox,
    })
  }
)

export const basketDateChange = (date) => ({
  type: actionTypes.BASKET_DATE_CHANGE,
  date,
})

export const basketGiftAdd = (giftId, type = '') => (
  (dispatch, getState) => {
    if (type.toLowerCase() === 'product') {
      if (getState().products.has(giftId)) {
        dispatch({
          type: actionTypes.BASKET_GIFT_ADD,
          giftId,
        })
      } else {
        logger.error({ message: `Cannot add gift to basket since ${giftId} not found in products store` })
      }
    } else {
      logger.info(`${type} gifts cannot be added to basket`)
    }
  }
)

export const basketNumPortionChange = (numPortions) => (
  (dispatch, getState) => {
    const { routing } = getState()
    const prevLoc = routing ? routing.locationBeforeTransitions : null
    const query = prevLoc.query || null

    if (query && query.num_portions) {
      const newLoc = {
        ...prevLoc,
        num_portions: numPortions
      }

      dispatch(push(newLoc))
    }

    dispatch({
      type: actionTypes.BASKET_NUM_PORTION_CHANGE,
      numPortions,
    })

    const state = getState()
    const reachedLimit = limitReached(state.basket, state.menuRecipes, state.menuRecipeStock)
    dispatch({
      type: actionTypes.BASKET_LIMIT_REACHED,
      limitReached: reachedLimit,
      trackingData: {
        actionType: trackingKeys.basketLimit,
        source: trackingKeys.selectPortionSize,
        limitReached: reachedLimit,
      },
    })

    const {promoCode, UTM} = getUTMAndPromoCode(getState())
    dispatch({
      type: actionTypes.BOX_SIZE_CHANGED_TRACKING,
      trackingData: {
        actionType: trackingKeys.selectBoxSize,
        boxSize: `${numPortions} people`,
        ...UTM,
        promoCode
      },
    })
  }
)

export const portionSizeSelectedTracking = (numPortion, orderId) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.PORTION_SIZE_SELECTED_TRACKING,
      trackingData: {
        actionType: trackingKeys.selectPortionSize,
        num_portion: numPortion,
        order_id: orderId || null,
      },
    })
  }
)

export const basketNumPeopleChange = peopleObj => (
  (dispatch, getState) => {
    const numAdultsValid = peopleObj && typeof peopleObj.numAdults !== 'undefined' ? peopleObj.numAdults : getState().basket.get('numAdults', 0)
    const people = { numAdults: numAdultsValid }
    dispatch({
      type: actionTypes.BASKET_NUM_PEOPLE_CHANGE,
      people,
      trackingData: {
        actionType: actionTypes.BASKET_NUM_PEOPLE_CHANGE,
        people,
      },
    })
  }
)

export const basketSetNumRecipes = (numRecipes) => ({
  type: actionTypes.BASKET_SET_NUM_RECIPES,
  numRecipes,
})

export const basketOrderLoad = (orderId, order = null) => (
  (dispatch, getState) => {
    if (getState().basket.get('orderId') !== orderId) {
      dispatch(basketActions.basketReset())
      dispatch(basketActions.basketIdChange(orderId))
      dispatch(basketActions.basketOrderItemsLoad(orderId, order))
      logger.info(`Basket loaded order: ${orderId}`)
    } else {
      logger.info(`Order already loaded into current basket: ${orderId}`)
    }
    dispatch(basketActions.basketOrderLoaded(orderId))
  }
)

export const basketOrderItemsLoad = (orderId, order = null, types = ['product', 'recipe', 'gift'], view = null) => (
  (dispatch, getState) => {
    const userOrder = order || getUserOrderById(orderId, getState().user.get('orders'))

    types.forEach((type) => {
      userOrder.get(`${type}Items`, []).forEach((item) => {
        const itemableId = item.get('itemableId')
        const qty = parseInt(item.get('quantity', 0), 10)
        switch (type) {
        case 'product': {
          for (let i = 0; i < qty; i++) {
            dispatch(basketActions.basketProductAdd(itemableId, view, orderId))
          }
          break
        }
        case 'recipe': {
          const adjustedQty = Math.round(qty / parseInt(userOrder.getIn(['box', 'numPortions']), 10))

          for (let i = 0; i < adjustedQty; i++) {
            // fall back to the defaults for these 2 params
            const recipeInfo = undefined
            const maxRecipesNum = undefined

            dispatch(basketRecipeAdd(itemableId, view, recipeInfo, maxRecipesNum, orderId))
          }
          break
        }
        case 'gift': {
          const itemableType = item.get('itemableType')

          for (let i = 0; i < qty; i++) {
            dispatch(basketActions.basketGiftAdd(itemableId, itemableType))
          }
          break
        }
        default:
          logger.error({ message: `Cannot add ${type} items to basket` })
        }
      })
    })
  }
)

export const basketProductAdd = (productId, view = null, force = false) => (
  (dispatch, getState) => {
    const product = getState().products.get(productId, false)

    if (product) {
      const state = getState()
      if (force || productCanBeAdded(productId, state.basket, state.products, state.productsStock, state.productsCategories)) {
        dispatch({
          type: actionTypes.BASKET_PRODUCT_ADD,
          productId,
          unsaved: !force,
          trackingData: force ? undefined : {
            actionType: actionTypes.BASKET_PRODUCT_ADD,
            productId,
            view,
          },
        })

        if (!force) {
          dispatch({
            type: actionTypes.PRODUCTS_STOCK_CHANGE,
            stock: { [productId]: -1 },
          })
        }
      } else {
        logger.error({ message: `Cannot add product ${productId} to basket` })
      }
    } else {
      logger.error({ message: `Cannot add product to basket since ${productId} not found in product store` })
    }
  }
)

export const basketProductRemove = (productId, view) => (
  (dispatch, getState) => {
    const product = getState().products.get(productId, false)

    if (product) {
      dispatch({
        type: actionTypes.BASKET_PRODUCT_REMOVE,
        productId,
        unsaved: true,
        trackingData: {
          actionType: actionTypes.BASKET_PRODUCT_REMOVE,
          productId,
          view,
        },
      })

      dispatch({
        type: actionTypes.PRODUCTS_STOCK_CHANGE,
        stock: { [productId]: 1 },
      })
    } else {
      logger.error({ message: `Cannot remove product from basket since ${productId} not found in product store` })
    }
  }
)

export const basketPromoCodeChange = promoCode => ({
  type: actionTypes.BASKET_PROMO_CODE_CHANGE,
  promoCode,
})

export const basketPromoCodeAppliedChange = promoCodeApplied => ({
  type: actionTypes.BASKET_PROMO_CODE_APPLIED_CHANGE,
  promoCodeApplied,
})

export const basketPromoCodeUrlChange = promoCodeUrl => ({
  type: actionTypes.BASKET_PROMO_CODE_URL_CHANGE,
  promoCodeUrl,
})

export const basketPostcodeChangePure = postcode => ({
  type: actionTypes.BASKET_POSTCODE_CHANGE,
  postcode: postcode.trim(),
})

export const basketPostcodeChange = (postcode, forgetPrevPostcode = false) => (
  async (dispatch, getState) => {
    const trimmedPostcode = postcode.trim()
    if (postcode) {
      dispatch({
        type: actionTypes.BASKET_POSTCODE_CHANGE,
        postcode: trimmedPostcode,
        forgetPrevPostcode,
        trackingData: {
          actionType: trackingKeys.changeBasketPostcode,
          postcode: trimmedPostcode,
        },
      })
      dispatch({
        type: actionTypes.BASKET_POSTCODE_PENDING,
        pending: true,
      })
      await dispatch(boxSummaryDeliveryDaysLoad())
      dispatch({
        type: actionTypes.BASKET_POSTCODE_PENDING,
        pending: false,
      })

      const {promoCode, UTM} = getUTMAndPromoCode(getState())
      dispatch({
        type: actionTypes.BASKET_SELECT_POSTCODE,
        trackingData: {
          actionType: trackingKeys.selectPostcode,
          ...UTM,
          promoCode,
          postcode: trimmedPostcode,
        },
      })
    }
  }
)

export const basketPostcodeClear = () => (
  (dispatch) => {
    dispatch({
      type: actionTypes.BASKET_POSTCODE_CHANGE,
      postcode: '',
    })
    dispatch({
      type: actionTypes.BASKET_ADDRESS_CHANGE,
      address: null,
    })
  }
)

export const basketAddressChange = address => ({
  type: actionTypes.BASKET_ADDRESS_CHANGE,
  address,
})

export const basketStepsOrderReceive = stepsOrder => ({
  type: actionTypes.BASKET_STEPS_ORDER_RECEIVE,
  stepsOrder,
})

export const basketRecipesInitialise = (recipes) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.BASKET_RECIPES_INITIALISE,
    recipes,
  })

  const { basket } = getState()
  const reachedLimit = naiveLimitReached(basket)
  dispatch({
    type: actionTypes.BASKET_LIMIT_REACHED,
    limitReached: reachedLimit,
  })
}

export const basketIdChange = orderId => ({
  type: actionTypes.BASKET_ID_CHANGE,
  orderId,
})

export const basketSlotChange = slotId => (
  (dispatch, getState) => {
    const state = getState()
    const date = state.basket.get('date')
    const userOrders = getUserOrders(getState())
    const orderForDate = userOrders.find(order => {
      const deliveryDay = order.get('deliveryDate').split(' ')[0]

      return (deliveryDay === date)
    })

    dispatch({
      type: actionTypes.BASKET_SLOT_CHANGE,
      slotId,
      trackingData: {
        actionType: trackingKeys.changeBasketSlot,
        slotId,
        date,
        dayId: state.boxSummaryDeliveryDays.getIn([date, 'id']),
      },
    })
    if (orderForDate) {
      const orderId = orderForDate.get('id')
      dispatch(basketIdChange(orderId))
    }

    const slots = state.boxSummaryDeliveryDays.getIn([date, 'slots'], null)
    if (slots && slots.size > 0) {
      const selectedSlot = slots.find(slot => slot.get('id') === slotId)
      const defaultDelivery = selectedSlot && selectedSlot.get('isDefault') && state.boxSummaryDeliveryDays.getIn([date, 'isDefault'])
      const {promoCode, UTM} = getUTMAndPromoCode(state)
      dispatch({
        type: actionTypes.BASKET_SELECT_DELIVERY_SLOT,
        trackingData: {
          actionType: trackingKeys.selectDeliverySlot,
          ...UTM,
          promoCode,
          deliverySlot: defaultDelivery ? 'default' : 'not default'
        },
      })
    }
  }
)

export const basketPreviewOrderChange = (previewOrderId, boxId, surcharges = []) => ({
  type: actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
  boxId,
  previewOrderId,
  surcharges: surcharges || [],
})

export const basketSlotClear = () => ({
  type: actionTypes.BASKET_SLOT_CHANGE,
  slotId: '',
})

export const basketTariffChange = tariffId => ({
  type: actionTypes.BASKET_TARIFF_CHANGE,
  tariffId,
})

export const basketChosenAddressChange = address => ({
  type: actionTypes.BASKET_CHOSEN_ADDRESS_CHANGE,
  address,
})

export const basketRestorePreviousValues = () => (
  (dispatch, getState) => {
    const { basket } = getState()
    const prevSlotId = basket.get('prevSlotId')
    const slotId = basket.get('slotId')
    const prevPostcode = basket.get('prevPostcode')
    const postcode = basket.get('postcode')
    const prevAddress = basket.get('prevAddress')
    const address = basket.get('address')

    if (slotId === '' && prevSlotId !== '') {
      dispatch({
        type: actionTypes.BASKET_SLOT_CHANGE,
        slotId: prevSlotId,
      })
    }

    if (postcode === '' && prevPostcode !== '') {
      dispatch({
        type: actionTypes.BASKET_POSTCODE_CHANGE,
        postcode: prevPostcode,
      })
    }

    if (address === null && prevAddress !== null) {
      dispatch({
        type: actionTypes.BASKET_ADDRESS_CHANGE,
        address: prevAddress,
      })
    }
  }
)

export const basketRestorePreviousDate = () => (
  (dispatch, getState) => {
    const { basket } = getState()
    const slotId = basket.get('prevSlotId')
    dispatch(basketDateChange(basket.get('prevDate')))
    dispatch({
      type: actionTypes.BASKET_SLOT_CHANGE,
      slotId,
    })
    dispatch(menuLoadMenu())
    dispatch(menuLoadStock())
    dispatch({
      type: actionTypes.TRACKING_UNDO_DELIVERY_OPTIONS_CHANGE,
      trackingData: {
        actionType: trackingKeys.undoDeliveryOptionsChange,
      }
    })
  }
)

export const basketCheckoutClicked = section => (
  (dispatch, getState) => {
    const state = getState()
    const { basket } = state
    const recipes = basket.get('recipes')
    const menuId = basket.get('currentMenuId')
    const transactionType = getTransactionType(state)
    const {promoCode, UTM} = getUTMAndPromoCode(state)
    dispatch({
      type: actionTypes.BASKET_CHECKOUT_CLICKED,
      trackingData: {
        actionType: trackingKeys.clickCheckout,
        ...UTM,
        promoCode,
        section,
        recipes,
        menu_id: menuId,
        transaction_type: transactionType
      },
    })
  }
)

export const basketCheckedOut = (view) => (dispatch, getState) => {
  const state = getState()
  const isAuthenticated = getIsAuthenticated(state)
  const recipes = getBasketRecipes(state)
  const numRecipes = recipes.size

  try {
    dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, true))

    if (isAuthenticated) {
      dispatch(trackingOrderCheckout())
    }

    dispatch({
      type: actionTypes.BASKET_CHECKOUT,
      trackingData: {
        actionType: trackingKeys.checkOutBasketAttempt,
        numRecipes,
        view,
      },
    })
  } catch (err) {
    dispatch(statusActions.error(actionTypes.BASKET_CHECKOUT, true))
    logger.error(err)
  } finally {
    dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
  }
}

export const basketProceedToCheckout = () => (
  async (dispatch, getState) => {
    const { basket } = getState()
    dispatch({
      type: actionTypes.BASKET_CHECKOUT_PROCEED,
      trackingData: {
        actionType: trackingKeys.checkOutBasketComplete,
        basket,
      },
    })

    dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, true))
    dispatch(statusActions.error(actionTypes.BASKET_CHECKOUT, false))

    try {
      dispatch(push(config.routes.client['check-out']))
    } catch (err) {
      logger.error(err)
      dispatch(push(config.routes.client.menu))
      dispatch(statusActions.error(actionTypes.BASKET_CHECKOUT, err.message))
    } finally {
      dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
    }
  }
)

export const basketReset = (chosenAddress = null) => ({
  type: actionTypes.BASKET_RESET,
  payload: {
    chosenAddress
  }
})

export const basketSignupCollectionReceive = collection => ({
  type: actionTypes.BASKET_SIGNUP_COLLECTION_RECEIVE,
  collection,
})

export const basketSetSubscriptionOption = subscriptionOption => ({
  type: actionTypes.BASKET_SET_SUBSCRIPTION_OPTION,
  subscriptionOption,
})

export const actions = {
  basketOrderLoaded,
  basketDateChange,
  basketGiftAdd,
  basketNumPortionChange,
  portionSizeSelectedTracking,
  basketNumPeopleChange,
  basketOrderLoad,
  basketOrderItemsLoad,
  basketProductAdd,
  basketProductRemove,
  basketPromoCodeChange,
  basketPromoCodeAppliedChange,
  basketPromoCodeUrlChange,
  basketPostcodeChangePure,
  basketPostcodeChange,
  basketPostcodeClear,
  basketAddressChange,
  basketStepsOrderReceive,
  basketRecipesInitialise,
  basketSlotChange,
  basketPreviewOrderChange,
  basketSlotClear,
  basketIdChange,
  basketTariffChange,
  basketChosenAddressChange,
  basketRestorePreviousValues,
  basketRestorePreviousDate,
  basketCheckedOut,
  basketCheckoutClicked,
  basketProceedToCheckout,
  basketReset,
  basketSignupCollectionReceive,
  basketSetSubscriptionOption,
}

export default actions
