import PropTypes from 'prop-types'
import React from 'react'

import config from 'config'
import css from './SoldOutOverlay.css'

const SoldOutOverlay = ({ inBasket, stock }) => {
  const message = (
    <div className={css.overlay}>
      <span className={css.overlayText}>
        This recipe is sold out
      </span>
    </div>
  )

  if (stock === undefined || stock === null) {
    return null
  }

  if (stock <= config.menu.stockThreshold && !inBasket) {
    return message
  }

  return null
}

SoldOutOverlay.propTypes = {
  stock: PropTypes.number,
  inBasket: PropTypes.bool,
}

SoldOutOverlay.defaultProps = {
  stock: null,
  inBasket: false,
}
export { SoldOutOverlay }
