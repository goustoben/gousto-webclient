import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getElementHeight } from 'utils/DOMhelper'
import { RecipeGrid } from 'routes/Menu/RecipeGrid'

import css from './FilteredRecipePage.css'

const propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  borderColor: PropTypes.string,
  removeRecipeFilter: PropTypes.func,
  mobileGridView: PropTypes.bool,
  showDetailRecipe: PropTypes.func,
  menuCurrentCollectionId: PropTypes.string,
  menuRecipeDetailShow: PropTypes.string,
  isClient: PropTypes.bool,
}
class FilteredRecipePage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      containerHeight: 0
    }
  }

  componentDidMount() {
    this.setState({containerHeight: getElementHeight(window.document, "#filteredRecipePageTitleContainer")})

    window.scrollTo(0, 0)
  }

  componentWillUnmount() {
    const { removeRecipeFilter } = this.props

    removeRecipeFilter()
  }

  render() {
    const { name, description, borderColor, removeRecipeFilter, mobileGridView, showDetailRecipe, menuCurrentCollectionId, isClient, menuRecipeDetailShow } = this.props
    const { containerHeight } = this.state

    return (
      <section className={css.filteredRecipePageContainer}>
        <div id="filteredRecipePageTitleContainer" className={css.filteredRecipePageTitleContainer}>
          <span className={css.backButton} role="button" tabIndex={0} onClick={removeRecipeFilter} onKeyPress={removeRecipeFilter}>
            <span className={css.leftArrow}/><span className={css.underline}>Back <span className={css.hideOnMobile}>to All Recipes</span></span>
          </span>
          <h1>{name}</h1>
        </div>
        <p className={css.filteredRecipePageDescription}>{description}</p>
        <div style={{top: containerHeight, background: borderColor}} className={css.border}/>
        <div className={css.filteredRecipePageRecipes}>
          <RecipeGrid
            mobileGridView={mobileGridView}
            showDetailRecipe={showDetailRecipe}
            menuCurrentCollectionId={menuCurrentCollectionId}
            isClient={isClient}
            menuRecipeDetailShow={menuRecipeDetailShow}
          />
        </div>
      </section>
    )
  }
}
FilteredRecipePage.propTypes = propTypes

export { FilteredRecipePage }
