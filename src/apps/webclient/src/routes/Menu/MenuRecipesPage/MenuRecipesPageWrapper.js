import React, { useMemo } from 'react'

import actions from 'actions'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadOptimizelySDK } from 'actions/optimizely'
import { getBasketOrderId, getNumPortions } from 'selectors/basket'
import { getUserId } from 'selectors/user'

import { useDoubleDeckerNav } from '../../../hooks/useDoubleDeckerNav'
import { checkQueryParams } from '../actions/menuRecipeDetails'
import { useBasket } from '../domains/basket'
import { useCurrentCollectionId } from '../domains/collections'
import { useMenu } from '../domains/menu'
import fetchData from '../fetchData'
import { isMenuLoading, getMenuLoadingErrorMessage, getRecipeCount } from '../selectors/menu'
import {
  isSignupReductionEnabled,
  shouldShowCommunicationPanel,
  shouldShowCapacityInfo,
} from '../selectors/signupReduction'
import { MenuRecipesPage } from './MenuRecipesPage'
import { useHotjarIdentify } from './useHotjarIdentify'

const MenuRecipesPageWrapper = (ownProps) => {
  const {
    params,
    location: { query = {} },
  } = ownProps

  const dispatch = useDispatch()
  const currentCollectionId = useCurrentCollectionId()
  const { addRecipe } = useBasket()
  const { isPending } = useMenu()

  const stateRecipeCount = useSelector(getRecipeCount)
  const showLoading = useSelector(isMenuLoading)
  const storeOrderId = useSelector(getBasketOrderId)
  const numPortions = useSelector(getNumPortions)
  const signupReductionEnabled = useSelector(isSignupReductionEnabled)
  const showCommunicationPanel = useSelector(shouldShowCommunicationPanel)
  const userId = useSelector(getUserId)
  const showCapacityInfo = useSelector(shouldShowCapacityInfo)
  const menuLoadingErrorMessage = useSelector(getMenuLoadingErrorMessage)
  const isDoubleDeckerFeatureOn = useDoubleDeckerNav()
  const actionDispatchers = useMemo(
    () =>
      bindActionCreators(
        {
          checkQueryParams,
          basketOrderLoaded: actions.basketOrderLoaded,
          portionSizeSelectedTracking: actions.portionSizeSelectedTracking,
          loadOptimizelySDK,
          fetchMenuData: fetchData,
        },
        dispatch,
      ),
    [dispatch],
  )

  useHotjarIdentify()

  return (
    <MenuRecipesPage
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      stateRecipeCount={stateRecipeCount}
      menuCurrentCollectionId={currentCollectionId}
      showLoading={showLoading || isPending}
      orderId={params.orderId}
      storeOrderId={storeOrderId}
      numPortions={numPortions}
      isSignupReductionEnabled={signupReductionEnabled}
      showCommunicationPanel={showCommunicationPanel}
      userId={userId}
      shouldShowCapacityInfo={showCapacityInfo}
      menuLoadingErrorMessage={menuLoadingErrorMessage}
      query={query}
      addRecipe={addRecipe}
      // dispatches below
      checkQueryParams={actionDispatchers.checkQueryParams}
      basketOrderLoaded={actionDispatchers.basketOrderLoaded}
      portionSizeSelectedTracking={actionDispatchers.portionSizeSelectedTracking}
      loadOptimizelySDK={actionDispatchers.loadOptimizelySDK}
      fetchMenuData={actionDispatchers.fetchMenuData}
      isDoubleDeckerFeatureOn={isDoubleDeckerFeatureOn}
    />
  )
}

MenuRecipesPageWrapper.whyDidYouRender = true

export { MenuRecipesPageWrapper }
