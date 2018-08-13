import { createSelector } from 'reselect'

import { getRecipes } from 'selectors/root'
import { isMenuRecommended } from 'utils/menu'

export const getIsMenuRecommended = createSelector(
	[getRecipes],
	(recipes) => isMenuRecommended(recipes)
)

export default {
	getIsMenuRecommended,
}
