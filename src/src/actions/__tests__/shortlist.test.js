import Immutable from 'immutable'
import { shortlistRecipeAdd } from 'actions/shortlist'
import actionTypes from 'actions/actionTypes'
import { shortlistLimitReached } from 'utils/basket'

jest.mock('utils/basket', () => ({
  shortlistLimitReached: jest.fn()
}))

describe('shortlist actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn().mockReturnValue({
    basket: Immutable.fromJS({
      numPortions: 2,
      shortlist: {}
    }),
    menuRecipes: {},
    menuRecipeStock: {},
    filters: Immutable.fromJS({
      currentCollectionId: 'ca8f71be-63ac-11e6-a693-068306404bab'
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('shortlistRecipeAdd', () => {
    const recipeInfo = {poisiton: '20'}

    describe('if force is true', () => {

      test('should dispatch recipeId and action type SHORTLIST_RECIPE_ADD', () => {
        shortlistRecipeAdd('123', true, recipeInfo)(dispatch, getState)
        expect(dispatch).toHaveBeenCalledWith({ recipeId: "123", poisiton: '20', type: actionTypes.SHORTLIST_RECIPE_ADD })
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
          expect(dispatch).toHaveBeenCalledWith({ recipeId: "123", poisiton: '20', collection: 'ca8f71be-63ac-11e6-a693-068306404bab', type: actionTypes.SHORTLIST_RECIPE_ADD })
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
})

