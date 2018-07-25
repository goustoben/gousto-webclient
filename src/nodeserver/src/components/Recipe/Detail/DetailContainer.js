import { connect } from 'react-redux'
import actions from 'actions'
import Detail from './Detail'

function mapStateToProps() {
	return {
	}
}

const DetailContainer = connect(mapStateToProps, {
	menuRecipeDetailVisibilityChange: actions.menuRecipeDetailVisibilityChange,
})(Detail)

export default DetailContainer
