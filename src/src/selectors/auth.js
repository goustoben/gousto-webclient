
export const getIsAdmin = state => state.auth.get('isAdmin')
export const getIsAuthenticated = state => state.auth.get('isAuthenticated')
export const getAccessToken = state => state.auth.get('accessToken')
export const getRefreshToken = state => state.auth.get('refreshToken')
export const getExpiresAt = state => state.auth.get('expiresAt')
export const getIsRecaptchaEnabled = state => state.auth.get('isRecaptchaEnabled')

export default {
  getIsAdmin,
  getIsAuthenticated
}
