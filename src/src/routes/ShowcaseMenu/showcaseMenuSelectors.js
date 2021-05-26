import { createSelector } from 'reselect'
import { getDisplayedCollections } from 'routes/Menu/selectors/collections'
import { getFilteredLines } from './showcaseMenuUtils'

export const getCollectionDescriptorsInLines = createSelector(
  getDisplayedCollections,
  (menuCollections) => getFilteredLines(menuCollections)
)

export const getCollectionDescriptorsSingleLine = createSelector(
  [getCollectionDescriptorsInLines],
  (collectionDescriptorsInLines) => Array.prototype.concat(...collectionDescriptorsInLines)
)
