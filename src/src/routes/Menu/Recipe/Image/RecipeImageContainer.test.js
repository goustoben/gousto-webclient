import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { RecipeImageContainer } from './RecipeImageContainer'

describe('<RecipeImageContainer />', () => {
  const recipeId = '123'
  const moodImageUrls = Immutable.fromJS([ { src: 'foo', width: 50 }, { src: 'bar', width: 100 } ])

  const recipe = Immutable.fromJS({
    id: recipeId,
    media: {
      images: [
        { type: 'mood-image', urls: moodImageUrls }
      ]
    }
  })

  const state = {
    request: Immutable.fromJS({
      browser: 'desktop'
    }),
    recipes: Immutable.fromJS({
      [recipeId]: recipe
    }),
    basket: Immutable.fromJS({
      numPortions: 2,
      recipes: {},
    }),
    menuRecipeStock: Immutable.fromJS({
      [recipeId]: { 2: 1000, 4: 1000 }
    })
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

  const view = 'grid'
  const mouseEnter = jest.fn()
  const mouseLeave = jest.fn()

  const wrapper = shallow(
    <RecipeImageContainer recipeId={recipeId} view={view} mouseEnter={mouseEnter} mouseLeave={mouseLeave} />,
    wrapperOptions
  )

  test('should pass down correct props', () => {
    expect(wrapper.prop('view')).toEqual(view)
    expect(wrapper.prop('mouseEnter')).toEqual(mouseEnter)
    expect(wrapper.prop('mouseLeave')).toEqual(mouseLeave)
    expect(wrapper.prop('media')).toEqual(moodImageUrls)
    expect(wrapper.prop('isOutOfStock')).toEqual(false)
  })
})
