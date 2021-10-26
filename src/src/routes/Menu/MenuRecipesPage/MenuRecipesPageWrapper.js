import React from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import actions from 'actions'
import { shouldJfyTutorialBeVisible } from 'actions/tutorial'
import { getIsTastePreferencesEnabled } from 'selectors/features'
import { getUserId } from 'selectors/user'
import { getBasketOrderId, getNumPortions } from 'selectors/basket'
import { useCollections } from '../domains/collections'
import { checkQueryParams } from '../actions/menuRecipeDetails'
import { loadOptimizelySDK } from '../../../actions/optimizely'

import { MenuRecipesPage } from './MenuRecipesPage'
import { isMenuLoading, getMenuLoadingErrorMessage, getRecipeCount } from '../selectors/menu'
import fetchData from '../fetchData'
import { isSignupReductionEnabled, shouldShowCommunicationPanel, shouldShowCapacityInfo } from '../selectors/signupReduction'

const MenuRecipesPageWrapper = (ownProps) => {
  const {
    params,
    location: { query = {} }
  } = ownProps

  const dispatch = useDispatch()
  const { currentCollectionId } = useCollections()

  const showTastePreferencesLoading = useSelector(getIsTastePreferencesEnabled)
  const stateRecipeCount = useSelector(getRecipeCount)
  const showLoading = useSelector(isMenuLoading)
  const storeOrderId = useSelector(getBasketOrderId)
  const numPortions = useSelector(getNumPortions)
  const signupReductionEnabled = useSelector(isSignupReductionEnabled)
  const showCommunicationPanel = useSelector(shouldShowCommunicationPanel)
  const userId = useSelector(getUserId)
  const showCapacityInfo = useSelector(shouldShowCapacityInfo)
  const menuLoadingErrorMessage = useSelector(getMenuLoadingErrorMessage)

  const actionDispatchers = bindActionCreators({
    checkQueryParams,
    shouldJfyTutorialBeVisible,
    basketOrderLoaded: actions.basketOrderLoaded,
    portionSizeSelectedTracking: actions.portionSizeSelectedTracking,
    loadOptimizelySDK,
    fetchMenuData: fetchData
  }, dispatch)

  return (
    <MenuRecipesPage
      showTastePreferencesLoading={showTastePreferencesLoading}
      stateRecipeCount={stateRecipeCount}
      menuCurrentCollectionId={currentCollectionId}
      showLoading={showLoading}
      orderId={params.orderId}
      storeOrderId={storeOrderId}
      numPortions={numPortions}
      isSignupReductionEnabled={signupReductionEnabled}
      showCommunicationPanel={showCommunicationPanel}
      userId={userId}
      shouldShowCapacityInfo={showCapacityInfo}
      menuLoadingErrorMessage={menuLoadingErrorMessage}
      query={query}
      // dispatches below
      checkQueryParams={actionDispatchers.checkQueryParams}
      shouldJfyTutorialBeVisible={actionDispatchers.shouldJfyTutorialBeVisible}
      basketOrderLoaded={actionDispatchers.basketOrderLoaded}
      portionSizeSelectedTracking={actionDispatchers.portionSizeSelectedTracking}
      loadOptimizelySDK={actionDispatchers.loadOptimizelySDK}
      fetchMenuData={actionDispatchers.fetchMenuData}
    />
  )
}

export { MenuRecipesPageWrapper }
