import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { EMERecipeTileContainer } from '../RecipeTile/EMERecipeTile'
import { CategoryCarousel } from './CategoryCarousel'

describe('RecipeCategoriesCarousel', () => {
  const category = Immutable.fromJS({
    shortTitle: 'Category 1',
    slug: 'category-1',
  })

  const carouselConfig = {
    title: 'Category 1',
    styleSlug: 'category-1',
    theme: {
      color: '#333D47',
      backgroundColor: '#F4F7FA',
      linkColor: '#615CFF',
      titleColor: '#333D47',
      fdiStyling: true
    }
  }

  const recipe1 = {
    originalId: '1',
    recipe: Immutable.Map({
      id: '1',
      availability: [],
      title: 'recipe1',
      boxType: 'vegetarian',
      dietType: 'Vegetarian',
      isRecommended: false,
    })
  }
  const recipe2 = {
    originalId: '2',
    recipe: Immutable.Map({
      id: '2',
      availability: [],
      title: 'recipe2',
      boxType: 'vegetarian',
      dietType: 'Vegetarian',
      isRecommended: false,
    })
  }
  const recipes1 = Immutable.List([recipe1])
  const recipes2 = Immutable.List([recipe1, recipe2])

  describe('when there are no recipes in category', () => {
    test('then it should render nothing', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={[]} carouselConfig={carouselConfig} />,
      )

      expect(wrapper.find(EMERecipeTileContainer)).toHaveLength(0)
    })
  })

  describe('when there is one recipe in category', () => {
    test('then it should render one EMERecipeTileContainer', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes1} carouselConfig={carouselConfig} />,
      )

      expect(wrapper.find(EMERecipeTileContainer)).toHaveLength(1)
      expect(wrapper.find('.categoryTitle').text()).toEqual('Category 1')
    })

    test('then it should render View link with 1 recipe', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes1} carouselConfig={carouselConfig} />,
      )
      const viewAllPath = `/menu?collection=${category.get('slug')}`

      expect(wrapper.find('.categoryViewAllLink').find('GoustoLink').children().first()
        .text()).toEqual('View (1)')
      expect(wrapper.find('.categoryViewAllLink').prop('to')).toEqual(viewAllPath)
    })
  })

  describe('when there are multiple recipes', () => {
    test('then it should render multiple EMERecipeTileContainer', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes2} carouselConfig={carouselConfig} />,
      )

      expect(wrapper.find(EMERecipeTileContainer)).toHaveLength(2)
    })

    test('then it should render View link with 2 recipes', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes2} carouselConfig={carouselConfig} />,
      )

      expect(wrapper.find('.categoryViewAllLink').find('GoustoLink').children().first()
        .text()).toEqual('View (2)')
    })
  })
})
