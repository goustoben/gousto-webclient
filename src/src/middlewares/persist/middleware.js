import { persist } from './persistStore'

export default (whitelist, cookies) => ({ getState }) => (
  next => action => {
    const result = next(action)
    persist(getState(), whitelist, cookies)

    return result
  }
)
