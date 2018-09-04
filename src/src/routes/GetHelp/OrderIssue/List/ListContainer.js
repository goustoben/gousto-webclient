import { connect } from 'react-redux'

import { List } from './List'

import { orderIssueSelected } from 'actions/getHelp'

const mapStateToProps = (state, ownProps) => (ownProps)

const ListContainer = connect(mapStateToProps, {
	orderIssueSelected,
})(List)

export default ListContainer
