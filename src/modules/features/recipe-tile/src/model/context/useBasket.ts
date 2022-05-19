import { createContext, useContext } from 'react'

type UseBasket = () => {
  canAddRecipes: boolean
  addRecipe: (recipeId: string) => void
  removeRecipe: (recipeId: string) => void
  reachedLimit: boolean
  isRecipeInBasket: (recipeId: string) => boolean
  numPortions: number
}

const UseBasketContext = createContext<UseBasket | null>(null)
UseBasketContext.displayName = 'UseBasketContext'

export const UseBasketContextProvider = UseBasketContext.Provider

export const useBasketHook = () => {
  const hook = useContext(UseBasketContext)

  if (hook === null) {
    throw new Error('There is no useBasket hook in context!')
  }

  return hook
}
