import Cookies from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'

const getSessionId = () => get(Cookies, 'gousto_session_id', false, false)
export const getRequestHeaders = (userId) => ({
  'Content-Type': 'application/json',
  'x-gousto-device-id': getSessionId(),
  'x-gousto-user-id': userId
})
