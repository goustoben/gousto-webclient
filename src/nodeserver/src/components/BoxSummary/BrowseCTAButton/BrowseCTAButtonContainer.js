import { connect } from 'react-redux'
import actions from 'actions'
import BrowseCTAButton from './BrowseCTAButton'

function mapStateToProps(state, ownProps) {
	return ({
		menuBrowseCTAShow: state.menuBrowseCTAShow,
		boxSummaryShow: state.boxSummaryShow.get('show') && state.boxSummaryShow.get('view') === ownProps.view,
		disable: state.auth.get('isAdmin'),
	})
}

const BrowseCTAButtonContainer = connect(mapStateToProps, {
	boxDetailsVisibilityChange: actions.boxSummaryVisibilityChange,
	menuBrowseCTAVisibilityChange: actions.menuBrowseCTAVisibilityChange,
})(BrowseCTAButton)

export default BrowseCTAButtonContainer
