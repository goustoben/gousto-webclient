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
export const useRecipeField = <TField = unknown>(
  fieldSelector: string | string[],
  notSetValue?: unknown
): TField => {
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
  const cookingTime =
    numPortions === 4 ? recipe.get('cookingTimeFamily') : recipe.get('cookingTime')

  return cookingTime as number
}

type BrandTag = {
  slug: string
  text: string
  theme: {
    name: string
    color: string
    borderColor: string
  }
}

export const useRecipeBrandTagline = (): string | null => {
  const recipe = useRecipe()

  if (!recipe) {
    return null
  }

  return recipe.get('tagline') as string
}

export const useRecipeBrandAvailabilityTagline = (): string | null => {
  const recipe = useRecipe()

  if (!recipe) {
    return null
  }

  const availability = recipe.get('availability', null) as string | null

  // Return new-eme when recipe has isNew to true and
  // when we do not have any availability in meta
  if (!availability && recipe.get('isNew')) {
    return 'new-eme'
  }

  return availability
}

const useTag = (tagline: string | null): BrandTag | null => {
  const brandTags = useSelector(getAllTags)

  if (!tagline || !brandTags) {
    return null
  }

  return findTag(brandTags, tagline)
}

export const useRecipeBrandTag = (): BrandTag | null => {
  const tagline = useRecipeBrandTagline()

  return useTag(tagline)
}

export const useRecipeBrandAvailabilityTag = (): BrandTag | null => {
  const tagline = useRecipeBrandAvailabilityTagline()

  return useTag(tagline)
}

export const useRecipeIsFineDineIn = (): boolean => {
  const recipe = useRecipe()

  if (!recipe) {
    return false
  }

  return recipe.get('isFineDineIn', false) as boolean
}
