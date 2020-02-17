import Immutable from 'immutable'
import { getRecipeId } from '../recipe'

describe('given recipes utility functions', () => {
  describe('when the getRecipeId is called', () => {
    test('then the recipe id is returned', () => {
      const recipe = Immutable.Map({ id: 'someId'})
      expect(getRecipeId(recipe)).toBe('someId')
    })
  })
})
