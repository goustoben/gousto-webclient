import PropTypes from 'prop-types'
import React from 'react'
import Svg from 'Svg'
import css from './RecipeDisclaimer.css'

const RecipeDisclaimer = ({ disclaimer }) => (
  !!disclaimer
  && (
    <div className={css.disclaimerWrapper}>
      <Svg fileName="icon_health_kitchen_heart" className={css.disclaimerIcon} />
      <p className={css.disclaimerText}>{disclaimer}</p>
    </div>
  )
)

RecipeDisclaimer.propTypes = {
  disclaimer: PropTypes.string
}

RecipeDisclaimer.defaultProps = {
  disclaimer: null
}

export { RecipeDisclaimer }
