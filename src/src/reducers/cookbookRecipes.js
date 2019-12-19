import Immutable from 'immutable'
import actionTypes from '../actions/actionTypes'

export const initialState = Immutable.Map()

const cookbookRecipes = {
  cookbookRecipes: (state = initialState, { type, recipes }) => {
    switch (type) {
    case actionTypes.COOKBOOK_RECIPES_RECEIVE: {
      const newRecipes = (recipes || []).reduce((reducerState, recipe) => reducerState.set(recipe.id, Immutable.fromJS(recipe)), Immutable.OrderedMap({}))
      const newState = state.merge(newRecipes)

      return newState
    }

    default:
      return state
    }
  },
}

export { cookbookRecipes }
