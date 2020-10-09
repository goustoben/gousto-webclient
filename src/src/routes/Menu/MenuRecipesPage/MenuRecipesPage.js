import React, { PureComponent } from 'react'
import { CommunicationPanel } from 'goustouicomponents'
import PropTypes from 'prop-types'
import { CoronaVirusBanner } from 'CoronaVirusBanner'
import menuConfig from 'config/menu'
import { AppModalContainer } from 'components/AppModal'
import { CollectionsNavContainer } from '../CollectionsNav'
import { RecipeGrid } from '../RecipeGrid'
import { JustForYouTutorial } from '../JustForYouTutorial'
import { SubHeaderContainer } from '../SubHeader'
import Loading from '../Loading'
import fetchData from '../fetchData'
import { BasketValidationErrorModalContainer } from './BasketValidationErrorModal'
import { CapacityInfo } from '../components/CapacityInfo'
import { BannerTastePreferencesContainer } from './BannerTastePreferences'
import { RecipeSidesModalContainer } from './RecipeSidesModal'
import { MenuDateRangeContainer } from '../components/MenuDateRange'
import { CategoriesShortcutsContainer } from '../ElevatedMenuExperience/CategoriesShortcuts'
import css from './MenuRecipesPage.css'
import { CategoriesModalContainer } from '../ElevatedMenuExperience/CategoriesModal'
import { OptimizelyRolloutsContainer } from '../../../containers/OptimizelyRollouts'

const contextTypes = {
  store: PropTypes.shape({ dispatch: PropTypes.func }).isRequired,
}
export class MenuRecipesPage extends PureComponent {
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
      await store.dispatch(fetchData({ query, params }, forceDataLoad))
    }
    if (orderId) {
      portionSizeSelectedTracking(numPortions, orderId)
    }
    checkQueryParams()
  }

  componentWillReceiveProps(nextProps) {
    const { menuRecipeDetailShow, orderId, loadOptimizelySDK } = this.props
    if (nextProps.menuRecipeDetailShow && !menuRecipeDetailShow) {
      window.document.addEventListener('keyup', this.handleKeyup, false)
    } else if (!nextProps.menuRecipeDetailShow) {
      window.document.removeEventListener('keyup', this.handleKeyup, false)
    }
    loadOptimizelySDK()
    // /menu-> /menu/:orderId
    const editingOrder = (nextProps.orderId || orderId) && nextProps.orderId !== orderId
    if (editingOrder) {
      const { store } = this.context
      const query = nextProps.query || {}
      const params = nextProps.params || {}
      store.dispatch(fetchData({query, params }, true))
    }
  }

  componentDidUpdate(prevProps) {
    const {
      shouldJfyTutorialBeVisible,
      isLoading,
      menuCurrentCollectionId,
      selectCurrentCollection
    } = this.props
    if (prevProps.menuCurrentCollectionId && prevProps.menuCurrentCollectionId !== menuCurrentCollectionId) {
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
      isSignupReductionEnabled,
      showCommunicationPanel,
      menuLoadingErrorMessage,
      browserType,
      query
    } = this.props
    const { communicationPanel } = menuConfig

    const showError = !!menuLoadingErrorMessage && !stateRecipeCount

    let experimentContent = null
    if (browserType !== 'mobile') {
      experimentContent = <CollectionsNavContainer />
    } else if (!query.collection) {
      experimentContent = <CategoriesShortcutsContainer />
    }

    return (
      <div>
        {isSignupReductionEnabled ? <div className={css.cvBanner}><CoronaVirusBanner /></div> : null}
        {showCommunicationPanel ? (
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
        ) : null}
        <SubHeaderContainer />
        <MenuDateRangeContainer variant="mobile" />
        <OptimizelyRolloutsContainer featureName="categories_browsing_experiment" featureEnabled>
          {experimentContent}
        </OptimizelyRolloutsContainer>
        <OptimizelyRolloutsContainer featureName="categories_browsing_experiment" featureEnabled={false}>
          {!showLoading && <CollectionsNavContainer />}
        </OptimizelyRolloutsContainer>
        <BannerTastePreferencesContainer />
        <JustForYouTutorial />
        <AppModalContainer key="app-modal" />
        {stateRecipeCount ? <RecipeGrid browserType={browserType} query={query} /> : null}
        {showError ? (
          <h2 className={css.menuLoadingErrorMessage}>
            {menuLoadingErrorMessage}
          </h2>
        ) : null}
        <BasketValidationErrorModalContainer />
        <RecipeSidesModalContainer />
        <CategoriesModalContainer />
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
    const { showLoading, showTastePreferencesLoading } = this.props
    const fadeCss = (showLoading) ? css.fadeOut : css.willFade

    return (
      <div data-testing="menuRecipes">
        {
          showLoading
            ? (
              <Loading
                loading={showLoading}
                showTastePreferencesLoading={showTastePreferencesLoading}
              />
            )
            : <div className={fadeCss}>{this.getMenuContent()}</div>
        }
      </div>
    )
  }
}
MenuRecipesPage.propTypes = {
  showTastePreferencesLoading: PropTypes.bool.isRequired,
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
    reload: PropTypes.bool,
    collection: PropTypes.string
  }),
  params: PropTypes.shape({}),
  isSignupReductionEnabled: PropTypes.bool,
  showCommunicationPanel: PropTypes.bool,
  checkQueryParams: PropTypes.func.isRequired,
  userId: PropTypes.string,
  shouldShowCapacityInfo: PropTypes.bool,
  loadOptimizelySDK: PropTypes.func.isRequired,
  menuLoadingErrorMessage: PropTypes.string,
  browserType: PropTypes.string.isRequired
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
  shouldShowCapacityInfo: false,
  menuLoadingErrorMessage: '',
}
MenuRecipesPage.contextTypes = contextTypes
