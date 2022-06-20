import { persist } from './persistStore'

export const persistenceMiddleware = (whitelist, cookies) => ({ getState }) => (
  next => action => {
    const result = next(action)
    persist(getState(), whitelist, cookies)

    return result
  }
)
