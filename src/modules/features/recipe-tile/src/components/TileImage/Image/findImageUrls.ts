import { Image } from '../../../model/recipe'

const ImageTypes = {
  HomepageImage: 'homepage-image',
  MoodImage: 'mood-image',
}

export const findImageUrls = (recipeImages: Image[], useHomepageImage = false) => {
  const homepageImage = recipeImages.find((image) => image.type === ImageTypes.HomepageImage)

  if (useHomepageImage && homepageImage !== undefined) {
    const homepageImageUrls = homepageImage.urls || []

    if (homepageImageUrls.length > 0) {
      return homepageImageUrls
    }
  }

  const firstImageUrls = recipeImages[0]?.urls || []
  const moodImage = recipeImages.find((image) => image.type === ImageTypes.MoodImage)
  const recipeImage = moodImage ? moodImage.urls : firstImageUrls

  return recipeImage
}
