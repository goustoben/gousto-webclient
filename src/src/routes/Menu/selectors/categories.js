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

export const getBrandCarousels = ({ brand }) => (brand && brand.data && brand.data.carousels ? brand.data.carousels : []
)

export const getCarouselConfigFromProps = (_, { category }) => category && category.get('carouselConfig')

const getCarouselImage = (images) => {
  if (!images) {
    return undefined
  }
  const firstItemIndex = 0
  const crops = images.getIn([firstItemIndex, 'crops'], [])

  const image = crops.find((crop) => (crop.get('width') === 460) )

  return image ? image.get('url') : undefined
}

export const getCarouselConfigForCategory = createSelector(
  getBrandCarousels,
  getCarouselConfigFromProps,
  (_, { category }) => category.get('shortTitle'),
  (brandCarousels, carouselConfig, shortTitle) => {
    let carouselStyleDetails = {
      styleSlug: 'default',
      title: shortTitle,
      theme: {}
    }
    if (carouselConfig) {
      carouselStyleDetails = {
        styleSlug: carouselConfig.get('styleSlug'),
        title: carouselConfig.get('title'),
        description: carouselConfig.get('description'),
        theme: {},
        imageUrl: getCarouselImage(carouselConfig.get('images'))
      }
    }
    const foundCarouselStyle = brandCarousels.find(carousel => carousel.slug === carouselStyleDetails.styleSlug)
    if (foundCarouselStyle) {
      const foundTheme = foundCarouselStyle.themes.find((theme) => theme.name === 'light')

      return {
        ...carouselStyleDetails,
        theme: foundTheme || {}
      }
    }

    return carouselStyleDetails
  }
)

