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
    menuRecipeStock: {}
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('shortlistRecipeAdd', () => {
    describe('if force is true', () => {
      test('should dispatch recipeId and action type SHORTLIST_RECIPE_ADD', () => {
        shortlistRecipeAdd('123', true)(dispatch, getState)
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ recipeId: "123", type: actionTypes.SHORTLIST_RECIPE_ADD }))
      })

      test('should dispatch limitReached to be false and action type SHORTLIST_LIMIT_REACHED', () => {
        shortlistLimitReached.mockReturnValue(false)
        shortlistRecipeAdd('123', true)(dispatch, getState)
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ limitReached: false, type: actionTypes.SHORTLIST_LIMIT_REACHED }))
      })

      test('should dispatch limitReached to be true and action type SHORTLIST_LIMIT_REACHED', () => {
        shortlistLimitReached.mockReturnValue(true)
        shortlistRecipeAdd('123', true)(dispatch, getState)
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ limitReached: true, type: actionTypes.SHORTLIST_LIMIT_REACHED }))
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
          shortlistRecipeAdd('123', false)(dispatch, getState)
          expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ recipeId: "123", type: actionTypes.SHORTLIST_RECIPE_ADD }))
        })

        describe('if limitReached is true after adding recipe to shortlist ', () => {
          test('should dispatch limitReached and SHORTLIST_LIMIT_REACHED', () => {
            shortlistLimitReached.mockReturnValueOnce(false).mockReturnValueOnce(true)
            shortlistRecipeAdd('123', false)(dispatch, getState)
            expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ limitReached: true, type: actionTypes.SHORTLIST_LIMIT_REACHED }))
          })
        })
      })
    })
  })
})

