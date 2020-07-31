import { connect } from 'react-redux'
import { BannerTastePreferences } from './BannerTastePreferences'
import { getShouldBannerTastePreferencesShow } from '../../selectors/tastePreferences'

const mapStateToProps = (state) => ({
  shouldBannerShow: getShouldBannerTastePreferencesShow(state)
})

export const BannerTastePreferencesContainer = connect(mapStateToProps)(BannerTastePreferences)
