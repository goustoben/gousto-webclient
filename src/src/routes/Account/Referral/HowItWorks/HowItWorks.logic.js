import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { replaceLinkToTermsAndCondition } from 'utils/sanitizeText'
import { rafTermsLink } from '../config'
import { HowItWorksPresentation } from './HowItWorks.presentation'

class HowItWorks extends PureComponent {

  render() {
    const { details } = this.props
    const sanitizeLastStep = replaceLinkToTermsAndCondition(details.last(), rafTermsLink)
    const detailsSteps = details.pop().push(sanitizeLastStep)
  
    return (
      <HowItWorksPresentation detailsSteps={detailsSteps} />
    )
  }
}

HowItWorks.propTypes = {
  details: PropTypes.instanceOf(Immutable.List),
}

export { HowItWorks }
