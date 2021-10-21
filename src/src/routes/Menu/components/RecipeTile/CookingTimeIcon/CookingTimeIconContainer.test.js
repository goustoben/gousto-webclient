import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import { CookingTimeIconContainer } from './CookingTimeIconContainer'

describe('<CookingTimeIconContainer />', () => {
  const recipeId = '123'
  const recipe = Immutable.fromJS({
    id: recipeId,
    title: 'Chicken curry',
    cookingTime: 30,
    cookingTimeFamily: 40,
  })

  describe('when numPortions is 2', () => {
    const mockStore = configureMockStore()
    const store = mockStore({
      recipes: Immutable.fromJS({
        [recipeId]: recipe
      }),
      basket: Immutable.fromJS({
        numPortions: 2,
        recipes: {},
      }),
      menuRecipeStock: Immutable.fromJS({
        [recipeId]: { 2: 1000, 4: 1000 }
      }),
    })

    const wrapper = shallow(
      <CookingTimeIconContainer recipeId={recipeId} store={store} />
    )

    test('should pass down correct props using cookingTime', () => {
      expect(wrapper.find('CookingTimeIcon').prop('cookingTime')).toEqual(30)
    })
  })

  describe('when numPortions is 4', () => {
    const mockStore = configureMockStore()
    const store = mockStore({
      recipes: Immutable.fromJS({
        [recipeId]: recipe
      }),
      basket: Immutable.fromJS({
        numPortions: 4,
        recipes: {},
      }),
      menuRecipeStock: Immutable.fromJS({
        [recipeId]: { 2: 1000, 4: 1000 }
      }),
    })

    const wrapper = shallow(
      <CookingTimeIconContainer recipeId={recipeId} store={store} />,
    )

    test('should pass down correct props using cookingTimeFamily', () => {
      expect(wrapper.find('CookingTimeIcon').prop('cookingTime')).toEqual(40)
    })
  })
})
