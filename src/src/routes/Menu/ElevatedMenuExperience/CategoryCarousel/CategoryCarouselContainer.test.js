import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { CategoryCarouselContainer } from './CategoryCarouselContainer'

describe('CategoryCarouselContainer', () => {
  let wrapper

  test('should pass down correct props', () => {
    const recipeId = '123654'
    const recipe = Immutable.fromJS({
      id: recipeId,
      title: 'Chicken curry',
      isNew: true,
      isFineDineIn: true,
    })
    const state = {
      recipes: Immutable.fromJS({
        [recipeId]: recipe
      }),
      menuCollections: Immutable.fromJS({
        123: {
          published: true,
          shortTitle: 'Vegetarian',
          slug: 'vegetarian',
          id: '123',
          default: true,
          recipesInCollection: [recipeId],
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
    const category = Immutable.fromJS({
      id: '789',
      shortTitle: 'Category',
    })
    wrapper = shallow(<CategoryCarouselContainer category={category} />, {
      context: {
        store: {
          getState: () => state,
          dispatch: () => {},
          subscribe: () => {}
        }
      }
    })
    expect(wrapper.find('CategoryCarousel').props()).toEqual({
      category,
      recipes: [],
    })
  })
})
