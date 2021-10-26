import React from 'react'
import spottyBorder from 'media/images/menu/spottyTileBorder.png'
import PropTypes from 'prop-types'
import css from './CTAToAllRecipes.css'

const CTAToAllRecipes = ({ collectionFilterChange, menuCurrentCollectionId }) => {
  const recommendationsCollection = '97270056-cd65-11e8-a2d2-067a72dd5dba'
  if (menuCurrentCollectionId === recommendationsCollection) {
    return (
      <div className={css.ctaAllRecipe}>
        <section className={css.ctaWrapper}>
          <img src={spottyBorder} className={css.spottyBorder} alt="" />
          <div className={css.ctaInnerContainer}>
            <p className={css.ctaText}>Want to see more?</p>
            <button
              className={css.ctaButton}
              type="button"
              onClick={collectionFilterChange}
              onKeyPress={collectionFilterChange}
            >
              View all recipes
            </button>
          </div>
        </section>
      </div>
    )
  }

  return null
}

CTAToAllRecipes.propTypes = {
  collectionFilterChange: PropTypes.func.isRequired,
  menuCurrentCollectionId: PropTypes.func.isRequired,
}

export { CTAToAllRecipes }
