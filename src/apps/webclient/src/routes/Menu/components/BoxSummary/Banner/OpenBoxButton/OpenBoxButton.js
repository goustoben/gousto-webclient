import React from 'react'

import PropTypes from 'prop-types'

import css from './OpenBoxButton.css'

const OpenBoxButton = ({ arrowUp }) => (
  <div className={css.iconMobile}>
    <div>
      <span
        className={arrowUp ? css.arrowUp : css.arrowDown}
        data-slug="box-summary-mobile"
        data-testing="boxSummaryArrow"
      />
    </div>
  </div>
)

OpenBoxButton.propTypes = {
  arrowUp: PropTypes.bool.isRequired,
}

export { OpenBoxButton }
