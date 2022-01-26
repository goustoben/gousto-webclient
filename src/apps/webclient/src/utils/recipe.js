
import Immutable from 'immutable'

export function formatRecipeTitle(title, boxType, dietType) {
  if (dietType.toLowerCase() === 'vegan') {
    return `${title} (V)`
  }
  if (boxType.toLowerCase() === 'vegetarian' && dietType.toLowerCase() === 'vegetarian') {
    return `${title} (V)`
  }

  return `${title}`
}

export function getSurcharge(meals = Immutable.List([]), numPortions) {
  let meal
  if (meals.size > 0) {
    meal = meals.find(item => Number(item.get('numPortions')) === numPortions) || Immutable.Map({})
  } else {
    meal = Immutable.Map({})
  }

  return meal.getIn(['surcharge', 'listPrice'], null)
}

export function roundUp(value, precision = 0.01) {
  return Math.ceil(value / precision) * precision
}

export function getSurchargePerPortion(surcharge, numberOfPortions) {
  const perPortion = surcharge / numberOfPortions

  return roundUp(perPortion)
}

export function getCookingTime(time) {
  const hours = Math.floor(time / 60)
  const mins = time % 60

  if (time > 90 && hours > 0 && mins > 0) {
    return `${hours} hr${hours < 2 ? '' : 's'} ${mins} mins`
  } else if (time > 90 && hours > 0) {
    return `${hours} hr${hours < 2 ? '' : 's'}`
  }

  return `${time} mins`
}

export function getDietaryTags(recipe) {
  if (recipe && recipe.get('dietaryClaims')) {
    return recipe.get('dietaryClaims').map(tag => tag.get('slug'))
  }

  return Immutable.List([])
}

export const isAvailableRecipeList = (recipeIds, recipesStore) => recipeIds.map((obj, id) => recipesStore.get(id)).filter(recipe => Boolean(recipe))

export const getRecipeId = (recipe) => recipe.get('id')
