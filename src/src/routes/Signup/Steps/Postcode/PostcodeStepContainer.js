import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import tempActions from 'actions/temp'
import { signupChangePostcode } from 'actions/signup'
import { PostcodeStep } from './PostcodeStep'

function mapStateToProps(state) {
  return {
    tempPostcode: state.temp.get('postcode', ''),
    deliveryDaysError: state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, false),
    postcodePending: state.basket.get('postcodePending'),
  }
}

const PostcodeStepContainer = connect(mapStateToProps, {
  changeTempPostcode: postcode => tempActions.temp('postcode', postcode.toUpperCase()),
  changePostcode: signupChangePostcode,
})(PostcodeStep)

export { PostcodeStepContainer }
