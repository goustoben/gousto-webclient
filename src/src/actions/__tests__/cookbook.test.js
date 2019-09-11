import actionStatus from 'actions/status'
import actionTypes from 'actions/actionTypes'
import cookbookActions from 'actions/cookbook'
import { fetchRecipeStepsById } from 'apis/recipes'

const { pending, error } = actionStatus

jest.mock('actions/status')
jest.mock('apis/recipes')

describe('Cookbook actions', () => {
  let dispatch
  let err
  let recipeId
  let recipeStepsById

  beforeEach(() => {
    dispatch = jest.fn()
    err = new Error('Error')
    recipeId = '123'
    recipeStepsById = [
      {
        'step_number': 1,
        'instruction': 'Instruction',
        'media': {}
      }
    ]
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('cookbookLoadRecipeStepsById successful', () => {
    beforeEach(async () => {
      fetchRecipeStepsById.mockResolvedValueOnce({ data: recipeStepsById })
      await cookbookActions.cookbookLoadRecipeStepsById(recipeId)(dispatch)
    })

    test('should dispatch status pending true for COOKBOOK_FETCH_RECIPE_STEPS_BY_ID', () => {
      expect(pending).toHaveBeenCalledWith('COOKBOOK_FETCH_RECIPE_STEPS_BY_ID', true)
    })

    test('should dispatch status pending false for COOKBOOK_FETCH_RECIPE_STEPS_BY_ID', () => {
      expect(pending).toHaveBeenCalledWith('COOKBOOK_FETCH_RECIPE_STEPS_BY_ID', false)
    })

    test('should map the arguments through to fetchRecipeStepsById correctly', () => {
      expect(fetchRecipeStepsById).toHaveBeenCalledWith(recipeId)
    })

    test('should dispatch action COOKBOOK_FETCH_RECIPE_STEPS_BY_ID with recipeId and steps', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.COOKBOOK_FETCH_RECIPE_STEPS_BY_ID,
        recipeId,
        recipeStepsById,
      })
    })
  })

  describe('cookbookLoadRecipeStepsById error', () => {
    beforeEach(async () => {
      fetchRecipeStepsById.mockRejectedValue(err)
      await cookbookActions.cookbookLoadRecipeStepsById(recipeId)(dispatch)
    })

    test('should dispatch status error is null as default for COOKBOOK_FETCH_RECIPE_STEPS_BY_ID', () => {
      expect(error).toHaveBeenCalledWith('COOKBOOK_FETCH_RECIPE_STEPS_BY_ID', null)
    })

    test('should dispatch status error is err for COOKBOOK_FETCH_RECIPE_STEPS_BY_ID', () => {
      expect(error).toHaveBeenCalledWith('COOKBOOK_FETCH_RECIPE_STEPS_BY_ID', err)
    })
  })
})
