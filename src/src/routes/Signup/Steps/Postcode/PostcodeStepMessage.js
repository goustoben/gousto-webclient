import React from 'react'
import PropTypes from 'prop-types'
import { signupConfig } from 'config/signup'
import Svg from 'Svg'
import { Benefits } from 'routes/Home/Benefits'
import postcodeCss from './PostcodeStep.css'

export const PostcodeStepMessage = ({ isGoustoOnDemandEnabled, deliveryDaysError }) => {
  if (isGoustoOnDemandEnabled && !deliveryDaysError) {
    return <Benefits isCentered byId="freeDelivery" fontStyleBody />
  }
  let text
  if (deliveryDaysError === 'do-not-deliver') {
    text = signupConfig.postCodeStep.doNotDeliverErrorMessage
  } else if (deliveryDaysError) {
    text = signupConfig.postCodeStep.genericErrorMessage
  } else {
    text = signupConfig.postCodeStep.reminder
  }

  return (
    <div className={deliveryDaysError ? postcodeCss.errorText : postcodeCss.bodyText}>
      {!deliveryDaysError && <Svg className={postcodeCss.tick} fileName="icon-success-tick" />}
      {text}
    </div>
  )
}

PostcodeStepMessage.propTypes = {
  isGoustoOnDemandEnabled: PropTypes.bool,
  deliveryDaysError: PropTypes.string,
}

PostcodeStepMessage.defaultProps = {
  isGoustoOnDemandEnabled: false,
  deliveryDaysError: '',
}
