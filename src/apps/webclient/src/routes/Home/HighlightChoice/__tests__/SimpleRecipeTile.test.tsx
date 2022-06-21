import React from 'react'

import { render, screen } from '@testing-library/react'

import { SimpleRecipeTile } from '../SimpleRecipeTile'
import { RecipeType } from '../enums'
import { RECIPE_DATA } from '../recipeData'
import { RecipeData } from '../types'

// [case name, imageUrl, name, type]
const recipeTestData = RECIPE_DATA.map((recipeData) => [
  `Recipe tile for "${recipeData.name}-${recipeData.type || 'regular'}" should be rendered`,
  recipeData,
])

describe('Given: <SimpleRecipeTile /> from <HighlightChoice />', () => {
  describe('When: user sees component', () => {
    test.each(recipeTestData)('%s', (caseName, recipeData) => {
      const propsTmp: unknown = recipeData
      const props = propsTmp as RecipeData

      render(<SimpleRecipeTile {...props} />)
      expect(screen.getByRole('img', { name: props.name })).toBeDefined()

      if (props.type === RecipeType.Vegan || props.type === RecipeType.Vegetarian) {
        expect(screen.getByTestId(props.type)).toBeDefined()
      }
    })
  })
})
