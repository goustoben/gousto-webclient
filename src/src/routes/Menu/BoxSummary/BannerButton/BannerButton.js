import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import * as trackingKeys from 'actions/trackingKeys'
import { SidesExperimentProvider } from 'routes/Menu/context/sidesExperimentContext'

import { isMobile } from 'utils/view'
import { CheckoutContainer } from './Checkout'
import css from './BannerButton.css'

const BannerButton = ({ view, fullWidth }) => {
  const isMobileView = isMobile(view)
  const classes = [
    { [css.buttoncontainer]: isMobileView },
    { [css.buttoncontainerFull]: fullWidth && isMobileView },
    { [css.coButton]: !isMobileView },
  ]

  return (
    <div className={classnames(...classes)}>
      <SidesExperimentProvider>
        <CheckoutContainer view={view} section={trackingKeys.menu} />
      </SidesExperimentProvider>
    </div>
  )
}

BannerButton.propTypes = {
  view: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
}

BannerButton.defaultProps = {
  fullWidth: false,
}

export { BannerButton }
