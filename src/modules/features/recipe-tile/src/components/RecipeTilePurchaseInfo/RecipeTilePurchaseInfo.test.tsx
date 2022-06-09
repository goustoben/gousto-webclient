import React from 'react'
import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup } from "@testing-library/react";

import { RecipeTilePurchaseInfo } from '.'
import { RecipeTileDependencies } from '../../model/context';

const defaultGetAlternativeOptionsForRecipe = jest
  .fn()
  .mockImplementation(() => [
    {
      recipeId: "111",
      recipeName: "Test Recipe One",
      changeCheckedRecipe: jest.fn(),
      isChecked: true,
      isOnDetailScreen: false,
      isOutOfStock: false,
    },
    {
      recipeId: "222",
      recipeName: "Test Recipe Two",
      changeCheckedRecipe: jest.fn(),
      isChecked: false,
      isOnDetailScreen: false,
      isOutOfStock: false,
    },
  ]);

const defaultProps = {
  hasAlternativeOptions: false,
  categoryId: "some category ID",
  originalId: "some Original ID",
  fdiStyling: false,
};

const renderComponent = ({
  isRecipeOutOfStock = false,
  surcharge = 0,
  getAlternativeOptionsForRecipe = defaultGetAlternativeOptionsForRecipe,
}: {
  isRecipeOutOfStock?: boolean;
  surcharge?: number;
  getAlternativeOptionsForRecipe?: typeof defaultGetAlternativeOptionsForRecipe;
} = {}) =>
  render(
    <RecipeTileDependencies
      recipe={{ id: "111", title: "test recipe" }}
      useGetAlternativeOptionsForRecipe={() => getAlternativeOptionsForRecipe}
      useStock={() => ({
        isRecipeOutOfStock: () => isRecipeOutOfStock,
      })}
      useBasket={() => ({
        canAddRecipes: true,
        addRecipe: jest.fn(),
        removeRecipe: jest.fn(),
        reachedLimit: true,
        isRecipeInBasket: () => false,
      })}
      useSetBrowserCTAVisibility={() => ({
        setBrowserCTAVisible: () => false,
      })}
      useTracking={() => ({
        useTrackVariantListDisplay: () => false,
        useTrackingSwapAlternativeOptions: () => ({
          trackRecipeAlternativeOptionsMenuOpen: () => false,
          trackRecipeAlternativeOptionsMenuSwapRecipes: () => false,
        }),
      })}
      useGetSurchargeForRecipeId={() => surcharge}
    >
      <RecipeTilePurchaseInfo {...defaultProps} />
    </RecipeTileDependencies>
  );

describe('RecipeTilePurchaseInfo', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  describe('when the recipe is out of stock', () => {
    test('should return null', () => {
      renderComponent({ isRecipeOutOfStock: true })
      expect(screen.queryByRole('button')).toBeNull()
    })
  })

  describe('When the recipe has a surcharge', () => {
    test('then it should render surcharge info', () => {
      renderComponent({ surcharge: 0.75 })
      expect(screen.getByText(/\+£\s*0\.75/)).toBeInTheDocument()
      expect(screen.getByText(/serving/)).toBeInTheDocument()
    })

    describe('when the surcharge prop is more than two decimal places', () => {
      test('should render the surcharge per portion to the nearest 1p', () => {
        renderComponent({ surcharge: 1.992342 })
        expect(screen.getByText(/\+£\s*1\.99/)).toBeInTheDocument()
      })
      test('should add 2 zeros for a whole number', () => {
        renderComponent({ surcharge: 2 })
        expect(screen.getByText(/\+£\s*2\.00/)).toBeInTheDocument()
      })
    })
    describe('when the surcharge provided is zero', () => {
      test('should render nothing', () => {
        renderComponent({ surcharge: 0 })
        expect(screen.queryByText(/\+£/)).not.toBeInTheDocument()
        expect(screen.queryByText(/serving/)).not.toBeInTheDocument()
      })
    })
    describe('when the recipe is out of stock', () => {
      test('should render nothing', () => {
        renderComponent({ isRecipeOutOfStock: true, surcharge: 2 })
        expect(screen.queryByRole('button')).toBeNull()
      })
    })
  })

  describe('when recipe is in stock', () => {
    test('should render AddRecipeButton', () => {
      renderComponent()
      expect(screen.queryByText(/Add recipe/i)).toBeInTheDocument()
    })
  })

  describe('when there is no Alternative options for a recipe', () => {
    test('should not render buttons for swapping alternative options', () => {
      renderComponent({ getAlternativeOptionsForRecipe: jest.fn().mockImplementation(() => []) })
      expect(screen.queryAllByRole('button').length).toBe(1)
    })
  })

  describe('when there are Alternative options for recipe', () => {
    describe('when it is not mobile browser', () => {
      test('should render Desktop specific component for swapping alternative options', () => {
        renderComponent()
        expect(screen.queryAllByRole('button').length).toBe(2)
      })
    })
  })
})
