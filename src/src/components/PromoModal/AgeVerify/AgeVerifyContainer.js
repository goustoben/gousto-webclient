import { connect } from 'react-redux'
import AgeVerify from './AgeVerify'
import { promoAgeVerify } from "actions/promos/promoAgeVerify"

const mapStateToProps = state => ({
  verified: state.promoAgeVerified,
})

export default connect(mapStateToProps, {
  onChange: promoAgeVerify,
})(AgeVerify)
