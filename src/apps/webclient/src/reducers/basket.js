import { actionTypes } from 'actions/actionTypes'
import moment from 'moment'
import logger from 'utils/logger'
import basketConfig from 'config/basket'
import Immutable from 'immutable'

function calculateBoxSize(adults = 0, kids = 0) {
  let boxSize = 2

  const adultsNumber = parseInt(adults, 10)
  const kidsNumber = parseInt(kids, 10)

  if (Number.isInteger(adultsNumber) && Number.isInteger(kidsNumber)) {
    if (adultsNumber === 1 && kidsNumber <= 2) {
      boxSize = 2
    } else if (adultsNumber === 2 && kidsNumber <= 1) {
      boxSize = 2
    } else {
      boxSize = 4
    }
  }

  return boxSize
}

const initialState = () => Immutable.fromJS({
  address: null,
  addressTypeEdited: false,
  boxId: null,
  collection: '',
  chosenAddress: null,
  currentMenuId: '',
  date: '',
  gifts: {},
  limitReached: false,
  numAdults: 0,
  numPortions: 2,
  orderId: '',
  postcode: '',
  prevDate: '',
  prevPostcode: '',
  prevSlotId: '',
  prevAddress: null,
  previewOrder: {},
  products: {},
  promoCode: '',
  promoCodeApplied: false,
  promoCodeUrl: '',
  recipes: {},
  hasAddedFirstRecipe: false,
  slotId: '',
  unsaved: false,
  previewOrderId: '',
  stepsOrder: [],
  tariffId: null,
  subscriptionOption: 'subscription',
  surcharges: Immutable.List(),
})

const basket = {
  basket: (state, action) => {
    if (!state) {
      // TODO delivery_day_id
      return initialState()
    }

    switch (action.type) {
    case actionTypes.BASKET_ADDRESS_CHANGE: {
      let newState = state
      const prevAddress = state.get('address')
      newState = newState.set('prevAddress', prevAddress)

      return newState.set('address', action.address)
    }

    case actionTypes.BASKET_CHECKOUT: {
      return state.set('unsaved', false)
    }

    case actionTypes.BASKET_DATE_CHANGE: {
      let newState = state
      const date = moment(action.date)
      if (state.get('date')) {
        newState = newState.set('prevDate', state.get('date'))
      }
      newState = newState
        .set('date', date.format('YYYY-MM-DD'))

      return newState
    }

    case actionTypes.BASKET_CURRENT_MENU_ID_CHANGE: {
      return state.set('currentMenuId', action.menuId)
    }

    case actionTypes.BASKET_GIFT_ADD: {
      const currentQty = state.getIn(['gifts', action.giftId], 0)

      return state.setIn(['gifts', action.giftId], currentQty + 1)
    }

    case actionTypes.BASKET_ID_CHANGE: {
      return state.set('orderId', action.orderId)
    }

    case actionTypes.BASKET_ORDER_LOADED: {
      return state.set('editBox', action.editBox)
    }
    case actionTypes.BASKET_ORDER_DETAILS_LOADED: {
      return state.set('orderDetails', action.orderDetails)
    }

    case actionTypes.BASKET_NUM_PORTION_CHANGE: {
      let portionSize = parseInt(action.numPortions, 10)

      if (basketConfig.portions.allowed.indexOf(portionSize) === -1) {
        logger.error({ message: `Invalid serving size: ${action.numPortions}` })
        portionSize = basketConfig.portions.default
      }

      return state.set('numPortions', portionSize)
    }

    case actionTypes.BASKET_NUM_PEOPLE_CHANGE: {
      const { numAdults } = action.people

      let newState = state.set('numAdults', numAdults)
      newState = newState.set('numPortions', calculateBoxSize(numAdults))

      return newState
    }

    case actionTypes.BASKET_POSTCODE_CHANGE: {
      let newState = state
      if (state.get('postcode')) {
        const { forgetPrevPostcode } = action
        newState = newState.set('prevPostcode', !forgetPrevPostcode ? state.get('postcode') : action.postcode)
      }
      newState = newState.set('postcode', action.postcode)

      return newState
    }
    case actionTypes.BASKET_POSTCODE_PENDING: {
      return state.set('postcodePending', action.pending)
    }

    case actionTypes.SET_BASKET_PRODUCTS: {
      return state.setIn(['products'], Immutable.fromJS(action.products))
    }

    case actionTypes.BASKET_PRODUCT_ADD: {
      const currentQty = state.getIn(['products', action.productId], 0)

      let newState = state.setIn(['products', action.productId], currentQty + 1)

      if (action.unsaved) {
        newState = newState.set('unsaved', true)
      }

      return newState
    }

    case actionTypes.BASKET_PRODUCT_REMOVE: {
      const currentQty = state.getIn(['products', action.productId], 0)
      let newState = state

      if (action.unsaved) {
        newState = newState.set('unsaved', true)
      }

      if (currentQty > 1) {
        newState = newState.setIn(['products', action.productId], currentQty - 1)
      } else {
        newState = newState.deleteIn(['products', action.productId])
      }

      return newState
    }

    case actionTypes.BASKET_PROMO_CODE_CHANGE: {
      return state.set('promoCode', typeof action.promoCode === 'string' ? action.promoCode.toUpperCase() : action.promoCode)
    }

    case actionTypes.BASKET_PROMO_CODE_APPLIED_CHANGE: {
      return state.set('promoCodeApplied', action.promoCodeApplied)
    }

    case actionTypes.BASKET_PROMO_CODE_URL_CHANGE: {
      return state.set('promoCodeUrl', action.promoCodeUrl)
    }

    case actionTypes.BASKET_RECIPES_INITIALISE: {
      const { recipes } = action

      return state.set('recipes', Immutable.Map(recipes))
    }

    case actionTypes.BASKET_RECIPE_ADD: {
      const { recipeId } = action
      const currentQty = state.getIn(['recipes', recipeId], 0)
      const hasAddedFirstRecipe = state.get('hasAddedFirstRecipe')

      let newState = state.setIn(['recipes', recipeId], currentQty + 1)

      if (!hasAddedFirstRecipe) {
        newState = newState.setIn(['hasAddedFirstRecipe'], true)
      }

      return newState
    }

    case actionTypes.BASKET_LIMIT_REACHED: {
      return state.set('limitReached', action.limitReached)
    }

    case actionTypes.BASKET_RECIPE_REMOVE: {
      const currentQty = state.getIn(['recipes', action.recipeId], 0)
      let newState = state
      if (currentQty === 1) {
        newState = state.deleteIn(['recipes', action.recipeId], 0)
      } else if (currentQty > 0) {
        newState = state.setIn(['recipes', action.recipeId], currentQty - 1)
      }

      return newState
    }

    case actionTypes.BASKET_DELIVERYDAY_CHANGE: {
      let newState = state
      newState = newState.set('date', action.date)
      newState = newState.set('slotId', action.slotId)

      return newState
    }

    case actionTypes.BASKET_SLOT_CHANGE: {
      let newState = state
      if (state.get('slotId')) {
        newState = newState.set('prevSlotId', state.get('slotId'))
      }
      newState = newState.set('slotId', action.slotId)

      return newState
    }

    case actionTypes.BASKET_CHOSEN_ADDRESS_CHANGE: {
      return state.set('chosenAddress', Immutable.fromJS(action.address))
    }

    case actionTypes.BASKET_PREVIEW_ORDER_CHANGE: {
      return state.merge({
        previewOrderId: action.previewOrderId,
        boxId: action.boxId,
        surcharges: Immutable.fromJS(action.surcharges),
      })
    }

    case actionTypes.BASKET_STEPS_ORDER_RECEIVE: {
      let newState = state
      newState = newState.set('stepsOrder', Immutable.List(action.stepsOrder))

      return newState
    }

    case actionTypes.USER_LOGGED_IN: {
      return state.set('tariffId', initialState().get('tariffId'))
    }

    case actionTypes.BASKET_TARIFF_CHANGE: {
      return state.set('tariffId', action.tariffId)
    }

    case actionTypes.BASKET_RESET: {
      let newState = initialState()

      if (action.payload && action.payload.chosenAddress) {
        newState = newState.set('chosenAddress', Immutable.fromJS(action.payload.chosenAddress))
      }

      return newState
    }

    case actionTypes.BASKET_SIGNUP_COLLECTION_RECEIVE: {
      return state.set('collection', action.collection)
    }

    case actionTypes.CHOOSE_PLAN_CONTINUE: {
      const { subscriptionOption } = action

      return state.set('subscriptionOption', subscriptionOption)
    }

    case actionTypes.BASKET_SET_SUBSCRIPTION_OPTION: {
      const { subscriptionOption } = action

      return state.set('subscriptionOption', subscriptionOption)
    }

    default: {
      return state
    }
    }
  },
}

export { initialState }
export default basket
