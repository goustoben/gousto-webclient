import { createContext, useContext } from 'react'

type UseAuth = () => {
  accessToken: string | undefined,
  authUserId: string | undefined,
  isAdmin: boolean,
  isAuthenticated: boolean,
}

const UseAuthContext = createContext<UseAuth | null>(null)
UseAuthContext.displayName = 'UseAuthContext'

export const UseAuthContextProvider = UseAuthContext.Provider

export const useAuthHook = () => {
  const hook = useContext(UseAuthContext)

  if (hook === null) {
    throw new Error('There is no useAuth hook in context!')
  }

  return hook
}
