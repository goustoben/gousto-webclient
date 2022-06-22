import * as Immutable from 'immutable'
import { Recipe } from "../types"

export type RecipeImmutable = Immutable.Map<keyof Recipe, string>

export type SelectedVariants = {
  [collectionId: string]: {
    [recipeReference: string]: string
  }
}

export type RecipeVariants = {
  type: 'alternatives' | 'sides'
  variantsList: {
    coreRecipeId: string
    displayName: string
  }[]
  alternatives?: []
  sides?: []
}

export type Collection = {
  id: string
  requirements: {
    dietary_claims: string[]
  }
}

export type CollectionImmutable = Immutable.Map<keyof Collection, string>
