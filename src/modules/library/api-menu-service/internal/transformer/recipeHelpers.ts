// [TR-2087] - Used a forEach for all the below to catch any missing data that may be in normalisedRelationships but missing from normalisedData

import {
  Allergen,
  MenuAPIResponseIncludedIngredient,
  MenuAPIResponseIncludedRecipe,
  MenuServiceData,
  Micronutrient,
  NameAndSlug,
  RecipeImage,
} from '../http'

const allergensTransformer = (allergensArray: Allergen[]) => {
  const contains = allergensArray.filter((allergen) => allergen.contain_type === 'contains')

  return contains.map((allergen) => allergen.name)
}

const basicsTransformer = (basicsArray: NameAndSlug[]) => basicsArray.map((basic) => basic.name)

const equipmentTransformer = (equipmentArray: { name: string }[]) => equipmentArray.map((piece) => piece.name)

const formatIngredients = (
  normalisedRelationships: MenuAPIResponseIncludedRecipe['relationships'],
  normalisedData: MenuServiceData,
) => {
  if (!normalisedData) {
    return []
  }

  const result: (MenuAPIResponseIncludedIngredient & { label: string })[] = []

  if (normalisedRelationships && normalisedRelationships.ingredients && normalisedRelationships.ingredients.data) {
    normalisedRelationships.ingredients.data.forEach((individualIngredient) => {
      if (normalisedData.ingredient && normalisedData.ingredient[individualIngredient.id]) {
        const currentIngredient = normalisedData.ingredient[individualIngredient.id]
        const ingredientLabel = individualIngredient.labels.for2

        if (currentIngredient) {
          result.push({
            ...currentIngredient,
            label: ingredientLabel,
          })
        }
      }
    })
  }

  return result
}

const micronutrientsTransformer = (micronutrients?: Micronutrient[]) => {
  if (!micronutrients) {
    return null
  }

  return micronutrients.map((micronutrient) => ({
    name: micronutrient.name,
    content: micronutrient.content,
    nrvPercent: micronutrient.nrv_percent,
  }))
}

const imageUrlMap = (urls: RecipeImage['crops']) =>
  urls.map((url) => ({
    src: url.url,
    width: url.width,
  }))

const shelfLifeTransformer = (minDays: number, maxDays: number) => `${minDays}-${maxDays}`

const surchargeTransformer = (surcharge: number) => {
  const decimalSurcharge = surcharge / 100

  return {
    listPrice: decimalSurcharge,
  }
}

const isFineDineInTransformer = (attributes: MenuAPIResponseIncludedRecipe['attributes']) =>
  Boolean(attributes.food_brand && attributes.food_brand.slug === 'fine-dine-in')

const promotionsTransformer = (attributes: MenuAPIResponseIncludedRecipe['attributes']) =>
  attributes.promotions ? attributes.promotions.map((p) => p.slug) : []

const isNewTransformer = (debutRecipes: {
  data: { core_recipe_id: string }[]
}, recipeId: string) => {
  if (debutRecipes && debutRecipes.data && debutRecipes.data.length) {
    return debutRecipes.data.some((recipe) => recipe.core_recipe_id === recipeId)
  }

  return false
}

export {
  allergensTransformer,
  basicsTransformer,
  equipmentTransformer,
  formatIngredients,
  micronutrientsTransformer,
  imageUrlMap,
  shelfLifeTransformer,
  surchargeTransformer,
  isFineDineInTransformer,
  promotionsTransformer,
  isNewTransformer,
}
