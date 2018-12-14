import actionTypes from 'actions/actionTypes'
import { fromJS } from 'immutable'

const getHelpInitialState = fromJS({
  ingredientIssues: [],
  ingredientSubIssues: [],
  order: {
    id: '',
    recipeItems: [],
  },
  recipes: [],
  selectedIngredients: {},
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
    console.log('action.selectedIngredients', action.selectedIngredients)

    const selectedIngredients = action.selectedIngredients.map(selectedIngredient => {
      const currentRecipe = state.get('recipes')
        .find(recipe => recipe.get('id') === selectedIngredient.recipeId)

      const currentIngredient = currentRecipe && currentRecipe.ingredients
        .find(ingredient => ingredient.get('id') === selectedIngredient.ingredientId)

      return {
        ...selectedIngredient,
        label: currentIngredient.label,
      }
    })

    return state.set('selectedIngredients', fromJS(selectedIngredients))
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
  case actionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES: {
    const formattedIssues = action.ingredientIssues.data
      .filter(ingredientIssue => ingredientIssue.type === 'category')
      .map(ingredientIssue => ({
        id: String(ingredientIssue.category.id),
        label: ingredientIssue.category.name,
        requireDescription: ingredientIssue.category.requireDescription,
      }))
    const formattedSubIssues = action.ingredientIssues.data
      .filter(ingredientIssue => ingredientIssue.type === 'subcategory')
      .map(ingredientIssue => ({
        id: String(ingredientIssue.category.id),
        label: ingredientIssue.category.name,
        groupLabel: ingredientIssue.groupLabel,
        requireDescription: ingredientIssue.category.requireDescription,
      }))

    return state.set('ingredientIssues', fromJS(formattedIssues))
      .set('ingredientSubIssues', fromJS(formattedSubIssues))
  }
  default:
    return state
  }
}

export {
  getHelp,
  getHelpInitialState,
}
