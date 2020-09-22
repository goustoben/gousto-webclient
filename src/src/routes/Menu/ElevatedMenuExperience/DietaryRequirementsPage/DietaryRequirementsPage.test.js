import Immutable from 'immutable'
import { shallow } from 'enzyme'
import React from 'react'
import { DietaryRequirementsPage } from './DietaryRequirementsPage'
import { Navbar } from './Navbar'
import { DetailOverlayContainer } from '../../DetailOverlay'
import { CategoryCarousel } from '../CategoryCarousel'
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
      expect(wrapper.find(Navbar).prop('title')).toEqual('Dietary requirements')
    })

    test('renders <DetailOverlayContainer />', () => {
      expect(wrapper.find(DetailOverlayContainer)).toHaveLength(1)
    })

    test('does not render <CategoryCarousel /> when recipe collections is an empty array', () => {
      expect(wrapper.find(CategoryCarousel)).toHaveLength(0)
    })

    describe('When recipe collections are loading', () => {
      beforeEach(() => {
        wrapper.setProps({
          recipesForCollections: [{ recipeList: null, collection: null }]
        })
      })

      test('does not render <CategoryCarousel /> when recipe collections is an empty array', () => {
        expect(wrapper.find(CategoryCarousel)).toHaveLength(0)
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

      test('renders <CategoryCarousel />', () => {
        expect(wrapper.find(CategoryCarousel)).toHaveLength(1)
      })
    })
  })
})
