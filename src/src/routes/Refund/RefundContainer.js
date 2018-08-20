import { connect } from 'react-redux'
import { PropTypes } from 'react'

import Refund from './Refund'

// import actionTypes from 'actions/actionTypes'

const mapStateToProps = (state, ownProps) => (ownProps)

const RefundContainer = connect(mapStateToProps, {})(Refund)

RefundContainer.propTypes = {
	children: PropTypes.node,
}

export default RefundContainer
