import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { CategoryCarouselContainer } from '../../components/CategoryCarousel'
import { CategoryCarouselsList } from './CategoryCarouselsList'

describe('RecipeCategoriesCarousel', () => {
  const category1 = Immutable.fromJS({
    shortTitle: 'Category 1',
    slug: 'category-1',
  })
  const category2 = Immutable.fromJS({
    shortTitle: 'Category 2',
    slug: 'category-2',
  })
  const categories0 = Immutable.fromJS([])
  const categories1 = Immutable.fromJS([
    category1,
  ])
  const categories2 = Immutable.fromJS([
    category1,
    category2,
  ])

  describe('when there are no categories', () => {
    test('then it should render nothing', () => {
      const wrapper = shallow(
        <CategoryCarouselsList categories={categories0} />,
      )

      expect(wrapper.find(CategoryCarouselContainer)).toHaveLength(0)
    })
  })

  describe('when there is one category', () => {
    test('then it should render one CategoryCarouselContainer', () => {
      const wrapper = shallow(
        <CategoryCarouselsList categories={categories1} />,
      )

      expect(wrapper.find(CategoryCarouselContainer)).toHaveLength(1)
    })
  })

  describe('when there are two category', () => {
    test('then it should render two CategoryCarouselContainer', () => {
      const wrapper = shallow(
        <CategoryCarouselsList categories={categories2} />,
      )

      expect(wrapper.find(CategoryCarouselContainer)).toHaveLength(2)
    })
  })
})
