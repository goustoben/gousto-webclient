import React from 'react'
import PropTypes from 'prop-types'
import { Button, Segment } from 'goustouicomponents'
import classnames from 'classnames'
import { isMobile } from 'utils/view'
import css from '../BoxSummaryButton.css'

const BoxSummaryNextButton = ({ pricingPending, view, showDetails, boxSummaryNext, open }) => {
  const isMobileView = isMobile(view)

  return (
    <Button width="full" pending={pricingPending} data-testing={`${view}BoxSummaryNextButton`}>
      <Segment
        className={classnames({
          [css.submitButton]: isMobileView,
          [css.coButtonSegment]: !isMobileView,
        })}
        onClick={showDetails ? boxSummaryNext : open}
      >
        Next
      </Segment>
    </Button>
  )
}

BoxSummaryNextButton.propTypes = {
  boxSummaryNext: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  showDetails: PropTypes.bool.isRequired,
  view: PropTypes.string,
  pricingPending: PropTypes.bool,
}

BoxSummaryNextButton.defaultProps = {
  view: 'desktop',
  pricingPending: false,
}

export { BoxSummaryNextButton }
