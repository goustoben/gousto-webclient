import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { signupConfig } from 'config/signup'
import Svg from 'Svg'
import { Benefits } from 'routes/Home/Benefits'
import postcodeCss from './PostcodeStep.module.css'

export const PostcodeStepMessage = ({
  isGoustoOnDemandEnabled,
  deliveryDaysError,
  isWizardWithoutImagesEnabled,
}) => {
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
