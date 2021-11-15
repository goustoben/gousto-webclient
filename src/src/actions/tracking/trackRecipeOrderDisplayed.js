import { actionTypes } from "actions/actionTypes"

export const trackRecipeOrderDisplayed = (originalOrder, displayedOrder) => (
    (dispatch, getState) => {
        const date = getState().basket.get('date')
        const deliveryDayId = getState().boxSummaryDeliveryDays.getIn([date, 'id'])
        const orderId = getState().basket.get('orderId')
        const browseMode = getState().menuBrowseCtaShow
        const recommended = getState().recipes.some(recipe => recipe.get('isRecommended', false))
        const collectionId = getState().filters.get('currentCollectionId')
        const menuServiceData = getState().menuService.meta
        const recommenderVersion = menuServiceData.recommendations && menuServiceData.recommendations.version

        dispatch({
            type: actionTypes.RECIPES_DISPLAYED_ORDER_TRACKING,
            originalOrder,
            displayedOrder,
            collectionId,
            deliveryDayId,
            orderId,
            recommended,
            browseMode,
            recommenderVersion,
        })
    }
)
