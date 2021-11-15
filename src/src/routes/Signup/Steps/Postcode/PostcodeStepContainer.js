import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { PostcodeStep } from './PostcodeStep'
import { signupGetCountByPostcode } from "actions/signup/signupGetCountByPostcode"
import { signupChangePostcode } from "actions/signup/signupChangePostcode"
import { temp } from "actions/temp/temp"

function mapStateToProps(state) {
  return {
    tempPostcode: state.temp.get('postcode', ''),
    deliveryDaysError: state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, false),
    postcodePending: state.basket.get('postcodePending'),
  }
}

const PostcodeStepContainer = connect(mapStateToProps, {
  changeTempPostcode: (postcode) => temp('postcode', postcode.toUpperCase()),
  changePostcode: signupChangePostcode,
  signupGetCountByPostcode,
})(PostcodeStep)

export { PostcodeStepContainer }
