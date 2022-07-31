import type { User } from '../models/user'
import type { Action } from './reducers'
import { createContext, useContext } from 'react'

export type Dispatch = (action: Action) => void

type Context = {
  user: User,
  dispatch: Dispatch ,
}

const AccountContext = createContext<Context | null>(null)
AccountContext.displayName = 'AccountContext'

export const AccountContextProvider = AccountContext.Provider

export const useAccountHook = (): Context => {
  const hook = useContext(AccountContext)

  if (hook === null) {
    throw new Error('No account hook in context')
  }

  return hook
}
