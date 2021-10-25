import { useDispatch, useSelector } from 'react-redux'
import { useDisplayedCollections } from './internal/useDisplayedCollections'
import { useCurrentCollection } from './internal/useCurrentCollection'
import { useChangeCollection } from './internal/useChangeCollection'

export const useCollections = () => {
  const dispatch = useDispatch()

  const currentCollection = useCurrentCollection()
  const collections = useDisplayedCollections()
  const location = useSelector(state => state.routing.locationBeforeTransitions)
  const changeCollection = useChangeCollection(dispatch, location, collections)

  return {
    currentCollection,
    collections,
    changeCollection
  }
}
