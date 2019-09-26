import Immutable from 'immutable'
import {
  shortlistRecipeAdd,
  shortlistRecipeRemove,
  shortlistRecipesClear,
  shortlistRecipesPositionClear,
  shortlistFeedbackViewed,
  shortlistFeedbackDismissTracking,
  shortlistFeedbackSubmit,
  shortlistFeedbackTestConsent
} from 'actions/shortlist'
import actionTypes from 'actions/actionTypes'
import { shortlistLimitReached } from 'utils/basket'

jest.mock('utils/basket', () => ({
  shortlistLimitReached: jest.fn(),
  limitReached: jest.fn().mockReturnValue(false)
}))

describe('shortlist actions', () => {
  const dispatch = jest.fn()
  const mainState = {
    basket: Immutable.fromJS({
      numPortions: 2,
      recipes: {
        '123': 1
      },
      shortlist: {
        shortlistRecipes: {},
        shortlistLimitReached: false,
        shortlistFeedbackViewed: false,
        shortlistUsed: false,
      }
    }),
    menuRecipes: {},
    menuRecipeStock: {},
    filters: Immutable.fromJS({
      currentCollectionId: 'ca8f71be-63ac-11e6-a693-068306404bab'
    })
  }

  const getState = jest.fn().mockReturnValue({
    ...mainState
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('shortlistRecipeAdd', () => {
    const recipeInfo = { position: '20', view: 'grid' }

    describe('if force is true', () => {

      test('should dispatch recipeId and action type SHORTLIST_RECIPE_ADD', () => {
        shortlistRecipeAdd('123', true, recipeInfo)(dispatch, getState)
        expect(dispatch).toHaveBeenCalledWith({
          recipeId: "123",
          position: '20',
          view: 'grid',
          type: actionTypes.SHORTLIST_RECIPE_ADD,
        })
      })

      test('should dispatch limitReached to be false and action type SHORTLIST_LIMIT_REACHED', () => {
        shortlistLimitReached.mockReturnValue(false)
        shortlistRecipeAdd('123', true, recipeInfo)(dispatch, getState)
        expect(dispatch).toHaveBeenCalledWith({ shortlistLimitReached: false, type: actionTypes.SHORTLIST_LIMIT_REACHED })
      })

      test('should dispatch limitReached to be true and action type SHORTLIST_LIMIT_REACHED', () => {
        shortlistLimitReached.mockReturnValue(true)
        shortlistRecipeAdd('123', true, recipeInfo)(dispatch, getState)
        expect(dispatch).toHaveBeenCalledWith({ shortlistLimitReached: true, type: actionTypes.SHORTLIST_LIMIT_REACHED })
      })

      describe('when recipe in basket', () => {
        test('should dispatch remove recipe from basket', () => {
          const basket = {
            basket: Immutable.fromJS({
              numPortions: 2,
              recipes: {
                '123': 1
              },
              shortlist: {}
            }),
          }
          const getNewState = jest.fn()
            .mockReturnValueOnce({
              ...mainState,
              ...basket
            })
            .mockReturnValueOnce({
              ...mainState,
              ...basket
            })
            .mockReturnValue({
              ...mainState,
            })
          shortlistLimitReached.mockReturnValue(false)
          shortlistRecipeAdd('123', false, recipeInfo)(dispatch, getNewState)
          expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: actionTypes.BASKET_RECIPE_REMOVE,
            recipeId: '123',
          }))
        })
      })
    })

    describe('if force is false', () => {
      describe('if limitReached is true', () => {
        test('should not dispatch anything ', () => {
          shortlistLimitReached.mockReturnValue(true)
          expect(dispatch).not.toHaveBeenCalled()
        })
      })

      describe('if limitReached is false', () => {
        test('should dispatch recipeId and action type SHORTLIST_RECIPE_ADD', () => {
          shortlistLimitReached.mockReturnValue(false)
          shortlistRecipeAdd('123', false, recipeInfo)(dispatch, getState)
          expect(dispatch).toHaveBeenCalledWith({
            recipeId: "123",
            position: '20',
            view: 'grid',
            collection: 'ca8f71be-63ac-11e6-a693-068306404bab',
            type: actionTypes.SHORTLIST_RECIPE_ADD,
            trackingData: {
              actionType: 'Shortlist Recipe Added',
              recipeId: "123",
              view: 'grid',
              position: '20',
              collection: 'ca8f71be-63ac-11e6-a693-068306404bab',
              source: false,
              shortlistRecipes: Immutable.Map(),
              basketRecipes: Immutable.Map({
                '123': 1
              })
            }
          })
        })

        describe('if limitReached is true after adding recipe to shortlist ', () => {
          test('should dispatch limitReached and SHORTLIST_LIMIT_REACHED', () => {
            shortlistLimitReached.mockReturnValueOnce(false).mockReturnValueOnce(true)
            shortlistRecipeAdd('123', false, recipeInfo)(dispatch, getState)
            expect(dispatch).toHaveBeenCalledWith({ shortlistLimitReached: true, type: actionTypes.SHORTLIST_LIMIT_REACHED })
          })
        })
      })
    })
  })

  describe('shortlistRecipeRemove', () => {
    const recipeInfo = { position: '20', view: 'grid' }

    test('should dispatch recipeId and action type SHORTLIST_RECIPE_REMOVE', () => {
      shortlistRecipeRemove('123', recipeInfo)(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        recipeId: '123',
        type: actionTypes.SHORTLIST_RECIPE_REMOVE,
        trackingData: {
          actionType: 'Shortlist Recipe Remove',
          recipeId: '123',
          view: 'grid',
          collection: 'ca8f71be-63ac-11e6-a693-068306404bab',
          source: false,
          shortlistRecipes: Immutable.Map(),
          basketRecipes: Immutable.Map({
            '123': 1
          }),
          shortlistPosition: 0
        }
      })
    })

    test('should recalculate shortlistLimitReached when called and if returns false then dispatches SHORTLIST_LIMIT_REACHED with shortlistLimitReached as false', () => {
      shortlistLimitReached.mockReturnValue(false)
      shortlistRecipeRemove('123', recipeInfo)(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.SHORTLIST_LIMIT_REACHED, shortlistLimitReached: false })
    })
  })

  describe('shortlistRecipesClear', () => {
    test('should dispatch SHORTLIST_RECIPES_CLEAR', () => {
      dispatch(shortlistRecipesClear())
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.SHORTLIST_RECIPES_CLEAR,
      })
    })
  })

  describe('shortlistRecipesPositionClear', () => {
    test('should dispatch SHORTLIST_RECIPES_POSITIONS_CLEAR', () => {
      dispatch(shortlistRecipesPositionClear())
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.SHORTLIST_RECIPES_POSITIONS_CLEAR,
      })
    })
  })

  describe('shortlistFeedbackViewed', () => {
    test('should dispatch SHORTLIST_FEEDBACK_VIEWED and trackingData', () => {
      const result = shortlistFeedbackViewed()
      expect(result).toEqual({
        type: actionTypes.SHORTLIST_FEEDBACK_VIEWED,
        value: true,
        trackingData: {
          actionType: 'Shortlist Feedback Viewed',
        }
      })
    })
  })

  describe('shortlistFeedbackDismissTracking', () => {
    test('should dispatch SHORTLIST_FEEDBACK_DISMISSED and trackingData', () => {
      const result = shortlistFeedbackDismissTracking()
      expect(result).toEqual({
        type: actionTypes.SHORTLIST_FEEDBACK_DISMISSED,
        trackingData: {
          actionType: 'Shortlist Feedback Dismissed'
        }
      })
    })
  })

  describe('shortlistFeedbackSubmit', () => {
    test('should dispatch SHORTLIST_FEEDBACK_SUBMITTED and trackingData with feedback text', () => {
      const result = shortlistFeedbackSubmit('test-feedback')
      expect(result).toEqual({
        type: actionTypes.SHORTLIST_FEEDBACK_SUBMITTED,
        trackingData: {
          actionType: 'Shortlist Feedback Submitted',
          feedback: 'test-feedback'
        }
      })
    })
  })

  describe('shortlistFeedbackTestConsent', () => {
    test('should dispatch SHORTLIST_FEEDBACK_FUTURE_TEST_CONSENT and trackingData with consent true', () => {
      const result = shortlistFeedbackTestConsent('test-feedback')
      expect(result).toEqual({
        type: actionTypes.SHORTLIST_FEEDBACK_FUTURE_TEST_CONSENT,
        trackingData: {
          actionType: 'Shortlist Feedback Future Tests Consent',
          consent: true
        }
      })
    })
  })
})

