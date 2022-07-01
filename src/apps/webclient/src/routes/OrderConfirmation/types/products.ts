import { ProductCategory } from './productCategory'

type Pivot = {
  pivot: {
    createdAt: string
  }
}

type Attribute = {
  id: string
  title: string
  unit: string | null
  value: string
}

type Media = {
  src: string
  width: number
}

type Image = {
  src: string
  url: string
  width: number
}

type Images = {
  '50': Image
  '200': Image
  '400': Image
  '700': Image
  '1000': Image
  '1500': Image
}

type ProductCategories = {
  [key: number]: Omit<ProductCategory, 'attributes'> & Pivot
}

export type Product = {
  id: string
  sku: string
  title: string
  description: string
  listPrice: string
  images: Images
  ageRestricted: boolean
  alwaysOnMenu: boolean
  boxLimit: number
  cutoffDates: string[]
  isForSale: boolean
  isVatable: boolean
  stock: number
  tags: string[]
  volume: number
  zone: string
  createdAt: string
  categories: ProductCategories
  attributes: Attribute[]
  media: Media[]
}

export type Products = {
  [key: string]: Product
}
