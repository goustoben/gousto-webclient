import React from 'react'
import PropTypes from 'prop-types'
import { BaseBannerButton } from '../BaseBannerButton'

const Next = ({ pricingPending, view, showDetails, boxSummaryNext, open }) => {
  return (
    <BaseBannerButton
      view={view}
      pending={pricingPending}
      dataTesting='boxSummaryNextButton'
      onClick={showDetails ? boxSummaryNext : open}
    >
      Next
    </BaseBannerButton>
  )
}

Next.propTypes = {
  boxSummaryNext: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  showDetails: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired,
  pricingPending: PropTypes.bool,
}

Next.defaultProps = {
  pricingPending: false,
}

export { Next }
