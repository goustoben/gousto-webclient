import Immutable from 'immutable'
import { getRecipeTitle, getRecipeURL, getRecipeImages, getDisclaimerForRecipeID } from '../recipe'

describe('the recipe selectors', () => {
  let recipe

  beforeEach(() => {
    recipe = Immutable.fromJS({
      title: 'recipe title',
      url: 'recipe url',
      media: {
        images: [
          { urls: [{ src: 'image src x50', width: 50 }] },
          { urls: [{ src: 'image src x100', width: 100 }] }
        ]
      }
    })
  })

  describe('getRecipeTitle', () => {
    test('returns the title from the recipe', () => {
      expect(getRecipeTitle(recipe)).toBe('recipe title')
    })
  })
  describe('getRecipeURL', () => {
    test('returns the url from the recipe', () => {
      expect(getRecipeURL(recipe)).toBe('recipe url')
    })
  })
  describe('getRecipeImages', () => {
    test('returns the images from the recipe', () => {
      expect(getRecipeImages(recipe)).toEqual(
        Immutable.fromJS([{ src: 'image src x50', width: 50 }])
      )
    })
  })
})

describe('health kitchen recipe selectors', () => {
  let state
  beforeAll(() => {
    state = {
      recipes: Immutable.fromJS({
        1: {
          healthKitchen: {
            disclaimer: 'Iron, magnesium and B vitamins reducing tiredness and fatigue'
          }
        }
      })
    }
  })
  describe('getDisclaimerForRecipeID', () => {
    describe('when recipe is health kitchen', () => {
      test('should return the recipe disclaimer', () => {
        expect(getDisclaimerForRecipeID(state, '1')).toEqual('Iron, magnesium and B vitamins reducing tiredness and fatigue')
      })
    })
    describe('when recipe is not health kitchen', () => {
      test('should not return the recipe disclaimer', () => {
        expect(getDisclaimerForRecipeID(state, '2')).toEqual(null)
      })
    })
  })
})
