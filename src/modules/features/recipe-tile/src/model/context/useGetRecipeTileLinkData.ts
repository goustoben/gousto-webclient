import { createContext, useContext } from 'react'

type UseGetRecipeTileLinkData = () => {
  isRecipeTileLinkVisible: boolean
  dispatchTrackClickMoreRecipeDetails: () => void
}

const UseGetRecipeTileLinkDataContext = createContext<UseGetRecipeTileLinkData | null>(null)
UseGetRecipeTileLinkDataContext.displayName = 'UseGetRecipeTileLinkData'

export const UseGetRecipeTileLinkDataContextProvider = UseGetRecipeTileLinkDataContext.Provider

export const useGetRecipeTileLinkDataHook = () => {
  const hook = useContext(UseGetRecipeTileLinkDataContext)

  if (hook === null) {
    throw new Error('There is no UseGetRecipeTileLinkData hook in context!')
  }

  return hook
}
