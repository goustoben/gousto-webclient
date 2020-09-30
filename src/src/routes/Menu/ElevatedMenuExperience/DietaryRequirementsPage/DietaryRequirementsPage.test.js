import Immutable from 'immutable'
import { shallow } from 'enzyme'
import React from 'react'
import { DietaryRequirementsPage } from './DietaryRequirementsPage'
import { CategoriesHeaderContainer } from '../CategoriesHeader'
import { DetailOverlayContainer } from '../../DetailOverlay'
import { CategoryCarouselContainer } from '../CategoryCarousel'
import Loading from '../../Loading'

describe('DietaryRequirementsPage', () => {
  let wrapper

  describe('When menu is loading', () => {
    beforeEach(() => {
      wrapper = shallow(
        <DietaryRequirementsPage recipesForCollections={[]} isMenuLoading />
      )
    })

    test('renders <Loading /> component', () => {
      expect(wrapper.getElement()).toEqual(<Loading loading />)
    })
  })

  describe('When menu has loaded', () => {
    beforeEach(() => {
      wrapper = shallow(
        <DietaryRequirementsPage
          recipesForCollections={[]}
          isMenuLoading={false}
        />
      )
    })

    test('renders <Navbar />', () => {
      expect(wrapper.find(CategoriesHeaderContainer).prop('categoryTitle')).toEqual('Dietary requirements')
    })

    test('renders <DetailOverlayContainer />', () => {
      expect(wrapper.find(DetailOverlayContainer)).toHaveLength(1)
    })

    test('does not render <CategoryCarouselContainer /> when recipe collections is an empty array', () => {
      expect(wrapper.find(CategoryCarouselContainer)).toHaveLength(0)
    })

    describe('When recipe collections are loading', () => {
      beforeEach(() => {
        wrapper.setProps({
          recipesForCollections: [{ recipeList: null, collection: null }]
        })
      })

      test('does not render <CategoryCarouselContainer /> when recipe collections is an empty array', () => {
        expect(wrapper.find(CategoryCarouselContainer)).toHaveLength(0)
      })
    })

    describe('When recipe collections have loaded', () => {
      beforeEach(() => {
        wrapper.setProps({
          recipesForCollections: [{
            recipeList: {
              recipes: Immutable.List([])
            },
            collection: Immutable.Map({ id: 'mock-id' })
          }]
        })
      })

      test('renders <CategoryCarouselContainer />', () => {
        expect(wrapper.find(CategoryCarouselContainer)).toHaveLength(1)
      })
    })
  })
})
