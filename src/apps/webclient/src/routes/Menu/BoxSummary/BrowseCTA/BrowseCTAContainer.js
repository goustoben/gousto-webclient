import { connect } from 'react-redux'
import actions from 'actions'
import { boxSummaryVisibilityChange } from 'actions/boxSummary'
import { BrowseCTA } from './BrowseCTA'

function mapStateToProps(state) {
  return {
    menuBrowseCTAShow: state.menuBrowseCTAShow,
  }
}

const BrowseCTAContainer = connect(mapStateToProps, {
  boxDetailsVisibilityChange: boxSummaryVisibilityChange,
  menuBrowseCTAVisibilityChange: actions.menuBrowseCTAVisibilityChange,
})(BrowseCTA)

export { BrowseCTAContainer }
