import React from 'react'
import Svg from 'Svg'
import css from './CtaToAllRecipes.css'

const CtaToAllRecipes = () => {
  return (
    <div className={css.ctaWrapper}>
      <Svg fileName="cta-recommendation" className={css.panIcon} />
    </div>
  )
}

export default CtaToAllRecipes
