import Immutable from 'immutable'
import { getBrandCarousels, getCarouselConfigForCategory } from '../categories'

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
    }],
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
    }],
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

  describe('when carousel images have an image with a width of 460', () => {
    beforeEach(() => {
      props = {
        category: Immutable.fromJS({
          shortTitle: 'Chicken',
          carouselConfig: {
            styleSlug: 'default',
            title: 'Chicken',
            description: 'All our chicken recipes',
            images: [
              {
                altText: 'Gousto x Marmite. Two ',
                type: 'single-carousel',
                crops: [
                  {
                    width: 230,
                    url: 'https://test.com/category-image/230.jpg'
                  },
                  {
                    width: 460,
                    url: 'https://test.com/category-image/460.jpg'
                  }
                ]
              }
            ]
          }
        })
      }
    })
    test('should return an image url for the carousel', () => {
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
        imageUrl: 'https://test.com/category-image/460.jpg',
        title: 'Chicken'})
    })
  })

  describe('when carousel images do not have an image with a width of 460', () => {
    beforeEach(() => {
      props = {
        category: Immutable.fromJS({
          shortTitle: 'Chicken',
          carouselConfig: {
            styleSlug: 'default',
            title: 'Chicken',
            description: 'All our chicken recipes',
            images: [
              {
                altText: 'Gousto x Marmite. Two ',
                type: 'single-carousel',
                crops: [
                  {
                    width: 230,
                    url: 'https://test.com/category-image/230.jpg'
                  }
                ]
              }
            ]
          }
        })
      }
    })
    test('should not return an image url for the carousel', () => {
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

  describe('when carousel details does not contain any images', () => {
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
    test('should return carousel details without any images', () => {
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
})
