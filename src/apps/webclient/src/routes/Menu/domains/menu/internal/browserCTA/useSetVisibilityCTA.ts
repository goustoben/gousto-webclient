import { useCallback } from 'react'

import { useDispatch } from 'react-redux'

import { menuBrowseCTAVisibilityChange } from 'actions/menu'

export const useSetBrowserCTAVisibility = () => {
  const dispatch = useDispatch()

  const setBrowserCTAVisible = useCallback(
    () => dispatch(menuBrowseCTAVisibilityChange(true)),
    [dispatch],
  )
  const setBrowserCTANonVisible = useCallback(
    () => dispatch(menuBrowseCTAVisibilityChange(false)),
    [dispatch],
  )

  return { setBrowserCTAVisible, setBrowserCTANonVisible }
}
