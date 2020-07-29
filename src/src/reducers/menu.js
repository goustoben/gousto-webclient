import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import config from 'config/basket'
import moment from 'moment'
import { getMenuLimits, getMenuVariants, switchSelectedVariants } from '../utils/menu'

export const menuInitialState = Immutable.Map({
  forceLoad: false,
  accessToken: '',
  menuVariant: '',
  menuLimits: [],
  menuVariants: {},
  selectedRecipeVariants: {},
  currentExpandedRecipeVariantsDropdown: null,
  collectionHeaders: {},
  hasCalculatedTimeToUsable: false,
  hasVisitedNonMenuPage: false,
  menuPrefetched: true,
  features: Immutable.Map({})
})

const menu = {
  menu: (state = menuInitialState, action) => {
    switch (action.type) {
    case actionTypes.MENU_FORCE_LOAD: {
      return state.set('forceLoad', action.forceLoad)
    }

    case actionTypes.MENU_FETCH_PARAMS: {
      return state
        .set('accessToken', action.accessToken)
        .set('menuVariant', action.menuVariant)
    }

    case actionTypes.MENU_SERVICE_DATA_RECEIVED: {
      const menuLimits = getMenuLimits(action.response.data)
      const menuVariants = getMenuVariants(action.response.data)

      return state
        .set('menuLimits', menuLimits)
        .set('menuVariants', Immutable.fromJS(menuVariants))
    }

    case actionTypes.MENU_RECIPE_VARIANT_SELECTED: {
      const originalVariants = state.get('selectedRecipeVariants')
      const newVariants = switchSelectedVariants(originalVariants, action.payload)

      return state
        .set('currentExpandedRecipeVariantsDropdown', null)
        .set('selectedRecipeVariants', newVariants)
    }

    case actionTypes.MENU_CLEAR_SELECTED_RECIPE_VARIANTS: {
      return state.set('selectedRecipeVariants', {})
    }

    case actionTypes.MENU_RECIPE_VARIANTS_DROPDOWN_EXPANDED: {
      return state.set('currentExpandedRecipeVariantsDropdown', action.payload.recipeId)
    }

    case actionTypes.MENU_COLLECTIONS_HEADERS_RECEIVED: {
      return state.set('collectionHeaders', action.payload.collectionHeaders)
    }

    case actionTypes.MENU_SET_CALCULATED_TIME_TO_USABLE: {
      return state
        .set('hasCalculatedTimeToUsable', true)
    }

    case actionTypes.MENU_PREFETCHED: {
      return state.set('menuPrefetched', action.payload.menuPrefetched)
    }

    case '@@router/LOCATION_CHANGE': {
      if (__SERVER__) {
        return state
      }

      const { payload: { pathname} } = action

      if (pathname !== '/menu') {
        return state.set('hasVisitedNonMenuPage', true)
      }

      return state
    }

    case actionTypes.MENU_SET_FEATURE: {
      const { payload: { name, value }} = action
      let newState = state
      newState = newState.setIn(['features', name], value)

      return newState
    }

    default:
      return state
    }
  },
  menuRecipeDetails: (state = Immutable.Map({}), action) => {
    switch (action.type) {
    case actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE:
      return state.set('recipeId', action.recipeId)

    default:
      return state
    }
  },

  menuCutoffUntil: (state = '', action) => {
    switch (action.type) {
    case actionTypes.MENU_CUTOFF_UNTIL_RECEIVE: {
      return action.cutoffUntil || state
    }

    default:
      return state
    }
  },

  menuRecipes: (state = Immutable.List(), action) => {
    switch (action.type) {
    case actionTypes.RECIPES_RECEIVE: {
      const newState = Immutable.List(action.recipes.map(recipe => recipe.id))

      return newState
    }

    default:
      return state
    }
  },

  menuRecipesUpdatedAt: (state = null, action) => {
    switch (action.type) {
    case actionTypes.RECIPES_RECEIVE: {
      return moment.now()
    }

    default:
      return state
    }
  },

  menuRecipeStock: (state = Immutable.Map({}), action) => {
    function loadStock(state, action) { // eslint-disable-line no-shadow
      const portions = config.portions.allowed
      let newState = state

      Object.keys(action.stock).forEach(recipeId => {
        const stockEntry = action.stock[recipeId]
        portions.forEach(portion => {
          if (stockEntry[portion] || stockEntry[portion] === null) {
            let newStockLevel
            const currentStockLevel = newState.getIn([recipeId, String(portion)], 0)
            if (currentStockLevel) {
              newStockLevel = currentStockLevel + stockEntry[portion]
            } else {
              newStockLevel = stockEntry[portion]
            }
            newState = newState.setIn([recipeId, String(portion)], newStockLevel)
          } else {
            newState = newState.setIn([recipeId, String(portion)], state.getIn([recipeId, String(portion)], 0))
          }
        })
      })

      return newState
    }

    switch (action.type) {
    case actionTypes.MENU_RECIPE_STOCK_CLEAR:
      return Immutable.Map({})

    case actionTypes.MENU_RECIPE_STOCK_REPLACE: {
      return loadStock(Immutable.Map({}), action)
    }
    case actionTypes.MENU_RECIPE_STOCK_CHANGE: {
      return loadStock(state, action)
    }

    default:
      return state
    }
  },

  menuRecipeStockUpdatedAt: (state = 0, action) => {
    switch (action.type) {
    case actionTypes.MENU_RECIPE_STOCK_REPLACE:
      return Date.now()

    default:
      return state
    }
  },

  menuBoxPrices: (state = Immutable.Map({}), action) => {
    switch (action.type) {
    case actionTypes.MENU_BOX_PRICES_RECEIVE:
      return Immutable.fromJS(action.prices)

    default:
      return state
    }
  },

  menuBoxPricesTariff: (state = null, action) => {
    switch (action.type) {
    case actionTypes.MENU_BOX_PRICES_RECEIVE:
      return action.tariffId || null

    default:
      return state
    }
  },

  menuReceiveMenuPending: (state = false, action) => {
    switch (action.type) {
    case actionTypes.MENU_RECIPES_RECEIVE_PENDING:
      return action.pending
    default:
      return state
    }
  },

  menuBrowseCTAShow: (state = false, action) => {
    switch (action.type) {
    case actionTypes.MENU_BROWSE_CTA_VISIBILITY_CHANGE:
      return action.show
    default:
      return state
    }
  },

  menuCollections: (state = Immutable.OrderedMap(), action) => {
    switch (action.type) {
    case actionTypes.MENU_COLLECTIONS_RECEIVE: {
      const collections = Immutable.fromJS(action.collections)
      let newState = Immutable.OrderedMap()
      collections.forEach(collection => {
        newState = newState.set(collection.get('id'), collection)
      })

      return newState
    }
    default:
      return state
    }
  },

}

export default menu
