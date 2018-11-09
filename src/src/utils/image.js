import Immutable from 'immutable' /* eslint-disable new-cap */
import config from 'config/recipes'

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

export function getFeaturedImage(recipe, view) {
  if (['featured', 'detail'].indexOf(view) > -1 && recipe.getIn(['media', 'images', 1, 'urls'], Immutable.List([])).size > 0 && recipe.getIn(['media', 'images', 1, 'type']) === 'homepage-image') {
    return recipe.getIn(['media', 'images', 1, 'urls'], Immutable.List([]))
  }

  if (view === 'fineDineIn') {
    const fineDineImage = recipe.getIn(['media', 'images']).find(image => image.get('type') === 'range-main-image')
    if (fineDineImage && fineDineImage.size > 0) {
      return fineDineImage.get('urls')
    }
  }

  return recipe.getIn(['media', 'images', 0, 'urls'], Immutable.List([]))
}

export function getRangeImages(recipe = Immutable.Map()) {
  const mediaImages = recipe.getIn(['media', 'images'], Immutable.List([]))

  return mediaImages.filter((image) => (
    config.range.imageTypes.includes(image.get('type'))
  )).sortBy(image =>
    config.range.imageTypes.indexOf(image.get('type'))
  )
}
