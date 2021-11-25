import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'

import { RecipeTileContainer } from './RecipeTileContainer'

describe('<RecipeTileContainer />', () => {
  const recipeId = '123'
  const fineDineInTag = {
    slug: 'fine-dine-in-eme',
    text: 'Fine Dine In',
    type: 'general',
    themes: [{
      name: 'light',
      color: '#01A92B',
      borderColor: '#01A92B'
    }]
  }
  const expectedTagline = {
    slug: 'fine-dine-in-eme',
    text: 'Fine Dine In',
    type: 'general',
    theme: {
      name: 'light',
      color: '#01A92B',
      borderColor: '#01A92B'
    },
    themes: undefined,
  }

  const availabilityTag = {
    slug: 'new-eme',
    text: 'new',
    type: 'general',
    themes: [{
      name: 'light',
      color: '#01A92B',
      borderColor: '#01A92B'
    }]
  }
  const expectedAvailability = {
    slug: 'new-eme',
    text: 'new',
    type: 'general',
    theme: {
      name: 'light',
      color: '#01A92B',
      borderColor: '#01A92B'
    },
    themes: undefined,
  }

  const recipe = Immutable.fromJS({
    id: recipeId,
    title: 'Chicken curry',
    isNew: true,
    isFineDineIn: true,
    tagline: 'fine-dine-in-eme',
    availability: 'new-eme',
    promotions: Immutable.List([])
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
    menu: Immutable.Map({
      menuVariants: Immutable.fromJS({
        321: {

        }
      }),
    }),
    brand: {
      data: {
        tags: [
          fineDineInTag,
          availabilityTag
        ]
      }
    },
    request: Immutable.fromJS({
      browser: 'desktop'
    })
  }

  let wrapper

  beforeEach(() => {
    const mockStore = configureMockStore()
    const store = mockStore(state)

    wrapper = shallow(
      <RecipeTileContainer recipeId={recipeId} store={store} />,
    )
  })

  test('should pass down correct props', () => {
    expect(wrapper.find('RecipeTile').prop('recipe')).toEqual(recipe)
    expect(wrapper.find('RecipeTile').prop('isOutOfStock')).toEqual(false)
    expect(wrapper.find('RecipeTile').prop('title')).toEqual('Chicken curry')
    expect(wrapper.find('RecipeTile').prop('showDetailRecipe')).toEqual(expect.any(Function))
    expect(wrapper.find('RecipeTile').prop('isFineDineIn')).toEqual(true)
    expect(wrapper.find('RecipeTile').prop('brandTagline')).toEqual(expectedTagline)
    expect(wrapper.find('RecipeTile').prop('brandAvailability')).toEqual(expectedAvailability)
    expect(wrapper.find('RecipeTile').prop('browserType')).toEqual('desktop')
  })
})
