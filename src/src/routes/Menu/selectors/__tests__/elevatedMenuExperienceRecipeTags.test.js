import Immutable from 'immutable'
import {
  getElevatedMenuExperienceRecipeTags,
  getBrandTagline,
} from '../elevatedMenuExperienceRecipeTags'
import { getAllTags } from '../recipe'

describe('getElevatedMenuExperienceRecipeTags and getBrandTagline', () => {
  const recipeId = '123'
  const defaultRecipe = {
    id: recipeId,
    promotions: Immutable.List([])
  }
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
        {
          slug: 'health-kitchen-eme',
          text: 'Health Kitchen',
          type: 'general',
          themes: [{
            name: 'light',
            color: '#01A92B',
            borderColor: '#01A92B'
          }]
        },
        {
          slug: 'fine-dine-in-eme',
          text: 'Fine Dine In',
          type: 'general',
          themes: [{
            name: 'light',
            color: '#01A92B',
            borderColor: '#01A92B'
          }]
        },
        {
          slug: 'available-weekly-eme',
          text: 'Everyday Favourites',
          type: 'general',
          themes: [{
            name: 'light',
            color: '#01A92B',
            borderColor: '#01A92B'
          }]
        },
        {
          slug: 'mexico-limited-edition-eme',
          text: 'Dough It Yourself Pizza',
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
  const allTags = getAllTags({ brand })
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
  const healthKitchenTag = {
    slug: 'health-kitchen-eme',
    text: 'Health Kitchen',
    theme: {borderColor: '#01A92B', color: '#01A92B', name: 'light'},
    themes: undefined,
    type: 'general',
  }
  const fineDineInTag = {
    slug: 'fine-dine-in-eme',
    text: 'Fine Dine In',
    theme: {borderColor: '#01A92B', color: '#01A92B', name: 'light'},
    themes: undefined,
    type: 'general',
  }
  const everydayFavouritesTag = {
    slug: 'available-weekly-eme',
    text: 'Everyday Favourites',
    theme: {borderColor: '#01A92B', color: '#01A92B', name: 'light'},
    themes: undefined,
    type: 'general',
  }
  const mexicoLimitedEditionTag = {
    slug: 'mexico-limited-edition-eme',
    text: 'Dough It Yourself Pizza',
    theme: {borderColor: '#01A92B', color: '#01A92B', name: 'light'},
    themes: undefined,
    type: 'general'
  }

  let recipes
  let tagline

  beforeEach(() => {
    recipes = Immutable.Map()
  })

  describe('when recipe does not exist', () => {
    describe('when brand exists', () => {
      test('should return null', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand)

        expect(result).toEqual(null)
      })
    })

    describe('when brand does not exists', () => {
      test('should return null', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, null)

        expect(result).toEqual(null)
      })
    })
  })

  describe('when recipe exists', () => {
    beforeEach(() => {
      recipes = recipes.set(recipeId, Immutable.Map({ ...defaultRecipe }))
    })

    describe('when recipe is new and without promotion', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], true)
      })

      test('should return new recipe tag', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand)
        const taglineResult = getBrandTagline.resultFunc(undefined, allTags)

        expect(result).toEqual({
          topLeftTag: newTag,
        })
        expect(taglineResult).toBe(null)
      })
    })

    describe('when recipe is not new and without promotion', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], false)
      })

      test('should return null', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand)
        const taglineResult = getBrandTagline.resultFunc(undefined, allTags)

        expect(result).toEqual({
          topLeftTag: null,
        })
        expect(taglineResult).toBe(null)
      })
    })

    describe('when recipe is new and with limited-edition-eme promotion', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], true)
        recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List(['limited-edition-eme']))
      })

      test('should return limited edition recipe tag', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand)

        expect(result).toEqual({
          topLeftTag: limitedEditionTag,
        })
      })
    })

    describe('when recipe is not new and with limited-edition-eme promotion', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], false)
        recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List(['limited-edition-eme']))
      })

      test('should return limited edition recipe tag', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand)

        expect(result).toEqual({
          topLeftTag: limitedEditionTag,
        })
      })
    })

    describe('when recipe is new with mexico-limited-edition promotion', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], true)
      })

      test('should return new tag and mexico limited edition tag', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand)

        expect(result).toEqual({
          topLeftTag: newTag,
        })
      })
    })

    describe('when recipe is not new with mexico-limited-edition promotion', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], false)
        tagline = 'mexico-limited-edition-eme'
      })

      test('should return mexico limited edition tag', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand)
        const taglineResult = getBrandTagline.resultFunc(tagline, allTags)

        expect(result).toEqual({
          topLeftTag: null,
        })
        expect(taglineResult).toEqual(mexicoLimitedEditionTag)
      })
    })

    describe('when joe-wicks-eme promotion', () => {
      describe('when recipe is new and with joe-wicks-eme promotion', () => {
        beforeEach(() => {
          recipes = recipes.setIn([recipeId, 'isNew'], true)
          tagline = 'joe-wicks-eme'
        })

        test('should return new recipe tag', () => {
          const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand)
          const taglineResult = getBrandTagline.resultFunc(tagline, allTags)

          expect(result).toEqual({
            topLeftTag: newTag,
          })
          expect(taglineResult).toEqual(joeWicksTag)
        })
      })

      describe('when recipe is not new and with joe-wicks-eme promotion', () => {
        beforeEach(() => {
          recipes = recipes.setIn([recipeId, 'isNew'], false)
          tagline = 'joe-wicks-eme'
        })

        test('should return joe wicks tag', () => {
          const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand)
          const taglineResult = getBrandTagline.resultFunc(tagline, allTags)

          expect(result).toEqual({
            topLeftTag: null,
          })
          expect(taglineResult).toEqual(joeWicksTag)
        })
      })
    })

    describe('when joe-wicks promotion', () => {
      describe('when recipe is new and with joe-wicks promotion', () => {
        beforeEach(() => {
          recipes = recipes.setIn([recipeId, 'isNew'], true)
          tagline = 'joe-wicks-eme'
        })

        test('should return joe wicks tag on right and new on left', () => {
          const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand)
          const taglineResult = getBrandTagline.resultFunc(tagline, allTags)

          expect(result).toEqual({
            topLeftTag: newTag,
          })
          expect(taglineResult).toEqual(joeWicksTag)
        })
      })
    })

    describe('when recipe is fine dine in', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isFineDineIn'], true)
        tagline = 'fine-dine-in-eme'
      })

      test('should return only right tag', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand)
        const taglineResult = getBrandTagline.resultFunc(tagline, allTags)

        expect(result).toEqual({
          topLeftTag: null,
        })
        expect(taglineResult).toEqual(fineDineInTag)
      })
    })

    describe('when recipe food brand is everyday favourites', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List([]))
        tagline = 'available-weekly-eme'
      })

      test('should return available-weekly-eme', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand)
        const taglineResult = getBrandTagline.resultFunc(tagline, allTags)

        expect(result).toEqual({
          topLeftTag: null,
        })
        expect(taglineResult).toEqual(everydayFavouritesTag)
      })
    })

    describe('when promotion is health kitchen', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], false)
        tagline = 'health-kitchen-eme'
      })

      test('should return health-kitchen-eme', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand)
        const taglineResult = getBrandTagline.resultFunc(tagline, allTags)

        expect(result).toEqual({
          topLeftTag: null,
        })
        expect(taglineResult).toEqual(healthKitchenTag)
      })
    })

    describe('when promotion is not part of EME', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], false)
        tagline = 'something-else'
      })

      test('should return null', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand)
        const taglineResult = getBrandTagline.resultFunc(tagline, allTags)

        expect(result).toEqual({
          topLeftTag: null,
        })
        expect(taglineResult).toBe(null)
      })
    })
  })
})
