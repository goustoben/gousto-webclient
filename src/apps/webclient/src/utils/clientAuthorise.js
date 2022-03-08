import authActions from 'actions/auth'

// Despite the file's name, this function is called on both the client and server (via processRequest)
export async function authorise(store) {
  try {
    const accessToken = store.getState().auth.get('accessToken')
    const hasRefreshCookie = store.getState().auth.get('hasRefreshCookie')
    const expiresAt = store.getState().auth.get('expiresAt')

    if (accessToken || hasRefreshCookie) {
      await store.dispatch(authActions.authValidate(accessToken, hasRefreshCookie, expiresAt))
    }
  } catch (err) {
    store.dispatch(authActions.userAuthFailed())
  }
}
