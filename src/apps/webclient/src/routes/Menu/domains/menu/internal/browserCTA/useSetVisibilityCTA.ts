import { useDispatch } from 'react-redux'

import { menuBrowseCTAVisibilityChange } from 'actions/menu'

export const useSetBrowserCTAVisibility = () => {
  const dispatch = useDispatch()

  const setBrowserCTAVisible = () => dispatch(menuBrowseCTAVisibilityChange(true))
  const setBrowserCTANonVisible = () => dispatch(menuBrowseCTAVisibilityChange(false))

  return { setBrowserCTAVisible, setBrowserCTANonVisible }
}
