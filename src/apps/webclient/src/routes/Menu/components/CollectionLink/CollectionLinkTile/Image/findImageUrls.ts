import { TransformedRecipeImage } from '@library/api-menu-service'

const ImageTypes = {
  HomepageImage: 'homepage-image',
  MoodImage: 'mood-image',
}

export const findImageUrls = (recipeImages: TransformedRecipeImage[], useHomepageImage = false) => {
  const homepageImage = recipeImages.find((image) => image.type === ImageTypes.HomepageImage)

  if (useHomepageImage && homepageImage !== undefined) {
    const homepageImageUrls = homepageImage.urls

    if (homepageImageUrls.length > 0) {
      return homepageImageUrls
    }
  }

  const moodImage = recipeImages.find((image) => image.type === ImageTypes.MoodImage)

  return (moodImage || recipeImages[0])?.urls
}
