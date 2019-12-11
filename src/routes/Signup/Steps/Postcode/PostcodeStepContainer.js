import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import actions from 'actions'
import PostcodeStep from './PostcodeStep'

function mapStateToProps(state) {
  return {
    tempPostcode: state.temp.get('postcode', ''),
    deliveryDaysError: state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, false),
    postcodePending: state.basket.get('postcodePending'),
  }
}

const PostcodeStepContainer = connect(mapStateToProps, {
  changeTempPostcode: postcode => actions.temp('postcode', postcode),
  changePostcode: actions.signupChangePostcode,
})(PostcodeStep)

export default PostcodeStepContainer
