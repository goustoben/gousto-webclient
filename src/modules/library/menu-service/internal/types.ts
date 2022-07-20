export type RecipeVariantLink = {
  displayName: string
  alternatives: {
    id: string
    coreRecipeId: string
    displayName: string
  }[]
}

export type Recipe = {
  id: string
  coreRecipeId: string
  displayName: string
  meals: [
    {
      numPortions: number
      surcharge: {
        listPrice: number
      }
    }
  ]
}
