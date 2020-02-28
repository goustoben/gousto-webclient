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

  const menuCollectionRecipes = Immutable.fromJS({
    bc234: ['123', '234'],
    cd123: ['324', '433', '544'],
  })

  describe('when render a list of 2 collections', () => {
    beforeEach(() => {
      wrapper = shallow(
        <VerticalCollectionsNav
          menuCollections={menuCollections}
          menuCollectionRecipes={menuCollectionRecipes}
          menuCurrentCollectionId="cd123"
          collectionFilterChange={() => {}}
        />)
    })
    test('should have 2 CollectionItems', () => {
      expect(wrapper.find('CollectionItem')).toHaveLength(2)
    })
  })

  describe('when click on CollectionItem', () => {
    const collectionFilterChangeSpy = jest.fn()

    beforeEach(() => {
      wrapper = shallow(
        <VerticalCollectionsNav
          menuCollections={menuCollections}
          menuCollectionRecipes={menuCollectionRecipes}
          menuCurrentCollectionId="cd123"
          collectionFilterChange={collectionFilterChangeSpy}
        />)
    })
    test('should call collectionFilterChange with collectionId', () => {
      wrapper.find('CollectionItem').first().simulate('click')
      expect(collectionFilterChangeSpy).toHaveBeenCalledWith('bc234')
    })
  })
})
