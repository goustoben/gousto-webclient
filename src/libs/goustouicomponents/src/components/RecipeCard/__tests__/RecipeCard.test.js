import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { RecipeCard } from '../index'

const media = [
  {
    url: 'https://production-media.gousto.co.uk/cms/mood-image/1358-Harissa-Hummus-Roasted-Veg--Freekeh-Salad-x700.jpg',
    width: 700,
  },
  {
    url: 'https://production-media.gousto.co.uk/cms/mood-image/1358-Harissa-Hummus-Roasted-Veg--Freekeh-Salad-x1000.jpg',
    width: 1000,
  },
]

describe('<RecipeCard />', () => {
  let wrapper
  const props = {
    title: 'Roast Veg Tabbouleh With Tahini Dressing',
    media,
    rating: {
      size: 'Medium',
      amountOfReviews: 50,
      average: 4,
    },
    cookingTime: 30,
    isResizable: false,
  }

  beforeEach(() => {
    wrapper = mount(<RecipeCard {...props} />)
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<RecipeCard {...props} />, div)
  })

  describe('when component is rendered', () => {
    test('should have TimeIndicator component', () => {
      expect(wrapper.find('TimeIndicator')).toBeDefined()
    })

    test('should have Rating component', () => {
      expect(wrapper.find('Rating')).toBeDefined()
    })
  })

  describe('when isResizable is false by default', () => {
    test('then component container should not have isResizable class', () => {
      expect(wrapper.find('.recipeCard').hasClass('isResizable')).toBeFalsy()
    })
  })

  describe('when isResizable is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isResizable: true })
    })

    test('then component container should have isResizable class', () => {
      expect(wrapper.find('.recipeCard').hasClass('isResizable')).toBeTruthy()
    })
  })

  describe('when hasHoverEffect is false by default', () => {
    test('then component container should not have hasHoverEffect class', () => {
      expect(wrapper.find('.recipeCard').hasClass('hasHoverEffect')).toBeFalsy()
    })
  })

  describe('when hasHoverEffect is true', () => {
    beforeEach(() => {
      wrapper.setProps({ hasHoverEffect: true })
    })

    test('then component container should have hasHoverEffect class', () => {
      expect(wrapper.find('.recipeCard').hasClass('hasHoverEffect')).toBeTruthy()
    })
  })

  test('should choose last url from media for image src', () => {
    expect(wrapper.find('.recipeImage').prop('src')).toBe(media[1].url)
  })

  test('should have properly transformed media prop for srcSet', () => {
    expect(wrapper.find('.recipeImage').prop('srcSet')).toBe(
      `${media[0].url} ${media[0].width}w, ${media[1].url} ${media[1].width}w`,
    )
  })

  describe('when a recipe has no reviews', () => {
    beforeEach(() => {
      wrapper.setProps({
        rating: {
          size: 'Medium',
          amountOfReviews: 0,
          average: 0,
        },
      })
    })

    test('then Rating component should not exist', () => {
      expect(wrapper.find('Rating').exists()).toBeFalsy()
    })
  })

  describe('when a recipe has no rating', () => {
    beforeEach(() => {
      wrapper.setProps({
        rating: null,
      })
    })

    test('then Rating component should not exist', () => {
      expect(wrapper.find('Rating').exists()).toBeFalsy()
    })
  })

  describe('when a recipe reviews is null', () => {
    beforeEach(() => {
      wrapper.setProps({
        rating: {
          size: 'Medium',
          amountOfReviews: null,
        },
      })
    })

    test('then Rating component should not exist', () => {
      expect(wrapper.find('Rating').exists()).toBeFalsy()
    })
  })

  describe('when hasMargin is true by default', () => {
    test('then component container should have hasMargin class', () => {
      expect(wrapper.find('.recipeCard').hasClass('hasMargin')).toBeTruthy()
    })
  })

  describe('when hasMargin is false', () => {
    beforeEach(() => {
      wrapper.setProps({ hasMargin: false })
    })

    test('then component container should not have hasMargin class', () => {
      expect(wrapper.find('.recipeCard').hasClass('hasMargin')).toBeFalsy()
    })
  })

  describe('when fitHeight is false by default', () => {
    test('then the component should not have fitHeight class', () => {
      expect(wrapper.find('.recipeCard').hasClass('fitHeight')).toBeFalsy()
    })
  })

  describe('when fitHeight is true', () => {
    beforeEach(() => {
      wrapper.setProps({ fitHeight: true })
    })

    test('then the component should have fitHeight class', () => {
      expect(wrapper.find('.recipeCard').hasClass('fitHeight')).toBeTruthy()
    })
  })

  describe('when hasRectangularImageOnMobile is false by default', () => {
    test('then the image container should not have the hasRectangularImageOnMobile class', () => {
      expect(wrapper.find('.recipeCard .imageContainer').hasClass('hasRectangularImageOnMobile')).toBeFalsy()
    })
  })

  describe('when hasRectangularImageOnMobile is true', () => {
    beforeEach(() => {
      wrapper.setProps({ hasRectangularImageOnMobile: true })
    })

    test('then the image container should have the hasRectangularImageOnMobile class', () => {
      expect(wrapper.find('.recipeCard .imageContainer').hasClass('hasRectangularImageOnMobile')).toBeTruthy()
    })
  })
})
