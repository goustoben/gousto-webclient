import { fromJS } from 'immutable'
import { ImmutableMap } from './immutableMap'

type MenuCollectionProperties = {
  carouselConfig?:
    | {
        [k: string]: unknown
      }[]
    | null
  featuredCategoryOrder: number
  recipesInCollection: string[]
  slug: string
  colour: string
  published: boolean
  order: number
  requirements?:
    | {
        [k: string]: unknown
      }[]
    | null
  isFeaturedCategory: boolean
  id: string
  shortTitle: string
  description: string
  default: boolean
}

export function createMenuCollection(
  o: MenuCollectionProperties,
): ImmutableMap<MenuCollectionProperties> {
  return fromJS(o)
}

export type MenuCollection = ImmutableMap<MenuCollectionProperties>
