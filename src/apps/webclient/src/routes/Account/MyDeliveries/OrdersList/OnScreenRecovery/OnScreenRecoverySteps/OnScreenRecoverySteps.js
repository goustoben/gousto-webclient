import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { MultiSkipScreenContainer } from '../../../../MultiSkipScreen'
import { OnScreenRecoveryViewContainer } from '../OnScreenRecoveryView'

export const OnScreenRecoverySteps = ({
  isMultiSkipEnabled,
  hasBoxesToSkip
}) => {
  const [isMultiSkipStep, setIsMultiSkipStep] = useState(isMultiSkipEnabled && hasBoxesToSkip)

  return isMultiSkipStep
    ? <MultiSkipScreenContainer handleContinueToPause={() => setIsMultiSkipStep(false)} />
    : <OnScreenRecoveryViewContainer />
}

OnScreenRecoverySteps.propTypes = {
  isMultiSkipEnabled: PropTypes.bool.isRequired,
  hasBoxesToSkip: PropTypes.bool.isRequired
}
