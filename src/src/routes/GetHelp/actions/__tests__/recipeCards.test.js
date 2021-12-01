import { fromJS } from 'immutable'
import { actionTypes, trackingKeys } from '../actionTypes'
import {
  trackContinueToRecipeCardsIssues,
  setSelectedRecipeCards,
  trackPrintedRecipeCardClickRecipe,
  trackPrintedRecipeCardClickDone,
  trackPrintedRecipeCardClickCookbook,
} from '../recipeCards'
import { SE_CATEGORY_HELP } from '../getHelp'

describe('Recipe Cards Actions', () => {
  const dispatch = jest.fn()
  const getState = () => ({
    getHelp: fromJS({
      order: {
        id: '123',
      },
      selectedRecipeCards: ['123', '455']
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
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
          seCategory: SE_CATEGORY_HELP,
        }
      })
    })
  })
})
