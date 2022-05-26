import React from 'react'

import PropTypes from 'prop-types'

import css from './BoxTypePrices.css'

const BoxTypePrices = ({ numPortions, totalPrice }) => (
  <div className={css.container}>
    <p className={css.recipes}>
      {numPortions}
      &nbsp;recipes
    </p>
    <p className={css.boxPrice}>
      &pound;
      {totalPrice}
    </p>
  </div>
)

BoxTypePrices.propTypes = {
  numPortions: PropTypes.number,
  totalPrice: PropTypes.string,
}

BoxTypePrices.defaultProps = {
  numPortions: null,
  totalPrice: null,
}

export { BoxTypePrices }
