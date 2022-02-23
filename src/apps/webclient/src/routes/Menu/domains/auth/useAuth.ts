import { RootStateOrAny, useSelector } from 'react-redux'
import { getAccessToken, getAuthUserId } from 'selectors/auth'

export const useAuth = () => {
  const accessToken = useSelector<RootStateOrAny, string | undefined>(getAccessToken)
  const authUserId = useSelector<RootStateOrAny, string | undefined>(getAuthUserId)

  return {
    accessToken,
    authUserId,
  }
}
