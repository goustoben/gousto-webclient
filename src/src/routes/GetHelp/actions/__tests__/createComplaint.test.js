import Immutable from 'immutable'
import { setComplaint } from 'apis/getHelp'
import { trackAcceptIngredientsRefund } from 'actions/getHelp'
import { createComplaint } from '../createComplaint'
import * as getHelpActionsUtils from '../utils'

jest.mock('apis/getHelp')
jest.mock('actions/getHelp')

const AMOUNT = 1.4
const TYPE = 'credit'
const ACCESS_TOKEN = 'adfjlakjds13'

const USER_ID = '1234'
const ORDER_ID = '4455'
const ACTION_TYPE = 'GET_HELP_CREATE_COMPLAINT'

const SELECTED_INGREDIENTS = {
  '385&3c07d126-f655-437c-aa1d-c38dbbae0398': {
    recipeId: '385',
    ingredientUuid: '3c07d126-f655-437c-aa1d-c38dbbae0398',
    label: '8ml soy sauce',
    recipeGoustoReference: '408',
    issueId: '4',
    issueName: 'Wrong Ingredients',
    issueDescription: 'description A'
  },
  '2223&488d5751-dcff-4985-88c0-bf745ff54904': {
    recipeId: '2223',
    ingredientUuid: '488d5751-dcff-4985-88c0-bf745ff54904',
    label: '40g Cornish clotted cream',
    recipeGoustoReference: '2093',
    issueId: '3',
    issueName: 'Missing Ingredients',
    issueDescription: 'description B'
  },
}

const STATE = {
  auth: Immutable.fromJS({ accessToken: ACCESS_TOKEN }),
  user: Immutable.fromJS({
    id: USER_ID,
  }),
  getHelp: Immutable.fromJS({
    compensation: {
      amount: AMOUNT,
      type: TYPE,
    },
    order: {
      id: ORDER_ID,
    },
    selectedIngredients: SELECTED_INGREDIENTS,
  })
}

const dispatch = jest.fn()
const getState = jest.fn().mockReturnValue(STATE)
const asyncAndDispatchSpy = jest.spyOn(getHelpActionsUtils, 'asyncAndDispatch')

describe('Given createComplaint action is called', () => {
  beforeEach(async () => {
    await createComplaint()(dispatch, getState)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('no main action is dispatched', () => {
    expect(dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: ACTION_TYPE })
    )
  })

  test('setComplaint is called with the right params', () => {
    const issues = Object.keys(SELECTED_INGREDIENTS).map(key => {
      const {
        issueId,
        ingredientUuid,
        issueDescription,
        recipeGoustoReference,
      } = SELECTED_INGREDIENTS[key]

      return {
        category_id: Number(issueId),
        ingredient_id: ingredientUuid,
        description: issueDescription,
        recipe_gousto_reference: recipeGoustoReference,
      }
    })

    expect(setComplaint).toHaveBeenCalledWith(
      ACCESS_TOKEN,
      {
        customer_id: Number(USER_ID),
        order_id: Number(ORDER_ID),
        type: TYPE,
        value: AMOUNT,
        issues,
      }
    )
  })

  test('asyncAndDispatch is called with the right params', () => {
    expect(asyncAndDispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        dispatch,
        actionType: ACTION_TYPE,
        errorMessage: `Failed to createComplaint for orderId: ${ORDER_ID}, userId: ${USER_ID}`,
      })
    )
  })

  test('trackAcceptIngredientsRefund is called with amount', () => {
    expect(trackAcceptIngredientsRefund).toHaveBeenCalledWith(AMOUNT)
  })
})
