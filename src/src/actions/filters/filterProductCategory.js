import { trackProductFiltering } from "actions/products/trackProductFiltering"

export const filterProductCategory = (category) => (
  (dispatch) => {
    dispatch({type: 'FILTERS_PRODUCT_CATEGORY', value: category})
    dispatch(trackProductFiltering(category))
  }
)
