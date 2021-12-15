import { client } from 'config/routes'
import { browserHistory } from 'react-router'
import webClientStatusActions from 'actions/status'
import { getAccessToken } from 'selectors/auth'
import { getSelectedAddress } from '../selectors/addressSelectors'
import { actionTypes, trackingKeys } from './actionTypes'
import { getOrderId } from '../selectors/selectors'
import { getSelectedRecipeCards, getSelectedRecipeCardIssues } from '../selectors/recipesSelectors'
import { SE_CATEGORY_HELP } from './getHelp'
import { requestRecipeCardsWithIssueReasons } from '../../../apis/getHelp'
import { asyncAndDispatch } from './utils'

export const trackContinueToRecipeCardsIssues = () => (dispatch, getState) => {
  const state = getState()
  const orderId = getOrderId(state)
  const recipeIds = getSelectedRecipeCards(state)

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: trackingKeys.ssrPrintedRecipeCardsContinue,
      order_id: orderId,
      recipe_ids: recipeIds,
      no_of_recipe_cards: recipeIds.length,
      seCategory: SE_CATEGORY_HELP,
    }
  })
}

export const setSelectedRecipeCards = (recipeIds) => ({
  type: actionTypes.GET_HELP_SET_SELECTED_RECIPE_CARDS,
  payload: {
    recipeIds
  }
})

export const trackPrintedRecipeCardClickRecipe = () => (dispatch, getState) => {
  const state = getState()
  const recipeIds = getSelectedRecipeCards(state)

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: trackingKeys.ssrPrintedRecipeCardsClickRecipe,
      no_of_recipe_cards: recipeIds.length,
      seCategory: SE_CATEGORY_HELP,
    }
  })
}

export const trackPrintedRecipeCardClickDone = () => (dispatch, getState) => {
  const state = getState()
  const orderId = getOrderId(state)
  const recipeIds = getSelectedRecipeCards(state)
  const issues = getSelectedRecipeCardIssues(state)

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: trackingKeys.ssrPrintedRecipeCardsClickDone,
      order_id: orderId,
      no_of_recipe_cards: recipeIds.length,
      issues,
      seCategory: SE_CATEGORY_HELP,
    }
  })
}

export const trackPrintedRecipeCardClickCookbook = () => (dispatch, getState) => {
  const state = getState()
  const orderId = getOrderId(state)
  const recipeIds = getSelectedRecipeCards(state)
  const issues = getSelectedRecipeCardIssues(state)

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: trackingKeys.ssrPrintedRecipeCardsClickCookbook,
      order_id: orderId,
      no_of_recipe_cards: recipeIds.length,
      issues,
      seCategory: SE_CATEGORY_HELP,
    }
  })
}

export const trackPrintedRecipeCardsConfirmOrder = (issuesMapped) => (dispatch, getState) => {
  // at the time of this event the store doesn't have issues
  const state = getState()
  const orderId = getOrderId(state)
  const recipeIds = getSelectedRecipeCards(state)

  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: trackingKeys.ssrPrintedRecipeCardsConfirmOrder,
      order_id: orderId,
      no_of_recipe_cards: recipeIds.length,
      issues: issuesMapped,
      seCategory: SE_CATEGORY_HELP,
    }
  })
}
export const setRecipeCardRequestWithIssueReasons = (
  userId,
  orderId,
  selectedIssueTypes,
) => async (dispatch, getState) => {
  const getPayload = async () => {
    const state = getState()
    const accessToken = getAccessToken(state)
    const selectedAddressId = getSelectedAddress(state).id
    const issues = Object.values(selectedIssueTypes)
    const COMPLAINT_CATEGORY_ID_MAP = {
      1: 'missing',
      2: 'wrong',
    }

    const issuesFormattedForTracking = issues.reduce((acc, { coreRecipeId, complaintCategoryId }) => ({
      ...acc,
      [coreRecipeId]: COMPLAINT_CATEGORY_ID_MAP[complaintCategoryId],
    }), {})

    await requestRecipeCardsWithIssueReasons(accessToken, userId, orderId, selectedAddressId, issues)

    dispatch(trackPrintedRecipeCardsConfirmOrder(issuesFormattedForTracking))

    browserHistory.push(`${client.getHelp.recipeCardsConfirmation({ userId, orderId })}`)

    return {
      issues: issuesFormattedForTracking
    }
  }

  await asyncAndDispatch({
    dispatch,
    actionType: actionTypes.GET_HELP_SET_SELECTED_RECIPE_CARDS_ISSUES,
    getPayload,
    errorMessage: `Failed to request recipe cards for userId ${userId}, orderId ${orderId}, selectedIssueTypes ${selectedIssueTypes}`,
  })
}

export const cleanErrorForRecipeCards = () => (
  webClientStatusActions.error(actionTypes.GET_HELP_SET_SELECTED_RECIPE_CARDS_ISSUES, null)
)
