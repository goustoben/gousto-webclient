import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const version = routes.version.collections

export function fetchCollections(accessToken, path, reqData, includeExperiments = true) {
  return fetch(accessToken, `${endpoint('collections', version)}/collections/${path}`, reqData, 'GET', 'default', {}, null, false, includeExperiments)
}

export function fetchCollectionRecipes(accessToken, collectionId, reqData, includeExperiments = true) {
  return fetchCollections(accessToken, `${collectionId}${routes.collections.recipes}`, reqData, includeExperiments)
}

export function fetchCollectionBySlug(slug) {
  return fetchCollections(null, slug)
}
