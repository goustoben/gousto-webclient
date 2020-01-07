import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import menu from 'config/menu'
import moment from 'moment'
import CollectionsNav from '../CollectionsNav'
import { RecipeGrid } from '../RecipeGrid'
import SubHeader from '../SubHeader'
import Loading from '../Loading'
import { Banner } from '../Banner'

const propTypes = {
  fadeCss: PropTypes.string,
  showLoading: PropTypes.bool,
  filteredRecipesNumber: PropTypes.number,
  menuCurrentCollectionId: PropTypes.string,
  menuRecipeDetailShow: PropTypes.string,
  orderId: PropTypes.string,
  isClient: PropTypes.bool,
  showDetailRecipe: PropTypes.func,
  setThematic: PropTypes.func,
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

  renderBanner = (switchoverDate) => {
    const now = moment()
    const switchoverTime = moment(switchoverDate)

    if (now.isSameOrAfter(switchoverTime, 'hour')) {
      return (<Banner type='febyouary' />)
    }

    return (<Banner type='janyoury1' />)
  }

  render() {
    const {
      fadeCss,
      showLoading,
      filteredRecipesNumber,
      menuCurrentCollectionId,
      menuRecipeDetailShow,
      isClient,
      showDetailRecipe,
      orderId,
    } = this.props

    return (
      <div className={fadeCss} data-testing="menuRecipes">
        {this.renderBanner(menu.janyouary.switchoverDate)}
        <SubHeader
          orderId={orderId}
        />
        <Loading loading={showLoading} />
        {!showLoading
          && <CollectionsNav menuCurrentCollectionId={menuCurrentCollectionId} />}
        {filteredRecipesNumber
          ? (
            <RecipeGrid
              showDetailRecipe={showDetailRecipe}
              menuCurrentCollectionId={menuCurrentCollectionId}
              menuRecipeDetailShow={menuRecipeDetailShow}
              isClient={isClient}
            />
          )
          : null
        }
      </div>
    )
  }
}

MenuRecipes.propTypes = propTypes

export { MenuRecipes }
