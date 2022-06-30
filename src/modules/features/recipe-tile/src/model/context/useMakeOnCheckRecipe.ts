import { createContext, useContext } from 'react'

type OnChangeCheckedRecipe =
  | ((_: {
    previousRecipeId: string;
    nextRecipeId: string;
  }) => void)
  | null

export type UseMakeOnCheckRecipe = (_: {
  originalId: string
  currentRecipeId: string
  categoryId: string
  isOnDetailScreen: boolean
  closeOnSelection: boolean
  onChangeCheckedRecipe: OnChangeCheckedRecipe
}) => (recipeReference: string | null, recipeId: string, isOutOfStock: boolean) => () => void

const UseMakeOnCheckRecipeContext = createContext<UseMakeOnCheckRecipe | null>(null)
UseMakeOnCheckRecipeContext.displayName = 'UseMakeOnCheckRecipeContext'

export const UseMakeOnCheckRecipeContextProvider = UseMakeOnCheckRecipeContext.Provider

export const useMakeOnCheckRecipeHook = () => {
  const hook = useContext(UseMakeOnCheckRecipeContext)

  if (hook === null) {
    throw new Error('There is no useMakeOnCheckRecipe hook in context!')
  }

  return hook
}
