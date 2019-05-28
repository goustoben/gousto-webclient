
import config from 'config'
import Immutable from 'immutable'

export function getStockTag(stock) {
  let tag = ''
  if (config.menu.stockTagTreshold >= stock && stock !== null) {
    if (stock <= config.menu.stockThreshold) {
      tag = 'Sold Out'
    } else if (stock !== null) {
      tag = `Just ${stock - config.menu.stockThreshold} left`
    }
  }

  return tag
}

export function getNewTag(ratingCount) {

  return ratingCount < 1 ? 'New Recipe' : ''
}

export function getLowStockTag(stock, ratingCount) {
  return getStockTag(stock) || getNewTag(ratingCount)
}

export function formatRecipeTitle(title, boxType, dietType) {
  if (dietType.toLowerCase() === 'vegan') {
    return `${title} (V)`
  }
  if (boxType.toLowerCase() === 'vegetarian' && dietType.toLowerCase() === 'vegetarian') {
    return `${title} (V)`
  }

  return `${title}`
}

export function getChef(chef) {
  return Immutable.Iterable.isIterable(chef) && chef.size > 0 ? chef : null
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

export function getFoodBrand(recipe) {
  const foodBrandTaxonomy = recipe && recipe.size && recipe.get('taxonomy')
  const foodBrand = foodBrandTaxonomy ? foodBrandTaxonomy.find(tag => tag.get('slug') === 'food-brands') : null
  if(foodBrand && foodBrand.get('tags').size) {
    return foodBrand.get('tags').get(0)
  }

  return Immutable.Map([])
}

export function getTaxonomyTags(recipe, categorySlug) {
  const recipeTaxonomy = recipe.get('taxonomy')
  if (recipeTaxonomy) {
    const taxonomyCategory = recipeTaxonomy.find(item => item.get('slug') === categorySlug)
    if (taxonomyCategory) {
      return taxonomyCategory.get('tags')
    }
  }

  return Immutable.List([])
}

export function isNew(recipe) {
  const availability = recipe.get('availability')
  const hasBeenOnAPreviousMenu = availability && availability.find(date => (date.get('offset') < 0))

  return !hasBeenOnAPreviousMenu
}

export function filterRecipesByNew(recipes) {
  const filteredRecipes = recipes.filter(recipe => isNew(recipe))

  return filteredRecipes || Immutable.List([])
}

export function roundUp(value, precision = 0.01) {
  return Math.ceil(value / precision) * precision
}

export default {
  getLowStockTag,
}
