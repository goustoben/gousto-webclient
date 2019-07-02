import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import Immutable from 'immutable'
import menu from 'config/menu'
import moment from 'moment'
import MenuNoResults from '../MenuNoResults'
import FilterTagsNav from '../FilterTagsNav/FilterTagsNavContainer'
import CollectionsNav from '../CollectionsNav'
import { RecipeGrid } from '../RecipeGrid'
import SubHeader from '../SubHeader'
import Loading from '../Loading'
import { Banner } from '../Banner'

const propTypes = {
  features: PropTypes.instanceOf(Immutable.Map),
  fadeCss: PropTypes.string,
  showLoading: PropTypes.bool,
  filteredRecipesNumber: PropTypes.number,
  mobileGridView: PropTypes.bool,
  menuCurrentCollectionId: PropTypes.string,
  menuRecipeDetailShow: PropTypes.string,
  orderId: PropTypes.string,
  isClient: PropTypes.bool,
  hasRecommendations: PropTypes.bool,
  clearAllFilters: PropTypes.func,
  showDetailRecipe: PropTypes.func,
}

class MenuRecipes extends PureComponent {
  renderBanner = (switchoverDate) => {
    const now = moment()
    const switchoverTime = moment(switchoverDate)

    return (now.isSameOrAfter(switchoverTime, 'hour')) ? (
      <Banner type={'summer-bbq'} imageName={'summerGel-min.png'}/>
    ) :
      (<Banner type={'taste-of-italy'}/>)
  }

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
      showDetailRecipe,
      hasRecommendations,
      orderId,
    } = this.props

    const collectionsNavEnabled = features.getIn(['forceCollections', 'value']) || (features.getIn(['collections', 'value']) && (features.getIn(['collectionsNav', 'value']) !== false))

    return (
      <div className={fadeCss} data-testing="menuRecipes">
        {this.renderBanner(menu.summerBbq.switchoverDate)}
        <SubHeader
          viewIcon={(mobileGridView) ? 'iconSingleColumn' : 'iconDoubleColumn'}
          onToggleGridView={this.toggleGridView}
          orderId={orderId}
        />
        <Loading loading={showLoading} hasRecommendations={hasRecommendations} />
        {!showLoading && collectionsNavEnabled &&
          <CollectionsNav masonryContainer={this.masonryContainer} menuCurrentCollectionId={menuCurrentCollectionId} />}
        {!showLoading && <FilterTagsNav />}
        {filteredRecipesNumber ?
          <RecipeGrid
            mobileGridView={mobileGridView}
            showDetailRecipe={showDetailRecipe}
            menuCurrentCollectionId={menuCurrentCollectionId}
            menuRecipeDetailShow={menuRecipeDetailShow}
            features={features}
            isClient={isClient}
          />
          :
          <MenuNoResults clearAllFilters={() => clearAllFilters()} />
        }
      </div>
    )
  }
}

MenuRecipes.propTypes = propTypes

export { MenuRecipes }
