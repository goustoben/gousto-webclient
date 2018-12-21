import { seActions } from './seActions'

const seCategory = 'Order Get Help'

const acceptRefund = (action) => ({
  type: seActions[action.type],
  data: { amount: action.amount },
  seCategory,
})

const selectContactChannel = (action) => ({
  type: seActions[action.type],
  data: { channel: action.channel },
  seCategory,
})

const selectIngredients = (action) => ({
  type: seActions[action.type],
  data: action.selectedIngredientAndRecipeIds,
  seCategory,
})

const selectIngredientIssues = (action) => ({
  type: seActions[action.type],
  data: action.ingredientAndRecipeIdsWithIssueName,
  seCategory,
})

const selectOrderIssue = (action) => ({
  type: seActions[action.type],
  data: { order_issue: action.issue },
  seCategory,
})

export {
  acceptRefund,
  selectContactChannel,
  selectIngredients,
  selectIngredientIssues,
  selectOrderIssue,
}
