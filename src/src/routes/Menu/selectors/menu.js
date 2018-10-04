import { createSelector } from 'reselect'

import { getRecipes, getMenuCollections } from 'selectors/root'
import { isMenuRecommended } from 'utils/menu'
import { getCurrentCollectionId } from 'selectors/filters'

export const getIsMenuRecommended = createSelector(
	[getRecipes],
	(recipes) => isMenuRecommended(recipes)
)

export const currentCollectionSlug = createSelector(
	[getCurrentCollectionId, getMenuCollections],
	(collectionId, menuCollections) => {
		const currentCollection = menuCollections.get(collectionId)

		return currentCollection.slug || null
	}
)

export default {
	getIsMenuRecommended,
}
