import { RecipeImage } from '../http'

const cropsTransformer = (media: RecipeImage['crops']) =>
  media.map((url) => ({
    src: url.url,
    width: url.width,
  }))

export const mediaTransformer = (images: RecipeImage[], title: string) => {
  const imagesMap = images.map((image) => ({
    type: image.type,
    urls: cropsTransformer(image.crops),
    title: image.title || title,
    description: image.description,
  }))

  return imagesMap
}
