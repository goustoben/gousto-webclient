import { fromJS } from 'immutable'
import { actionTypes, trackingKeys } from '../actionTypes'
import { trackContinueToRecipeCardsIssues, setSelectedRecipeCards } from '../recipeCards'

describe('trackContinueToRecipeCardsIssues', () => {
  const dispatch = jest.fn()
  const getState = () => ({
    getHelp: fromJS({
      order: {
        id: '123',
      },
      selectedRecipeCards: ['123', '455']
    })
  })
  test('creates the tracking action with the correct action type', () => {
    trackContinueToRecipeCardsIssues()(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: trackingKeys.ssrPrintedRecipeCardsContinue,
        order_id: '123',
        recipe_ids: ['123', '455'],
        no_of_recipe_cards: 2,
        seCategory: 'help',
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
