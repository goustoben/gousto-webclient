import { MenuAPIResponseDataItem } from '../../http/response'
import { ingredientTransformer } from './ingredientTransformer'
import { mediaTransformer } from './mediaTransformer'
import {
  allergensTransformer,
  basicsTransformer,
  equipmentTransformer,
  formatIngredients,
  micronutrientsTransformer,
  shelfLifeTransformer,
  surchargeTransformer,
  isFineDineInTransformer,
  promotionsTransformer,
  isNewTransformer,
} from './recipeHelpers'

export function recipeTransformer({
  normalisedAttributes,
  individualRecipeId,
  finalIngredients,
  isFeaturedRecipe,
  activeMenu,
  recipeMeta,
}: {
  normalisedAttributes: Record<string, any>,
  individualRecipeId: string,
  finalIngredients: unknown,
  isFeaturedRecipe: boolean,
  activeMenu: MenuAPIResponseDataItem,
  recipeMeta: any,
}) {
  return {
    allergens: allergensTransformer(normalisedAttributes.allergens),
    basics: basicsTransformer(normalisedAttributes.basics),
    boxType: normalisedAttributes.box_type ? normalisedAttributes.box_type.slug : '',
    chefPrepared: normalisedAttributes.chef_prepared,
    cookingTime: normalisedAttributes.prep_times.for2,
    cookingTimeFamily: normalisedAttributes.prep_times.for4,
    coreRecipeId: normalisedAttributes.core_recipe_id.toString(),
    cuisine: normalisedAttributes.cuisine ? normalisedAttributes.cuisine.name : '',
    description: normalisedAttributes.description,
    dietType: normalisedAttributes.diet_type ? normalisedAttributes.diet_type.slug : '',
    equipment: normalisedAttributes.equipment ? equipmentTransformer(normalisedAttributes.equipment) : [],
    fiveADay: normalisedAttributes.five_a_day ? normalisedAttributes.five_a_day : 0,
    health: normalisedAttributes.health || null,
    id: individualRecipeId,
    ingredients: finalIngredients,
    isFeaturedRecipe,
    meals: [
      {
        numPortions: 2,
        surcharge: normalisedAttributes.surcharges.for2
          ? surchargeTransformer(normalisedAttributes.surcharges.for2.price.value)
          : null,
      },
      {
        numPortions: 4,
        surcharge: normalisedAttributes.surcharges.for4
          ? surchargeTransformer(normalisedAttributes.surcharges.for4.price.value)
          : null,
      },
    ],
    media: {
      images: mediaTransformer(normalisedAttributes.images, normalisedAttributes.name),
    },
    nutritionalInformation: {
      per100g: {
        energyKj: normalisedAttributes.nutritional_information.per_100g.energy_kj,
        energyKcal: normalisedAttributes.nutritional_information.per_100g.energy_kcal,
        fat: normalisedAttributes.nutritional_information.per_100g.fat_mg / 1000,
        fatSaturates: normalisedAttributes.nutritional_information.per_100g.fat_saturates_mg / 1000,
        carbs: normalisedAttributes.nutritional_information.per_100g.carbs_mg / 1000,
        carbsSugars: normalisedAttributes.nutritional_information.per_100g.carbs_sugars_mg / 1000,
        fibre: normalisedAttributes.nutritional_information.per_100g.fibre_mg / 1000,
        protein: normalisedAttributes.nutritional_information.per_100g.protein_mg / 1000,
        salt: normalisedAttributes.nutritional_information.per_100g.salt_mg / 1000,
      },
      perPortion: {
        energyKj: normalisedAttributes.nutritional_information.per_portion.energy_kj,
        energyKcal: normalisedAttributes.nutritional_information.per_portion.energy_kcal,
        fat: normalisedAttributes.nutritional_information.per_portion.fat_mg / 1000,
        fatSaturates: normalisedAttributes.nutritional_information.per_portion.fat_saturates_mg / 1000,
        carbs: normalisedAttributes.nutritional_information.per_portion.carbs_mg / 1000,
        carbsSugars: normalisedAttributes.nutritional_information.per_portion.carbs_sugars_mg / 1000,
        fibre: normalisedAttributes.nutritional_information.per_portion.fibre_mg / 1000,
        protein: normalisedAttributes.nutritional_information.per_portion.protein_mg / 1000,
        salt: normalisedAttributes.nutritional_information.per_portion.salt_mg / 1000,
      },
      micronutrients: micronutrientsTransformer(normalisedAttributes.nutritional_information.micronutrients),
    },
    rating: {
      count: normalisedAttributes.rating ? normalisedAttributes.rating.count : 0,
      average: normalisedAttributes.rating ? normalisedAttributes.rating.average : 0,
    },
    shelfLifeDays: normalisedAttributes.shelf_life
      ? shelfLifeTransformer(normalisedAttributes.shelf_life.min_days, normalisedAttributes.shelf_life.max_days)
      : '',
    dietaryClaims: normalisedAttributes.dietary_claims as { slug: string }[],
    isFineDineIn: isFineDineInTransformer(normalisedAttributes),
    title: normalisedAttributes.name,
    promotions: promotionsTransformer(normalisedAttributes),
    isNew: activeMenu && isNewTransformer(activeMenu.relationships.debut_recipes, individualRecipeId),
    foodBrand: normalisedAttributes.food_brand,
    tagline: recipeMeta.tagline,
    availability: recipeMeta.availability,
  }
}
