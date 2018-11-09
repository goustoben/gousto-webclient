import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'
import config from 'config/basket'
import moment from 'moment'

const menuInitialState = Immutable.Map({
  filtersMenuVisible: false,
  forceLoad: false,
  jfyLoaded: false,
})

const menu = {
  menu: (state = menuInitialState, action) => {
    switch (action.type) {
    case actionTypes.MENU_FILTERS_VISIBILITY_CHANGE: {
      return state.merge({
        filtersMenuVisible: action.visible,
      })
    }

    case actionTypes.MENU_FORCE_LOAD: {
      return state.set('forceLoad', action.forceLoad).set('jfyLoaded', true)
    }

    default:
      return state
    }
  },

  menuCutoffUntil: (state = '', action) => {
    switch (action.type) {
    case actionTypes.MENU_CUTOFF_UNTIL_RECEIVE: {
      return action.cutoffUntil
    }

    default:
      return state
    }
  },

  menuCollectionRecipes: (state = Immutable.Map({}), action) => {
    switch (action.type) {
    case actionTypes.MENU_COLLECTION_RECIPES_RECEIVE: {
      return state.set(action.collectionId, Immutable.List(action.recipes.map(recipe => recipe.id)))
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
    case actionTypes.MENU_COLLECTION_RECIPES_RECEIVE:
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

  menuRecieveMenuPending: (state = false, action) => {
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

  menuFilterVegetarian: (state = false, action) => {
    switch (action.type) {
    case actionTypes.MENU_FILTER_VEGETARIAN:
      return action.filter
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
