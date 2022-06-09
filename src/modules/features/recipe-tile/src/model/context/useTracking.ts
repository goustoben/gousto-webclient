import { createContext, useContext } from 'react'

type TrackRecipeAlternativeOptionsMenuOpen = (args: {
  recipeId: string
  collectionId: string
}) => void
type TrackRecipeAlternativeOptionsMenuSwapRecipes = (args: {
  nextRecipeId: string
  previousRecipeId: string
  collectionId: string
}) => void

export type UseTracking = () => {
  useTrackVariantListDisplay: ({
    hasAlternativeOptions,
    view,
  }: {
    hasAlternativeOptions: boolean
    view: string
  }) => void,

  useTrackingSwapAlternativeOptions: () => ({
    trackRecipeAlternativeOptionsMenuOpen: TrackRecipeAlternativeOptionsMenuOpen,
    trackRecipeAlternativeOptionsMenuSwapRecipes: TrackRecipeAlternativeOptionsMenuSwapRecipes,
  })
}

const UseTrackingContext = createContext<UseTracking | null>(null)
UseTrackingContext.displayName = 'UseTrackingContext'

export const UseTrackingContextProvider = UseTrackingContext.Provider

export const useTrackingHook = () => {
  const hook = useContext(UseTrackingContext)

  if (hook === null) {
    throw new Error('There is no useTrackingStock hook in context!')
  }

  return hook
}
