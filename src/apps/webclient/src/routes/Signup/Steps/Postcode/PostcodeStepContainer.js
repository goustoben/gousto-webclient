import { connect } from 'react-redux'

import { actionTypes } from 'actions/actionTypes'
import { signupChangePostcode, signupGetCountByPostcode } from 'actions/signup'
import tempActions from 'actions/temp'

import { PostcodeStep } from './PostcodeStep'

function mapStateToProps(state) {
  return {
    tempPostcode: state.temp.get('postcode', ''),
    deliveryDaysError: state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, false),
    postcodePending: state.basket.get('postcodePending'),
  }
}

const PostcodeStepContainer = connect(mapStateToProps, {
  changeTempPostcode: (postcode) => tempActions.temp('postcode', postcode.toUpperCase()),
  changePostcode: signupChangePostcode,
  signupGetCountByPostcode,
})(PostcodeStep)

export { PostcodeStepContainer }
