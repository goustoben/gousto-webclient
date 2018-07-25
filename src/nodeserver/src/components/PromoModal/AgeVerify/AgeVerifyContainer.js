import AgeVerify from './AgeVerify'
import { connect } from 'react-redux'
import actions from 'actions'

const mapStateToProps = state => ({
	verified: state.promoAgeVerified,
})

export default connect(mapStateToProps, {
	onChange: actions.promoAgeVerify,
})(AgeVerify)
