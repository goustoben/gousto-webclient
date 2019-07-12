import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getScrollOffset } from 'utils/menu'
import { RecipeGrid } from '../RecipeGrid'

import css from './FoodBrandPage.css'

const propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  borderColor: PropTypes.string,
  browser: PropTypes.string,
  removeFoodBrand: PropTypes.func,
  mobileGridView: PropTypes.bool,
  showDetailRecipe: PropTypes.func,
  menuCurrentCollectionId: PropTypes.string,
  menuRecipeDetailShow: PropTypes.string,
  isClient: PropTypes.bool,
  menuFilterExperiment: PropTypes.bool,
}
class FoodBrandPage extends PureComponent {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { name, description, borderColor, removeFoodBrand, mobileGridView, showDetailRecipe, menuCurrentCollectionId, isClient, menuRecipeDetailShow, menuFilterExperiment } = this.props

    return (
      <section className={css.foodBrandContainer}>
        <div id="foodBrandTitleContainer" className={css.foodBrandTitleContainer}>
          <span className={css.backButton} role="button" tabIndex={0} onClick={removeFoodBrand} onKeyPress={removeFoodBrand}>
            <span className={css.leftArrow}/><span className={css.underline}>Back <span className={css.hideOnMobile}>to All Recipes</span></span>
          </span>
          <h1>{name}</h1>
        </div>
        <p className={css.foodBrandDescription}>{description}</p>
        <div style={{background: borderColor}} className={css.border}/>
        <div>
          <RecipeGrid
            mobileGridView={mobileGridView}
            showDetailRecipe={showDetailRecipe}
            menuCurrentCollectionId={menuCurrentCollectionId}
            isClient={isClient}
            menuRecipeDetailShow={menuRecipeDetailShow}
            menuFilterExperiment={menuFilterExperiment}
          />
        </div>
      </section>
    )
  }
}
FoodBrandPage.propTypes = propTypes

export { FoodBrandPage }
