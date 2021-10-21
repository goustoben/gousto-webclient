import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'

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

  const mockStore = configureMockStore()
  const store = mockStore(state)

  const mouseEnter = jest.fn()
  const mouseLeave = jest.fn()
  const wrapper = shallow(
    <TileImageContainer recipeId={recipeId} mouseEnter={mouseEnter} mouseLeave={mouseLeave} store={store} />,
  )

  test('should pass down correct props', () => {
    expect(wrapper.find('TileImage').prop('isOutOfStock')).toEqual(false)
    expect(wrapper.find('TileImage').prop('mouseEnter')).toEqual(mouseEnter)
    expect(wrapper.find('TileImage').prop('mouseLeave')).toEqual(mouseLeave)
  })
})
