import { useSelector } from 'react-redux'
import { getDisplayedCollections } from '../../../selectors/collections'

export const useDisplayedCollections = () => {
  const collections = useSelector(getDisplayedCollections)

  // todo filter out collections based on feature flags here

  return collections
}
