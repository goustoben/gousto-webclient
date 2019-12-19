import { normaliseData } from './normaliseData'
import { ingredientTransformer } from './recipes/ingredientTransformer'
import { mediaTransformer } from './recipes/mediaTransformer'
import { allergensTransformer, basicsTransformer, equpimentTransformer, formatIngredients, healthKitchenTransformer, roundelTransformer, shelfLifeTransformer, surchargeTransformer, taxonomyTransformer } from './recipes/recipeHelpers'

const recipesTransformer = (activeMenu, response) => {
  const normalisedData = normaliseData(response)
  const activeMenuRecipesIds = activeMenu.relationships.recipes.data.map((recipe) => recipe.core_recipe_id.toString() )

  const formattedData = activeMenuRecipesIds.map((individualRecipeId) => {
    const currentRecipe = normalisedData.recipe[individualRecipeId]
    const normalisedAttributes = currentRecipe && currentRecipe.attributes
    const normalisedRelationships = currentRecipe && currentRecipe.relationships

    const formattedIngredients = formatIngredients(normalisedRelationships, normalisedData)
    const finalIngredients = formattedIngredients.map(ingredientTransformer)

    const nutritionalInfo = normalisedAttributes.nutritional_information

    return {
      allergens: allergensTransformer(normalisedAttributes.allergens),
      basics: basicsTransformer(normalisedAttributes.basics),
      boxType: normalisedAttributes.box_type ? normalisedAttributes.box_type.slug : "",
      chef: roundelTransformer(normalisedAttributes.roundel),
      cookingTime: normalisedAttributes.prep_times.for2,
      cookingTimeFamily: normalisedAttributes.prep_times.for4,
      coreRecipeId: normalisedAttributes.core_recipe_id.toString(),
      cuisine: normalisedAttributes.cuisine ? normalisedAttributes.cuisine.name : "",
      description: normalisedAttributes.description,
      dietType: normalisedAttributes.diet_type ? normalisedAttributes.diet_type.slug : "",
      equipment: normalisedAttributes.equipment ? equpimentTransformer(normalisedAttributes.equipment) : [],
      fiveADay: normalisedAttributes.five_a_day ? normalisedAttributes.five_a_day : 0,
      healthKitchen: healthKitchenTransformer(normalisedAttributes.health_kitchen),
      id: individualRecipeId,
      ingredients: finalIngredients,
      meals:[
        {
          numPortions: 2,
          surcharge: normalisedAttributes.surcharges.for2 ? surchargeTransformer(normalisedAttributes.surcharges.for2.price.value) : null,
        },
        {
          numPortions: 4,
          surcharge: normalisedAttributes.surcharges.for4 ? surchargeTransformer(normalisedAttributes.surcharges.for4.price.value) : null,
        }
      ],
      media: {
        images: mediaTransformer(normalisedAttributes.images, normalisedAttributes.name)
      },
      nutritionalInformation: {
        per100g:{
          energyKj: nutritionalInfo.per_100g.energy_kj,
          energyKcal: nutritionalInfo.per_100g.energy_kcal,
          fat: nutritionalInfo.per_100g.fat_mg/1000,
          fatSaturates: nutritionalInfo.per_100g.fat_saturates_mg/1000,
          carbs: nutritionalInfo.per_100g.carbs_mg/1000,
          carbsSugars: nutritionalInfo.per_100g.carbs_sugars_mg/1000,
          fibre: nutritionalInfo.per_100g.fibre_mg/1000,
          protein: nutritionalInfo.per_100g.protein_mg/1000,
          salt: nutritionalInfo.per_100g.salt_mg/1000,
        },
        perPortion: {
          energyKj: nutritionalInfo.per_portion.energy_kj,
          energyKcal: nutritionalInfo.per_portion.energy_kcal,
          fat: nutritionalInfo.per_portion.fat_mg/1000,
          fatSaturates: nutritionalInfo.per_portion.fat_saturates_mg/1000,
          carbs: nutritionalInfo.per_portion.carbs_mg/1000,
          carbsSugars: nutritionalInfo.per_portion.carbs_sugars_mg/1000,
          fibre: nutritionalInfo.per_portion.fibre_mg/1000,
          protein: nutritionalInfo.per_portion.protein_mg/1000,
          salt: nutritionalInfo.per_portion.salt_mg/1000,
        }
      },
      rating:{
        count: normalisedAttributes.rating ? normalisedAttributes.rating.count : 0,
        average: normalisedAttributes.rating ? normalisedAttributes.rating.average : 0,
      },
      shelfLifeDays: normalisedAttributes.shelf_life ? shelfLifeTransformer(normalisedAttributes.shelf_life.min_days, normalisedAttributes.shelf_life.max_days) : "",
      taxonomy: taxonomyTransformer(normalisedAttributes),
      title: normalisedAttributes.name
    }
  })

  return formattedData

}

export { recipesTransformer }
