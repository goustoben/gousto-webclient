import { getHelpTracking } from 'middlewares/tracking/snowplow/getHelp'
import actions from 'actions/actionTypes'

describe('snowplow get help tracking events', () => {
  const {
    selectOrderIssue,
    selectContactChannel,
    selectIngredients,
    selectIngredientIssues,
  } = getHelpTracking

  test('selectOrderIssue works correctly', () => {
    const action = {
      type: actions.GET_HELP_ORDER_ISSUE_SELECT,
      issue: 'ingredients'
    }

    expect(selectOrderIssue(action)).toEqual({
      data: {
        order_issue: 'ingredients',
      },
      seCategory: 'Order Get Help',
      type: 'OrderIssue Selected'
    })
  })

  test('selectContactChannel works correctly', () => {
    const action = {
      type: actions.GET_HELP_CONTACT_CHANNEL_SELECT,
      channel: 'email'
    }

    expect(selectContactChannel(action)).toEqual({
      data: {
        channel: 'email',
      },
      seCategory: 'Order Get Help',
      type: 'GoustoAgent Contact'
    })
  })

  test('selectIngredients works correctly', () => {
    const action = {
      type: actions.GET_HELP_STORE_SELECTED_INGREDIENTS,
      selectedIngredientAndRecipeIds: [{ recipeId: '1234', ingredientId: '4567890' }]
    }

    expect(selectIngredients(action)).toEqual({
      data: [{ ingredientId: '4567890', recipeId: '1234' }],
      seCategory: 'Order Get Help',
      type: 'IngredientsSelection Confirmed'
    })
  })

  test('selectIngredientIssues works correctly', () => {
    const action = {
      type: actions.GET_HELP_INGREDIENT_ISSUES_SELECT,
      ingredientAndRecipeIdsWithIssueName: [{
        ingredientId: '3023a6f7d7133ac88089a2fc416954a8',
        issueName: 'Missing ingredients',
        recipeId: '1494'
      }]
    }

    expect(selectIngredientIssues(action)).toEqual({
      data: [{
        ingredientId: '3023a6f7d7133ac88089a2fc416954a8',
        issueName: 'Missing ingredients',
        recipeId: '1494'
      }],
      seCategory: 'Order Get Help',
      type: 'IngredientsIssues Confirmed'
    })
  })
})

