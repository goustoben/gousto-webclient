import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import menu from 'config/menu'
import moment from 'moment'
import CollectionsNav from '../CollectionsNav'
import { RecipeGrid } from '../RecipeGrid'
import SubHeader from '../SubHeader'
import Loading from '../Loading'
import { Banner } from '../Banner'

class MenuRecipes extends PureComponent {
  static propTypes = {
    fadeCss: PropTypes.string.isRequired,
    showLoading: PropTypes.bool.isRequired,
    filteredRecipesNumber: PropTypes.number.isRequired,
    menuCurrentCollectionId: PropTypes.string.isRequired,
    showDetailRecipe: PropTypes.func.isRequired,
    setThematic: PropTypes.func.isRequired,
    selectCurrentCollection: PropTypes.func.isRequired,
    detailVisibilityChange: PropTypes.func.isRequired,
    menuRecipeDetailShow: PropTypes.string,
    orderId: PropTypes.string,
  }

  static defaultProps = {
    menuRecipeDetailShow: '',
    orderId: null
  }

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
            />
          )
          : null
        }
      </div>
    )
  }
}

export { MenuRecipes }
