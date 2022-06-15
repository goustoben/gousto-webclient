import { createContext, useContext } from 'react'

type BrandTag = {
  slug: string
  text: string
  theme: {
    [key: string]: string
  }
}

export type UseRecipeBrand = () => {
  useRecipeBrandAvailabilityTag: () => BrandTag | null,
  useRecipeBrandTag: () => BrandTag | null,
}

const UseRecipeBrandContext = createContext<UseRecipeBrand | null>(null)
UseRecipeBrandContext.displayName = 'UseRecipeBrandContext'

export const UseRecipeBrandContextProvider = UseRecipeBrandContext.Provider

export const useRecipeBrandHook = () => {
  const hook = useContext(UseRecipeBrandContext)

  if (hook === null) {
    throw new Error('There is no useRecipeBrand hook in context!')
  }

  return hook
}
