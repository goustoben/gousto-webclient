import { connect } from 'react-redux'
import { BrowseCTA } from './BrowseCTA'
import { boxSummaryVisibilityChange } from "actions/boxSummary/boxSummaryVisibilityChange"
import { menuBrowseCTAVisibilityChange } from "actions/menu/menuBrowseCTAVisibilityChange"

function mapStateToProps(state) {
  return {
    menuBrowseCTAShow: state.menuBrowseCTAShow,
  }
}

const BrowseCTAContainer = connect(mapStateToProps, {
  boxDetailsVisibilityChange: boxSummaryVisibilityChange,
  menuBrowseCTAVisibilityChange,
})(BrowseCTA)

export { BrowseCTAContainer }
