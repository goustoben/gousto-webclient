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
import { BasketValidationErrorModalContainer } from './BasketValidationErrorModal'
import { CapacityInfo } from '../components/CapacityInfo'
import { BannerTastePreferencesContainer } from './BannerTastePreferences'
import { RecipeSidesModalContainer } from './RecipeSidesModal'
import { VariantRecipeListModalContainer } from '../ElevatedMenuExperience/VariantRecipeListModal'
import { MenuDateRangeContainer } from '../components/MenuDateRange'
import { CategoriesShortcutsContainer } from '../ElevatedMenuExperience/CategoriesShortcuts'
import css from './MenuRecipesPage.css'
import { CategoriesModalContainer } from '../ElevatedMenuExperience/CategoriesModal'
import { OptimizelyRolloutsContainer } from '../../../containers/OptimizelyRollouts'
import { ExperimentsContainer } from '../../../containers/Experiments'
import { CollectionHeaderWrapperContainer } from './CollectionHeader'

const contextTypes = {
  store: PropTypes.shape({ dispatch: PropTypes.func }).isRequired,
}
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
      shouldJfyTutorialBeVisible,
      isLoading,
      menuCurrentCollectionId,
      selectCurrentCollection,
      orderId,
      query,
      params,
      fetchMenuData,
    } = this.props
    if (prevProps.menuCurrentCollectionId && prevProps.menuCurrentCollectionId !== menuCurrentCollectionId) {
      selectCurrentCollection(menuCurrentCollectionId)
    }
    if (!isLoading && prevProps.isLoading !== isLoading) {
      shouldJfyTutorialBeVisible()
    }

    // /menu-> /menu/:orderId
    const editingOrder = (prevProps.orderId || orderId) && prevProps.orderId !== orderId
    if (editingOrder) {
      fetchMenuData({ query, params }, true)
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
      query,
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
        <BannerTastePreferencesContainer />
        <OptimizelyRolloutsContainer featureName="categories_browsing_experiment" featureEnabled>
          {experimentContent}
          {browserType !== 'mobile' && <CollectionHeaderWrapperContainer /> }
        </OptimizelyRolloutsContainer>
        <OptimizelyRolloutsContainer featureName="categories_browsing_experiment" featureEnabled={false}>
          {!showLoading && <CollectionsNavContainer />}
          <CollectionHeaderWrapperContainer />
        </OptimizelyRolloutsContainer>

        {stateRecipeCount ? <RecipeGrid browserType={browserType} query={query} /> : null}
        {showError ? (
          <h2 className={css.menuLoadingErrorMessage}>
            {menuLoadingErrorMessage}
          </h2>
        ) : null}
        <JustForYouTutorial />
        <AppModalContainer key="app-modal" />
        <BasketValidationErrorModalContainer />
        <RecipeSidesModalContainer />
        <CategoriesModalContainer />
        <VariantRecipeListModalContainer />

        <ExperimentsContainer experimentName="entropy-experiment-one" />
        <ExperimentsContainer experimentName="entropy-experiment-two" />
        <ExperimentsContainer experimentName="entropy-experiment-three" />
        <ExperimentsContainer experimentName="entropy-experiment-four" />
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
  shouldJfyTutorialBeVisible: PropTypes.func.isRequired,
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
  menuLoadingErrorMessage: PropTypes.string,
  browserType: PropTypes.string.isRequired,
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
MenuRecipesPage.contextTypes = contextTypes
