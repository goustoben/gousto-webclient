import { connect } from 'react-redux'
import { getCurrentBoxSummaryView } from 'utils/boxSummary'
import { BannerButton } from './BannerButton'

function mapStateToProps(state) {
  return {
    boxSummaryCurrentView: getCurrentBoxSummaryView(state)
  }
}

const BannerButtonContainer = connect(mapStateToProps, {})(BannerButton)

export { BannerButtonContainer }
