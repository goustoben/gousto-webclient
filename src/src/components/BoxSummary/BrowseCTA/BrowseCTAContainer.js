import { connect } from 'react-redux'
import BrowseCTA from './BrowseCTA'
import actions from 'actions'

function mapStateToProps(state) {
  return {
    menuBrowseCTAShow: state.menuBrowseCTAShow,
  }
}

const BrowseCTAContainer = connect(mapStateToProps, {
  boxDetailsVisibilityChange: actions.boxSummaryVisibilityChange,
  menuBrowseCTAVisibilityChange: actions.menuBrowseCTAVisibilityChange,
})(BrowseCTA)

export default BrowseCTAContainer
