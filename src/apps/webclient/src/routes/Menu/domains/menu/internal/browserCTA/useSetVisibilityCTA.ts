import { menuBrowseCTAVisibilityChange } from 'actions/menu'
import { useDispatch } from 'react-redux'

export const useSetBrowserCTAVisibility = () => {
  const dispatch = useDispatch()

  const setBrowserCTAVisible = () => dispatch(menuBrowseCTAVisibilityChange(true))
  const setBrowserCTANonVisible = () => dispatch(menuBrowseCTAVisibilityChange(false))

  return { setBrowserCTAVisible, setBrowserCTANonVisible }
}
