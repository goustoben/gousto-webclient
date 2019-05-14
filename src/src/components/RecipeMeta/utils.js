import Immutable from 'immutable'

import { getSurcharge } from 'utils/recipe'

import { defaultMetaImageLink, perPortionPrice } from './config.js'

export const getPortionPrice = (recipe) => {
  const surcharge = getSurcharge(recipe.get('meals'), 4)

  return surcharge ? (perPortionPrice + surcharge / 4).toFixed(2) : perPortionPrice
}

export const getMetaImageLink = (recipe) => {
  const media = recipe.getIn(['media', 'images', 0, 'urls'], Immutable.List([]))
  const image = media.find(imageProps => imageProps.get('width') == 700)

  return image ? image.get('src') : defaultMetaImageLink
}

export const getRecipeDetailURL = (recipe) => (
  `https://www.gousto.co.uk/menu?recipeDetailId=${recipe.get('id')}`
)
