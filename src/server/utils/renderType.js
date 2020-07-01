import { isEnabled } from './feature/isEnabled'
import { PREFETCH_MENU_EXPERIMENT_NAME } from './feature/featureData'

export const isServerSideFetchEligible = (headers, path, userId, sessionId) => {
  if (headers['x-pre-render'] === 'false') {
    return false
  }

  const isMenuRoute = (path === '/menu' || path.startsWith('/menu/'))

  if (isMenuRoute) {
    const prefetchMenu = isEnabled(PREFETCH_MENU_EXPERIMENT_NAME, userId, sessionId)

    return prefetchMenu
  }

  return true
}
