import React from 'react'
import ReactDOM from 'react-dom'

import { RecipesInBasketProgress } from '..'

describe('RecipesInBasketProgress Component', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<RecipesInBasketProgress/>, div)
  })
})
