import { authValidate, userAuthenticated } from 'actions/auth'

export async function authorise(store) {
  try {
    const accessToken = store.getState().auth.get('accessToken')
    const refreshToken = store.getState().auth.get('refreshToken')
    const expiresAt = store.getState().auth.get('expiresAt')

    if (accessToken || refreshToken) {
      await store.dispatch(authValidate(accessToken, refreshToken, expiresAt))
    }
  } catch (err) {
    store.dispatch(userAuthenticated('', '', ''))
  }
}
