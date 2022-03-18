import { render } from '@testing-library/react'
import React from 'react'

import { RecipeTile } from '../index'

test('Recipe tile exists', () => {
  const { getByTestId } = render(
    <RecipeTile bool />
  )

  expect(getByTestId(/recipe-tile/i).textContent).toBe('Recipe tile ()')
})
