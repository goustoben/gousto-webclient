import React from 'react'

import Svg from 'Svg'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Benefits } from 'routes/Home/Benefits'
import { signupConfig } from 'routes/Signup/signupConfig'

import postcodeCss from './PostcodeStep.css'

export const PostcodeStepMessage = ({
  isGoustoOnDemandEnabled,
  deliveryDaysError,
  isWizardWithoutImagesEnabled,
}) => {
  if (isGoustoOnDemandEnabled && !deliveryDaysError) {
    return <Benefits isCentered byId="everydayDelivery" fontStyleBody />
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
    <div
      className={classNames({
        [postcodeCss.errorText]: deliveryDaysError,
        [postcodeCss.bodyText]: !deliveryDaysError,
        [postcodeCss.wizardWithoutImages]: isWizardWithoutImagesEnabled,
      })}
    >
      {!deliveryDaysError && <Svg className={postcodeCss.tick} fileName="icon-success-tick" />}
      {text}
    </div>
  )
}

PostcodeStepMessage.propTypes = {
  isGoustoOnDemandEnabled: PropTypes.bool,
  deliveryDaysError: PropTypes.string,
  isWizardWithoutImagesEnabled: PropTypes.bool,
}

PostcodeStepMessage.defaultProps = {
  isGoustoOnDemandEnabled: false,
  deliveryDaysError: '',
  isWizardWithoutImagesEnabled: false,
}
