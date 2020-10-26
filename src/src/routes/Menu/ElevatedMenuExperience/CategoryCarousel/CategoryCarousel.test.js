import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import Link from 'Link'
import { RecipeTileContainer } from '../../components/RecipeTile'
import { CategoryCarousel } from './CategoryCarousel'

describe('CategoryCarousel', () => {
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
    },
    description: 'Tasty'
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
  const categoryButtonClicked = jest.fn()

  describe('when there are no recipes in category', () => {
    test('then it should render nothing', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={[]} carouselConfig={carouselConfig} />,
      )

      expect(wrapper.find(RecipeTileContainer)).toHaveLength(0)
    })
  })

  describe('when there is one recipe in category', () => {
    test('then it should render one RecipeTileContainer', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes1} carouselConfig={carouselConfig} />,
      )

      expect(wrapper.find(RecipeTileContainer)).toHaveLength(1)
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
    test('then it should render multiple RecipeTileContainer', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes2} carouselConfig={carouselConfig} />,
      )

      expect(wrapper.find(RecipeTileContainer)).toHaveLength(2)
    })

    test('then it should render View link with 2 recipes', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes2} carouselConfig={carouselConfig} />,
      )

      expect(wrapper.find('.categoryViewAllLink').find('GoustoLink').children().first()
        .text()).toEqual('View (2)')
    })

    describe('when the view button is clicked', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes2} carouselConfig={carouselConfig} categoryButtonClicked={categoryButtonClicked} />,
      )
      const scrollSpy = jest.spyOn(window, 'scroll').mockImplementation(() => {})
      test('then the onClick actions are triggered', () => {
        wrapper.find(Link).simulate('click')
        expect(categoryButtonClicked).toHaveBeenCalledTimes(1)
        expect(scrollSpy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('when there is a category description', () => {
    test('then it should render a descriptionn under the title', () => {
      const wrapper = shallow(
        <CategoryCarousel category={category} recipes={recipes2} carouselConfig={carouselConfig} />,
      )

      expect(wrapper.find('.categoryDescription')).toHaveLength(1)
    })
  })
})
