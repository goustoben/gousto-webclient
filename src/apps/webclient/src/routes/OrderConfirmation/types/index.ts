export type Category = {
  id: string
  title: string
  box_limit: number
  is_default: boolean
  recently_added: boolean
  hidden: boolean
  pivot: Pivot
}

export type Pivot = {
  created_at: string
}

export type NavCategory = {
  id: string
  label: string
  count: number
}
export type NavCategories = {
  [key: string]: NavCategory
}

export type FilteredProduct = {
  id: string
  title: string
  listPrice: string
  images: object
  ageRestricted: boolean
  quantity: number
}

export type FilteredProducts = {
  [key: string]: FilteredProduct
}

export type Attribute = {
  id: string
  title: string
  unit: null | string
  value: string
}

export type Bundle = {
  id: string
  bundleName: string
  bundleDescription: string
  bundleImage: string
  bundlePrice: string
  bundleProducts: BundleProduct[]
  bundleStartDate?: string[]
  isNew?: boolean
}

export type BundleProduct = {
  attributes?: Attribute[]
  title: string
  image: string
  id: string
  description: string
  sku: string
  quantity: number
}
