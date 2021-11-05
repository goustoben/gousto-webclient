import { createContext, useContext } from 'react'
import { useSelector } from 'react-redux'
import { getNumPortions } from 'selectors/basket'

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
export const useRecipeField = (fieldSelector, defaultValue) => {
  const recipe = useRecipe()

  if (Array.isArray(fieldSelector)) {
    return recipe.getIn(fieldSelector, defaultValue)
  }

  return recipe.get(fieldSelector, defaultValue)
}

export const useRecipeTitle = () => useRecipeField('title')

export const useRecipeCookingTime = () => {
  const recipe = useRecipe()
  const numPortions = useSelector(getNumPortions)
  const cookingTime = numPortions === 4 ? recipe.get('cookingTimeFamily') : recipe.get('cookingTime')

  return cookingTime
}
