import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { EMERecipeTileContainer } from './EMERecipeTileContainer'

describe('<EMERecipeTileContainer />', () => {
  const recipeId = '123'

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
    basket: Immutable.fromJS({
      numPortions: 2,
      recipes: {},
    }),
    menuRecipeStock: Immutable.fromJS({
      [recipeId]: { 2: 1000, 4: 1000 }
    }),
    menuCollections: Immutable.fromJS({
      a12345: {}
    }),
    menu: Immutable.fromJS({
      menuVariants: {
        321: {

        }
      }
    }),
  }

  const wrapperOptions = {
    context: {
      store: {
        getState: () => state,
        dispatch: () => {},
        subscribe: () => {},
      }
    }
  }

  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <EMERecipeTileContainer recipeId={recipeId} />,
      wrapperOptions
    )
  })

  test('should pass down correct props', () => {
    expect(wrapper.prop('recipe')).toEqual(recipe)
    expect(wrapper.prop('isOutOfStock')).toEqual(false)
    expect(wrapper.prop('title')).toEqual('Chicken curry')
    expect(wrapper.prop('showDetailRecipe')).toEqual(expect.any(Function))
    expect(wrapper.prop('isFineDineIn')).toEqual(true)
    expect(wrapper.prop('isInCarousel')).toEqual(false)
  })

  describe('when in carousel', () => {
    beforeEach(() => {
      wrapper = shallow(
        <EMERecipeTileContainer recipeId={recipeId} isInCarousel />,
        wrapperOptions
      )
    })

    test('should pass down correct props', () => {
      expect(wrapper.prop('isInCarousel')).toEqual(true)
    })
  })
})
