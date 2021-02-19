import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { CategoryScrollTrackerContainer } from './CategoryScrollTrackerContainer'

describe('CategoryCarouselContainer', () => {
  let wrapper

  describe('with categoryId prop', () => {
    test('should pass down correct props', () => {
      const categoryId = '123'
      const state = {
        menuCollections: Immutable.fromJS({
          [categoryId]: {
            id: categoryId,
            published: true,
            shortTitle: 'Vegetarian',
            slug: 'vegetarian',
            default: true,
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
      wrapper = shallow(<CategoryScrollTrackerContainer categoryId={categoryId} />, {
        context: {
          store: {
            getState: () => state,
            dispatch: () => {},
            subscribe: () => {}
          }
        }
      })
      expect(wrapper.find('CategoryScrollTracker').props()).toEqual({
        categoryId: '123',
        categorySlug: 'vegetarian',
        children: null,
        className: null,
        scrollDirection: 'vertical',
        stepSize: 20,
        trackCategoryScroll: expect.any(Function)
      })
    })
  })

  describe('without categoryId prop', () => {
    test('should pass down correct props', () => {
      const categoryId = '123'
      const state = {
        menuCollections: Immutable.fromJS({
          [categoryId]: {
            id: categoryId,
            published: true,
            shortTitle: 'Vegetarian',
            slug: 'vegetarian',
            default: true,
            recipesInCollection: ['101', '102', '103', '104'],
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
        routing: {
          locationBeforeTransitions: {
            query: {
              collection: 'vegetarian',
            }
          }
        }
      }
      wrapper = shallow(<CategoryScrollTrackerContainer />, {
        context: {
          store: {
            getState: () => state,
            dispatch: () => {},
            subscribe: () => {}
          }
        }
      })
      expect(wrapper.find('CategoryScrollTracker').props()).toEqual({
        categoryId: '123',
        categorySlug: 'vegetarian',
        children: null,
        className: null,
        scrollDirection: 'vertical',
        stepSize: 20,
        trackCategoryScroll: expect.any(Function)
      })
    })
  })
})
