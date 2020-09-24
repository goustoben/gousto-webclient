import Immutable from 'immutable'
import { createSelector } from 'reselect'
import { getDisplayedCollections } from './collections'

export const getFeaturedCategories = createSelector(getDisplayedCollections, (collections) => {
  const featuredCategories = collections.filter((collection) => collection.get('isFeaturedCategory'))
  const featuredCategoriesArray = featuredCategories.toArray()
  let orderedFeaturedCategories = Immutable.OrderedMap()

  featuredCategoriesArray.sort((a, b) => (a.get('featuredCategoryOrder') - b.get('featuredCategoryOrder')))

  featuredCategoriesArray.forEach(category => {
    orderedFeaturedCategories = orderedFeaturedCategories.set(category.get('id'), category)
  })

  return orderedFeaturedCategories
})
