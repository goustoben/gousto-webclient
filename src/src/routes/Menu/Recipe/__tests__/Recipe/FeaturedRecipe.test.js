import React from 'react'

import { shallow } from 'enzyme'

import Image from 'routes/Menu/Recipe/Image'
import Title from 'routes/Menu/Recipe/Title'
import ChefQuote from 'routes/Menu/Recipe/ChefQuote'
import TasteScore from 'routes/Menu/Recipe/TasteScore'
import { AttributeGrid } from 'routes/Menu/Recipe/AttributeGrid'

import FeaturedRecipe from 'routes/Menu/Recipe/FeaturedRecipe'

import { Pill } from 'goustouicomponents'
import { RecipeDisclaimerContainer } from 'routes/Menu/RecipeDisclaimer'

describe('<FeaturedRecipe />', () => {
  let wrapper
  const recipe = {
    id: '1',
    title: 'test',
    rating: {
      count: 1,
      average: 4,
    },
    url: '',
    cookingTime: 1,
    cookingTimeFamily: 1,
    shelfLifeDays: '',
    media: {
      images: [
        {
          urls: [
            {},
            {},
            {
              src: 'test',
            },
          ],
        },
      ],
    },
  }

  beforeEach(() => {
    wrapper = shallow(<FeaturedRecipe {...recipe} />)
  })

  test('should contain one AttributeGrid component', () => {
    const component = wrapper.find(AttributeGrid)

    expect(component.length).toBe(1)
  })

  test('should contain one recipe disclaimer ', () => {
    expect(wrapper.find(RecipeDisclaimerContainer)).toHaveLength(1)
    expect(wrapper.find(RecipeDisclaimerContainer).prop('id')).toEqual('1')
  })

  test('should contain one TasteScore component', () => {
    wrapper = shallow(<FeaturedRecipe tasteScore={99} />)

    expect(wrapper.find(TasteScore)).toHaveLength(1)
    expect(wrapper.find(TasteScore).prop('score')).toEqual(99)
  })

  test('should contain one ChefQuote component', () => {
    expect(wrapper.find(ChefQuote).length).toBe(1)
  })

  test('should have a featured image', () => {
    expect(wrapper.find(Image).prop('view')).toBe('featured')
  })

  test('should have a featured title', () => {
    expect(wrapper.find(Title).prop('view')).toBe('featured')
  })

  test('should contain one Pill component and icon prop is true', () => {
    expect(wrapper.find(Pill).length).toBe(1)
    expect(wrapper.find(Pill).prop('icon')).toBe(true)
  })
})
