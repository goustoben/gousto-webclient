import React from 'react'

import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import Modal from 'react-modal'
import { Provider } from 'react-redux'

import { createMockStore } from 'routes/Menu/_testing/createMockStore'
import * as Menu from 'routes/Menu/domains/menu'

import * as RecipeAlternativeOptionsTracker from '../../RecipeAlternativeOptions/RecipeAlternativeOptions/useTracking'
import { SwapAlternativeOptionsMobile } from './SwapAlternativeOptionsMobile'
import * as Tracker from './useTracking'

Modal.setAppElement(document.body)

const getOptionsForRecipe = jest.fn().mockImplementation(() => [
  {
    recipeId: '111',
    recipeName: 'Test Recipe One',
    changeCheckedRecipe: () => {},
    isChecked: true,
    isOnDetailScreen: false,
    isOutOfStock: false,
  },
  {
    recipeId: '222',
    recipeName: 'Test Recipe Two',
    changeCheckedRecipe: () => {},
    isChecked: false,
    isOnDetailScreen: false,
    isOutOfStock: false,
  },
])

describe('<SwapAlternativeOptionsMobile />', () => {
  let trackRecipeAlternativeOptionsMenuOpen
  let trackRecipeAlternativeOptionsMenuSwapRecipes

  const store = createMockStore({})
  const renderForTest = (categoryId = '111') =>
    render(
      <Provider store={store}>
        <SwapAlternativeOptionsMobile recipeId="123" originalId="321" categoryId={categoryId} />
      </Provider>,
    )

  beforeEach(() => {
    jest.spyOn(Menu, 'useMenu').mockImplementation(() => ({ getOptionsForRecipe }))

    trackRecipeAlternativeOptionsMenuOpen = jest.fn()
    trackRecipeAlternativeOptionsMenuSwapRecipes = jest.fn()

    jest.spyOn(Tracker, 'useTracking').mockImplementation(() => ({
      trackRecipeAlternativeOptionsMenuOpen,
      trackRecipeAlternativeOptionsMenuSwapRecipes,
    }))

    jest.spyOn(RecipeAlternativeOptionsTracker, 'useTrackVariantListDisplay').mockImplementation()
  })

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  describe('when rendered initially', () => {
    test('should show only button', () => {
      renderForTest()
      const button = screen.getByRole('button')
      expect(button).toBeTruthy()
    })

    test('should not show expanded dropdown', () => {
      renderForTest()
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })

    test('should show chevron icon pointing downwards', () => {
      renderForTest()
      const button = screen.getByRole('button')
      expect(button).toContainHTML('<span class="arrowDown" />')
    })

    test('should not fire any tracking events', () => {
      renderForTest()
      expect(trackRecipeAlternativeOptionsMenuOpen).not.toHaveBeenCalled()
      expect(trackRecipeAlternativeOptionsMenuSwapRecipes).not.toHaveBeenCalled()
    })
  })

  describe('when clicked on', () => {
    const renderExtendedDropdown = () => {
      const renderedResults = renderForTest()

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
      renderForTest()
      fireEvent.click(screen.getByRole('button'))
      expect(screen.queryByRole('list')).toBeInTheDocument()
      fireEvent.click(screen.getAllByRole('button')[0])
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })
  })

  describe('when clicking on item from drop down', () => {
    test('should trigger recipe alternative options recipe swap event', () => {
      renderForTest('cat111')
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
