import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'

const home = {
  homeCarouselRecipes: (state = Immutable.OrderedMap({}), action) => {
    switch (action.type) {
    case actionTypes.HOME_CAROUSEL_LOADED:
      return action.recipes.reduce((reducerState, recipe) => reducerState.set(recipe.id, Immutable.fromJS(recipe)), Immutable.OrderedMap({}))
    default:
      return state
    }
  },
}

export default home
