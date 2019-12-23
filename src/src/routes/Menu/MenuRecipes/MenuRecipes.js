import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import menu from 'config/menu'
import moment from 'moment'
import { CHRISTMAS_THEMATIC_NAME } from 'routes/Menu/Recipe/CTAThematic/CTAThematic'
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

  renderBanner = (switchoverDate1, switchoverDate2, switchoverDate3) => {
    const { setThematic } = this.props
    const now = moment()
    const switchoverTime1 = moment(switchoverDate1)
    const switchoverTime2 = moment(switchoverDate2)
    const switchoverTime3 = moment(switchoverDate3)

    if (now.isSameOrAfter(switchoverTime3, 'hour')) {
      return (<Banner type={'febyouary'} collectionSlug={'febyouary'} setThematic={setThematic} />)
    }
    if (now.isSameOrAfter(switchoverTime2, 'hour')) {
      return (<Banner type={'janyoury2'} collectionSlug={'janyouary'} setThematic={setThematic} />)
    }
    if (now.isSameOrAfter(switchoverTime1, 'hour')) {
      return (<Banner type={'janyoury1'} />)
    }

    return (<Banner type={'christmas2'} collectionSlug={CHRISTMAS_THEMATIC_NAME} setThematic={setThematic} />)
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
      showDetailRecipe,
      orderId,
      toggleGridView,
    } = this.props

    return (
      <div className={fadeCss} data-testing="menuRecipes">
        {this.renderBanner(menu.janyouary.switchoverDateWeek1, menu.janyouary.switchoverDateWeek2, menu.janyouary.switchoverDateWeek3)}
        <SubHeader
          onToggleGridView={toggleGridView}
          orderId={orderId}
        />
        <Loading loading={showLoading} />
        {!showLoading &&
          <CollectionsNav menuCurrentCollectionId={menuCurrentCollectionId} />}
        {filteredRecipesNumber ?
          <RecipeGrid
            mobileGridView={mobileGridView}
            showDetailRecipe={showDetailRecipe}
            menuCurrentCollectionId={menuCurrentCollectionId}
            menuRecipeDetailShow={menuRecipeDetailShow}
            isClient={isClient}
          />
          :
          null
        }
      </div>
    )
  }
}

MenuRecipes.propTypes = propTypes

export { MenuRecipes }
