import { connect } from 'react-redux'

import { storeGetHelpOrderId } from 'actions/getHelp'

import GetHelp from './GetHelp'

const mapStateToProps = (state, ownProps) => (ownProps)

const GetHelpContainer = connect(mapStateToProps, {
	storeGetHelpOrderId,
})(GetHelp)

export default GetHelpContainer
