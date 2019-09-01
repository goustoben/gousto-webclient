import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import Image from 'Recipe/Image'
import Title from 'Recipe/Title'
import ChefQuote from 'Recipe/ChefQuote'
import TasteScore from 'Recipe/TasteScore'
import { AttributeGrid } from 'Recipe/AttributeGrid'

import FeaturedRecipe from 'Recipe/FeaturedRecipe'

import { Pill } from 'goustouicomponents'
import { ShortlistButton } from 'Recipe/ShortlistButton'

describe('<FeaturedRecipe />', () => {
  let wrapper
  const recipe = Immutable.fromJS({
    id: 1,
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
  })

  beforeEach(() => {
    wrapper = shallow(<FeaturedRecipe recipe={recipe} />)
  })

  test('should contain one AttributeGrid component', () => {
    const component = wrapper.find(AttributeGrid)

    expect(component.length).toBe(1)
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
    wrapper.setProps({ showRecipeDetailsButton: true })
    expect(wrapper.find(Pill).length).toBe(1)
    expect(wrapper.find(Pill).prop('icon')).toBe(true)
  })

  test('should contain one ShortlistButton if feature flag is showShortlistButton is true and onMobile is true', () => {
    wrapper.setProps({ showShortlistButton: true })
    expect(wrapper.find(ShortlistButton).length).toBe(1)
  })
})
