import { createSelector } from 'reselect'

import { getRecipes, getMenuCollections } from 'selectors/root'
import { isMenuRecommended } from 'utils/menu'
import { getCurrentCollectionId } from 'selectors/filters'

export const getIsMenuRecommended = createSelector(
	[getRecipes],
	(recipes) => isMenuRecommended(recipes)
)

export const getCurrentCollectionSlug = createSelector(
	[getCurrentCollectionId, getMenuCollections],
	(collectionId, menuCollections) => {
		const currentCollection = menuCollections.get(collectionId)

		return (currentCollection && currentCollection.get('slug')) || null
	}
)

export default {
	getIsMenuRecommended,
}
