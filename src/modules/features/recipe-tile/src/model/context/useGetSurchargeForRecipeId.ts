import { createContext, useContext } from 'react'

type UseGetSurchargeForRecipeId = (recipeId: string) => number

const UseGetSurchargeForRecipeIdContext = createContext<UseGetSurchargeForRecipeId | null>(null)
UseGetSurchargeForRecipeIdContext.displayName = 'UseGetSurchargeForRecipeIdContext'

export const UseGetSurchargeForRecipeIdContextProvider = UseGetSurchargeForRecipeIdContext.Provider

export const useGetSurchargeForRecipeIdHook = () => {
  const hook = useContext(UseGetSurchargeForRecipeIdContext)

  if (hook === null) {
    throw new Error('There is no useGetSurchargeForRecipeId hook in context!')
  }

  return hook
}
