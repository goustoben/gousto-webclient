import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { RecipeTileTitleContainer } from './RecipeTileTitleContainer'

describe('<RecipeTileTitleContainer />', () => {
  const recipeId = '123'
  const title = 'Francesinha with fries'

  const recipe = Immutable.fromJS({
    id: recipeId,
    title
  })

  const state = {
    recipes: Immutable.fromJS({
      [recipeId]: recipe
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
    <RecipeTileTitleContainer recipeId={recipeId} />,
    wrapperOptions
  )

  test('should pass down correct props', () => {
    expect(wrapper.prop('title')).toEqual(title)
  })
})
