import { useEffect, useRef } from 'react'
import * as globalsConfig from 'config/globals.js'

/**
 * Controls browser "Back" button. If onBack callback provided, back button won't go to 
 * prev page in window.history and callback would be called.
 * Note: due to browser history injection, once Back is clicked, then duplicate enrty for "Forward" button would occur.
 * @param onBack - callback to call instead of history navigation
 * @returns - new callback to use instead onBack.
 */
export const useBrowserBack = (onBack?: () => void) => {
  const newCallback = useRef<() => void>(() => history.back())
  useEffect(() => {
    if (onBack && globalsConfig.client) {
      // adding current URL as entry to browser's session history back so we can go "Back" to it
      history.pushState(null, document.title, location.href)
      window.addEventListener('popstate', onBack)
      return () => {
        window.removeEventListener('popstate', onBack)
      }
    }
  }, [onBack])
  return newCallback.current
}
