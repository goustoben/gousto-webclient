import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

const recipes = {
  recipes: (state = Immutable.Map({}), action) => {
    switch (action.type) {
    case actionTypes.COOKBOOK_RECEIVE_COLLECTION_RECIPES:
    case actionTypes.RECIPES_RECEIVE: {
      const newRecipes = (action.recipes || []).reduce((reducerState, recipe) => reducerState.set(recipe.id, Immutable.fromJS(recipe)), Immutable.OrderedMap({}))
      const newState = state.merge(newRecipes)

      return newState
    }

    default: {
      return state
    }
    }
  },

  recipesStock: (state = Immutable.List([]), action) => {
    switch (action.type) {
    case actionTypes.RECIPES_PERIOD_STOCK_RECEIVE: {
      return Immutable.List(action.stock)
    }

    default: {
      return state
    }
    }
  },
}

export default recipes
