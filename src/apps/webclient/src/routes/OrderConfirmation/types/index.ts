import { List } from 'immutable'

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

export type Images = {
  '50': Image
  '200': Image
  '400': Image
  '700': Image
  '1000': Image
  '1500': Image
}

export type Image = {
  src: string
  url: string
  width: number
}
export type Product = {
  id: string
  sku: string
  title: string
  description: string
  list_price: string
  is_vatable: boolean
  is_for_sale: boolean
  age_restricted: boolean
  box_limit: number
  always_on_menu: boolean
  volume: number
  zone: string
  created_at: string
  categories: Category[]
  tags: string[]
  images: Images
  attributes?: Attribute[]
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

export type Media = {
  title: string | null
  description: string | null
  type: string
  urls: { [key: string]: string }[]
}

export type ProductRecipePairing = {
  recipeId: string
  title: string
  media: List<Media[]>
  products: List<Product[]>
}

export type ProductRecipePairings = Map<string, ProductRecipePairing>

export type RecipeItem = Map<
  string,
  {
    recipeId: string | undefined
    title: string
    media: List<any>
  }
>

export type Order = List<{
  recipeItems: List<RecipeItem>
}>

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
