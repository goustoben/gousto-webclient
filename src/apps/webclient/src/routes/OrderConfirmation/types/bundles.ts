type Attribute = {
  id: string
  title: string
  unit: null | string
  value: string
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
