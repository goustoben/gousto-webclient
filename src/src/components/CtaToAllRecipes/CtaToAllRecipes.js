import React from 'react'
import Svg from 'Svg'
import css from './CtaToAllRecipes.css'

const CtaToAllRecipes = () => {
  return (
    <div className={css.ctaWrapper}>
      <Svg fileName="cta-recommendation" className={css.panIcon} />
      <div className={css.ctaText}>Want to see more?</div>
      <button type="button">view all recipes</button>
    </div>
  )
}

export default CtaToAllRecipes
