import PropTypes from 'prop-types'
import React from 'react'

import css from './SoldOutOverlay.css'

const SoldOutOverlay = ({ outOfStock }) => {
  const message = (
    <div className={css.overlay}>
      <span className={css.overlayText}>
        This recipe is sold out for your delivery date
      </span>
    </div>
  )

  if (outOfStock) {
    return message
  }

  return null
}

SoldOutOverlay.propTypes = {
  outOfStock: PropTypes.bool,
}

SoldOutOverlay.defaultProps = {
  outOfStock: false,
}
export { SoldOutOverlay }
