import { Cookies } from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'

export const getIsPolicyAccepted = state => state.cookies.get('isPolicyAccepted')
export const getSessionId = () => get(Cookies, 'gousto_session_id', false, false)
