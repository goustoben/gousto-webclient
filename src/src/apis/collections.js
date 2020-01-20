import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const version = routes.version.collections

export function fetchCollections(accessToken, path, reqData) {
  return fetch(accessToken, `${endpoint('collections', version)}/collections/${path}`, reqData, 'GET', 'default', {}, null, false)
}

export function fetchCollectionRecipes(accessToken, collectionId, reqData) {
  return fetchCollections(accessToken, `${collectionId}${routes.collections.recipes}`, reqData)
}

export function fetchCollectionBySlug(slug) {
  return fetchCollections(null, slug)
}
