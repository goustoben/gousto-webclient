import Immutable from 'immutable'
import {
  getElevatedMenuExperienceRecipeTags,
} from '../elevatedMenuExperienceRecipeTags'

describe('getElevatedMenuExperienceRecipeTags', () => {
  const recipeId = '123'
  const defaultRecipe = {
    id: recipeId,
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
  let recipes

  beforeEach(() => {
    recipes = Immutable.Map()
  })

  describe('when recipe does not exist', () => {
    describe('when brand exists', () => {
      test('should return null', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand, false, false, false)

        expect(result).toEqual(null)
      })
    })

    describe('when brand does not exists', () => {
      test('should return null', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, null, false, false, false)

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
        recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List([]))
      })

      test('should return new recipe tag', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand, false, false, false)

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
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand, false, false, false)

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
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand, false, false, false)

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
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand, false, false, false)

        expect(result).toEqual({
          topLeftTag: limitedEditionTag,
          topRightTag: null,
        })
      })
    })

    describe('when joe-wicks-eme promotion', () => {
      describe('when recipe is new and with joe-wicks-eme promotion', () => {
        beforeEach(() => {
          recipes = recipes.setIn([recipeId, 'isNew'], true)
          recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List(['joe-wicks-eme']))
        })

        test('should return new recipe tag', () => {
          const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand, false, false, false)

          expect(result).toEqual({
            topLeftTag: newTag,
            topRightTag: joeWicksTag
          })
        })
      })

      describe('when recipe is not new and with joe-wicks-eme promotion', () => {
        beforeEach(() => {
          recipes = recipes.setIn([recipeId, 'isNew'], false)
          recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List(['joe-wicks-eme']))
        })

        test('should return joe wicks tag', () => {
          const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand, false, false, false)

          expect(result).toEqual({
            topLeftTag: null,
            topRightTag: joeWicksTag,
          })
        })
      })
    })

    describe('when joe-wicks promotion', () => {
      describe('when recipe is new and with joe-wicks promotion', () => {
        beforeEach(() => {
          recipes = recipes.setIn([recipeId, 'isNew'], true)
          recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List(['joe-wicks']))
        })

        test('should return joe wicks tag on right and new on left', () => {
          const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand, false, false, false)

          expect(result).toEqual({
            topLeftTag: newTag,
            topRightTag: joeWicksTag,
          })
        })
      })
    })

    describe('when recipe is fine dine in', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isFineDineIn'], true)
        recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List([]))
      })

      test('should return only right tag', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand, true, false, false)

        expect(result).toEqual({
          topLeftTag: null,
          topRightTag: fineDineInTag,
        })
      })

      describe('And has mexico limited edition promotion', () => {
        beforeEach(() => {
          recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List(['mexico-limited-edition']))
        })
        test('should return left tag limited edition eme', () => {
          const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand, true, false, false)

          expect(result).toEqual({
            topLeftTag: limitedEditionTag,
            topRightTag: null,
          })
        })
      })
    })

    describe('when recipe food brand is everyday favourites', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List([]))
        recipes = recipes.setIn([recipeId, 'foodBrand'], Immutable.fromJS({ name: 'Everyday Favourites', slug: 'everyday-favourites' }))
      })

      test('should return available-weekly-eme', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand, false, true, false)

        expect(result).toEqual({
          topLeftTag: null,
          topRightTag: everydayFavouritesTag,
        })
      })
    })

    describe('when promotion is health kitchen', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], false)
        recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List([]))
      })

      test('should return health-kitchen-eme', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand, false, false, true)

        expect(result).toEqual({
          topLeftTag: null,
          topRightTag: healthKitchenTag,
        })
      })
    })

    describe('when promotion is not part of EME', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], false)
        recipes = recipes.setIn([recipeId, 'promotions'], Immutable.List(['something-else']))
      })

      test('should return null', () => {
        const result = getElevatedMenuExperienceRecipeTags.resultFunc(recipes, recipeId, brand, false, false, false)

        expect(result).toEqual({
          topLeftTag: null,
          topRightTag: null,
        })
      })
    })
  })
})
