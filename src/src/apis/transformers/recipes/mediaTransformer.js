import { cropsTransformer } from './recipeHelpers'

const mediaTransformer = (images, title) => {
  const imagesMap = images.map((image) => ({
    type: image.type,
    urls: cropsTransformer(image.crops),
    title,
  }))

  return imagesMap
}

export { mediaTransformer }
