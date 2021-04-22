import { seActions } from './seActions'

const seCategory = 'help'

const acceptIngredientRefund = (action) => ({
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
  data: action.selectedIngredientsInfo.map(({ recipeId, label }) => ({
    recipeId,
    ingredientName: label,
  })),
  seCategory,
})

const selectIngredientIssues = (action) => ({
  type: seActions[action.type],
  data: action.ingredientIssuesInfo,
  seCategory,
})

const selectOrderIssue = (action) => ({
  type: seActions[action.type],
  data: { order_issue: action.issue },
  seCategory,
})

export {
  acceptIngredientRefund,
  selectContactChannel,
  selectIngredients,
  selectIngredientIssues,
  selectOrderIssue,
}
