import actionTypes from 'actions/actionTypes'
import { fromJS } from 'immutable'

const getHelpInitialState = fromJS({
  order: {
    id: '',
  },
  recipes: [{
    id: '',
    title: '',
    ingredients: [{
      id: '',
      label: '',
    }]
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

  const requestKeys = [
    actionTypes.RECIPES_RECEIVE,
    actionTypes.USER_LOAD_ORDERS,
  ]

  switch (action.type) {
  case actionTypes.PENDING: {
    if (requestKeys.includes(action.key)) {
      return state.setIn(['status', 'pending'], action.value)
    }

    return state
  }
  case actionTypes.ERROR: {
    if (requestKeys.includes(action.key)) {
      return state.setIn(['status', 'error'], action.value || '')
    }

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
