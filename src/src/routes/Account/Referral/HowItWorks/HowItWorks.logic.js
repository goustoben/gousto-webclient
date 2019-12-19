import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { replaceLinkToTermsAndCondition } from 'utils/sanitizeText'
import { rafTermsLink } from 'config/referral'
import { HowItWorksPresentation } from './HowItWorks.presentation'

const propTypes = {
  details: PropTypes.instanceOf(Immutable.List),
}

const HowItWorks = ({ details }) => {
  const sanitizeLastStep = replaceLinkToTermsAndCondition(details.last(), rafTermsLink)
  const detailsSteps = details.pop().push(sanitizeLastStep)

  return (
    <HowItWorksPresentation detailsSteps={detailsSteps} />
  )
}

HowItWorks.propTypes = propTypes

export { HowItWorks }
