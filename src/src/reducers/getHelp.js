import actionTypes from 'actions/actionTypes'
import { fromJS, Map } from 'immutable'

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
    const selectedIngredients = action.selectedIngredientAndRecipeIds
      .reduce((accumulator, selectedIngredientAndRecipeId) => {
        const { recipeId, ingredientId } = selectedIngredientAndRecipeId

        const currentRecipe = state.get('recipes')
          .find(recipe => recipe.get('id') === recipeId)

        const currentIngredient = currentRecipe && currentRecipe.get('ingredients')
          .find(ingredient => ingredient.get('id') === ingredientId)

        return accumulator.set(`${recipeId}-${ingredientId}`, fromJS({
          ...selectedIngredientAndRecipeId,
          label: currentIngredient.get('label'),
        }))
      }, Map())

    return state.set('selectedIngredients', selectedIngredients)
  }
  case actionTypes.GET_HELP_STORE_SELECTED_INGREDIENT_ISSUE: {
    const { ingredientAndRecipeId, issueName } = action
    const issueId = String(action.issueId)

    return state
      .setIn(['selectedIngredients', ingredientAndRecipeId, 'issueId'], issueId)
      .setIn(['selectedIngredients', ingredientAndRecipeId, 'issueName'], issueName)
  }
  case actionTypes.GET_HELP_STORE_INGREDIENT_ISSUE_REASONS: {
    const issueReasons = action.issueReasons
      .reduce((accumulator, issueReason) => {
        const { recipeId, ingredientId } = issueReason

        return accumulator.set(`${recipeId}-${ingredientId}`, fromJS({
          ...issueReason,
        }))
      }, state.get('selectedIngredients'))

    return state.set('selectedIngredients', issueReasons)
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
