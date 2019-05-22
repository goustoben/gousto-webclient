import React from 'react'
import Svg from 'Svg'
import css from './CTAToAllRecipes.css'

const CTAToAllRecipes = ({ collectionFilterChange }) => {
  return (
    <section className={css.ctaWrapper}>
      <Svg fileName="cta-recommendation" className={css.panIcon} />
      <p className={css.ctaText}>Want to see more?</p>
      <button className={css.ctaButton} type="button" onClick={collectionFilterChange}>Go to all recipes</button>
    </section>
  )
}

export default CTAToAllRecipes
