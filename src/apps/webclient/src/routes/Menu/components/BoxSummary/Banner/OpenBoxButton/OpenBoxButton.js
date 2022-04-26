import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import css from './OpenBoxButton.css'

const OpenBoxButton = ({ arrowUp, isSimplifyBasketBarEnabled }) => (
  <div
    className={classNames(css.iconMobile, {
      [css.isSimplifyBasketBarEnabled]: isSimplifyBasketBarEnabled,
    })}
  >
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
  isSimplifyBasketBarEnabled: PropTypes.bool.isRequired,
}

export { OpenBoxButton }
