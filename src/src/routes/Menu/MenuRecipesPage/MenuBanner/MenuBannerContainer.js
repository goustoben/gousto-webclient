import { connect } from 'react-redux'
import { getHideMenuBanner } from 'selectors/features'
import { MenuBanner } from './MenuBanner'

const mapStateToProps = (state) => ({
  hideMenuBanner: getHideMenuBanner(state)
})

export const MenuBannerContainer = connect(mapStateToProps)(MenuBanner)
