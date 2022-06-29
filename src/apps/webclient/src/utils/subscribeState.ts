import type { Map as ImmutableMap } from 'immutable'
import type { Store } from 'redux'

import { setAuthToken } from '@library/auth'

/**
 * Map changes in Redux store to other sources
 */
export function subscribeState(store: Store) {
  let lastAuth: null | ImmutableMap<string, unknown> = null

  function listener() {
    const { auth } = store.getState()
    if (auth !== lastAuth) {
      const accessToken: string = auth.get('accessToken')
      setAuthToken(accessToken || null) // null if empty string
      lastAuth = auth
    }
  }

  store.subscribe(listener)
  listener()
}
