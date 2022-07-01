import { List, Map } from 'immutable'

type ProductCategoryAttribute = {
  id: string
  title: string
  unit: string | null
}

type ProductCategoryAttributeImmutable = Map<keyof ProductCategoryAttribute, string>

export type ProductCategory = {
  id: string
  title: string
  boxLimit: number
  isDefault: boolean
  recentlyAdded: boolean
  hidden: boolean
  attributes: List<ProductCategoryAttributeImmutable>
}

export type ProductCategories = {
  [key: string]: ProductCategory
}
