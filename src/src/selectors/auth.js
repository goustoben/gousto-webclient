export const getIsAdmin = state => state.auth.get('isAdmin')
export const getIsAuthenticated = state => state.auth.get('isAuthenticated')

export default {
  getIsAdmin,
  getIsAuthenticated
}
