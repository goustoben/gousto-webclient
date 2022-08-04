import { useAuth } from 'routes/Menu/domains/auth'

/**
 * Indicate if Categories Navigation Bar should be rendered in "Double Decker" style.
 *
 * Based on initial experiment product ownership decided to show "Double Decker"
 * navigation to prospect customers only. Whereas existing customers should be
 * treated with original UI.
 */
export const useDoubleDeckerNav = (): boolean | null => {
  const { isAuthenticated } = useAuth()

  return !isAuthenticated
}
