import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { SubscriptionPauseScreenContainer } from '../SubscriptionPauseScreen'
import { MultiSkipScreenContainer } from '../MultiSkipScreen'

export const ModalContent = ({ isMultiSkipEnabled }) => {
  const [shouldShowMultiSkip, setShouldShowMultiSkip] = useState(true)
  const handleContinueToPause = () => { setShouldShowMultiSkip(false) }

  return isMultiSkipEnabled && shouldShowMultiSkip
    ? (
      <MultiSkipScreenContainer handleContinueToPause={handleContinueToPause} />
    )
    : <SubscriptionPauseScreenContainer />
}

ModalContent.propTypes = {
  isMultiSkipEnabled: PropTypes.bool
}

ModalContent.defaultProps = {
  isMultiSkipEnabled: false
}
