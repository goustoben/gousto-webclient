import { createMenuCollection } from '../../../types'

export const createCollectionFromDefaultValues = (collection: {}) => {
  const defaultValues = {
    id: '101',
    published: true,
    default: true,
    slug: 'foo',
    shortTitle: 'short title',
    description: 'description',
    recipesInCollection: [],
    order: 1,
    colour: 'blue',
    featuredCategoryOrder: 0,
    isFeaturedCategory: false,
  }
  return createMenuCollection({
    ...defaultValues,
    ...collection,
  })
}
