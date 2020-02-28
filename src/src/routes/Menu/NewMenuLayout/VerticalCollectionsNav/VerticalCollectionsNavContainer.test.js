import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { VerticalCollectionsNavContainer } from './VerticalCollectionsNavContainer'

describe('Given VerticalCollectionsNavContainer', () => {
  let wrapper
  describe('when I get collections with recipes', () => {
    beforeEach(() => {
      const getState = () => ({
        menuCollections: Immutable.OrderedMap({
          234: Immutable.Map({
            published: true,
            shortTitle: 'All Recipes',
            slug: 'all-recipes',
            id: '234',
            default: true,
          }),
          123: Immutable.Map({
            published: true,
            shortTitle: 'Fish',
            slug: 'fish',
            id: '123',
          }),
        }),
        menuCollectionRecipes: Immutable.fromJS({
          234: ['234', '345'],
          123: ['123', '456']
        }),
        filters: Immutable.fromJS({
          currentCollectionId: '123'
        })
      })

      wrapper = shallow(<VerticalCollectionsNavContainer />, {
        context: {
          store: {
            getState,
            dispatch: () => {},
            subscribe: () => {}
          }
        }
      })
    })
    test('then should render VerticalCollectionsNav', () => {
      expect(wrapper.find('VerticalCollectionsNav')).toHaveLength(1)
    })
  })
})
