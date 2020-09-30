import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { CategoriesModalContainer } from './CategoriesModalContainer'

describe('CategoriesModalContainer', () => {
  let wrapper

  test('should pass down correct props', () => {
    const state = {
      menuCollections: Immutable.fromJS({
        123: {
          published: true,
          shortTitle: 'Vegetarian',
          slug: 'vegetarian',
          id: '123',
          default: true,
          recipesInCollection: ['', '', ''],
        },
        234: {
          published: true,
          shortTitle: 'Gluten free',
          slug: 'gluten-free',
          id: '234',
          recipesInCollection: ['', '', ''],
        },
        456: {
          published: false,
          shortTitle: 'Dairy free',
          slug: 'dairy-free',
          id: '456',
          recipesInCollection: ['', '', ''],
        },
      }),
      menu: Immutable.fromJS({
        isCategoriesModalVisible: true
      }),
      basket: Immutable.fromJS({
        numPortions: 2,
        recipes: {},
      }),
    }
    wrapper = shallow(<CategoriesModalContainer />, {
      context: {
        store: {
          getState: () => state,
          dispatch: () => {},
          subscribe: () => {}
        }
      }
    })
    expect(wrapper.find('CategoriesModal').props()).toEqual({
      hideCategoriesModal: expect.any(Function),
      collectionFilterChange: expect.any(Function),
      showCategoriesModal: true,
      categoryButtonClicked: expect.any(Function),
      menuCollections: Immutable.fromJS({
        123: {
          published: true,
          shortTitle: 'Vegetarian',
          slug: 'vegetarian',
          id: '123',
          default: true,
          recipesInCollection: ['', '', ''],
        },
        234: {
          published: true,
          shortTitle: 'Gluten free',
          slug: 'gluten-free',
          id: '234',
          recipesInCollection: ['', '', ''],
        },
      }),
    })
  })
})
