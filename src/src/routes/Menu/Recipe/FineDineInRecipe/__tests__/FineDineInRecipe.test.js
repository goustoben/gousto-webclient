import React from 'react'
import ReactDOM from 'react-dom'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { FineDineInRecipe } from 'routes/Menu/Recipe/FineDineInRecipe'

describe('<FineDineInRecipe />', () => {
  const FINE_DINE_IN_RECIPE = (
    <FineDineInRecipe
      id="id"
      cookingTime={1}
      features={Immutable.Map({})}
      useWithin="3 days"
      title="title"
    />
  )

  beforeEach(() => {
    shallow(FINE_DINE_IN_RECIPE)
  })

  test('Render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(FINE_DINE_IN_RECIPE, div)
  })
})
