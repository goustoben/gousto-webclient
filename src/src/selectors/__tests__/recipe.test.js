import Immutable from 'immutable'
import { getRecipeTitle, getRecipeURL, getRecipeImages } from '../recipe'

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
    test('returns the title from the recipe', () => {
      expect(getRecipeURL(recipe)).toBe('recipe url')
    })
  })
  describe('getRecipeImages', () => {
    test('returns the title from the recipe', () => {
      expect(getRecipeImages(recipe)).toEqual(
        Immutable.fromJS([{ src: 'image src x50', width: 50 }])
      )
    })
  })
})
