import { RecipeType } from './enums'

export interface RecipeData {
  name: string
  imageUrl: string
  type: RecipeType | null
}
