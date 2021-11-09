import { Cookies } from 'utils/GoustoCookies'
import { logger } from 'utils/logger'
import { updateTastePreferences } from 'apis/tastePreferences'
import { getIsTastePreferencesEnabled } from '../selectors/features'
import { getAccessToken } from '../selectors/auth'

export const updateUserTasteProfile = () => (
  async (dispatch, getState) => {
    const state = getState()
    const isTastePreferencesEnabled = getIsTastePreferencesEnabled(state)
    const authToken = getAccessToken(state)
    if (isTastePreferencesEnabled && authToken) {
      const sessionId = Cookies.get('gousto_session_id')
      try {
        await updateTastePreferences(authToken, sessionId)
      } catch (error) {
        logger.error({ message: `Could not save taste profile for sessionId: ${sessionId}`, error})
      }
    }
  }
)

