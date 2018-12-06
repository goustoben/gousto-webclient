import actionTypes from 'actions/actionTypes'
import { fromJS } from 'immutable'

const getHelpInitialState = fromJS({
  order: {
    id: '',
    recipeItems: [],
  },
  recipes: [{
    id: '',
    title: '',
    ingredients: [{
      id: '',
      label: '',
    }]
  }],
  selectedIngredients: [],
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
  case actionTypes.GET_HELP_STORE_SELECTED_INGREDIENTS: {
    return state.set('selectedIngredients', fromJS(action.selectedIngredients))
  }
  case actionTypes.RECIPES_RECEIVE: {
    const recipes = fromJS(reduceRecipes(action.recipes))

    return state.set('recipes', recipes)
  }
  case actionTypes.USER_LOAD_ORDERS: {
    const order = action.orders[0]

    if (order) {
      const recipeItems = order.recipeItems.map((item) => (item.recipeId))

      return state.setIn(['order', 'recipeItems'], fromJS(recipeItems))
    }

    return state
  }
  default:
    return state
  }
}

export {
  getHelp,
  getHelpInitialState,
}
