import Immutable from 'immutable'
import config from 'config/recipes'

const getFineDineInImage = (recipe) => {
  const fineDineImage = recipe.getIn(['media', 'images']).find(image => image.get('type') === 'range-main-image')
  if (fineDineImage && fineDineImage.size > 0) {
    return fineDineImage.get('urls', Immutable.List([]))
  }
}

export function getMenuRecipeImage(imageUrls, imageSize) {
  const imageSrc = imageUrls.reduce((reducedImage, newImage) => {
    const image = reducedImage
    const newUrlWidth = parseInt(newImage.get('width'), 10)

    if (newUrlWidth >= imageSize) {
      if (reducedImage.upper) {
        const reducedUpperWidth = parseInt(reducedImage.upper.get('width'), 10)
        if (reducedUpperWidth > newUrlWidth) {
          image.upper = newImage
        }
      } else {
        image.upper = newImage
      }
    } else {
      if (reducedImage.lower) {
        const reducedLowerWidth = parseInt(reducedImage.lower.get('width'), 10)
        if (reducedLowerWidth < newUrlWidth) {
          image.lower = newImage
        }
      } else {
        image.lower = newImage
      }
    }

    return image
  }, {
    upper: null,
    lower: null,
  })
  const outputImage = (imageSrc.upper) ? imageSrc.upper : imageSrc.lower

  return outputImage.get('src')
}

export function getFeaturedImage(recipe, view, browserType) {
  const recipeImages = recipe.getIn(['media', 'images'], Immutable.List([]))
  const homepageImage = recipeImages.find(image => image.get('type') === 'homepage-image')
  const shouldUseHomepageImage = view === 'featured' || (view === 'detail' && browserType === 'desktop')

  if (shouldUseHomepageImage && homepageImage !== undefined) {
    const homepageImageUrls = homepageImage.get('urls', Immutable.List([]))

    if (homepageImageUrls.size > 0) {
      return homepageImageUrls
    }
  }

  const moodImage = recipeImages.find(image => image.get('type') === 'mood-image')
  const moodImageUrls = moodImage ? moodImage.get('urls') : null
  const firstImageUrls = recipeImages.getIn([0, 'urls'], Immutable.List([]))
  const recipeImage = moodImageUrls || firstImageUrls

  if (view === 'fineDineIn') {
    return getFineDineInImage(recipe) || recipeImage
  }

  return recipeImage
}

export function getRangeImages(recipe = Immutable.Map()) {
  const mediaImages = recipe.getIn(['media', 'images'], Immutable.List([]))

  return mediaImages.filter((image) => (
    config.range.imageTypes.includes(image.get('type'))
  )).sortBy(image =>
    config.range.imageTypes.indexOf(image.get('type'))
  )
}
