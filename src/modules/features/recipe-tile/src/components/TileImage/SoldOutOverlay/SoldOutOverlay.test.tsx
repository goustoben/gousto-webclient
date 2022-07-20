import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup } from '@testing-library/react'

import { SoldOutOverlay } from '.'
import { RecipeContextProvider, UseStockContextProvider } from '../../../model/context'
import { Recipe } from '@library/api-menu-service'
import { UseBasketContextProvider } from '../../../model/context/useBasket'

const renderComponent = (isRecipeOutOfStock: boolean) =>
  render(
    <RecipeContextProvider value={{ id: 'recipe_one', title: 'Test recipe' } as Recipe}>
      <UseStockContextProvider
        value={() => ({
          isRecipeOutOfStock: () => isRecipeOutOfStock,
        })}
      >
        <UseBasketContextProvider
          value={() => ({
            addRecipe: jest.fn(),
            removeRecipe: jest.fn(),
            canAddRecipes: true,
            isRecipeInBasket: () => false,
            reachedLimit: false,
            numPortions: 2,
          })}
        >
          <SoldOutOverlay />
        </UseBasketContextProvider>
      </UseStockContextProvider>
    </RecipeContextProvider>,
  )

describe('<SoldOutOverlay', () => {
  afterEach(() => cleanup())

  describe('when a recipe is in stock', () => {
    test('the "out of stock" text does not render', () => {
      renderComponent(false)
      expect(screen.queryByText(/sold out/)).not.toBeInTheDocument()
    })
  })

  describe('when recipe is not in stock', () => {
    test('the overlay with "out of stock text renders', () => {
      renderComponent(true)
      expect(screen.queryByText(/sold out/)).toBeInTheDocument()
    })
  })
})
