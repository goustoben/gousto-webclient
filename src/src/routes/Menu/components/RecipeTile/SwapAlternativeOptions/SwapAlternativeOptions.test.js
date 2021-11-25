import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import * as Menu from 'routes/Menu/domains/menu'
import { SwapAlternativeOptions } from '.'

const getAlternativeOptionsForRecipe = jest.fn().mockImplementation(() => ([{
  recipeId: '111',
  recipeName: 'Test Recipe One',
  changeCheckedRecipe: () => {},
  isChecked: true,
  isOnDetailScreen: false,
  isOutOfStock: false,
  allergenInfo: {
    containsGlutenOrDairy: false,
  },
},{
  recipeId: '222',
  recipeName: 'Test Recipe Two',
  changeCheckedRecipe: () => {},
  isChecked: false,
  isOnDetailScreen: false,
  isOutOfStock: false,
  allergenInfo: {
    containsGlutenOrDairy: false,
  },
}]))

jest.spyOn(Menu, 'useMenu')
  .mockImplementation(() => ({ getAlternativeOptionsForRecipe }))

describe('<swapAlternativeOptions />', () => {
  afterEach(cleanup)

  describe('when rendered initially', () => {
    const renderOptions = () => render(<SwapAlternativeOptions recipeId="123" originalId="321" categoryId="111" />)

    test('should show only button', () => {
      renderOptions()
      const button = screen.getByRole('button')
      expect(button).toBeTruthy()
    })

    test('should not show expanded dropdown', () => {
      renderOptions()
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })

    test('should show chevron icon pointing downwards', () => {
      renderOptions()
      const button = screen.getByRole('button')
      expect(button).toContainHTML('<span class="arrowDown" />')
    })
  })

  describe('when clicked on', () => {
    const renderExtendedDropdown = () => {
      const renderedResults = render(<SwapAlternativeOptions recipeId="123" originalId="321" categoryId="111" />)
      fireEvent.click(screen.getByRole('button'))

      return renderedResults
    }

    test('should show expanded dropdown', () => {
      renderExtendedDropdown()
      expect(screen.queryByRole('list')).toBeInTheDocument()
    })

    test('should show chevron pointing upwards', () => {
      renderExtendedDropdown()
      const [button] = screen.getAllByRole('button')
      expect(button).toContainHTML('<span class="arrowUp" />')
    })

    test('should the list in the dropdown should have show all options', () => {
      renderExtendedDropdown()
      const items = screen.getAllByRole('listitem')
      expect(items.length).toEqual(2)
      expect(items[0]).toHaveTextContent(/Test Recipe One/)
      expect(items[1]).toHaveTextContent(/Test Recipe Two/)
    })
  })

  describe('when clicking on up chevron for opened dropdown', () => {
    test('should close the dropdown', () => {
      render(<SwapAlternativeOptions recipeId="123" originalId="321" categoryId="111" />)
      fireEvent.click(screen.getByRole('button'))
      expect(screen.queryByRole('list')).toBeInTheDocument()
      fireEvent.click(screen.getAllByRole('button')[0])
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })
  })
})
