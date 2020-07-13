import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { TileImageContainer } from './TileImageContainer'

describe('<TileImageContainer />', () => {
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

  const wrapper = shallow(
    <TileImageContainer recipeId={recipeId} />,
    wrapperOptions
  )

  test('should pass down correct props', () => {
    expect(wrapper.prop('media')).toEqual(moodImageUrls)
    expect(wrapper.prop('isOutOfStock')).toEqual(false)
  })
})
