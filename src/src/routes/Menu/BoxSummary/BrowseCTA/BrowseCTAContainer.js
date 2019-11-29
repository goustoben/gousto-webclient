import { connect } from 'react-redux'
import actions from 'actions'
import BrowseCTA from './BrowseCTA'

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
