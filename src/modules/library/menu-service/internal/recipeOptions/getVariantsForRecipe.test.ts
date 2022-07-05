import { MenuAPIResponseDataItem } from '../http'
import { TransformedRecipe } from '../transformer'
import { getVariantsForRecipe } from './getVariantsForRecipe'

describe('getVariantsForRecipe', () => {
  const RECIPE_CORE_ID_1 = 'recipe-core-id-1'
  const RECIPE_CORE_ID_2 = 'recipe-core-id-2'
  const RECIPE_UUID_1 = 'recipe-uuid-1'
  const RECIPE_UUID_2 = 'recipe-uuid-2'
  const RECIPE_NAME_1 = '3 Cheese Veg-Packed Pasta Bake'
  const RECIPE_NAME_2 = 'Chicken & Cheese Veg-Packed Pasta Bake'

  const menu: MenuAPIResponseDataItem = {
    id: 'menu-id',
    type: 'menu',
    attributes: {
      name: 'a menu',
      core_menu_id: '123',
      period: { core_period_id: '500' },
      is_default: false,
      signup_default_day: null,
      starts_at: '2022-06-28T12:00:00+01:00',
      ends_at: '2022-07-05T11:59:59+01:00',
    },
    meta: {
      recommender: {
        limit: 15,
        tutorial: 'jfy',
        enabled: true,
        name: 'Chosen For You',
        version: 'rouxcommender/v2',
      },
      swapsExperimentUserAllocationGroup: 'control',
      cfyLengthExperimentUserAllocationGroup: 'control',
    },
    relationships: {
      recipe_options: {
        data: [
          {
            type: 'recipe',
            relationships: [
              {
                type: 'alternative',
                data: {
                  type: 'recipe',
                  id: RECIPE_UUID_1,
                  attributes: {
                    short_display_name: RECIPE_NAME_1,
                  },
                  meta: {
                    core_recipe_id: RECIPE_CORE_ID_1,
                  },
                  core_recipe_id: RECIPE_CORE_ID_1,
                },
              },
            ],
            id: RECIPE_UUID_2,
            attributes: {
              short_display_name: RECIPE_NAME_2,
            },
            meta: {
              core_recipe_id: RECIPE_CORE_ID_2,
            },
            core_recipe_id: RECIPE_CORE_ID_2,
          },
        ],
      },
      boxes: { data: [] },
      collections: { data: [] },
      debut_recipes: { data: [] },
      featured_categories: { data: [] },
      featured_recipe: { data: null as any },
      recipes: { data: [] },
    },
  }

  describe('when collection has dietary claims', () => {
    const collectionDietaryClaims = ['gluten-free']

    describe('when all recipes meet the dietary claim', () => {
      const transformedRecipes: TransformedRecipe[] = [
        {
          id: RECIPE_CORE_ID_1,
          dietaryClaims: ['gluten-free'],
        } as unknown as TransformedRecipe,
        {
          id: RECIPE_CORE_ID_1,
          dietaryClaims: ['gluten-free'],
        } as unknown as TransformedRecipe,
      ]

      test('should return all recipes', () => {
        const result = getVariantsForRecipe(menu, RECIPE_CORE_ID_1, transformedRecipes, collectionDietaryClaims)

        const expectedAlternatives = [
          { id: RECIPE_UUID_1, coreRecipeId: RECIPE_CORE_ID_1, displayName: RECIPE_NAME_1 },
          { id: RECIPE_UUID_2, coreRecipeId: RECIPE_CORE_ID_2, displayName: RECIPE_NAME_2 },
        ]

        expect(result).toEqual({
          type: 'alternatives',
          alternatives: expectedAlternatives,
          variantsList: expectedAlternatives,
        })
      })
    })

    describe('when not all recipes meet the dietary claim', () => {
      const transformedRecipes: TransformedRecipe[] = [
        {
          id: RECIPE_CORE_ID_1,
          dietaryClaims: ['gluten-free'],
        } as unknown as TransformedRecipe,
        {
          id: RECIPE_CORE_ID_1,
          dietaryClaims: [],
        } as unknown as TransformedRecipe,
      ]

      test('should return all recipes which match', () => {
        const result = getVariantsForRecipe(menu, RECIPE_CORE_ID_1, transformedRecipes, collectionDietaryClaims)

        const expectedAlternatives = [{ id: RECIPE_UUID_1, coreRecipeId: RECIPE_CORE_ID_1, displayName: RECIPE_NAME_1 }]

        expect(result).toEqual({
          type: 'alternatives',
          alternatives: expectedAlternatives,
          variantsList: expectedAlternatives,
        })
      })
    })
  })

  describe('when collection has no dietary claims', () => {
    const collectionDietaryClaims = []

    const transformedRecipes: TransformedRecipe[] = [
      {
        id: RECIPE_CORE_ID_1,
        dietaryClaims: ['gluten-free'],
      } as unknown as TransformedRecipe,
      {
        id: RECIPE_CORE_ID_1,
        dietaryClaims: ['gluten-free'],
      } as unknown as TransformedRecipe,
    ]

    test('should return all recipes', () => {
      const result = getVariantsForRecipe(menu, RECIPE_CORE_ID_1, transformedRecipes, collectionDietaryClaims)

      const expectedAlternatives = [
        { id: RECIPE_UUID_1, coreRecipeId: RECIPE_CORE_ID_1, displayName: RECIPE_NAME_1 },
        { id: RECIPE_UUID_2, coreRecipeId: RECIPE_CORE_ID_2, displayName: RECIPE_NAME_2 },
      ]

      expect(result).toEqual({
        type: 'alternatives',
        alternatives: expectedAlternatives,
        variantsList: expectedAlternatives,
      })
    })
  })
})
