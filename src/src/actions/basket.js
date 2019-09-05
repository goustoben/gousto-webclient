import { push } from 'react-router-redux'
import Immutable from 'immutable'

import basketActions from 'actions/basket'
import { limitReached } from 'utils/basket'
import { productCanBeAdded } from 'utils/basketProductLimits'
import { getUserOrderById } from 'utils/user'
import config from 'config'
import logger from 'utils/logger'
import { updateOrderItems } from 'apis/orders'
import statusActions from './status'
import { menuLoadMenu, menuLoadStock } from './menu'
import boxSummaryActions from './boxSummary'
import { orderConfirmationUpdateOrderTracking } from './orderConfirmation'
import actionTypes from './actionTypes'
import tempActions from './temp'
import {
  getCurrentCollectionId,
  getCurrentDietTypes,
  getDietaryAttributes,
  getCurrentTotalTime,
  getRecipeGroupFilter
} from '../selectors/filters'

function isOutOfStock(recipeId, numPortions, recipesStock) {
  const stock = recipesStock.getIn([recipeId, String(numPortions)], 0)

  return (stock <= config.menu.stockThreshold)
}

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

export const basketDateChange = date => ({
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
        actionType: actionTypes.BASKET_LIMIT_REACHED,
        source: 'PortionSize Selected',
        limitReached: reachedLimit,
      },
    })
  }
)

export const portionSizeSelectedTracking = (num_portion, order_id) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.PORTION_SIZE_SELECTED_TRACKING,
      trackingData: {
        actionType: 'PortionSize Selected',
        num_portion,
        order_id: order_id ? order_id : null,
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

export const basketRecipesClear = () => ({
  type: actionTypes.BASKET_RECIPES_CLEAR,
})

export const basketRecipesPositionsClear = () => ({
  type: actionTypes.BASKET_RECIPES_POSITIONS_CLEAR,
})

export const basketRecipeAdd = (recipeId, view, force, recipeInfo, maxRecipesNum) => (
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
      let state = getState()
      const outOfStock = isOutOfStock(recipeId, numPortions, getState().menuRecipeStock)
      const { basket, menuRecipeStock, menuRecipes } = state
      const selectedFoodBrand = getRecipeGroupFilter(state)
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
            source: !!selectedFoodBrand && selectedFoodBrand.slug,
            taste_score: recipeInfo && recipeInfo.score,
            recipe_count: basket.get('recipes').size + 1,// The action is performed in the same time so the size is not updated yet
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
)

export const basketRecipeRemove = (recipeId, view, position, score) => (
  (dispatch, getState) => {
    let state = getState()
    const { basket } = state
    const collection = getCurrentCollectionId(state)
    const selectedFoodBrand = getRecipeGroupFilter(state)
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
        source: !!selectedFoodBrand && selectedFoodBrand.slug,
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
)

export const basketSlotChange = slotId => (
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

export const basketIdChange = orderId => ({
  type: actionTypes.BASKET_ID_CHANGE,
  orderId,
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
    dispatch({
      type: actionTypes.BASKET_DATE_CHANGE,
      date: basket.get('prevDate'),
    })
    dispatch({
      type: actionTypes.BASKET_SLOT_CHANGE,
      slotId,
    })
    dispatch(menuLoadMenu())
    dispatch(menuLoadStock())
  }
)

export const basketCheckedOut = (numRecipes, view) => (
  (dispatch, getState) => {

    const { auth, basket, user, pricing, temp, filters } = getState()
    const isAuthenticated = auth.get('isAuthenticated')
    const basketOrderId = basket.get('orderId')
    const editingBox = basket.get('editBox')
    const orders = user.get('orders')
    const subscription = user.get('subscription')
    const isActiveSubsc = subscription && (subscription.get('state') === 'active')
    const prices = pricing.get('prices')
    const originalGrossTotal = temp.get('originalGrossTotal')
    const originalNetTotal = temp.get('originalNetTotal')
    const orderTotal = prices && prices.get('total')
    const grossTotal = prices && prices.get('grossTotal')
    const editedGrossTotal = originalGrossTotal && grossTotal ? (grossTotal - originalGrossTotal).toFixed(2) : ''
    const editedNetTotal = originalNetTotal && orderTotal ? (orderTotal - originalNetTotal).toFixed(2) : ''
    const promoCode = prices && prices.get('promoCode')
    const dietaryAttribute = filters.get('dietaryAttributes').toJS()

    try {
      dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, true))

      if (isAuthenticated) {
        if (orders.get(basketOrderId)) {
          const orderItems = orders.get(basketOrderId).get('recipeItems')
          if (orderItems.size) {
            dispatch({
              type: actionTypes.TRACKING,
              trackingData: {
                actionType: 'Order Edited',
                order_id: basketOrderId,
                order_total: orderTotal,
                promo_code: promoCode,
                signp: false,
                subscription_active: isActiveSubsc,
              },
              optimizelyData: {
                type: 'event',
                eventName: 'order_edited_gross',
                tags: {
                  revenue: editedGrossTotal
                }
              }
            })
            dispatch({
              type: actionTypes.TRACKING,
              optimizelyData: {
                type: 'event',
                eventName: 'order_edited_net',
                tags: {
                  revenue: editedNetTotal
                }
              }
            })
          } else {
            dispatch({
              type: actionTypes.TRACKING,
              trackingData: {
                actionType: 'Order Placed',
                order_id: basketOrderId,
                order_total: orderTotal,
                promo_code: promoCode,
                signp: false,
                subscription_active: isActiveSubsc,
              },
              optimizelyData: {
                type: 'event',
                eventName: 'order_placed_gross',
                tags: {
                  revenue: grossTotal
                }
              }
            })
            dispatch({
              type: actionTypes.TRACKING,
              optimizelyData: {
                type: 'event',
                eventName: 'order_placed_net',
                tags: {
                  revenue: orderTotal
                }
              }
            })
          }

        } else if (editingBox) {
          dispatch({
            type: actionTypes.TRACKING,
            trackingData: {
              actionType: 'Order Edited',
              order_id: basketOrderId,
              order_total: orderTotal,
              promo_code: promoCode,
              signp: false,
              subscription_active: isActiveSubsc,
            },
            optimizelyData: {
              type: 'event',
              eventName: 'order_edited_gross',
              tags: {
                revenue: editedGrossTotal
              }
            }
          })
          dispatch({
            type: actionTypes.TRACKING,
            optimizelyData: {
              type: 'event',
              eventName: 'order_edited_net',
              tags: {
                revenue: editedNetTotal
              }
            }
          })
        } else {
          dispatch({
            type: actionTypes.TRACKING,
            trackingData: {
              actionType: 'Order Placed',
              order_id: basketOrderId,
              order_total: orderTotal,
              promo_code: promoCode,
              signp: false,
              subscription_active: isActiveSubsc,
            },
            optimizelyData: {
              type: 'event',
              eventName: 'order_placed_gross',
              tags: {
                revenue: grossTotal
              }
            }
          })
          dispatch({
            type: actionTypes.TRACKING,
            optimizelyData: {
              type: 'event',
              eventName: 'order_placed_net',
              tags: {
                revenue: orderTotal
              }
            }
          })
        }
      }

      dispatch({
        type: actionTypes.BASKET_CHECKOUT,
        trackingData: {
          actionType: actionTypes.BASKET_CHECKED_OUT,
          numRecipes,
          view,
          dietary_attribute: dietaryAttribute,
        },
      })
    }
    catch (err) {
      dispatch(statusActions.error(actionTypes.BASKET_CHECKOUT, true))
      logger.error(err)
    }
    finally {
      dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
    }
  }
)

export const basketProceedToCheckout = () => (
  async (dispatch, getState) => {
    const { basket, filters } = getState()
    const dietaryAttribute = filters.get('dietaryAttributes').toJS()
    dispatch({
      type: actionTypes.BASKET_CHECKOUT_PROCEED,
      trackingData: {
        actionType: actionTypes.BASKET_CHECKOUT_PROCEED,
        basket,
        dietary_attribute: dietaryAttribute,
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

export const basketUpdateProducts = (isOrderConfirmation = false) => (
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
    const { temp } = getState()

    try {
      const { data: order } = await updateOrderItems(token, orderId, submitData)
      dispatch({
        type: actionTypes.BASKET_CHECKOUT,
        trackingData: {
          actionType: actionTypes.BASKET_CHECKED_OUT,
          order,
        },
      })

      await dispatch({
        type: actionTypes.BASKET_ORDER_DETAILS_LOADED,
        orderId: order.id,
        orderDetails: Immutable.fromJS(order),
      })

      if (isOrderConfirmation) {
        dispatch(orderConfirmationUpdateOrderTracking())
      }

      const originalGrossTotal = temp.get('originalGrossTotal')
      const originalNetTotal = temp.get('originalNetTotal')
      const orderTotal = order && order.prices && order.prices.total
      const grossTotal = order && order.prices && order.prices.grossTotal
      const editedGrossTotal = originalGrossTotal && grossTotal ? (grossTotal - originalGrossTotal).toFixed(2) : ''
      const editedNetTotal = originalNetTotal && orderTotal ? (orderTotal - originalNetTotal).toFixed(2) : ''

      dispatch({
        type: actionTypes.TRACKING,
        optimizelyData: {
          type: 'event',
          eventName: 'order_edited_gross',
          tags: {
            revenue: editedGrossTotal
          }
        }
      })
      dispatch({
        type: actionTypes.TRACKING,
        optimizelyData: {
          type: 'event',
          eventName: 'order_edited_net',
          tags: {
            revenue: editedNetTotal
          }
        }
      })

      dispatch(tempActions.temp('originalGrossTotal', grossTotal))
      dispatch(tempActions.temp('originalNetTotal', orderTotal))
      dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
    } catch (err) {
      dispatch(statusActions.error(actionTypes.BASKET_CHECKOUT, err.message))
      dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
      logger.error(err)
      throw err
    }
  }
)

export const basketReset = () => ({
  type: actionTypes.BASKET_RESET,
})

export const basketSignupCollectionReceive = collection => ({
  type: actionTypes.BASKET_SIGNUP_COLLECTION_RECEIVE,
  collection,
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
  basketRecipesClear,
  basketRecipesPositionsClear,
  basketRecipeAdd,
  basketRecipeRemove,
  basketSlotChange,
  basketPreviewOrderChange,
  basketSlotClear,
  basketIdChange,
  basketTariffChange,
  basketChosenAddressChange,
  basketRestorePreviousValues,
  basketRestorePreviousDate,
  basketCheckedOut,
  basketProceedToCheckout,
  basketUpdateProducts,
  basketReset,
  basketSignupCollectionReceive,
}

export default actions
