import React, { PropTypes } from 'react'

import css from './DisabledOverlay.css'
import config from 'config'

const DisabledOverlay = ({ inBasket, stock }) => (
  (stock <= config.menu.stockThreshold && stock !== null && !inBasket)
    ?	<div className={css.overlay} />
    : null
)

DisabledOverlay.propTypes = {
  stock: PropTypes.number,
  inBasket: PropTypes.bool,
}

export default DisabledOverlay
