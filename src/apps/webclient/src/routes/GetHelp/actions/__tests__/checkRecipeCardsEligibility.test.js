import { fromJS } from 'immutable'
import { getAccessToken } from 'selectors/auth'
import { validateRecipeCards } from '../../apis/ssrrecipecards'
import { checkRecipeCardsEligibility } from '../checkRecipeCardsEligibility'
import * as getHelpActionsUtils from '../utils'

jest.mock('../../apis/ssrrecipecards', () => ({
  validateRecipeCards: jest.fn()
}))
jest.mock('selectors/auth', () => ({
  getAccessToken: jest.fn()
}))
const asyncAndDispatchSpy = jest.spyOn(getHelpActionsUtils, 'asyncAndDispatch')

const ACCESS_TOKEN = 'adfjlakjds13'
const ACTION_TYPE = 'GET_HELP_CHECK_RECIPE_CARDS_ELIGIBILITY'
const USER_ID = '1234'
const ORDER_ID = '4444'
const CORE_RECIPE_IDS = ['111', '222', '333', '444']
const ELIGIBLE_CORE_RECIPE_IDS = ['111', '333']
const RESPONSE = {
  data: {
    eligibleCoreRecipeIds: ['111', '333'],
  }
}

const dispatch = jest.fn()
const getState = jest.fn(() => ({
  auth: fromJS({
    accessToken: ACCESS_TOKEN,
  })
}))

describe('checkRecipeCardsEligibility', () => {
  beforeAll(async () => {
    getAccessToken.mockReturnValue(ACCESS_TOKEN)
    validateRecipeCards.mockResolvedValue(RESPONSE)
    await checkRecipeCardsEligibility(USER_ID, ORDER_ID, CORE_RECIPE_IDS)(dispatch, getState)
  })

  test('validateRecipeCards is called with the right params', async () => {
    expect(validateRecipeCards)
      .toHaveBeenCalledWith(ACCESS_TOKEN, USER_ID, ORDER_ID, CORE_RECIPE_IDS)
  })

  test('the eligible_core_recipe_ids are dispatched', async () => {
    expect(dispatch).toHaveBeenCalledWith({
      type: ACTION_TYPE,
      payload: {
        eligibleCoreRecipeIds: ELIGIBLE_CORE_RECIPE_IDS,
      },
    })
  })

  test('asyncAndDispatch is called with the right params', async () => {
    expect(asyncAndDispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        dispatch,
        actionType: ACTION_TYPE,
        errorMessage: `Failed to checkRecipeCardsEligibility userId: ${USER_ID}, orderId: ${ORDER_ID}, coreRecipeIds: ${CORE_RECIPE_IDS}`,
      })
    )
  })
})
