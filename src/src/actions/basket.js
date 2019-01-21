import basketActions from 'actions/basket'
import { limitReached } from 'utils/basket'
import { productCanBeAdded } from 'utils/basketProductLimits'
import { getUserOrderById } from 'utils/user'
import config from 'config'
import logger from 'utils/logger'
import { push } from 'react-router-redux'
import { updateOrderItems } from 'apis/orders'
import { getCollectionIdWithName } from 'utils/collections'
import statusActions from './status'
import menuActions from './menu'
import boxSummaryActions from './boxSummary'
import actionTypes from './actionTypes'
import { getCurrentCollectionId, getCurrentDietTypes, getDietaryAttributes, getCurrentTotalTime } from '../selectors/filters'

function isOutOfStock(recipeId, numPortions, recipesStock) {
  const stock = recipesStock.getIn([recipeId, String(numPortions)], 0)

  return (stock <= config.menu.stockThreshold)
}

function getCollection(state) {
  const prevLoc = state.routing ? state.routing.locationBeforeTransitions : null
  let collection = ''
  if (prevLoc && prevLoc.query && prevLoc.query.collection) {
    collection = getCollectionIdWithName(state, prevLoc.query.collection)
  }

  return collection
}

export default {
  // basketAddressEditChange: (addressEdited) => ({
  // 	type: actionTypes.BASKET_ADDRESS_EDIT_CHANGE,
  // 	addressEdited,
  // }),

  basketOrderLoaded: orderId => ({
    type: actionTypes.BASKET_ORDER_LOADED,
    orderId,
  }),

  basketDateChange: date => ({
    type: actionTypes.BASKET_DATE_CHANGE,
    date,
  }),

  basketGiftAdd: (giftId, type = '') => (
    (dispatch, getState) => {
      if (type.toLowerCase() === 'product') {
        if (getState().products.has(giftId)) {
          dispatch({
            type: actionTypes.BASKET_GIFT_ADD,
            giftId,
          })
        } else {
          logger.error({message: `Cannot add gift to basket since ${giftId} not found in products store`})
        }
      } else {
        logger.info(`${type} gifts cannot be added to basket`)
      }
    }
  ),

  basketNumPortionChange: (numPortions) => (
    (dispatch, getState) => {
      dispatch({
        type: actionTypes.PORTION_SIZE_SELECTED,
        numPortions,
      })

      const state = getState()
      const reachedLimit = limitReached(state.basket, state.menuRecipes, state.menuRecipeStock)
      dispatch({
        type: actionTypes.BASKET_LIMIT_REACHED,
        limitReached: reachedLimit,
        trackingData: {
          actionType: actionTypes.BASKET_LIMIT_REACHED,
          source: 'PortionSize Selected',
          limitReached: reachedLimit,
        },
      })
    }
  ),
  
  basketNumPortionChangeTracking: (numPortions, orderId = null) => (
    (dispatch) => {
      dispatch({
        type: actionTypes.PORTION_SIZE_SELECTED_TRACKING,
        trackingData: {
          actionType: 'PortionSize Selected',
          numPortions,
          orderId: orderId,
        },
      })
    }
  ),

  basketNumPeopleChange: peopleObj => (
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
  ),

  basketOrderLoad: orderId => (
    (dispatch, getState) => {
      if (getState().basket.get('orderId') !== orderId) {
        dispatch(basketActions.basketReset())
        dispatch(basketActions.basketIdChange(orderId))
        dispatch(basketActions.basketOrderItemsLoad(orderId))
        logger.info(`Basket loaded order: ${orderId}`)
      } else {
        logger.info(`Order already loaded into current basket: ${orderId}`)
      }

      dispatch(basketActions.basketOrderLoaded(orderId))
    }
  ),

  basketOrderItemsLoad: (orderId, types = ['product', 'recipe', 'gift'], view = null) => (
    (dispatch, getState) => {
      const userOrder = getUserOrderById(orderId, getState().user.get('orders'))

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
              dispatch(basketActions.basketRecipeAdd(itemableId, view, orderId))
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
            logger.error({message: `Cannot add ${type} items to basket`})
          }
        })
      })
    }
  ),

  basketProductAdd: (productId, view, force) => (
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
          logger.error({message: `Cannot add product ${productId} to basket`})
        }
      } else {
        logger.error({message: `Cannot add product to basket since ${productId} not found in product store`})
      }
    }
  ),

  basketProductRemove: (productId, view) => (
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
        logger.error({message: `Cannot remove product from basket since ${productId} not found in product store`})
      }
    }
  ),

  basketPromoCodeChange: promoCode => ({
    type: actionTypes.BASKET_PROMO_CODE_CHANGE,
    promoCode,
  }),

  basketPromoCodeAppliedChange: promoCodeApplied => ({
    type: actionTypes.BASKET_PROMO_CODE_APPLIED_CHANGE,
    promoCodeApplied,
  }),

  basketPromoCodeUrlChange: promoCodeUrl => ({
    type: actionTypes.BASKET_PROMO_CODE_URL_CHANGE,
    promoCodeUrl,
  }),

  basketPostcodeChangePure: postcode => ({
    type: actionTypes.BASKET_POSTCODE_CHANGE,
    postcode: postcode.trim(),
  }),

  basketPostcodeChange: (postcode, forgetPrevPostcode = false) => (
    async (dispatch) => {
      const trimmedPostcode = postcode.trim()
      if (postcode) {
        dispatch({
          type: actionTypes.BASKET_POSTCODE_CHANGE,
          postcode: trimmedPostcode,
          forgetPrevPostcode,
          trackingData: {
            actionType: actionTypes.BASKET_POSTCODE_CHANGE,
            postcode: trimmedPostcode,
          },
        })
        dispatch({
          type: actionTypes.BASKET_POSTCODE_PENDING,
          pending: true,
        })
        await dispatch(boxSummaryActions.boxSummaryDeliveryDaysLoad())
        dispatch({
          type: actionTypes.BASKET_POSTCODE_PENDING,
          pending: false,
        })
      }
    }
  ),

  basketPostcodeClear: () => (
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
  ),

  basketAddressChange: address => ({
    type: actionTypes.BASKET_ADDRESS_CHANGE,
    address,
  }),

  basketStepsOrderReceive: stepsOrder => ({
    type: actionTypes.BASKET_STEPS_ORDER_RECEIVE,
    stepsOrder,
  }),

  basketRecipesClear: () => ({
    type: actionTypes.BASKET_RECIPES_CLEAR,
  }),

  basketRecipesPositionsClear: () => ({
    type: actionTypes.BASKET_RECIPES_POSITIONS_CLEAR,
  }),
  basketRecipeAdd: (recipeId, view, force, recipeInfo, maxRecipesNum) => (
    (dispatch, getState) => {
      const numPortions = getState().basket.get('numPortions')

      if (force) {
        const state = getState()
        dispatch({
          type: actionTypes.BASKET_RECIPE_ADD,
          recipeId,
          ...recipeInfo,
        })
        const reachedLimit = limitReached(state.basket, state.menuRecipes, state.menuRecipeStock, true)
        dispatch({
          type: actionTypes.BASKET_LIMIT_REACHED,
          limitReached: reachedLimit,
        })
      } else {
        const outOfStock = isOutOfStock(recipeId, numPortions, getState().menuRecipeStock)
        let state = getState()
        const { basket, menuRecipeStock, menuRecipes } = state
        if (!limitReached(basket, menuRecipes, menuRecipeStock, undefined, maxRecipesNum) && !outOfStock) {
          if (recipeInfo) {
            Object.assign(recipeInfo, { collection: getCurrentCollectionId(state) })
          }

          dispatch({
            type: actionTypes.BASKET_RECIPE_ADD,
            recipeId,
            ...recipeInfo,
            trackingData: {
              actionType: 'Recipe Added',
              recipeId,
              view,
              position: recipeInfo && recipeInfo.position,
              collection: getCurrentCollectionId(state),
              recipe_type: getCurrentDietTypes(state),
              dietary_attribute: getDietaryAttributes(state),
              time_frame: getCurrentTotalTime(state),
              taste_score: recipeInfo && recipeInfo.score,
              recipe_count: basket.get('recipes').size+1,// The action is performed in the same time so the size is not updated yet
            },
          })

          dispatch({
            type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
            stock: {
              [recipeId]: {
                [numPortions]: -1,
              },
            },
          })
          state = getState()
          const reachedLimit = limitReached(state.basket, state.menuRecipes, state.menuRecipeStock, undefined, maxRecipesNum)
          if (reachedLimit) {
            dispatch({
              type: actionTypes.BASKET_LIMIT_REACHED,
              limitReached: reachedLimit,
              trackingData: {
                actionType: actionTypes.BASKET_LIMIT_REACHED,
                limitReached: reachedLimit,
                view,
                source: actionTypes.RECIPE_ADDED,
              },
            })
          }
        }
      }
    }
  ),

  basketRecipeRemove: (recipeId, view, position, score) => (
    (dispatch, getState) => {
      let state = getState()
      const { basket } = state
      const collection = getCurrentCollectionId(state)
      dispatch({
        type: actionTypes.BASKET_RECIPE_REMOVE,
        recipeId,
        trackingData: {
          actionType: 'Recipe Removed',
          recipeId,
          view,
          position,
          collection,
          recipe_type: getCurrentDietTypes(state),
          dietary_attribute: getDietaryAttributes(state),
          time_frame: getCurrentTotalTime(state),
          taste_score: score,
          recipe_count: basket.get('recipes').size - 1,// The action is performed in the same time so the size is not updated yet
        },
      })

      const numPortions = getState().basket.get('numPortions')
      dispatch({
        type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
        stock: { [recipeId]: { [numPortions]: 1 } },
      })

      state = getState()
      const reachedLimit = limitReached(state.basket, state.menuRecipes, state.menuRecipeStock)
      if (!reachedLimit) {
        dispatch({
          type: actionTypes.BASKET_LIMIT_REACHED,
          limitReached: reachedLimit,
          trackingData: {
            actionType: actionTypes.BASKET_LIMIT_REACHED,
            limitReached: reachedLimit,
            view,
            source: actionTypes.RECIPE_REMOVED,
          },
        })
      }
    }
  ),

  basketSlotChange: slotId => (
    (dispatch, getState) => {
      const state = getState()
      const date = state.basket.get('date')
      dispatch({
        type: actionTypes.BASKET_SLOT_CHANGE,
        slotId,
        trackingData: {
          actionType: actionTypes.BASKET_SLOT_CHANGE,
          slotId,
          date,
          dayId: state.boxSummaryDeliveryDays.getIn([date, 'id']),
        },
      })
    }
  ),

  basketPreviewOrderChange: (previewOrderId, boxId, surcharges = []) => ({
    type: actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
    boxId,
    previewOrderId,
    surcharges: surcharges || [],
  }),

  basketSlotClear: () => ({
    type: actionTypes.BASKET_SLOT_CHANGE,
    slotId: '',
  }),

  basketIdChange: orderId => ({
    type: actionTypes.BASKET_ID_CHANGE,
    orderId,
  }),

  basketTariffChange: tariffId => ({
    type: actionTypes.BASKET_TARIFF_CHANGE,
    tariffId,
  }),

  basketChosenAddressChange: address => ({
    type: actionTypes.BASKET_CHOSEN_ADDRESS_CHANGE,
    address,
  }),

  basketRestorePreviousValues: () => (
    (dispatch, getState) => {
      const basket = getState().basket
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
  ),

  basketRestorePreviousDate: () => (
    (dispatch, getState) => {
      const basket = getState().basket
      const slotId = basket.get('prevSlotId')
      dispatch({
        type: actionTypes.BASKET_DATE_CHANGE,
        date: basket.get('prevDate'),
      })
      dispatch({
        type: actionTypes.BASKET_SLOT_CHANGE,
        slotId,
      })
      dispatch(menuActions.menuLoadMenu())
      dispatch(menuActions.menuLoadStock())
    }
  ),

  basketCheckedOut: (numRecipes, view) => (
    (dispatch) => {

      dispatch({
        type: actionTypes.BASKET_CHECKOUT,
        trackingData: {
          actionType: actionTypes.BASKET_CHECKED_OUT,
          numRecipes,
          view,
        },
      })
      dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, true))
    }
  ),

  basketProceedToCheckout: () => (
    async (dispatch, getState) => {
      const basket = getState().basket
      dispatch({
        type: actionTypes.BASKET_CHECKOUT_PROCEED,
        trackingData: {
          actionType: actionTypes.BASKET_CHECKOUT_PROCEED,
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
  ),

  basketUpdateProducts: () => (
    async (dispatch, getState) => {
      dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, true))
      const productData = getState().basket.get('products').map((productQty, productId) => ({
        id: productId,
        quantity: productQty,
        type: 'Product',
      })).toArray()
      const submitData = {
        item_choices: productData,
        restrict: 'Product',
      }
      const token = getState().auth.get('accessToken')
      const orderId = getState().basket.get('orderId')
      try {
        const { data: order } = await updateOrderItems(token, orderId, submitData)
        dispatch({
          type: actionTypes.BASKET_CHECKOUT,
          trackingData: {
            actionType: actionTypes.BASKET_CHECKED_OUT,
            order,
          },
        })
        dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
      } catch (err) {
        dispatch(statusActions.error(actionTypes.BASKET_CHECKOUT, err.message))
        dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
        logger.error(err)
        throw err
      }
    }
  ),

  basketReset: () => ({
    type: actionTypes.BASKET_RESET,
  }),

  basketSignupCollectionReceive: collection => ({
    type: actionTypes.BASKET_SIGNUP_COLLECTION_RECEIVE,
    collection,
  }),
}
