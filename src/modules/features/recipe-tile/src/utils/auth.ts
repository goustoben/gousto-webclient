import { useSelector } from 'react-redux'
import Immutable from 'immutable'

type State = { auth: Immutable.Map<string, string | boolean> }

const getAuthUserId = (state: State) => state.auth.get('id') as string
const getIsAdmin = (state: State) => state.auth.get('isAdmin') as boolean
const getAccessToken = (state: State) => state.auth.get('accessToken') as string

export const useAuth = () => {
  const accessToken = useSelector<State, string | undefined>(getAccessToken)
  const authUserId = useSelector<State, string | undefined>(getAuthUserId)
  const isAdmin = useSelector<State, boolean>(getIsAdmin) || false

  return {
    accessToken,
    authUserId,
    isAdmin,
  }
}
