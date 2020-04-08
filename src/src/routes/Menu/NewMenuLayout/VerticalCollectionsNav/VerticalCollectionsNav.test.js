import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { VerticalCollectionsNav } from './VerticalCollectionsNav'

describe('VerticalCollectionsNav', () => {
  let wrapper
  const menuCollections = Immutable.OrderedMap({
    bc234: Immutable.Map({
      published: true,
      shortTitle: 'All Recipes',
      slug: 'all-recipes',
      id: 'bc234',
      default: true,
      order: 1
    }),
    cd123: Immutable.Map({
      published: true,
      shortTitle: 'Fish',
      slug: 'fish',
      id: 'cd123',
      order: 2
    }),
  })

  describe('when render a list of 2 collections', () => {
    beforeEach(() => {
      wrapper = shallow(
        <VerticalCollectionsNav
          menuCollections={menuCollections}
          menuCurrentCollectionId="cd123"
          collectionFilterChange={() => {}}
        />)
    })
    test('should have 2 Connect(CollectionItem)s', () => {
      expect(wrapper.find('Connect(CollectionItem)')).toHaveLength(2)
    })
  })

  describe('when click on Connect(CollectionItem)', () => {
    const collectionFilterChangeSpy = jest.fn()

    beforeEach(() => {
      wrapper = shallow(
        <VerticalCollectionsNav
          menuCollections={menuCollections}
          menuCurrentCollectionId="cd123"
          collectionFilterChange={collectionFilterChangeSpy}
        />)
    })
    test('should call collectionFilterChange with collectionId', () => {
      wrapper.find('Connect(CollectionItem)').first().simulate('click')
      expect(collectionFilterChangeSpy).toHaveBeenCalledWith('bc234')
    })

    describe('when page srolled more than 60 px', () => {
      const spyOnWindowScrollTo = jest.fn()
      beforeEach(() => {
        global.scrollY = 80
        global.scrollTo = spyOnWindowScrollTo
      })
      test('should scroll to top', () => {
        wrapper.find('Connect(CollectionItem)').first().simulate('click')
        expect(spyOnWindowScrollTo).toHaveBeenCalledWith(0, 61)
      })
    })
  })
})
