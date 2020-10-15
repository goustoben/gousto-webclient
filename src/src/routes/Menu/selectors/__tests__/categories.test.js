import Immutable from 'immutable'
import { getFeaturedCategories, getBrandCarousels, getCarouselConfigForCategory } from '../categories'

describe('get featured categories', () => {
  const collection1 = Immutable.Map({ id: '123', slug: 'collection-1', isFeaturedCategory: false })
  const collection2 = Immutable.Map({ id: '456', slug: 'collection-2', isFeaturedCategory: true, featuredCategoryOrder: 0 })
  const collection3 = Immutable.Map({ id: '789', slug: 'collection-3', isFeaturedCategory: true, featuredCategoryOrder: 1 })
  const menuCollections1 = Immutable.OrderedMap({
    123: collection1,
  })
  const menuCollections2 = Immutable.OrderedMap({
    123: collection1,
    456: collection2,
  })
  const menuCollections3 = Immutable.OrderedMap({
    123: collection1,
    456: collection2,
    789: collection3,
  })

  describe('featured categories', () => {
    describe('when has no featured categories', () => {
      test('should return no categories', () => {
        const result = getFeaturedCategories.resultFunc(menuCollections1)
        const expected = Immutable.OrderedMap({})

        expect(result).toEqual(expected)
      })
    })

    describe('when has featured category', () => {
      test('should return one category', () => {
        const result = getFeaturedCategories.resultFunc(menuCollections2)
        const expected = Immutable.OrderedMap({
          456: collection2,
        })

        expect(result).toEqual(expected)
      })
    })

    describe('when has 2 featured category', () => {
      test('should return 2 categories', () => {
        const result = getFeaturedCategories.resultFunc(menuCollections3)
        const expected = Immutable.OrderedMap({
          456: collection2,
          789: collection3,
        })

        expect(result).toEqual(expected)
      })
    })
  })
})

describe('get brand carousels', () => {
  let state
  const carousels = [{
    type: 'carousel_theme',
    slug: 'default',
    name: 'Default Carousel Theme',
    themes: [{
      name: 'light',
      color: '#333D47',
      backgroundColor: '#F4F7FA',
      linkColor: '#615CFF',
      titleColor: '#333D47',
      fdiStyling: true
    }]
  },
  {
    type: 'carousel_theme',
    slug: 'marmite',
    name: 'Marmite Campaign',
    themes: [{
      name: 'light',
      color: '#FF5733',
      backgroundColor: '#333D47',
      titleColor: '#FFDE31',
      linkColor: '#D9DDFF',
      fdiStyling: false
    }]
  }
  ]
  describe('when the data contains carousels', () => {
    beforeEach(() => {
      state = {
        brand: {
          data: {
            carousels
          }
        }
      }
    })
    test(' should return carousels data ', () => {
      const result = getBrandCarousels(state)
      expect(result).toEqual(carousels)
    })
  })

  describe('when the data does not contain carousels', () => {
    beforeEach(() => {
      state = {
        brand: {
          data: {}
        }
      }
    })
    test('should return an empty array', () => {
      const result = getBrandCarousels(state)
      expect(result).toEqual([])
    })
  })
})

describe('getCarouselConfigForCategory', () => {
  let state
  let props
  const carousels = [{
    type: 'carousel_theme',
    slug: 'default',
    name: 'Default Carousel Theme',
    themes: [{
      name: 'light',
      color: '#333D47',
      backgroundColor: '#F4F7FA',
      linkColor: '#615CFF',
      titleColor: '#333D47',
      fdiStyling: true
    }]
  },
  {
    type: 'carousel_theme',
    slug: 'marmite',
    name: 'Marmite Campaign',
    themes: [{
      name: 'light',
      color: '#FF5733',
      backgroundColor: '#333D47',
      titleColor: '#FFDE31',
      linkColor: '#D9DDFF',
      fdiStyling: false
    }]
  }]

  beforeEach(() => {
    state = {
      brand: {
        data: {
          carousels
        }
      }
    }
  })

  describe('when carousel details is defined', () => {
    beforeEach(() => {
      props = {
        category: Immutable.fromJS({
          shortTitle: 'Chicken',
          carouselConfig: {
            styleSlug: 'default',
            title: 'Chicken',
            description: 'All our chicken recipes'
          }
        })
      }
    })
    test('should return carouselStyleDetails with theme', () => {
      expect(getCarouselConfigForCategory(state, props)).toEqual({
        description: 'All our chicken recipes',
        styleSlug: 'default',
        theme: {
          backgroundColor: '#F4F7FA',
          color: '#333D47',
          fdiStyling: true,
          linkColor: '#615CFF',
          name: 'light',
          titleColor: '#333D47'
        },
        title: 'Chicken'})
    })
  })
  describe('when carousel details is undefined', () => {
    beforeEach(() => {
      props = {
        category: Immutable.fromJS({
          shortTitle: 'Chicken',
        })
      }
    })
    test('should return default carouselStyleDetails with theme', () => {
      expect(getCarouselConfigForCategory(state, props)).toEqual({
        styleSlug: 'default',
        theme: {
          backgroundColor: '#F4F7FA',
          color: '#333D47',
          fdiStyling: true,
          linkColor: '#615CFF',
          name: 'light',
          titleColor: '#333D47'
        },
        title: 'Chicken'})
    })
  })
  describe('when brand data is undefined', () => {
    beforeEach(() => {
      props = {
        category: Immutable.fromJS({
          shortTitle: 'Chicken',
          carouselConfig: {
            styleSlug: 'default',
            title: 'Chicken',
            description: 'All our chicken recipes',
          }
        })
      }
    })
    test('should return carouselStyleDetails without theme', () => {
      expect(getCarouselConfigForCategory({}, props)).toEqual({
        description: 'All our chicken recipes',
        styleSlug: 'default',
        title: 'Chicken',
        theme: {}
      })
    })
  })
})
