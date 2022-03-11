import { createSelector } from 'reselect'
import { getFeatures } from 'selectors/features'

export const getIsSimplifyBasketBarEnabled = createSelector(getFeatures, (features) =>
  features.getIn(['isSimplifyBasketBarEnabled', 'value'], false)
)
