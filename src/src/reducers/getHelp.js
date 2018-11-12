import actionTypes from 'actions/actionTypes'
import { fromJS } from 'immutable'

const getHelpInitialState = fromJS({
  order: {
    id: '',
  },
  recipes: [{
    id: '',
    title: '',
    ingredients: {
      id: '',
      label: '',
    }
  }],
})

const getHelpRequestInitialState = fromJS({
  status: {
    pending: false,
    error: ''
  }
})

const reduceRecipes = (recipes) => (
  Object.keys(recipes).map((recipeId) => {
    const recipe = recipes[recipeId]
    const { id, title } = recipe
    const ingredients = recipe.ingredients.map(
      ({ id: ingredientId, label: ingredientLabel }) => (
        { id: ingredientId, label: ingredientLabel }
      )
    )

    return { id, title, ingredients }
  })
)

const getHelpRequests = (state, action) => {
  if (!state) {
    return getHelpRequestInitialState
  }

  switch (action.type) {
  case actionTypes.RECIPES_RECEIVE:
  case actionTypes.USER_LOAD_ORDERS:
  case actionTypes.GET_HELP_GET_INGREDIENTS: {
    state
      .setIn(['status', 'error'], state.error)
      .setIn(['status', 'pending'], state.pending)

    /* eslint-disable no-console */
    console.log('>>>', state.get('status').toJS())

    return state
  }
  default:
    return state
  }
}

const getHelp = (state, action) => {
  if (!state) {
    return getHelpInitialState
  }

  switch (action.type) {
  case actionTypes.GET_HELP_STORE_ORDER_ID: {
    return state.setIn(['order', 'id'], action.id)
  }
  case actionTypes.RECIPES_RECEIVE: {
    const recipes = fromJS(reduceRecipes(action.recipes))

    return state.set('recipes', recipes)
  }
  default:
    return state
  }
}

export {
  getHelp,
  getHelpRequests,
  getHelpInitialState,
}
