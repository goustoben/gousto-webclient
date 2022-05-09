import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getIsAuthenticated } from 'selectors/auth'

export const RibbonIsAuthenticatedAttributeReporter = () => {
  const isAuthenticated = useSelector(getIsAuthenticated)

  useEffect(() => {
    if (window.ribbon) {
      window.ribbon('attribute', 'is-logged-in', isAuthenticated)
    }
  }, [isAuthenticated])

  return null
}
