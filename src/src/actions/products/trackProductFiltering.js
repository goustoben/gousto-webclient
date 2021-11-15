import { actionTypes } from "actions/actionTypes"

export const trackProductFiltering = (categoryId) => ({
    type: actionTypes.PRODUCTS_FILTER_TRACKING,
    trackingData: {
        actionType: 'Products filtered',
        categoryId,
    }
})
