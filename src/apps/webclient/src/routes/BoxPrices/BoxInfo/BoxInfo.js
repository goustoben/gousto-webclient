import PropTypes from 'prop-types'
import React from 'react'

import { BoxIcon } from '../BoxIcon'
import css from './BoxInfo.css'

const BoxInfo = ({ numPortions, pricePerPortion, totalPrice, numPersons }) => (
  <div className={css.container}>
    <p className={css.recipes}>{numPortions} Recipes</p>
    <p>
      <span className={css.portionPrice}>
        &pound;
        {pricePerPortion}
      </span>
      <small>per serving</small>
    </p>
    <p>
      <small>Box price</small>
      <span className={css.boxPrice}>
        &pound;
        {totalPrice}
      </span>
    </p>
    <BoxIcon numPortions={numPortions} numPersons={numPersons} />
  </div>
)

BoxInfo.propTypes = {
  numPortions: PropTypes.number.isRequired,
  totalPrice: PropTypes.string.isRequired,
  pricePerPortion: PropTypes.string.isRequired,
  numPersons: PropTypes.number.isRequired,
}

export { BoxInfo }
