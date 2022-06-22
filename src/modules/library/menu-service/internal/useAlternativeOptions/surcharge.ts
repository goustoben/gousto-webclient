import Immutable from 'immutable'
import { use_legacy_Recipes } from "../recipes"

function getSurcharge(meals: Immutable.List<Immutable.Map<string, any>> = Immutable.List([]), numPortions: number) {
  if (meals.size === 0) {
    return null
  }

  const mealForPortions = meals
    .find(item => Number(item?.get('numPortions')) === numPortions) || Immutable.Map({})

  return mealForPortions.getIn(['surcharge', 'listPrice'], null)
}

function roundUp(value: number, precision = 0.01) {
  return Math.ceil(value / precision) * precision
}

function getSurchargePerPortion(surcharge: number, numberOfPortions: number) {
  const perPortion = surcharge / numberOfPortions

  return roundUp(perPortion)
}

export const getSurchargeForRecipe = (
  recipes: ReturnType<typeof use_legacy_Recipes>,
  recipeId: string,
  numPortions: number
) => {
  const meals = recipes.getIn([recipeId, 'meals'])
  const overallSurcharge = getSurcharge(meals, numPortions)

  const surchargePerPortion = overallSurcharge
    ? getSurchargePerPortion(overallSurcharge, numPortions)
    : null

  return surchargePerPortion
}
