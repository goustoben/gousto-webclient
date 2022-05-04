import React from 'react'
import PropTypes from 'prop-types'

import { Title } from '../../Title'
import { Description } from '../../Description'

import css from './PriceAndDiscountTip.css'

export const PriceAndDiscountTip = ({ numPortions, numRecipes, date, slotId, warning }: any) => (
  <div className={css.buttonTextWrapper}>
    <Title numRecipes={numRecipes} />
    <Description numRecipes={numRecipes} />
  </div>
)

PriceAndDiscountTip.propTypes = {
  numPortions: PropTypes.number.isRequired,
  numRecipes: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  slotId: PropTypes.string.isRequired,
  warning: PropTypes.bool.isRequired,
}
