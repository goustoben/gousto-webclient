import * as trackingKeys from 'actions/trackingKeys'
import { actionTypes } from 'actions/actionTypes'
import { v4 as uuid } from 'uuid'
import { getTransactionType } from 'selectors/tracking'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { getBasketDate, getBasketMenuId, getBasketOrderId } from 'selectors/basket'
import { getBoxSummaryDeliveryDays, getMenuBrowseCTAShow, getMenuCollections } from 'selectors/root'

export function useTracking() {
  const dispatch = useDispatch()
  const basketDate = useSelector(getBasketDate)
  const boxSummaryDeliveryDays = useSelector(getBoxSummaryDeliveryDays)
  const transactionType = useSelector(getTransactionType)
  const severedVariantExperimentBucket = useSelector(({ menuService }) => (
    menuService.data[0]?.meta?.swapsExperimentUserAllocationGroup
  ))
  const menuCollections = useSelector(getMenuCollections)
  const currentMenuId = useSelector(getBasketMenuId)
  const orderId = useSelector(getBasketOrderId)
  const browseMode = useSelector(getMenuBrowseCTAShow)
  const recommenderVersion = useSelector(({ menuService }) => (
    menuService.meta.recommendations && menuService.meta.recommendations.version
  ))

  return useCallback(
    (collectionId, displayedOrder) => {
      const identifier = uuid()

      const collectionName = menuCollections.getIn([collectionId, 'slug'], '')
      const deliveryDayId = boxSummaryDeliveryDays.getIn([basketDate, 'id'])

      dispatch({
        type: actionTypes.RECIPES_SHOWN,
        trackingData: {
          actionType: trackingKeys.recipesShown,
          identifier,
          displayedOrder
        },
      })

      dispatch({
        type: actionTypes.VIEW_RECIPE_LIST,
        trackingData: {
          actionType: trackingKeys.viewRecipeList,
          identifier,
          collectionId,
          collectionName,
          deliveryDayId,
          orderId,
          browseMode,
          recommenderVersion,
          currentMenuId,
          transactionType,
          severedVariantExperimentBucket,
        },
      })
    },
    [
      dispatch,
      basketDate,
      boxSummaryDeliveryDays,
      transactionType,
      severedVariantExperimentBucket,
      menuCollections,
      currentMenuId,
      orderId,
      browseMode,
      recommenderVersion
    ]
  )
}
