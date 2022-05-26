import { RootStateOrAny, useSelector } from 'react-redux'

import { getAccessToken, getAuthUserId, getIsAdmin, getIsAuthenticated } from 'selectors/auth'

export const useAuth = () => {
  const accessToken = useSelector<RootStateOrAny, string | undefined>(getAccessToken)
  const authUserId = useSelector<RootStateOrAny, string | undefined>(getAuthUserId)
  const isAdmin = useSelector<RootStateOrAny, boolean>(getIsAdmin) || false
  const isAuthenticated = useSelector<RootStateOrAny, boolean>(getIsAuthenticated)

  return {
    accessToken,
    authUserId,
    isAdmin,
    isAuthenticated,
  }
}
