export type FoodBrandColour = {
  slug: string
  theme: {
    borderColor: string
    ribbonColor: string
    textColor: string
  }
}

export type Roundel = {
  name: string
  slug: string
  images: {
    type: 'headshot'
    url: string
  }[]
}

export type Tag = {
  slug: string
  text: string
  type: 'general' | 'tagline' | 'availability' | 'promotion' | 'health-claim'
  themes: {
    name: string
    color: string
    borderColor?: string
    backgroundColor?: string
    iconColor?: string
  }[]
  icon?: string
}

export type BrandData = {
  carousels: any[]
  foodBrandColours: FoodBrandColour[]
  roundels: Roundel[]
  tags: Tag[]
}

/**
 * Collection data in context of Menu Headers Branding information
 */
export type BrandCollection = {
  type: 'collection'
  id: string
  header: string
}

/**
 * Collections per menu information
 */
export type MenuHeadersBrandData = {
  id: string
  relationships: {
    collections: {
      data: BrandCollection[]
    }
  }[]
  type: 'menu'
}

/**
 * Image data in context of Menu Headers Branding information
 */
type BrandHeaderImage = {
  width: number
  height: number
  url: string
  altText: string
}

export type MenuHeadersIncludesData = {
  id: string
  type: 'gradient-info-header' | 'wave-link-header'
  attributes: {
    headerImage: BrandHeaderImage[]
    description: string
    color: string
    backgroundColor?: string
    gradientColor?: string
    image?: BrandHeaderImage[]
    imageLocation?: 'right'
    waveColor?: string
    link?: {
      collectionId: string
      collectionSlug: string
    }
  }
}
