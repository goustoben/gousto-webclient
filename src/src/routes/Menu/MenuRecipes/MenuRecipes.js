import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import menu from 'config/menu'
import MenuNoResults from '../MenuNoResults'
import FilterTagsNav from '../FilterTagsNav/FilterTagsNavContainer'
import DetailOverlay from '../DetailOverlay'
import CollectionsNav from '../CollectionsNav'
import RecipeList from '../RecipeList'
import css from '../Menu.css'

const propTypes = {
  features: PropTypes.instanceOf(Immutable.Map),
  fadeCss: PropTypes.string,
  showLoading: PropTypes.bool,
  filteredRecipesNumber: PropTypes.number,
  mobileGridView: PropTypes.bool,
  menuCurrentCollectionId: PropTypes.string,
  menuRecipeDetailShow: PropTypes.string,
  isClient: PropTypes.bool,
  clearAllFilters: PropTypes.func,
  showDetailRecipe: PropTypes.func,
}

class MenuRecipes extends PureComponent {
  render() {
    const {
      features,
      fadeCss,
      showLoading,
      filteredRecipesNumber,
      mobileGridView,
      menuCurrentCollectionId,
      menuRecipeDetailShow,
      isClient,
      clearAllFilters,
      showDetailRecipe
    } = this.props
    const collectionsNavEnabled = features.getIn(['forceCollections', 'value']) || (features.getIn(['collections', 'value']) && (features.getIn(['collectionsNav', 'value']) !== false))
    const menuFilterExperiment = features.getIn(['filterMenu', 'value'])

    return (
      <div className={fadeCss} data-testing="menuRecipes">
              {!showLoading && collectionsNavEnabled &&
                <CollectionsNav masonryContainer={this.masonryContainer} menuCurrentCollectionId={menuCurrentCollectionId} />}
                {!showLoading && <FilterTagsNav />}
              {filteredRecipesNumber ?
                <div
                  ref={ref => { this.masonryContainer = ref }}
                  className={classnames({
                    [css.masonryContainerMenu]: !menuFilterExperiment,
                    [css.masonryContainer]: menuFilterExperiment,
                  })}
                  data-testing="menuRecipesList"
                >
                  <RecipeList
                    mobileGridView={mobileGridView}
                    showDetailRecipe={showDetailRecipe}
                    menuCurrentCollectionId={menuCurrentCollectionId}
                  />
                  <p className={css.legal}>{menu.legal}</p>
                  <DetailOverlay
                    showOverlay={isClient}
                    menuRecipeDetailShow={menuRecipeDetailShow}
                  />
                </div>
                :
                <MenuNoResults clearAllFilters={() => clearAllFilters()} />
              }
      </div>
    )
  }
}

MenuRecipes.propTypes = propTypes

export { MenuRecipes }
