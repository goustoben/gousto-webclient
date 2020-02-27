import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { SimplifiedRecipeListContainer } from './SimplifiedRecipeListContainer'
import { getSortedRecipes } from '../../selectors/sorting'

jest.mock('../../selectors/sorting', () => ({
  getSortedRecipes: jest.fn()
}))

jest.mock('actions/menu', () => ({
  showDetailRecipe: jest.fn()
}))

jest.mock('actions/tracking', () => ({
  trackRecipeOrderDisplayed: jest.fn()
}))

describe('SimplifiedRecipeListContainer', () => {
  let wrapper
  beforeEach(() => {
    getSortedRecipes.mockReturnValue(() => ({
      recipes: Immutable.fromJS([
        { id: '3', availability: [], title: 'recipe1', isRecommended: false },
        { id: '1', availability: [], title: 'recipe2', isRecommended: false },
        {
          id: '2',
          availability: [],
          title: 'recipe3',
          boxType: 'vegetarian',
          dietType: 'Vegetarian',
          isRecommended: false,
        },
      ]),
      recipeIds: Immutable.fromJS(['1', '2', '3'])
    }))
    wrapper = shallow(<SimplifiedRecipeListContainer />, {
      context: {
        store: {
          getState: () => ({
            filters: Immutable.fromJS({
              currentCollectionId: 'collection-id'
            })
          }),
          dispatch: () => {},
          subscribe: () => {}
        }
      }
    })
  })
  test('should render SimplifiedRecipeList component', () => {
    expect(wrapper.find('SimplifiedRecipeList')).toHaveLength(1)
  })

  test('should send right recipeIds to SimplifiedRecipeList component', () => {
    expect(wrapper.find('SimplifiedRecipeList').prop('recipeIds')).toEqual(Immutable.fromJS(['1', '2', '3'])
    )
  })

  test('should send right recipes to SimplifiedRecipeList component', () => {
    expect(wrapper.find('SimplifiedRecipeList').prop('recipes')).toEqual(
      Immutable.fromJS([
        { id: '3', availability: [], title: 'recipe1', isRecommended: false },
        { id: '1', availability: [], title: 'recipe2', isRecommended: false },
        {
          id: '2',
          availability: [],
          title: 'recipe3',
          boxType: 'vegetarian',
          dietType: 'Vegetarian',
          isRecommended: false,
        },
      ])
    )
  })
})
