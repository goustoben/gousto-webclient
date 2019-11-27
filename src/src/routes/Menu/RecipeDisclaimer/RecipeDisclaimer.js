import React from 'react'
import Svg from 'Svg'
import css from './RecipeDisclaimer.css'

const RecipeDisclaimer = ({ disclaimer }) => {
  return !!disclaimer &&
  <div className={css.disclaimerWrapper} >
    <Svg fileName='icon_health_kitchen_heart' className={css.disclaimerIcon} />
    <p className={css.disclaimerText} >{disclaimer}</p>
  </div>
}

export { RecipeDisclaimer }
