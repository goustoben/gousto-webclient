import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import menu from 'config/menu'
import moment from 'moment'
import { CHRISTMAS_THEMATIC_NAME } from 'Recipe/CTAThematic/CTAThematic'
import MenuNoResults from '../MenuNoResults'
import FilterTagsNav from '../FilterTagsNav/FilterTagsNavContainer'
import CollectionsNav from '../CollectionsNav'
import { RecipeGrid } from '../RecipeGrid'
import SubHeader from '../SubHeader'
import Loading from '../Loading'
import { Banner } from '../Banner'

const propTypes = {
  fadeCss: PropTypes.string,
  showLoading: PropTypes.bool,
  filteredRecipesNumber: PropTypes.number,
  mobileGridView: PropTypes.bool,
  menuCurrentCollectionId: PropTypes.string,
  menuRecipeDetailShow: PropTypes.string,
  orderId: PropTypes.string,
  isClient: PropTypes.bool,
  clearAllFilters: PropTypes.func,
  showDetailRecipe: PropTypes.func,
  setThematic: PropTypes.func,
  toggleGridView: PropTypes.func,
  selectCurrentCollection: PropTypes.func,
  detailVisibilityChange: PropTypes.func
}

class MenuRecipes extends PureComponent {

  componentWillReceiveProps(nextProps) {
    const { menuRecipeDetailShow } = this.props
    if (nextProps.menuRecipeDetailShow && !menuRecipeDetailShow) {
      window.document.addEventListener('keyup', this.handleKeyup, false)
    } else if (!nextProps.menuRecipeDetailShow) {
      window.document.removeEventListener('keyup', this.handleKeyup, false)
    }
  }

  componentDidUpdate(prevProps) {
    const { menuCurrentCollectionId, selectCurrentCollection } = this.props
    if (prevProps.menuCurrentCollectionId !== menuCurrentCollectionId) {
      selectCurrentCollection(menuCurrentCollectionId)
    }
  }

  componentWillUnmount() {
    window.document.removeEventListener('keyup', this.handleKeyup, false)
  }

  handleKeyup = (e) => {
    const { detailVisibilityChange } = this.props
    if (e.type === 'keyup' && e.keyCode && e.keyCode === 27) {
      detailVisibilityChange(false)
    }
  }

  renderBanner = (switchoverDate1, switchoverDate2) => {
    const { setThematic } = this.props
    const now = moment()
    const switchoverTime1 = moment(switchoverDate1)
    const switchoverTime2 = moment(switchoverDate2)

    return (now.isSameOrAfter(switchoverTime2, 'hour')) ? (
      <Banner type={'christmas2'} collectionSlug={CHRISTMAS_THEMATIC_NAME} setThematic={setThematic} />
    ) : (now.isSameOrAfter(switchoverTime1, 'hour')) ? (
      <Banner type={'christmas1'} />
    ) :
        <Banner type={'wagamama2'} collectionSlug={'gousto-x-wagamama'} setThematic={setThematic} />
  }

  render() {
    const {
      fadeCss,
      showLoading,
      filteredRecipesNumber,
      mobileGridView,
      menuCurrentCollectionId,
      menuRecipeDetailShow,
      isClient,
      clearAllFilters,
      showDetailRecipe,
      orderId,
      toggleGridView,
    } = this.props

    return (
      <div className={fadeCss} data-testing="menuRecipes">
        {this.renderBanner(menu.christmas.switchoverDateWeek1, menu.christmas.switchoverDateWeek2)}
        <SubHeader
          viewIcon={(mobileGridView) ? 'iconSingleColumn' : 'iconDoubleColumn'}
          onToggleGridView={toggleGridView}
          orderId={orderId}
        />
        <Loading loading={showLoading} />
        {!showLoading &&
          <CollectionsNav menuCurrentCollectionId={menuCurrentCollectionId} />}
        {!showLoading && <FilterTagsNav />}
        {filteredRecipesNumber ?
          <RecipeGrid
            mobileGridView={mobileGridView}
            showDetailRecipe={showDetailRecipe}
            menuCurrentCollectionId={menuCurrentCollectionId}
            menuRecipeDetailShow={menuRecipeDetailShow}
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
