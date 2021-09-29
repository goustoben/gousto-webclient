import { getHelpTracking } from 'middlewares/tracking/snowplow/getHelp'
import { actionTypes } from 'actions/actionTypes'

describe('snowplow get help tracking events', () => {
  const {
    acceptIngredientRefund,
    selectOrderIssue,
    selectContactChannel,
    selectIngredients,
    selectIngredientIssues,
  } = getHelpTracking

  test('selectOrderIssue works correctly', () => {
    const action = {
      type: actionTypes.GET_HELP_ORDER_ISSUE_SELECT,
      issue: 'ingredients'
    }

    expect(selectOrderIssue(action)).toEqual({
      data: {
        order_issue: 'ingredients',
      },
      seCategory: 'help',
      type: 'ssr_order_issue_selected'
    })
  })

  test('selectContactChannel works correctly', () => {
    const action = {
      type: actionTypes.GET_HELP_CONTACT_CHANNEL_SELECT,
      channel: 'email'
    }

    expect(selectContactChannel(action)).toEqual({
      data: {
        channel: 'email',
      },
      seCategory: 'help',
      type: 'click_agent_contact_method'
    })
  })

  test('selectIngredients works correctly', () => {
    const ACTION = {
      type: actionTypes.GET_HELP_STORE_SELECTED_INGREDIENTS,
      selectedIngredientsInfo: [{ recipeId: '1234', label: '4567890' }]
    }

    expect(selectIngredients(ACTION)).toEqual({
      data: [{ recipeId: '1234', ingredientName: '4567890' }],
      seCategory: 'help',
      type: 'ssr_ingredients_selection_confirmed'
    })
  })

  test('selectIngredientIssues works correctly', () => {
    const ACTION = {
      type: actionTypes.GET_HELP_INGREDIENT_ISSUES_SELECT,
      ingredientIssuesInfo: [{
        ingredientName: '3023a6f7d7133ac88089a2fc416954a8',
        issueName: 'Missing ingredients',
        recipeId: '1494'
      }]
    }

    expect(selectIngredientIssues(ACTION)).toEqual({
      data: ACTION.ingredientIssuesInfo,
      seCategory: 'help',
      type: 'ssr_ingredients_issues_confirmed'
    })
  })

  test('acceptIngredientRefund works correctly', () => {
    const action = {
      type: actionTypes.GET_HELP_INGREDIENTS_ACCEPT_REFUND,
      amount: 2,
      isMultiComplaints: false
    }

    expect(acceptIngredientRefund(action)).toEqual({
      data: {
        amount: 2,
        is_second_complaint: false,
      },
      seCategory: 'help',
      type: 'ssr_ingredients_accept_refund'
    })
  })
})
