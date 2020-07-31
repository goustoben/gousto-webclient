import { createSelector } from 'reselect'
import { getIsAuthenticated } from '../../../selectors/auth'
import { getIsTastePreferencesEnabled } from '../../../selectors/features'

export const getShouldBannerTastePreferencesShow = createSelector(
  getIsTastePreferencesEnabled,
  getIsAuthenticated,
  (isTastePreferencesEnabled, isAuthenticated) => isTastePreferencesEnabled && !isAuthenticated
)
