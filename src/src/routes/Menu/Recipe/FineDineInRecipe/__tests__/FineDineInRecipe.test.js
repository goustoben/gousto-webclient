import React from 'react'
import ReactDOM from 'react-dom'

import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { Provider } from 'react-redux'

import { FineDineInRecipe } from 'routes/Menu/Recipe/FineDineInRecipe'

describe('<FineDineInRecipe />', () => {
  const FINE_DINE_IN_RECIPE = (
    <FineDineInRecipe
      id="recipe-id"
      cookingTime={1}
      features={Immutable.Map({})}
      useWithin="3 days"
      title="title"
    />
  )
  const FINE_DINE_IN_RECIPE_WITH_STORE = (
    <Provider store={{getState: () => ({
      basket: Immutable.Map(),
      recipes: Immutable.fromJS({
        'recipe-id': {
          title: 'Foo'
        }
      }),
      auth: Immutable.Map(),
      menu: Immutable.Map({
        menuVariants: Immutable.Map()
      })
    }),
    dispatch: () => {},
    subscribe: () => {},
    }}
    >
      {FINE_DINE_IN_RECIPE}
    </Provider>
  )

  beforeEach(() => {
    shallow(FINE_DINE_IN_RECIPE)
  })

  test('Render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(FINE_DINE_IN_RECIPE_WITH_STORE, div)
  })
})
