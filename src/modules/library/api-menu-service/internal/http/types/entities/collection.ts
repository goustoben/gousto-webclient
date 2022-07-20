/**
 * This represents a `collection` object in the `included` block of Menu service response.
 */
export type MenuAPIResponseIncludedCollection = {
  type: 'collection'
  id: string
  attributes: {
    meta_title: any // TODO what type is this?
    description: string
    long_title: any // TODO what type is this?
    meta_description: any // TODO what type is this?
    short_title: string
    colour: string
    schedule_end: string | null
    slug: string
    schedule_start: string | null
    order: number
    requirements?: {
      dietary_claims: string[]
    }
  }
}
