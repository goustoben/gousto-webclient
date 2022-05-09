import { getPreviewMenuDateForCutoff, doesRecipeHaveSurcharges } from '../menuService'

const covertArrayToObjectWithIds = (items) =>
  items.reduce((memo, r) => ({ ...memo, [r.id]: r }), {})

export const wellformedMenuService = ({
  meta = {},
  menus = [],
  collections = [],
  recipes = [],
  ingredients = [],
}) => ({
  menuService: {
    meta,
    data: menus,
    collection: covertArrayToObjectWithIds(collections),
    recipe: covertArrayToObjectWithIds(recipes),
    ingredient: covertArrayToObjectWithIds(ingredients),
  },
})

export const wellformedRecipe = (recipe = {}) => ({
  id: recipe.id || 'recipe_01',
  relationships: {
    ingredients: {
      data: recipe.ingredients || [],
    },
  },
  attributes: {
    surcharges: {
      for2: null,
      for4: null,
      ...(recipe.surcharges || {}),
    },
  },
  published_at: '2021-02-25T11:47:31+00:00',
  type: 'recipe',
})

describe('getPreviewMenuDateForCutoff', () => {
  let state

  describe('when menu service has data with one menu', () => {
    beforeEach(() => {
      state = wellformedMenuService({
        menus: [
          {
            attributes: {
              ends_at: '2020-10-13',
            },
          },
        ],
      })
    })

    test('should return 2020-10-12 date', () => {
      expect(getPreviewMenuDateForCutoff(state)).toEqual('2020-10-12')
    })
  })

  describe('when menu service has no data', () => {
    beforeEach(() => {
      state = wellformedMenuService({})
    })

    test('should return null', () => {
      expect(getPreviewMenuDateForCutoff(state)).toBe(null)
    })
  })
})

describe('doesRecipeHaveSurcharges', () => {
  let state

  describe('when menu service has recipe with surcharges', () => {
    beforeEach(() => {
      state = wellformedMenuService({
        recipes: [wellformedRecipe({ id: 'recipe_01' })],
      })
    })

    test('should return false', () => {
      expect(doesRecipeHaveSurcharges(state, 'recipe_01')).toEqual(false)
    })
  })

  describe('when menu service has no data', () => {
    beforeEach(() => {
      state = wellformedMenuService({
        recipes: [
          wellformedRecipe({
            id: 'recipe_01',
            surcharges: {
              for2: {
                name: 'Premium Recipe Surcharge',
                price: {
                  value: 99,
                  currency: 'GBP',
                },
              },
              for4: {
                name: 'Premium Recipe Surcharge',
                price: {
                  value: 199,
                  currency: 'GBP',
                },
              },
            },
          }),
        ],
      })
    })

    test('should return true', () => {
      expect(doesRecipeHaveSurcharges(state, 'recipe_01')).toBe(true)
    })
  })
})
