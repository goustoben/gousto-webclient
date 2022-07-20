import Immutable from 'immutable'

const ImageTypes = {
  HomepageImage: 'homepage-image',
  MoodImage: 'mood-image',
}

export const findImageUrls = (recipeImages, useHomepageImage = false) => {
  const homepageImage = recipeImages.find((image) => image.get('type') === ImageTypes.HomepageImage)

  if (useHomepageImage && homepageImage !== undefined) {
    const homepageImageUrls = homepageImage.get('urls', Immutable.List([]))

    if (homepageImageUrls.size > 0) {
      return homepageImageUrls
    }
  }

  const firstImageUrls = recipeImages.getIn([0, 'urls'], Immutable.List([]))
  const moodImage = recipeImages.find((image) => image.get('type') === ImageTypes.MoodImage)
  const recipeImage = moodImage ? moodImage.get('urls') : firstImageUrls

  return recipeImage
}
