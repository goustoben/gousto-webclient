import { useSelector, RootStateOrAny } from 'react-redux'

const getCollectionSlugFromQuery = (state: RootStateOrAny) => {
  if (
    !state.routing ||
    !state.routing.locationBeforeTransitions ||
    !state.routing.locationBeforeTransitions.query ||
    !state.routing.locationBeforeTransitions.query.collection
  ) {
    return null
  }

  return state.routing.locationBeforeTransitions.query.collection
}

export const useCollectionQuerySlug = () => {
  const slug = useSelector(getCollectionSlugFromQuery)

  return slug
}
