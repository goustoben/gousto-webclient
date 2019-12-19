import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import { boxSummaryViews } from 'utils/boxSummary'
import { isMobile } from 'utils/view'
import { CheckoutContainer } from './Checkout'
import css from './BannerButton.css'
import { NextContainer } from './Next'

const BannerButton = ({ view,
  open, boxSummaryCurrentView, fullWidth }) => {
  const isMobileView = isMobile(view)
  const classes = [
    { [css.buttoncontainer]: isMobileView },
    { [css.buttoncontainerFull]: fullWidth && isMobileView },
    { [css.coButton]: !isMobileView },
  ]

  return (
    <div className={classnames(...classes)}>
      {
        (boxSummaryCurrentView === boxSummaryViews.DETAILS)
          ? <CheckoutContainer view={view} />
          : <NextContainer view={view} open={open} />
      }
    </div>
  )
}

BannerButton.propTypes = {
  view: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  boxSummaryCurrentView: PropTypes.string,
  fullWidth: PropTypes.bool,
}

BannerButton.defaultProps = {
  boxSummaryCurrentView: '',
  fullWidth: false,
}

export { BannerButton }
