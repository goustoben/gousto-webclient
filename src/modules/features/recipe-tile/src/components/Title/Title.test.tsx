import React from 'react'

import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Recipe } from '@library/api-menu-service'

import { RecipeContextProvider } from '../../model/context'

import { Title } from './Title'

const recipe: Recipe = {
  id: 'recipe-id-1',
  title: 'Lemony Chicken Milanese With Spaghetti and Tomato Sauce',
}

describe('Title', () => {
  test('should render title correctly', () => {
    const { container } = render(
      <RecipeContextProvider value={recipe}>
        <Title />
      </RecipeContextProvider>,
    )

    expect(container).toHaveTextContent(recipe.title)
  })
})
