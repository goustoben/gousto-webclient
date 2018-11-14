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
  getHelpInitialState,
}
