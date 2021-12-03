import PropTypes from 'prop-types'
import React from 'react'
import typography from 'design-language/typography.module.css'
import css from './BoxDetails.module.css'

export const YourBoxDetails = ({ numPortions, numRecipes }) => (
  <div className={`${css.container} ${css.wrapper}`} data-testing="checkoutBoxDetailsSection">
    <div className={css.headerWrapper}>
      <h3 className={`${typography.fontStyleButtonL} ${css.headHorizontalLineAbove}`}>Your box</h3>
    </div>

    <div className={typography.fontStyleBody}>
      <h4 className={`${typography.fontStyleSubHead} ${css.mb0}`}>Number of people</h4>
      <p>{numPortions} people</p>

      <h4 className={`${typography.fontStyleSubHead} ${css.mb0}`}>Number of recipes</h4>
      <p className={css.mb0}>{numRecipes} recipes</p>
    </div>
  </div>
)

YourBoxDetails.propTypes = {
  numPortions: PropTypes.number,
  numRecipes: PropTypes.number,
}

YourBoxDetails.defaultProps = {
  numPortions: 0,
  numRecipes: 0,
}
