import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import * as Menu from 'routes/Menu/domains/menu'
import * as RecipeAlternativeOptionsTracker from 'routes/Menu/Recipe/VariantRecipeList/RecipeAlternativeOptions/useTracking'
import * as Tracker from './useTracking'
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

describe('<swapAlternativeOptions />', () => {
  let trackRecipeAlternativeOptionsMenuOpen
  let trackRecipeAlternativeOptionsMenuSwapRecipes

  beforeEach(() => {
    jest.spyOn(Menu, 'useMenu')
      .mockImplementation(() => ({ getAlternativeOptionsForRecipe }))

    trackRecipeAlternativeOptionsMenuOpen = jest.fn()
    trackRecipeAlternativeOptionsMenuSwapRecipes = jest.fn()

    jest.spyOn(Tracker, 'useTracking')
      .mockImplementation(() => ({
        trackRecipeAlternativeOptionsMenuOpen,
        trackRecipeAlternativeOptionsMenuSwapRecipes,
      }))

    jest.spyOn(RecipeAlternativeOptionsTracker, 'useTrackVariantListDisplay')
      .mockImplementation()
  })

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

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

    test('should not fire any tracking events', () => {
      renderOptions()
      expect(trackRecipeAlternativeOptionsMenuOpen).not.toHaveBeenCalled()
      expect(trackRecipeAlternativeOptionsMenuSwapRecipes).not.toHaveBeenCalled()
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

    test('should fire only open recipe alternative options menu tracking events', () => {
      renderExtendedDropdown()
      expect(trackRecipeAlternativeOptionsMenuOpen).toHaveBeenCalledWith({
        recipeId: '123',
        collectionId: '111',
      })
      expect(trackRecipeAlternativeOptionsMenuSwapRecipes).not.toHaveBeenCalled()
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

  describe('when clicking on item from drop down', () => {
    test('should trigger recipe alternative options recipe swap event', () => {
      render(<SwapAlternativeOptions recipeId="123" originalId="321" categoryId="cat111" />)
      // Open dropdown
      fireEvent.click(screen.getByRole('button'))
      expect(trackRecipeAlternativeOptionsMenuSwapRecipes).not.toHaveBeenCalled()

      // Pick second item on the list
      fireEvent.click(screen.getAllByRole('radio')[1])
      expect(trackRecipeAlternativeOptionsMenuSwapRecipes).toHaveBeenCalledWith({
        collectionId: 'cat111',
        nextRecipeId: '222',
        previousRecipeId: '123',
      })
    })
  })
})
