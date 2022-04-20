import { createContext, useContext } from 'react'

export const RecipeReferenceContext = createContext<string | null>(null)

RecipeReferenceContext.displayName =
  'Recipe Reference - an identifier of the recipe in the category'

export const RecipeReferenceProvider = RecipeReferenceContext.Provider

export const useRecipeReference = (): string | null => useContext(RecipeReferenceContext)
