import * as Immutable from 'immutable'

export type Recipe = {
  id: string
  coreRecipeId: string
  displayName: string
}

export type RecipeImmutable = Immutable.Map<keyof Recipe, string>

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
    // eslint-disable-next-line camelcase
    dietary_claims: string[]
  }
}

export type CollectionImmutable = Immutable.Map<keyof Collection, string>
