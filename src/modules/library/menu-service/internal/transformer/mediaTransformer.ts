import { RecipeImage } from '../http'

const cropsTransformer = (media: RecipeImage['crops']) =>
  media.map((url) => ({
    src: url.url,
    width: url.width,
  }))

export type TransformedRecipeImage = {
  type: string
  title: string | null
  description: string | null
  urls: ReturnType<typeof cropsTransformer>
}

export const mediaTransformer = (images: RecipeImage[], title: string): TransformedRecipeImage[] =>
  images.map((image) => ({
    type: image.type,
    urls: cropsTransformer(image.crops),
    title: image.title || title,
    description: image.description,
  }))
