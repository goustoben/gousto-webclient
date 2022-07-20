import { TransformedRecipe } from '../transformer'

function getSurcharge(meals: TransformedRecipe["meals"], numPortions: number) {
  if (meals.length === 0) {
    return null
  }

  const mealForPortions = meals
    .find(item => Number(item.numPortions) === numPortions)

  if (!mealForPortions || !mealForPortions.surcharge) {
    return null
  }

  return mealForPortions.surcharge.listPrice
}

function roundUp(value: number, precision = 0.01) {
  return Math.ceil(value / precision) * precision
}

function getSurchargePerPortion(surcharge: number, numberOfPortions: number) {
  const perPortion = surcharge / numberOfPortions

  return roundUp(perPortion)
}

export const getSurchargeForRecipe = (
  recipes: TransformedRecipe[],
  coreRecipeId: string,
  numPortions: number
) => {
  const recipe = recipes.find(r => r.coreRecipeId === coreRecipeId)

  if (!recipe) {
    return null
  }

  const meals = recipe.meals || []
  const overallSurcharge = getSurcharge(meals, numPortions)

  if (!overallSurcharge) {
    return null
  }

  return getSurchargePerPortion(overallSurcharge, numPortions)
}
