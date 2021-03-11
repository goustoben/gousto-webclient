import { createContext, useContext } from 'react'

/**
 *
 * A context to hold a single `Recipe` object
 *
 * To be used in e.g. RecipeTile and RecipeDetails
 *
 */
const RecipeContext = createContext(null)
RecipeContext.displayName = 'RecipeContext'

export const RecipeContextProvider = RecipeContext.Provider
export const useRecipe = () => useContext(RecipeContext)
export const useRecipeField = (fieldName) => useRecipe().get(fieldName)
