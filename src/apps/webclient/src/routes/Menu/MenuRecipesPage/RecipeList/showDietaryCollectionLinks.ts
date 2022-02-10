import { CollectionId } from '../../domains/collections'

const DIETARY_COLLECTION_LINKS_POSITION = 3

/**
 *  Predicate to decide if the Dietary Links should be shown
 *  for `collectionId` at `atIndex` position.
 *  The indexing starts with `0`.
 */
export const showDietaryCollectionLinks = ({
  collectionId,
  atIndex,
}: {
  collectionId: string
  atIndex: number
}) => {
  if (atIndex !== DIETARY_COLLECTION_LINKS_POSITION) {
    return false
  }

  if ([CollectionId.AllRecipes, CollectionId.Recommendations].includes(collectionId)) {
    return true
  }

  return false
}
