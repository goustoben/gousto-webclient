import React from 'react'
import { render, cleanup } from '@testing-library/react'

import * as recipeContext from 'routes/Menu/context/recipeContext'
import { CookingTimeIcon } from '.'

describe('CookingTimeIcon', () => {
  describe('when given null cookingTime', () => {
    beforeAll(() => {
      jest.spyOn(recipeContext, 'useRecipeCookingTime').mockImplementation(() => null)
    })
    afterEach(cleanup)

    test('should return null', () => {
      const { container } = render(<CookingTimeIcon />)
      expect(container).toBeEmptyDOMElement()
    })
  })

  describe('when given zero cooking time', () => {
    beforeAll(() => {
      jest.spyOn(recipeContext, 'useRecipeCookingTime').mockImplementation(() => 0)
    })
    afterEach(cleanup)

    test('should return null', () => {
      const { container } = render(<CookingTimeIcon />)
      expect(container).toBeEmptyDOMElement()
    })
  })

  describe('when given 30 cooking time', () => {
    beforeAll(() => {
      jest.spyOn(recipeContext, 'useRecipeCookingTime').mockImplementation(() => 30)
    })
    afterEach(cleanup)

    test('should find cooking time icon', () => {
      const { container } = render(<CookingTimeIcon />)
      expect(container).not.toBeEmptyDOMElement()
      expect(container).toContainHTML('stroke-dasharray="50, 100"')
    })
  })
})
