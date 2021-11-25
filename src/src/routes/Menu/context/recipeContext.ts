import Immutable from 'immutable'
import { createContext, useContext } from 'react'
import { useSelector } from 'react-redux'
import { getNumPortions } from 'selectors/basket'
import { findTag, getAllTags } from '../selectors/recipe'

type Recipe = Immutable.Map<string, unknown>

/**
 *
 * A context to hold a single `Recipe` object
 *
 * To be used in e.g. RecipeTile and RecipeDetails
 *
 */
const RecipeContext = createContext<Recipe>(null as unknown as Recipe)
RecipeContext.displayName = 'RecipeContext'

export const RecipeContextProvider = RecipeContext.Provider
export const useRecipe = (): Recipe => useContext(RecipeContext)
export const useRecipeField = <TField = unknown>(fieldSelector: string | string[], notSetValue?: unknown): TField => {
  const recipe = useRecipe()

  if (Array.isArray(fieldSelector)) {
    return recipe.getIn(fieldSelector, notSetValue)
  }

  return recipe.get(fieldSelector, notSetValue) as TField
}

export const useRecipeTitle = (): string => useRecipeField<string>('title')

export const useRecipeCookingTime = (): number => {
  const recipe = useRecipe()
  const numPortions = useSelector(getNumPortions)
  const cookingTime = numPortions === 4 ? recipe.get('cookingTimeFamily') : recipe.get('cookingTime')

  return cookingTime as number
}

type BrandTag = {
  slug: string,
  text: string,
  theme: {
    name: string,
    color: string,
    borderColor: string,
  },
}

export const useRecipeBrandTag = (): BrandTag | null => {
  const tagline = useRecipeField<string | null>('tagline', null)
  const brandTags = useSelector(getAllTags)

  if (!tagline || !brandTags) {
    return null
  }

  return findTag(brandTags, tagline)
}
