import PropTypes from 'prop-types'
import React from 'react'

import css from './SoldOutOverlay.module.css'

const SoldOutOverlay = ({ isOutOfStock }) => {
  const message = (
    <div className={css.overlay}>
      <span className={css.overlayText}>
        This recipe is sold out for your delivery date
      </span>
    </div>
  )

  if (isOutOfStock) {
    return message
  }

  return null
}

SoldOutOverlay.propTypes = {
  isOutOfStock: PropTypes.bool,
}

SoldOutOverlay.defaultProps = {
  isOutOfStock: false,
}
export { SoldOutOverlay }
