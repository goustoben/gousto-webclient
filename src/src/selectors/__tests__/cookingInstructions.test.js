import Immutable from 'immutable'
import { getRecipeSteps } from '../cookingInstructions'

describe('cookingInstructions selectors', () => {

  describe('getRecipeSteps', () => {
    test('should return the recipesInstructions', () => {
      const state = {
        cookbook: Immutable.fromJS({
          recipesInstructions: {
            '123': {
              'step_number': 1,
              'instruction': 'Instruction',
              'media': {}
            }
          }
        })
      }
      const recipeId = '123'

      expect(getRecipeSteps(state, recipeId)).toEqual(Immutable.fromJS({
        'step_number': 1,
        'instruction': 'Instruction',
        'media': {}
      }))
    })
  })
})
