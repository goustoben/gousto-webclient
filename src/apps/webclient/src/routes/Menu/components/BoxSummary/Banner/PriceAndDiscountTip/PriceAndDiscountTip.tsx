import React from 'react'
import PropTypes from 'prop-types'

import { Title } from '../../Title'
import { Description } from '../../Description'

import css from './PriceAndDiscountTip.css'

export const PriceAndDiscountTip = ({ numRecipes }: any) => (
  <div className={css.buttonTextWrapper}>
    <Title numRecipes={numRecipes} />
    <Description numRecipes={numRecipes} />
  </div>
)

PriceAndDiscountTip.propTypes = {
  numRecipes: PropTypes.number.isRequired,
}
