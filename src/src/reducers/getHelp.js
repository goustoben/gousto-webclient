import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import { actionTypes } from 'routes/GetHelp/actions/actionTypes'
import { fromJS, Map, OrderedMap } from 'immutable'

const getHelpInitialState = fromJS({
  ingredientIssues: [],
  ingredientSubIssues: [],
  order: {
    id: '',
    recipeItems: [],
    recipeDetailedItems: [],
    deliverySlot: {},
    deliveryDate: null,
    trackingUrl: '',
    hasPassedDeliveryValidation: false,
    deliveryCompensationAmount: null,
  },
  orders: Map(),
  recipes: [],
  selectedIngredients: {},
  ineligibleIngredientUuids: [],
})

const reduceRecipes = (recipes) => (
  Object.keys(recipes).map((recipeId) => {
    const recipe = recipes[recipeId]
    const { id, goustoReference, title, url } = recipe
    const ingredients = recipe.ingredients.map(
      ({ label: ingredientLabel, uuid: ingredientUuid }) => (
        { label: ingredientLabel, url, uuid: ingredientUuid }
      )
    )

    return { id, title, ingredients, url, goustoReference }
  })
)

const getHelp = (state, action) => {
  if (!state) {
    return getHelpInitialState
  }

  switch (action.type) {
  case actionTypes.GET_HELP_STORE_ORDER: {
    const { id, recipeIds, recipeDetailedItems, deliverySlot, deliveryDate } = action.payload

    return state.set('order', fromJS({
      id,
      recipeItems: recipeIds,
      recipeDetailedItems,
      deliverySlot,
      deliveryDate,
    }))
  }
  case webClientActionTypes.GET_HELP_STORE_ORDER_ID: {
    return state.setIn(['order', 'id'], action.id)
  }
  case webClientActionTypes.GET_HELP_STORE_SELECTED_INGREDIENTS: {
    const orderRecipeItems = state.getIn(['order', 'recipeDetailedItems']).toJS()
    const selectedIngredients = {}
    action.selectedIngredientsInfo.forEach(({ recipeId, ingredientUuid, label }) => {
      selectedIngredients[`${recipeId}&${ingredientUuid}`] = {
        recipeId,
        ingredientUuid,
        label,
        recipeGoustoReference: orderRecipeItems[recipeId],
      }
    })

    return state.set('selectedIngredients', fromJS(selectedIngredients))
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
        const { recipeId, ingredientUuid } = action.issueReasons[key]

        return accumulator.set(`${recipeId}&${ingredientUuid}`, fromJS({
          ...action.issueReasons[key],
        }))
      }, state.get('selectedIngredients'))

    return state.set('selectedIngredients', issueReasons)
  }
  case webClientActionTypes.GET_HELP_LOAD_ORDERS_BY_ID: {
    const { order } = action.payload

    if (order) {
      const recipeItems = order.recipeItems.map((item) => (item.recipeId))
      const recipeDetailedItems = {}

      order.recipeItems.forEach((item) => {
        recipeDetailedItems[item.recipeId] = item.recipeGoustoReference
      })

      return state
        .setIn(['order', 'recipeItems'], fromJS(recipeItems))
        .setIn(['order', 'recipeDetailedItems'], fromJS(recipeDetailedItems))
        .setIn(['order', 'deliverySlot'], fromJS({
          deliveryEnd: order.deliverySlot.deliveryEnd,
          deliveryStart: order.deliverySlot.deliveryStart,
        }))
        .setIn(['order', 'deliveryDate'], fromJS(order.deliveryDate))
    }

    return state
  }
  case actionTypes.GET_HELP_LOAD_ORDER_AND_RECIPES_BY_IDS: {
    const { order, recipes } = action.payload
    const { recipeItems } = order
    const recipeDetailedItems = {}

    recipeItems.forEach((recipeId) => {
      const recipe = recipes.find(r => r.id === recipeId)

      recipeDetailedItems[recipeId] = recipe.goustoReference
    })

    return state
      .setIn(['order', 'recipeItems'], fromJS(recipeItems))
      .setIn(['order', 'recipeDetailedItems'], fromJS(recipeDetailedItems))
      .setIn(['order', 'deliverySlot'], fromJS({
        deliveryEnd: order.deliverySlot.deliveryEnd,
        deliveryStart: order.deliverySlot.deliveryStart,
      }))
      .setIn(['order', 'deliveryDate'], fromJS(order.deliveryDate))
      .set('recipes', fromJS(reduceRecipes(recipes)))
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
      const recipeDetailedItems = {}

      recipeItems.forEach((item) => {
        recipeDetailedItems[item.recipeId] = item.recipeGoustoReference
      })

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
          recipeDetailedItems,
        })
      )
    }

    const actionReducedOrders = action.orders.reduce(reduceOrders, OrderedMap({}))

    return state.set('orders', actionReducedOrders)
  }
  case actionTypes.GET_HELP_LOAD_TRACKING_URL: {
    return state.setIn(['order', 'trackingUrl'], action.payload.trackingUrl)
  }
  case actionTypes.GET_HELP_VALIDATE_DELIVERY: {
    return state.setIn(['order', 'deliveryCompensationAmount'], action.payload.compensation)
      .setIn(['order', 'hasPassedDeliveryValidation'], action.payload.isValid)
  }
  case webClientActionTypes.GET_HELP_VALIDATE_ORDER: {
    if (action.ineligibleIngredientUuids) {
      return state.set('ineligibleIngredientUuids', fromJS(action.ineligibleIngredientUuids))
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
