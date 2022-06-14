export type Recipe = {
  id: string
  title: string
  tagline?: string
  cookingTimeFamily?: number
  cookingTime?: number
  isFineDineIn?: boolean
  chefPrepared?: boolean
  media?: {
    images: Image[]
  }
}

export type Image = {
  type: string
  title: string
  description: string
  urls: {
      src: string,
      width: number,
  }[]
}
