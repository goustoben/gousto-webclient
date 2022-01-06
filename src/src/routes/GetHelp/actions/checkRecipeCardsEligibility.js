import { getAccessToken } from 'selectors/auth'
import { validateRecipeCards } from '../apis/ssrrecipecards'
import { asyncAndDispatch } from './utils'
import { actionTypes } from './actionTypes'

export const checkRecipeCardsEligibility = (userId, orderId, coreRecipeIds) => async (dispatch, getState) => {
  const accessToken = getAccessToken(getState())

  const getPayload = async () => {
    const { data: { eligibleCoreRecipeIds } } = await validateRecipeCards(
      accessToken,
      userId,
      orderId,
      coreRecipeIds
    )

    return { eligibleCoreRecipeIds }
  }

  await asyncAndDispatch({
    dispatch,
    actionType: actionTypes.GET_HELP_CHECK_RECIPE_CARDS_ELIGIBILITY,
    getPayload,
    errorMessage: `Failed to checkRecipeCardsEligibility userId: ${userId}, orderId: ${orderId}, coreRecipeIds: ${coreRecipeIds}`
  })
}
