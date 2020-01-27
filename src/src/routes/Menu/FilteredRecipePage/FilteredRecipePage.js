import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { getElementHeight } from 'utils/DOMhelper'
import { RecipeGrid } from '../RecipeGrid'

import css from './FilteredRecipePage.css'

class FilteredRecipePage extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    borderColor: PropTypes.string.isRequired,
    backToAllRecipes: PropTypes.func.isRequired,
    recipes: PropTypes.instanceOf(Immutable.List).isRequired,
    filteredRecipeIds: PropTypes.instanceOf(Immutable.List).isRequired,
    isFoodBrandClickable: PropTypes.bool
  }

  static defaultProps = {
    isFoodBrandClickable: true
  }

  constructor(props) {
    super(props)
    this.state = {
      containerHeight: 0
    }
  }

  componentDidMount() {
    this.setState({ containerHeight: getElementHeight(window.document, "#filteredRecipePageTitleContainer") })

    window.scrollTo(0, 0)
  }

  render() {
    const {
      name,
      description,
      borderColor,
      backToAllRecipes,
      recipes,
      filteredRecipeIds,
      isFoodBrandClickable
    } = this.props
    const { containerHeight } = this.state

    return (
      <section className={css.filteredRecipePageContainer}>
        <div id="filteredRecipePageTitleContainer" className={css.filteredRecipePageTitleContainer}>
          <span className={css.backButton} role="button" tabIndex={0} onClick={backToAllRecipes} onKeyPress={backToAllRecipes} data-testing='backToAllRecipes'>
            <span className={css.leftArrow} />
            <span className={css.underline}>
              Back
              {' '}
              <span className={css.hideOnMobile}>to All Recipes</span>
            </span>
          </span>
          <h1>{name}</h1>
        </div>
        <p className={css.filteredRecipePageDescription}>{description}</p>
        <div style={{ top: containerHeight, background: borderColor }} className={css.border} />
        <div className={css.filteredRecipePageRecipes}>
          <RecipeGrid recipes={recipes} filteredRecipeIds={filteredRecipeIds} isFoodBrandClickable={isFoodBrandClickable} />
        </div>
      </section>
    )
  }
}

export { FilteredRecipePage }
