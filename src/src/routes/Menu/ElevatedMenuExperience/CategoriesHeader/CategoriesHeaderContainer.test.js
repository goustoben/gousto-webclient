import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { CategoriesHeaderContainer } from './CategoriesHeaderContainer'

describe('CategoriesHeaderContainer', () => {
  let wrapper

  test('should pass down correct props', () => {
    const state = {
      basket: Immutable.fromJS({
        numPortions: 2,
        recipes: Immutable.Map({
          345: 1,
          567: 3,
        })
      }),
      menuCollections: Immutable.fromJS({
        123: {
          id: '123',
          slug: 'vegetarian',
          shortTitle: 'Vegetarian',
          default: true,
          published: true,
          recipesInCollection: Immutable.List(['345', '567', '222', '555']) },
      }),
      menuRecipeStock: Immutable.fromJS({
        345: { 2: 30, 4: 10 },
        567: { 2: 30, 4: 10 },
        222: { 2: 30, 4: 10 },
        555: { 2: 30, 4: 10 },
      }),

    }
    wrapper = shallow(<CategoriesHeaderContainer />, {
      context: {
        store: {
          getState: () => state,
          dispatch: () => {},
          subscribe: () => {}
        }
      }
    })
    expect(wrapper.find('CategoriesHeader').prop('categoryTitle')).toEqual('Vegetarian')
  })
})
