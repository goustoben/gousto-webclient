import { connect } from 'react-redux'
import { promoAgeVerify } from 'actions/promos'
import { AgeVerify } from './AgeVerify'

const mapStateToProps = state => ({
  verified: state.promoAgeVerified,
})

export const AgeVerifyContainer = connect(mapStateToProps, {
  onChange: promoAgeVerify,
})(AgeVerify)
