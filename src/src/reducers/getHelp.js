import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import { actionTypes } from 'routes/GetHelp/actions/actionTypes'
import { fromJS, Map, OrderedMap } from 'immutable'

const getHelpInitialState = fromJS({
  ingredientIssues: [],
  ingredientSubIssues: [],
  order: {
    id: '',
    recipeItems: [],
  },
  orders: Map(),
  recipes: [],
  selectedIngredients: {},
})

const reduceRecipes = (recipes) => (
  Object.keys(recipes).map((recipeId) => {
    const recipe = recipes[recipeId]
    const { id, title, url } = recipe
    const ingredients = recipe.ingredients.map(
      ({ id: ingredientId, label: ingredientLabel }) => (
        { id: ingredientId, label: ingredientLabel, url }
      )
    )

    return { id, title, ingredients, url }
  })
)

const getHelp = (state, action) => {
  if (!state) {
    return getHelpInitialState
  }

  switch (action.type) {
  case actionTypes.GET_HELP_STORE_ORDER: {
    const { id, recipeIds } = action.payload

    return state.set('order', fromJS({
      id,
      recipeItems: recipeIds,
    }))
  }
  case webClientActionTypes.GET_HELP_STORE_ORDER_ID: {
    return state.setIn(['order', 'id'], action.id)
  }
  case webClientActionTypes.GET_HELP_STORE_SELECTED_INGREDIENTS: {
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
  case webClientActionTypes.GET_HELP_STORE_SELECTED_INGREDIENT_ISSUE: {
    const { ingredientAndRecipeId, issueName } = action
    const issueId = String(action.issueId)

    return state
      .setIn(['selectedIngredients', ingredientAndRecipeId, 'issueId'], issueId)
      .setIn(['selectedIngredients', ingredientAndRecipeId, 'issueName'], issueName)
  }
  case webClientActionTypes.GET_HELP_STORE_INGREDIENT_ISSUE_REASONS: {
    const issueReasons = Object.keys(action.issueReasons)
      .reduce((accumulator, key) => {
        const { recipeId, ingredientId } = action.issueReasons[key]

        return accumulator.set(`${recipeId}-${ingredientId}`, fromJS({
          ...action.issueReasons[key],
        }))
      }, state.get('selectedIngredients'))

    return state.set('selectedIngredients', issueReasons)
  }
  case webClientActionTypes.GET_HELP_RECIPES_RECEIVE: {
    const recipes = fromJS(reduceRecipes(action.recipes))

    return state.set('recipes', recipes)
  }
  case webClientActionTypes.GET_HELP_LOAD_ORDERS_BY_ID: {
    const { order } = action

    if (order) {
      const recipeItems = order.recipeItems.map((item) => (item.recipeId))

      return state.setIn(['order', 'recipeItems'], fromJS(recipeItems))
    }

    return state
  }
  case webClientActionTypes.GET_HELP_FETCH_INGREDIENT_ISSUES: {
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
  case actionTypes.GET_HELP_LOAD_ORDERS: {
    const reduceOrders = (reducerState, order) => {
      const { id, deliveryDate, deliverySlot, recipeItems } = order
      const { deliveryEnd, deliveryStart } = deliverySlot
      const recipeIds = recipeItems.map((item) => (item.recipeId))

      return reducerState.set(
        id,
        fromJS({
          deliveryDate,
          deliverySlot: {
            deliveryEnd,
            deliveryStart,
          },
          id,
          recipeIds,
        })
      )
    }

    const actionReducedOrders = action.orders.reduce(reduceOrders, OrderedMap({}))

    return state.set('orders', actionReducedOrders)
  }
  default:
    return state
  }
}

export {
  getHelp,
  getHelpInitialState,
}
