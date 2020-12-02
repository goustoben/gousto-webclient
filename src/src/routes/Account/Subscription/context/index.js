import { createContext } from 'react'

export const SubscriptionContext = createContext({ value: null, dispatch: null })
SubscriptionContext.displayName = 'SubscriptionContext'
