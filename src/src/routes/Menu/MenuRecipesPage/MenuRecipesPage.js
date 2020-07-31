import React, { PureComponent } from 'react'
import { CommunicationPanel } from 'goustouicomponents'
import PropTypes from 'prop-types'
import { CoronaVirusBanner } from 'CoronaVirusBanner'

import menuConfig from 'config/menu'
import { CollectionsNavContainer } from '../CollectionsNav'
import { RecipeGrid } from '../RecipeGrid'
import { JustForYouTutorial } from '../JustForYouTutorial'
import SubHeader from '../SubHeader'
import Loading from '../Loading'
import fetchData from '../fetchData'
import { BasketValidationErrorModalContainer } from './BasketValidationErrorModal'
import { CapacityInfo } from '../components/CapacityInfo'
import { BannerTastePreferencesContainer } from './BannerTastePreferences'

import css from './MenuRecipesPage.css'

const contextTypes = {
  store: PropTypes.shape({ dispatch: PropTypes.func }).isRequired,
}

export class MenuRecipesPage extends PureComponent {
  static contextTypes = contextTypes

  async componentDidMount() {
    const { store } = this.context

    const {
      orderId,
      params,
      storeOrderId,
      basketOrderLoaded,
      query,
      portionSizeSelectedTracking,
      numPortions,
      checkQueryParams
    } = this.props

    // if server rendered
    if (orderId && orderId === storeOrderId) {
      basketOrderLoaded(orderId)
    }

    const forceDataLoad = (storeOrderId && storeOrderId !== orderId) || query.reload
    // TODO: Add back logic to check what needs to be reloaded

    if (forceDataLoad) {
      await fetchData({ store, query, params }, forceDataLoad)
    }

    if (orderId) {
      portionSizeSelectedTracking(numPortions, orderId)
    }

    checkQueryParams()
  }

  componentWillReceiveProps(nextProps) {
    const { menuRecipeDetailShow, orderId } = this.props
    if (nextProps.menuRecipeDetailShow && !menuRecipeDetailShow) {
      window.document.addEventListener('keyup', this.handleKeyup, false)
    } else if (!nextProps.menuRecipeDetailShow) {
      window.document.removeEventListener('keyup', this.handleKeyup, false)
    }

    // /menu-> /menu/:orderId
    const editingOrder = (nextProps.orderId || orderId) && nextProps.orderId !== orderId
    if (editingOrder) {
      const { store } = this.context
      const query = nextProps.query || {}
      const params = nextProps.params || {}
      fetchData({ store, query, params }, true)
    }
  }

  componentDidUpdate(prevProps) {
    const {
      shouldJfyTutorialBeVisible,
      isLoading,
      menuCurrentCollectionId,
      selectCurrentCollection
    } = this.props
    if (prevProps.menuCurrentCollectionId !== menuCurrentCollectionId) {
      selectCurrentCollection(menuCurrentCollectionId)
    }

    if (!isLoading && prevProps.isLoading !== isLoading) {
      shouldJfyTutorialBeVisible()
    }
  }

  componentWillUnmount() {
    window.document.removeEventListener('keyup', this.handleKeyup, false)
  }

  handleKeyup = (e) => {
    const { detailVisibilityChange } = this.props
    if (e.type === 'keyup' && e.keyCode && e.keyCode === 27) {
      detailVisibilityChange()
    }
  }

  getMenuRecipeListContent = () => {
    const {
      showLoading,
      stateRecipeCount,
      orderId,
      isSignupReductionEnabled,
      showCommunicationPanel
    } = this.props
    const { communicationPanel } = menuConfig

    return (
      <div>
        {isSignupReductionEnabled && <div className={css.cvBanner}><CoronaVirusBanner /></div>}
        {showCommunicationPanel && (
        <div className={css.communicationPanelContainer}>
          <div className={css.communicationPanel}>
            <CommunicationPanel
              showIcon={communicationPanel.showIcon}
              level={communicationPanel.level}
              title={communicationPanel.title}
              body={communicationPanel.body}
            />
          </div>
        </div>
        )}
        <SubHeader orderId={orderId} />
        <BannerTastePreferencesContainer />
        <JustForYouTutorial />
        {!showLoading && <CollectionsNavContainer />}
        {stateRecipeCount && <RecipeGrid />}
        <BasketValidationErrorModalContainer />
      </div>
    )
  }

  getMenuContent = () => {
    const {
      userId,
      shouldShowCapacityInfo
    } = this.props

    if (shouldShowCapacityInfo) {
      return <CapacityInfo userId={userId} />
    }

    return this.getMenuRecipeListContent()
  }

  render() {
    const { showLoading } = this.props
    const fadeCss = (showLoading) ? css.fadeOut : css.willFade

    return (
      <div className={fadeCss} data-testing="menuRecipes">
        {
          showLoading
            ? <Loading loading={showLoading} />
            : this.getMenuContent()
        }
      </div>
    )
  }
}

MenuRecipesPage.propTypes = {
  showLoading: PropTypes.bool.isRequired,
  stateRecipeCount: PropTypes.number.isRequired,
  menuCurrentCollectionId: PropTypes.string.isRequired,
  selectCurrentCollection: PropTypes.func.isRequired,
  detailVisibilityChange: PropTypes.func.isRequired,
  shouldJfyTutorialBeVisible: PropTypes.func.isRequired,
  basketOrderLoaded: PropTypes.func.isRequired,
  portionSizeSelectedTracking: PropTypes.func.isRequired,
  menuRecipeDetailShow: PropTypes.string,
  orderId: PropTypes.string,
  isLoading: PropTypes.bool,
  storeOrderId: PropTypes.string,
  numPortions: PropTypes.number,
  query: PropTypes.shape({
    reload: PropTypes.bool
  }),
  params: PropTypes.shape({}),
  isSignupReductionEnabled: PropTypes.bool,
  showCommunicationPanel: PropTypes.bool,
  checkQueryParams: PropTypes.func.isRequired,
  userId: PropTypes.string,
  shouldShowCapacityInfo: PropTypes.bool

}

MenuRecipesPage.defaultProps = {
  menuRecipeDetailShow: '',
  orderId: null,
  isLoading: false,
  storeOrderId: '',
  numPortions: 2,
  query: {},
  params: {},
  isSignupReductionEnabled: false,
  showCommunicationPanel: false,
  userId: '',
  shouldShowCapacityInfo: false

}
