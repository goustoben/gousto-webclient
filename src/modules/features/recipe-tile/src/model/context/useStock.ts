import { createContext, useContext } from 'react'

type UseStock = () => {
  isRecipeOutOfStock: (recipeId: string, numPortions: 2 | 4) => boolean,
}

const UseStockContext = createContext<UseStock | null>(null)
UseStockContext.displayName = 'UseStockContext'

export const UseStockContextProvider = UseStockContext.Provider

export const useStockHook = () => {
  const hook = useContext(UseStockContext)

  if (hook === null) {
    throw new Error('There is no useStock hook in context!')
  }

  return hook
}
