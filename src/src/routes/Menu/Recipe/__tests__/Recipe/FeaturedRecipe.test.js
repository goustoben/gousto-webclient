import React from 'react'

import { shallow } from 'enzyme'

import Image from 'routes/Menu/Recipe/Image'
import { ChefQuote } from 'routes/Menu/Recipe/ChefQuote'
import { AttributeGrid } from 'routes/Menu/Recipe/AttributeGrid'

import { FeaturedRecipe } from 'routes/Menu/Recipe/FeaturedRecipe'

import { Pill } from 'goustouicomponents'
import { RecipeDisclaimerContainer } from 'routes/Menu/RecipeDisclaimer'
import { VariantHeaderContainer } from '../../VariantHeader'
import { TitleContainer } from '../../Title'

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
    stock: 1000,
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

  test('should contain one VariantHeader component', () => {
    const component = wrapper.find(VariantHeaderContainer)
    expect(component.length).toBe(1)
  })

  test('should contain one AttributeGrid component', () => {
    const component = wrapper.find(AttributeGrid)

    expect(component.length).toBe(1)
  })

  test('should contain one recipe disclaimer ', () => {
    expect(wrapper.find(RecipeDisclaimerContainer)).toHaveLength(1)
    expect(wrapper.find(RecipeDisclaimerContainer).prop('recipeId')).toEqual('1')
  })

  test('should contain one ChefQuote component', () => {
    expect(wrapper.find(ChefQuote).length).toBe(1)
  })

  test('should have a featured image', () => {
    expect(wrapper.find(Image).prop('view')).toBe('featured')
  })

  test('should have a featured title', () => {
    expect(wrapper.find(TitleContainer).prop('view')).toBe('featured')
    expect(wrapper.find(TitleContainer).prop('recipeId')).toEqual('1')
  })

  test('should contain one Pill component and icon prop is true', () => {
    expect(wrapper.find(Pill).length).toBe(1)
    expect(wrapper.find(Pill).prop('icon')).toBe(true)
  })
})
