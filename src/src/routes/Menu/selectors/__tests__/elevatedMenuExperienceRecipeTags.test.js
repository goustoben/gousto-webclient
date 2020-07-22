import Immutable from 'immutable'
import {
  getElevatedMenuExperienceRecipeTags,
} from '../elevatedMenuExperienceRecipeTags'

describe('getElevatedMenuExperienceRecipeTags', () => {
  const recipeId = '123'
  const brand = {
    data: {
      tags: [
        {
          slug: 'new-eme',
          text: 'New',
          type: 'general',
          themes: [{
            name: 'light',
            color: '#01A92B',
            borderColor: '#01A92B'
          }]
        },
        {
          slug: 'limited-edition-eme',
          text: 'Limited Edition',
          type: 'general',
          themes: [{
            name: 'light',
            color: '#01A92B',
            borderColor: '#01A92B'
          }]
        },
        {
          slug: 'joe-wicks-eme',
          text: 'Joe Wicks',
          type: 'general',
          themes: [{
            name: 'light',
            color: '#01A92B',
            borderColor: '#01A92B'
          }]
        },
      ]
    }
  }
  const newTag = {
    type: 'general',
    slug: 'new-eme',
    text: 'New',
    themes: undefined,
    theme: { name: 'light', color: '#01A92B', borderColor: '#01A92B' },
  }
  const limitedEditionTag = {
    slug: 'limited-edition-eme',
    text: 'Limited Edition',
    theme: {borderColor: '#01A92B', color: '#01A92B', name: 'light'},
    themes: undefined,
    type: 'general',
  }
  const joeWicksTag = {
    slug: 'joe-wicks-eme',
    text: 'Joe Wicks',
    theme: {borderColor: '#01A92B', color: '#01A92B', name: 'light'},
    themes: undefined,
    type: 'general',
  }
  let recipes

  beforeEach(() => {
    recipes = Immutable.Map()
  })

  describe('when recipe does not exist', () => {
    describe('when brand exists', () => {
      test('should return null', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, { recipeId, brand })

        expect(result).toEqual(null)
      })
    })

    describe('when brand does not exists', () => {
      test('should return null', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, { recipeId, brand: null })

        expect(result).toEqual(null)
      })
    })
  })

  describe('when recipe exists', () => {
    beforeEach(() => {
      recipes = recipes.set(recipeId, Immutable.Map({ id: recipeId }))
    })

    describe('when recipe is new and without promotion', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], true)
        recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List([]))
      })

      test('should return new recipe tag', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, { recipeId, brand })

        expect(result).toEqual({
          topLeftTag: newTag,
          topRightTag: null,
        })
      })
    })

    describe('when recipe is not new and without promotion', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], false)
        recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List([]))
      })

      test('should return null', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, { recipeId, brand })

        expect(result).toEqual({
          topLeftTag: null,
          topRightTag: null,
        })
      })
    })

    describe('when recipe is new and with limited-edition-eme promotion', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], true)
        recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List(['limited-edition-eme']))
      })

      test('should return limited edition recipe tag', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, { recipeId, brand })

        expect(result).toEqual({
          topLeftTag: limitedEditionTag,
          topRightTag: null,
        })
      })
    })

    describe('when recipe is not new and with limited-edition-eme promotion', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], false)
        recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List(['limited-edition-eme']))
      })

      test('should return limited edition recipe tag', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, { recipeId, brand })

        expect(result).toEqual({
          topLeftTag: limitedEditionTag,
          topRightTag: null,
        })
      })
    })

    describe('when recipe is new and with joe-wicks-eme promotion', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], true)
        recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List(['joe-wicks-eme']))
      })

      test('should return new recipe tag', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, { recipeId, brand })

        expect(result).toEqual({
          topLeftTag: newTag,
          topRightTag: joeWicksTag
        })
      })

      describe('when recipe is not new and with joe-wicks-eme promotion', () => {
        beforeEach(() => {
          recipes = recipes.setIn([recipeId, 'isNew'], false)
          recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List(['joe-wicks-eme']))
        })

        test('should return joe wicks tag', () => {
          const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, { recipeId, brand })

          expect(result).toEqual({
            topLeftTag: null,
            topRightTag: joeWicksTag,
          })
        })
      })
    })
  })
})
