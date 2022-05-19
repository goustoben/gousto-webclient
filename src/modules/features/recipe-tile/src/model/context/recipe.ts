import { createContext, useContext } from 'react'

import { Recipe } from '../recipe'

const RecipeContext = createContext<Recipe>(null as unknown as Recipe)
RecipeContext.displayName = 'RecipeContext'

export const RecipeContextProvider = RecipeContext.Provider
export const useRecipe = (): Recipe => {
  const recipe = useContext(RecipeContext)

  if (!recipe) {
    throw Error('useRecipe could not find a recipe in RecipeContext')
  }

  return recipe
}
