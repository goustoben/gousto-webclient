/* eslint-disable no-unused-vars */
import { Map as ImmutableMap } from 'immutable'

export interface Collection extends ImmutableMap<string, any> {
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
}
