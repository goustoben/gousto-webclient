import { MenuAPIResponse, MenuAPIResponseDataItem, MenuAPIResponseIncludedCollection } from '../http'
import { makeIncludedRecipe, makeRelationshipRecipeOptions } from './builder'

const GLUTEN_FREE_SLUG = 'gluten-free'

export const COLLECTION_ALL_RECIPES_ID = 'collection-id-1'

export const COLLECTION_ALL_RECIPES: MenuAPIResponseIncludedCollection = {
  id: COLLECTION_ALL_RECIPES_ID,
  type: 'collection',
  attributes: {
    meta_title: 'View All Gousto Recipes | Recipe Ideas from Gousto',
    description: 'Not sure what to cook for dinner? Browse our full library of delicious recipe ideas',
    long_title: null,
    meta_description: 'Not sure what to cook for dinner? Browse our full library of delicious recipe ideas.',
    short_title: 'All Recipes',
    colour: '#804D59',
    schedule_end: null,
    slug: 'all-recipes',
    schedule_start: null,
    order: 100,
  },
}

export const COLLECTION_GLUTEN_FREE_ID = 'collection-id-2'

export const COLLECTION_GLUTEN_FREE: MenuAPIResponseIncludedCollection = {
  id: COLLECTION_GLUTEN_FREE_ID,
  type: 'collection',
  attributes: {
    meta_title: null,
    description: 'These recipes do not contain gluten and are suitable for coeliacs.',
    long_title: null,
    meta_description: null,
    short_title: 'Gluten-Free',
    colour: '#E0674E',
    schedule_end: '2022-09-06T11:59:59+01:00',
    slug: GLUTEN_FREE_SLUG,
    schedule_start: '2017-08-29T12:00:00+01:00',
    order: 1000,
    requirements: {
      dietary_claims: [GLUTEN_FREE_SLUG],
    },
  },
}

export const RECIPE_CORE_ID_1 = 'recipe-core-id-1'
export const RECIPE_CORE_ID_2 = 'recipe-core-id-2'
export const RECIPE_UUID_1 = 'recipe-uuid-1'
export const RECIPE_UUID_2 = 'recipe-uuid-2'
export const RECIPE_NAME_1 = '3 Cheese Veg-Packed Pasta Bake'
export const RECIPE_NAME_2 = 'Chicken & Cheese Veg-Packed Pasta Bake'

export const MENU_1_DATES = {
  starts_at: '2022-06-28T12:00:00+01:00',
  ends_at: '2022-07-05T11:59:59+01:00',
  middle: '2022-07-02T12:00:00+01:00',
}

export const MENU_1: MenuAPIResponseDataItem = {
  id: 'menu-id',
  type: 'menu',
  attributes: {
    name: 'a menu',
    core_menu_id: '123',
    period: { core_period_id: '500' },
    is_default: false,
    signup_default_day: null,
    starts_at: MENU_1_DATES.starts_at,
    ends_at: MENU_1_DATES.ends_at,
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
        makeRelationshipRecipeOptions({
          id: RECIPE_UUID_2,
          coreRecipeId: RECIPE_CORE_ID_2,
          shortDisplayName: RECIPE_NAME_2,
          others: [
            {
              id: RECIPE_UUID_1,
              coreRecipeId: RECIPE_CORE_ID_1,
              shortDisplayName: RECIPE_NAME_1,
            },
          ],
        }),
      ],
    },
    boxes: { data: [] },
    collections: {
      data: [
        {
          id: COLLECTION_ALL_RECIPES_ID,
          type: 'collection',
          relationships: {
            recipes: {
              data: [
                {
                  id: RECIPE_UUID_1,
                  type: 'recipe',
                  core_recipe_id: RECIPE_CORE_ID_1,
                  meta: {
                    core_recipe_id: RECIPE_CORE_ID_1,
                  },
                },
                {
                  id: RECIPE_UUID_2,
                  type: 'recipe',
                  core_recipe_id: RECIPE_CORE_ID_2,
                  meta: {
                    core_recipe_id: RECIPE_CORE_ID_2,
                  },
                },
              ],
            },
          },
        },
        {
          id: COLLECTION_GLUTEN_FREE_ID,
          type: 'collection',
          relationships: {
            recipes: {
              data: [
                {
                  id: RECIPE_UUID_1,
                  type: 'recipe',
                  core_recipe_id: RECIPE_CORE_ID_1,
                  meta: {
                    core_recipe_id: RECIPE_CORE_ID_1,
                  },
                },
              ],
            },
          },
        },
      ],
    },
    debut_recipes: { data: [] },
    featured_categories: { data: [] },
    featured_recipe: {
      data: {
        id: RECIPE_UUID_1,
        type: 'recipe',
        core_recipe_id: RECIPE_CORE_ID_1,
        meta: { core_recipe_id: RECIPE_CORE_ID_1 },
      },
    },
    recipes: {
      data: [
        {
          id: RECIPE_UUID_1,
          type: 'recipe',
          core_recipe_id: RECIPE_CORE_ID_1,
          meta: { core_recipe_id: RECIPE_CORE_ID_1 },
        },
        {
          id: RECIPE_UUID_2,
          type: 'recipe',
          core_recipe_id: RECIPE_CORE_ID_2,
          meta: { core_recipe_id: RECIPE_CORE_ID_2 },
        },
      ],
    },
  },
}

export const MOCK_MENU_RESPONSE: MenuAPIResponse = {
  result: {
    data: [MENU_1],
    included: [
      makeIncludedRecipe({
        id: RECIPE_UUID_1,
        coreRecipeId: RECIPE_CORE_ID_1,
        name: 'Mock Recipe Number One',
        dietaryClaims: [{ name: 'gluten free', slug: 'gluten-free' }],
        surcharge: 2
      }),
      makeIncludedRecipe({
        id: RECIPE_UUID_2,
        coreRecipeId: RECIPE_CORE_ID_2,
        name: 'Mock Recipe Number Two',
      }),
      COLLECTION_ALL_RECIPES,
      COLLECTION_GLUTEN_FREE,
    ],
    meta: {
      recommendations: {
        limit: 15,
        tutorial: 'jfy',
        enabled: true,
        name: 'Chosen For You',
        version: 'rouxcommender/v2',
      },
    },
  },
  status: 'ok',
}
