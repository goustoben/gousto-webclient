import Immutable from 'immutable'
import { useRecipeField } from 'routes/Menu/context/recipeContext'
import { findImageUrls } from './findImageUrls'

export const getDefaultImage = (srcs) => {
  if (srcs.size === 0) {
    return null
  }

  const sortedSrcs = srcs.sort((a, b) => b.get('width') - a.get('width'))
  const midpointInArray = Math.floor(sortedSrcs.size / 2)

  return sortedSrcs.getIn([midpointInArray, 'src'], '')
}

const getSrcSet = (srcs) => srcs.map((src) => `${src.get('src')} ${src.get('width')}w`).join(', ')

/**
 * Get the recipe image from context
 *
 * This is tested through the component
 *
 * @param {boolean} useHomepageImage - Whether the homepage image should be chosen if possible
 * @return {[ string, string ] | [null, null ]} main image URL, srcSet URLs. Will return `null` if no image can be returned.
 *
 * @example
 *
 *     const [ image, srcSet ] = useRecipeImage(false)
 */
export const useRecipeImage = (useHomepageImage) => {
  const images = useRecipeField(['media', 'images'], Immutable.List())
  const imageUrls = findImageUrls(images, useHomepageImage)

  const image = getDefaultImage(imageUrls)

  if (!image) {
    return [null, null]
  }

  return [image, getSrcSet(imageUrls)]
}
