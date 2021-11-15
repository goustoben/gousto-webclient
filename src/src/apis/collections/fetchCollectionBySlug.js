import { fetchCollections } from "apis/collections/fetchCollections"

export function fetchCollectionBySlug(slug) {
    return fetchCollections(null, slug)
}
