import { connect } from 'react-redux'
import actions from 'actions'
import AgeVerify from './AgeVerify'

const mapStateToProps = state => ({
  verified: state.promoAgeVerified,
})

export default connect(mapStateToProps, {
  onChange: actions.promoAgeVerify,
})(AgeVerify)
