import { connect } from 'react-redux'

import { CategoriesList } from './CategoriesList'

import { orderIssueSelected } from 'actions/getHelp'

const mapStateToProps = (state, ownProps) => (ownProps)

const CategoriesListContainer = connect(mapStateToProps, {
	orderIssueSelected,
})(CategoriesList)

export default CategoriesListContainer
