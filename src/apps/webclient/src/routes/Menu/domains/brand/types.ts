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
