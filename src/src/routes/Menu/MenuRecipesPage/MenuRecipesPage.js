import React, { PureComponent } from 'react'
import { CommunicationPanel } from 'goustouicomponents'
import PropTypes from 'prop-types'
import { CoronaVirusBanner } from 'CoronaVirusBanner'
import menuConfig from 'config/menu'
import { ReactReduxContext } from 'react-redux'
import { AppModalContainer } from 'components/AppModal'
import { CollectionsNavWrapper } from '../CollectionsNav'
import { RecipeGrid } from '../RecipeGrid'
import { JustForYouTutorial } from '../JustForYouTutorial'
import { SubHeaderContainer } from '../SubHeader'
import Loading from '../Loading'
import { BasketValidationErrorModalContainer } from './BasketValidationErrorModal'
import { CapacityInfo } from '../components/CapacityInfo'
import { BannerTastePreferencesContainer } from './BannerTastePreferences'
import { MenuDateRangeContainer } from '../components/MenuDateRange'
import css from './MenuRecipesPage.css'
import { CollectionHeaderWrapperContainer } from './CollectionHeader'
import { MenuSidesModalContainer } from './MenuSidesModalContainer'
import { RecommendationsHighlight } from './RecommendationsHighlight/RecommendationsHighlight'
import { FiveRecipesStartOfJourneyModal } from '../../../components/FiveRecipesPaintedDoorTest/FiveRecipesStartOfJourneyModal'

export class MenuRecipesPage extends PureComponent {
  async componentDidMount() {
    const {
      orderId,
      params,
      storeOrderId,
      basketOrderLoaded,
      query,
      portionSizeSelectedTracking,
      numPortions,
      checkQueryParams,
      fetchMenuData,
    } = this.props
    // if server rendered
    if (orderId && orderId === storeOrderId) {
      basketOrderLoaded(orderId)
    }
    const forceDataLoad = (storeOrderId && storeOrderId !== orderId) || query.reload
    // TODO: Add back logic to check what needs to be reloaded
    if (forceDataLoad) {
      await fetchMenuData({ query, params }, forceDataLoad)
    }
    if (orderId) {
      portionSizeSelectedTracking(numPortions, orderId)
    }
    checkQueryParams()
  }

  componentDidUpdate(prevProps) {
    const {
      loadOptimizelySDK,
      orderId,
      query,
      params,
      fetchMenuData,
    } = this.props

    loadOptimizelySDK()

    // /menu-> /menu/:orderId
    const editingOrder = (prevProps.orderId || orderId) && prevProps.orderId !== orderId
    if (editingOrder) {
      fetchMenuData({ query, params }, true)
    }
  }

  getMenuRecipeListContent = () => {
    const {
      isLoading,
      showLoading,
      stateRecipeCount,
      isSignupReductionEnabled,
      showCommunicationPanel,
      menuLoadingErrorMessage,
      query,
      showRecommendationHighlight,
    } = this.props
    const { communicationPanel } = menuConfig

    const showError = !!menuLoadingErrorMessage && !stateRecipeCount

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
        <BannerTastePreferencesContainer />

        {!showLoading && <CollectionsNavWrapper />}

        <CollectionHeaderWrapperContainer />

        {
          showRecommendationHighlight
          && <RecommendationsHighlight />
        }

        {
          !showRecommendationHighlight
          && stateRecipeCount
          && <RecipeGrid query={query} />
        }

        {showError ? (
          <h2 className={css.menuLoadingErrorMessage}>
            {menuLoadingErrorMessage}
          </h2>
        ) : null}
        { !isLoading && <JustForYouTutorial />}
        <AppModalContainer key="app-modal" />
        <BasketValidationErrorModalContainer />
        <MenuSidesModalContainer />
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
        <FiveRecipesStartOfJourneyModal />
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
  showRecommendationHighlight: PropTypes.bool.isRequired,
  showLoading: PropTypes.bool.isRequired,
  stateRecipeCount: PropTypes.number.isRequired,
  basketOrderLoaded: PropTypes.func.isRequired,
  portionSizeSelectedTracking: PropTypes.func.isRequired,
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
  fetchMenuData: PropTypes.func.isRequired,
}
MenuRecipesPage.defaultProps = {
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
MenuRecipesPage.contextType = ReactReduxContext
