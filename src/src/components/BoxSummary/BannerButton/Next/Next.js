import React from 'react'
import PropTypes from 'prop-types'
import { BaseBannerButton } from '../BaseBannerButton'

const Next = ({ pricingPending, view, showDetails, boxSummaryNext, open }) => {
  return (
    <BaseBannerButton
      pending={pricingPending}
      data-testing={`${view}BoxSummaryNextButton`}
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
  view: PropTypes.string,
  pricingPending: PropTypes.bool,
}

Next.defaultProps = {
  view: 'mobile',
  pricingPending: false,
}

export { Next }
