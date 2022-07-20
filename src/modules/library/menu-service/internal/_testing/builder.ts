import { MenuAPIResponseIncludedRecipe, MenuAPIResponseRelationshipRecipeOptions } from '../http'

/**
 * Make a `recipe` object like those found in the `included` block of a menu response.
 */
export function makeIncludedRecipe({
  id = 'menu-id',
  coreRecipeId = '123',
  name = 'Italian-Style Plant-Based Burger With Olive & Basil Tapenade',
  dietaryClaims = [],
  surcharge = null,
}: {
  id?: string
  coreRecipeId?: string
  name?: string
  dietaryClaims?: { name: string; slug: string }[]
  surcharge?: number | null
}): MenuAPIResponseIncludedRecipe {
  return {
    id,
    type: 'recipe',
    attributes: {
      name,
      core_recipe_id: coreRecipeId,
      country: {
        name: 'Italy',
        alpha2: 'IT',
      },
      basics: [
        {
          name: 'Olive oil',
          slug: 'olive-oil',
        },
        {
          name: 'Pepper',
          slug: 'pepper',
        },
        {
          name: 'Salt',
          slug: 'salt',
        },
        {
          name: 'Vegetable oil',
          slug: 'vegetable-oil',
        },
        {
          name: 'Sugar',
          slug: 'sugar',
        },
      ],
      health_attributes: [
        {
          name: 'Not Healthy',
          slug: 'not-healthy',
        },
      ],
      spice_level: {
        name: 'no spice',
      },
      description:
        "We've switched up the classic burger for a plant-based option that's full of sophisticated Italian flavours.",
      shelf_life: {
        min_days: 3,
        max_days: 4,
      },
      food_brand: {
        name: 'Modern Bistro',
        slug: 'modern-bistro',
      },
      box_type: {
        name: 'Vegetarian',
        slug: 'vegetarian',
      },
      country_secondary: {
        name: 'United States of America',
        alpha2: 'US',
      },
      gousto_reference: 2994,
      difficulty_level: {
        name: 'easy',
        id: '749461d5-0d03-450e-a53a-667f261e2f8e',
      },
      roundel: null,
      nutritional_information: {
        per_portion: {
          fibre_mg: 13561,
          protein_mg: 26657,
          net_weight_mg: 466500,
          energy_kj: 2751,
          carbs_sugars_mg: 13134,
          fat_saturates_mg: 7600,
          carbs_mg: 80515,
          salt_mg: 3239,
          fat_mg: 25062,
          energy_kcal: 657,
        },
        per_100g: {
          fibre_mg: 2906,
          protein_mg: 5714,
          net_weight_mg: 100000,
          energy_kj: 589,
          carbs_sugars_mg: 2815,
          fat_saturates_mg: 1629,
          carbs_mg: 17259,
          salt_mg: 694,
          fat_mg: 5372,
          energy_kcal: 140,
        },
      },
      images: [
        {
          description: null,
          type: 'mood-image',
          title: null,
          crops: [
            {
              width: 50,
              url: 'https://s3-eu-west-1.amazonaws.com/s3-gousto-production-media/cms/mood-image/2994_Italian-Vegan-Burger-With-Olive--Basil-Tapenade-2512-1598953428890-x50.jpg',
            },
          ],
        },
      ],
      partnership: null,
      five_a_day: 1,
      cuisine: {
        name: 'Italian',
        slug: 'italian',
      },
      equipment: [
        {
          name: 'Tin foil',
        },
      ],
      diet_type: {
        name: 'Vegan',
        slug: 'vegan',
      },
      prep_times: {
        for2: 30,
        for4: 35,
      },
      allergens: [
        {
          name: 'soya',
          contain_type: 'contains',
          slug: 'soya',
        },
      ],
      dietary_claims: dietaryClaims,
      recipe_developer: {
        name: 'redacted',
      },
      surcharges: surcharge
        ? {
            for2: { name: '', price: { value: surcharge, currency: 'GBP' } },
            for4: { name: '', price: { value: surcharge, currency: 'GBP' } },
          }
        : {
            for2: null,
            for4: null,
          },
      dish_types: [
        {
          name: 'Burger',
        },
      ],
      chef_prepared: false,
      ingredient_preparation: {
        time: {
          for2: null,
          for4: null,
        },
      },
      rating: {
        average: 4.44,
        count: 766,
        love_count: 677,
      },
    },
    relationships: {
      ingredients: {
        data: [],
      },
    },
  }
}

type BuildOptionArgs = {
  id: string
  coreRecipeId: string
  shortDisplayName: string
}

/**
 * Make a `recipe options` object, like those found in the `relationships.recipe_options` block of a menu response
 */
export function makeRelationshipRecipeOptions({
  id = 'menu-id',
  coreRecipeId = '123',
  shortDisplayName = 'Italian-Style Plant-Based Burger',
  others,
}: {
  id?: string
  coreRecipeId?: string
  shortDisplayName?: string
  others: BuildOptionArgs[]
}): MenuAPIResponseRelationshipRecipeOptions {
  return {
    id,
    type: 'recipe',
    core_recipe_id: coreRecipeId,
    meta: { core_recipe_id: coreRecipeId },
    attributes: {
      short_display_name: shortDisplayName,
    },
    relationships: others.map((other) => ({
      type: 'alternative',
      data: {
        id: other.id,
        type: 'recipe',
        core_recipe_id: other.coreRecipeId,
        meta: { core_recipe_id: other.coreRecipeId },
        attributes: {
          short_display_name: other.shortDisplayName,
        },
      },
    })),
  }
}
