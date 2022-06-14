import { createContext, useContext } from 'react'

export type Recipe = {
  id: string
  coreRecipeId: string
  displayName: string
}

export type GetAlternativeOptionsForRecipe<T extends Recipe = Recipe> = (args: {
  /**
   * ID of recipe (alternative option) that is already selected
   */
  recipeId: string

  categoryId?: string
  isOnDetailScreen: boolean
}) => {
  // This is what would be fed into Alternative Option menu item
  recipeId: T['id']
  recipeName: string
  // eslint-disable-next-line no-unused-vars
  changeCheckedRecipe: (checkedRecipeId: Recipe['id'], isOutOfStock: boolean) => void
  isChecked: boolean
  isOnDetailScreen: boolean
  isOutOfStock: boolean
  surcharge?: number | null
}[]

type useGetAlternativeOptionsForRecipe = () => GetAlternativeOptionsForRecipe

const UseGetAlternativeOptionsForRecipeContext = createContext<useGetAlternativeOptionsForRecipe | null>(null)
UseGetAlternativeOptionsForRecipeContext.displayName = 'UseGetAlternativeOptionsForRecipeContext'

export const UseGetAlternativeOptionsForRecipeContextProvider = UseGetAlternativeOptionsForRecipeContext.Provider

export const useGetAlternativeOptionsForRecipeHook = () => {
  const hook = useContext(UseGetAlternativeOptionsForRecipeContext)

  if (hook === null) {
    throw new Error('There is no useGetAlternativeOptionsForRecipe hook in context!')
  }

  return hook
}
