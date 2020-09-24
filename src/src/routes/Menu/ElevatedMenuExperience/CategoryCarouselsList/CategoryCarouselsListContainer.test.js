import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { CategoryCarouselsListContainer } from './CategoryCarouselsListContainer'

describe('CategoryCarouselsListContainer', () => {
  let wrapper

  test('should pass down correct props', () => {
    const recipeId = '123654'
    const recipe = Immutable.fromJS({
      id: recipeId,
      title: 'Chicken curry',
      isNew: true,
      isFineDineIn: true,
    })
    const collection = {
      published: true,
      shortTitle: 'Vegetarian',
      slug: 'vegetarian',
      id: '123',
      default: true,
      recipesInCollection: [recipeId],
      isFeaturedCategory: true,
      featuredCategoryOrder: 0,
    }
    const state = {
      recipes: Immutable.fromJS({
        [recipeId]: recipe
      }),
      menuCollections: Immutable.fromJS({
        123: collection,
        234: {
          published: true,
          shortTitle: 'Gluten free',
          slug: 'gluten-free',
          id: '234',
          recipesInCollection: ['', '', ''],
          isFeaturedCategory: false,
        },
        456: {
          published: false,
          shortTitle: 'Dairy free',
          slug: 'dairy-free',
          id: '456',
          recipesInCollection: ['', '', ''],
          isFeaturedCategory: false,
        },
      }),
      menu: Immutable.fromJS({
        menuVariants: {
          321: {}
        }
      }),
      menuRecipes: ['123', '234'],
      basket: Immutable.fromJS({
        numPortions: 2,
        recipes: {},
      }),
    }

    wrapper = shallow(<CategoryCarouselsListContainer />, {
      context: {
        store: {
          getState: () => state,
          dispatch: () => {},
          subscribe: () => {}
        }
      }
    })
    expect(wrapper.find('CategoryCarouselsList').props()).toEqual({
      categories: Immutable.OrderedMap({
        123: Immutable.fromJS(collection),
      }),
    })
  })
})
