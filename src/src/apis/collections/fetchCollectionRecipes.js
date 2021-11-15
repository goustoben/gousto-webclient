import { fetchCollections } from "apis/collections/fetchCollections"
import { recipesRoute } from "config/routes/collections/recipesRoute"

export function fetchCollectionRecipes(accessToken, collectionId, reqData) {
    return fetchCollections(accessToken, `${collectionId}${recipesRoute}`, reqData)
}
