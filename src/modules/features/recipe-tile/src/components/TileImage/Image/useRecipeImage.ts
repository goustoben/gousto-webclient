import { useRecipe } from '../../../model/context'
import { findImageUrls } from './findImageUrls'

export const getDefaultImage = (srcs: ReturnType<typeof findImageUrls>) => {
  if (srcs.length === 0) {
    return null
  }

  const sortedSrcs = srcs.slice().sort((a, b) => b.width - a.width)
  const midpointInArray = Math.floor(sortedSrcs.length / 2)

  return sortedSrcs[midpointInArray]?.src || ''
}

const getSrcSet = (srcs: ReturnType<typeof findImageUrls>) =>
  srcs
    .map((src) => `${src.src} ${src.width}w`)
    .join(', ')

/**
 * Get the recipe image from context
 *
 * This is tested through the component
 *
 * @param {boolean} useHomepageImage - Whether the homepage image should be chosen if possible
 *
 * @example
 *
 *     const [ image, srcSet ] = useRecipeImage(false)
 */
export const useRecipeImage = (useHomepageImage: boolean) => {
  const recipe = useRecipe()
  const images = recipe.media?.images || []
  const imageUrls = findImageUrls(images, useHomepageImage)
  const imageUrl = getDefaultImage(imageUrls)

  if (!imageUrl) {
    return null
  }

  return [imageUrl, getSrcSet(imageUrls)]
}
