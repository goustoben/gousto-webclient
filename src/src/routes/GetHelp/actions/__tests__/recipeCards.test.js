import { fromJS } from 'immutable'
import { safeJestMock } from '_testing/mocks'
import * as authSelectors from 'selectors/auth'
import { actionTypes as webclientActionTypes } from 'actions/actionTypes'
import * as addressSelectors from '../../selectors/addressSelectors'
import { actionTypes, trackingKeys } from '../actionTypes'
import * as getHelpApi from '../../../../apis/getHelp'
import {
  cleanErrorForRecipeCards,
  setRecipeCardRequestWithIssueReasons,
  setSelectedRecipeCards,
  trackContinueToRecipeCardsIssues,
  trackPrintedRecipeCardClickRecipe,
  trackPrintedRecipeCardClickDone,
  trackPrintedRecipeCardClickCookbook,
  trackPrintedRecipeCardsConfirmOrder,
} from '../recipeCards'
import * as getHelpActionsUtils from '../utils'
import { SE_CATEGORY_HELP } from '../getHelp'

const ACCESS_TOKEN = 'adfjlakjds13'
const USER_ID = '1111'
const ORDER_ID = '2222'
const SELECTED_ADDRESS_ID = '777'
const SELECTED_ADDRESS = {
  id: SELECTED_ADDRESS_ID,
},
const SELECTED_ISSUE_TYPES = {
  c123: {
    coreRecipeId: 'c123',
    complaintCategoryId: 2,
  },
  c456: {
    coreRecipeId: 'c456',
    complaintCategoryId: 1,
  },
}

const ISSUES_FORMATTED_FOR_TRACKING = {
  c123: 'wrong',
  c456: 'missing',
}

const RESPONSE = {
  status: 'ok',
}

describe('Recipe Cards Actions', () => {
  const asyncAndDispatchSpy = jest.spyOn(getHelpActionsUtils, 'asyncAndDispatch')
  const dispatch = jest.fn()
  const getState = () => ({
    getHelp: fromJS({
      order: {
        id: '123',
      },
      selectedRecipeCards: ['123', '455'],
      selectedRecipeCardIssues: {
        c123: 'wrong',
        c456: 'missing'
      }
    })
  })
  const requestRecipeCardsWithIssueReasons = safeJestMock(getHelpApi, 'requestRecipeCardsWithIssueReasons')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('setRecipeCardRequestWithIssueReasons', () => {
    beforeEach(async () => {
      jest.spyOn(authSelectors, 'getAccessToken').mockReturnValue(ACCESS_TOKEN)
      jest.spyOn(addressSelectors, 'getSelectedAddress').mockReturnValue(SELECTED_ADDRESS)
      requestRecipeCardsWithIssueReasons.mockResolvedValue(RESPONSE)
      await setRecipeCardRequestWithIssueReasons(
        USER_ID,
        ORDER_ID,
        SELECTED_ISSUE_TYPES
      )(dispatch, getState)
    })

    test('fetchShippingAddresses is called with the right params', async () => {
      const issues = Object.values(SELECTED_ISSUE_TYPES)
      expect(requestRecipeCardsWithIssueReasons)
        .toHaveBeenCalledWith(ACCESS_TOKEN, USER_ID, ORDER_ID, SELECTED_ADDRESS_ID, issues)
    })

    test('the issues are dispatched', async () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.GET_HELP_SET_SELECTED_RECIPE_CARDS_ISSUES,
        payload: {
          issues: ISSUES_FORMATTED_FOR_TRACKING,
        },
      })
    })

    test('asyncAndDispatch is called with the right params', async () => {
      expect(asyncAndDispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          dispatch,
          actionType: actionTypes.GET_HELP_SET_SELECTED_RECIPE_CARDS_ISSUES,
          errorMessage: `Failed to request recipe cards for userId ${USER_ID}, orderId ${ORDER_ID}, selectedIssueTypes ${SELECTED_ISSUE_TYPES}`,
        })
      )
    })
  })

  describe('trackContinueToRecipeCardsIssues', () => {
    test('creates the tracking action with the correct action type', () => {
      trackContinueToRecipeCardsIssues()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: trackingKeys.ssrPrintedRecipeCardsContinue,
          order_id: '123',
          recipe_ids: ['123', '455'],
          no_of_recipe_cards: 2,
          seCategory: SE_CATEGORY_HELP,
        }
      })
    })
  })

  describe('cleanErrorForRecipeCards', () => {
    test('returns an action to reset the error', () => {
      const action = cleanErrorForRecipeCards()
      expect(action).toEqual({
        type: webclientActionTypes.ERROR,
        key: actionTypes.GET_HELP_SET_SELECTED_RECIPE_CARDS_ISSUES,
        value: null,
      })
    })
  })

  describe('setSelectedRecipeCards', () => {
    const recipeIds = ['123', '456']
    test('creates the GET_HELP_SET_SELECTED_RECIPE_CARDS action with the correct action payload', () => {
      expect(setSelectedRecipeCards(recipeIds)).toEqual({
        type: actionTypes.GET_HELP_SET_SELECTED_RECIPE_CARDS,
        payload: {
          recipeIds
        }
      })
    })
  })

  describe('trackPrintedRecipeCardClickRecipe', () => {
    test('creates the tracking action with the correct action type and properties', () => {
      trackPrintedRecipeCardClickRecipe()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: trackingKeys.ssrPrintedRecipeCardsClickRecipe,
          no_of_recipe_cards: 2,
          seCategory: SE_CATEGORY_HELP,
        }
      })
    })
  })

  describe('trackPrintedRecipeCardClickDone', () => {
    test('creates the tracking action with the correct action type and properties', () => {
      trackPrintedRecipeCardClickDone()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: trackingKeys.ssrPrintedRecipeCardsClickDone,
          order_id: '123',
          no_of_recipe_cards: 2,
          issues: ISSUES_FORMATTED_FOR_TRACKING,
          seCategory: SE_CATEGORY_HELP,
        }
      })
    })
  })

  describe('trackPrintedRecipeCardClickCookbook', () => {
    test('creates the tracking action with the correct action type and properties', () => {
      trackPrintedRecipeCardClickCookbook()(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: trackingKeys.ssrPrintedRecipeCardsClickCookbook,
          order_id: '123',
          no_of_recipe_cards: 2,
          issues: ISSUES_FORMATTED_FOR_TRACKING,
          seCategory: SE_CATEGORY_HELP,
        }
      })
    })
  })

  describe('trackPrintedRecipeCardsConfirmOrder', () => {
    test('creates the tracking action with the correct action type and properties', () => {
      trackPrintedRecipeCardsConfirmOrder(ISSUES_FORMATTED_FOR_TRACKING)(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: trackingKeys.ssrPrintedRecipeCardsConfirmOrder,
          no_of_recipe_cards: 2,
          order_id: '123',
          issues: ISSUES_FORMATTED_FOR_TRACKING,
          seCategory: SE_CATEGORY_HELP,
        }
      })
    })
  })
})
