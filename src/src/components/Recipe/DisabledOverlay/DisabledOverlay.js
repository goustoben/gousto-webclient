import PropTypes from 'prop-types'
import React from 'react'

import config from 'config'
import css from './DisabledOverlay.css'

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
