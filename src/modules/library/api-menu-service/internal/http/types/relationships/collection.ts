import { MenuAPIResponseRelationshipRecipe } from './recipe'

/**
 * This represents a `collection` object in the `relationships` block of Menu service response.
 */
export type MenuAPIResponseRelationshipCollection = {
  id: string
  type: 'collection'
  relationships: {
    recipes: {
      data: MenuAPIResponseRelationshipRecipe[]
    }
  }

  // TODO is this still needed?
  meta?: {
    thumbnail: string
  }
}

/**
 * This represents a `featured_category` object in the `relationships` block of Menu service response.
 */
export type MenuApiResponseRelationshipFeaturedCategory = {
  id: string
  type: string

  meta?: any // TODO what type is this?
}
