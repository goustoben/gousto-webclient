import { createContext, useContext } from 'react'

type UseSetBrowserCTAVisibility = () => {
  setBrowserCTAVisible: () => void
}

const UseSetBrowserCTAVisibilityContext = createContext<UseSetBrowserCTAVisibility | null>(null)
UseSetBrowserCTAVisibilityContext.displayName = 'UseSetBrowserCTAVisibilityContext'

export const UseSetBrowserCTAVisibilityContextProvider = UseSetBrowserCTAVisibilityContext.Provider

export const useSetBrowserCTAVisibilityHook = () => {
  const hook = useContext(UseSetBrowserCTAVisibilityContext)

  if (hook === null) {
    throw new Error('There is no useSetBrowserCTAVisibility hook in context!')
  }

  return hook
}
