import Immutable from 'immutable'
import { getRecipeId, getDietaryTags } from '../recipe'

describe('given recipes utility functions', () => {
  describe('when the getRecipeId is called', () => {
    test('then the recipe id is returned', () => {
      const recipe = Immutable.Map({ id: 'someId'})
      expect(getRecipeId(recipe)).toBe('someId')
    })
  })

  describe('when the getDietaryTags is called', () => {
    describe('when a valid recipe is sent as param', () => {
      let recipe
      beforeEach(() => {
        recipe = Immutable.fromJS({
          dietaryClaims: [{
            slug: 'gluten-free'
          }]
        })
      })
      test('should return recipe dietaryClaims array of tags', () => {
        const result = getDietaryTags(recipe)
        expect(result).toEqual(Immutable.List(['gluten-free']))
      })
    })
    describe('when a null recipe is sent as param', () => {
      let recipe
      beforeEach(() => {
        recipe = null
      })
      test('should return recipe dietaryClaims array of tags', () => {
        const result = getDietaryTags(recipe)
        expect(result).toEqual(Immutable.List([]))
      })
    })
  })
})
