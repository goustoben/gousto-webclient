import { connect } from 'react-redux'
import { BrowseCTAButton } from './BrowseCTAButton'
import { boxSummaryVisibilityChange } from "actions/boxSummary/boxSummaryVisibilityChange"
import { menuBrowseCTAVisibilityChange } from "actions/menu/menuBrowseCTAVisibilityChange"

function mapStateToProps(state, ownProps) {
  return ({
    menuBrowseCTAShow: state.menuBrowseCTAShow,
    boxSummaryShow: state.boxSummaryShow.get('show') && state.boxSummaryShow.get('view') === ownProps.view,
    disable: state.auth.get('isAdmin'),
  })
}

const BrowseCTAButtonContainer = connect(mapStateToProps, {
  boxDetailsVisibilityChange: boxSummaryVisibilityChange,
  menuBrowseCTAVisibilityChange,
})(BrowseCTAButton)

export { BrowseCTAButtonContainer }
