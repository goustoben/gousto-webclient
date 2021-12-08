import React from 'react'
import { mount } from 'enzyme'
import { RecipesImagery } from '..'

describe('<RecipesImagery />', () => {
  let wrapper
  const ITEMS = [
    {
      src: 'image1/path.jpg',
      alt: 'Recipe 1',
    },
    {
      src: 'image2/path.jpg',
      alt: 'Recipe 2',
    },
    {
      src: 'image3/path.jpg',
      alt: 'Recipe 3',
    },
    {
      src: 'image4/path.jpg',
      alt: 'Recipe 4',
    },
    {
      src: 'image5/path.jpg',
      alt: 'Recipe 5',
    },
  ]

  beforeEach(() => {
    wrapper = mount(<RecipesImagery />)
  })

  test('renders without crashing', () => { })

  test('renders a list of four empty elements', () => {
    expect(wrapper.find('li').find('img')).toHaveLength(0)
  })

  test('elements are rendered inline', () => {
    expect(wrapper.find('ul').hasClass('is2x2')).toBe(false)
  })

  describe('given items prop is passed', () => {
    describe('when items contain less than maximum allowed number of elements (e.g. 3)', () => {
      beforeEach(() => {
        wrapper.setProps({
          items: ITEMS.slice(0, 3),
        })
      })

      test('renders a list with 4 elements inside', () => {
        expect(wrapper.find('li').length).toBe(4)
      })

      test('renders 3 images and one empty list item', () => {
        expect(wrapper.find('li').find('img')).toHaveLength(3)
        expect(wrapper.find('img').at(3).exists()).toBe(false)
      })
    })

    describe('when items contain more than maximum allowed number of elements (e.g. 5)', () => {
      beforeEach(() => {
        wrapper.setProps({
          items: ITEMS,
        })
      })

      test('renders a list with 4 elements inside', () => {
        expect(wrapper.find('li')).toHaveLength(4)
      })

      test('renders 4 images', () => {
        expect(wrapper.find('li').find('img')).toHaveLength(4)
      })
    })
  })

  describe('given is2x2 prop is passed and set to true', () => {
    beforeEach(() => {
      wrapper.setProps({
        is2x2: true,
      })
    })

    test('elements are rendered in a square', () => {
      expect(wrapper.find('ul').hasClass('is2x2')).toBe(true)
    })
  })
})
