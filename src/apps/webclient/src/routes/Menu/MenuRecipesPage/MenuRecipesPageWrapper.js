import React from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import actions from 'actions'
import { getUserId } from 'selectors/user'
import { loadOptimizelySDK } from 'actions/optimizely'
import { getBasketOrderId, getNumPortions } from 'selectors/basket'
import { useCurrentCollectionId } from '../domains/collections'

import { checkQueryParams } from '../actions/menuRecipeDetails'
import { MenuRecipesPage } from './MenuRecipesPage'
import { isMenuLoading, getMenuLoadingErrorMessage, getRecipeCount } from '../selectors/menu'
import fetchData from '../fetchData'
import { isSignupReductionEnabled, shouldShowCommunicationPanel, shouldShowCapacityInfo } from '../selectors/signupReduction'
import { useHotjarIdentify } from './useHotjarIdentify'

const MenuRecipesPageWrapper = (ownProps) => {
  const {
    params,
    location: { query = {} }
  } = ownProps

  const dispatch = useDispatch()
  const currentCollectionId = useCurrentCollectionId()

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
    basketOrderLoaded: actions.basketOrderLoaded,
    portionSizeSelectedTracking: actions.portionSizeSelectedTracking,
    loadOptimizelySDK,
    fetchMenuData: fetchData,
  }, dispatch)

  useHotjarIdentify()

  return (
    <MenuRecipesPage
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
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
      basketOrderLoaded={actionDispatchers.basketOrderLoaded}
      portionSizeSelectedTracking={actionDispatchers.portionSizeSelectedTracking}
      loadOptimizelySDK={actionDispatchers.loadOptimizelySDK}
      fetchMenuData={actionDispatchers.fetchMenuData}
    />
  )
}

export { MenuRecipesPageWrapper }
