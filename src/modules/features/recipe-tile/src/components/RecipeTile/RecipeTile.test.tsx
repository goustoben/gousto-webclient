import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { RecipeTileDependencies } from "../../model/context";
import { RecipeTile } from ".";

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

const onClickAddRecipe = jest.fn();

const defaultProps = {
  recipeId: "some_recipe_one",
  currentCollectionId: "some category ID",
  onClick: onClickAddRecipe,
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
      recipe={{
        id: "111",
        title: "cool test recipe title",
        isFineDineIn: false,
        tagline: "new-eme",
      }}
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
      useRecipeBrand={() => ({
        useRecipeBrandAvailabilityTag: () => ({
          slug: "slug",
          text: "cool tag",
          theme: {
            name: "boom",
            color: "red",
            borderColor: "red",
          },
        }),
        useRecipeBrandTag: () => ({
          slug: "slug",
          text: "NEW",
          theme: {
            name: "boom",
            color: "red",
            borderColor: "red",
          },
        })
      })}
    >
      <RecipeTile {...defaultProps} />
    </RecipeTileDependencies>
  );

describe("RecipeTile", () => {
  global.innerWidth = 1200;

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test("should contain a Title", () => {
    renderComponent();
    expect(screen.getByText(/cool test recipe title/)).toBeInTheDocument();
  });

  describe("when a recipe is in stock", () => {
    test("should return a <div>", () => {
      const { container } = renderComponent();
      expect(container).toContainHTML('data-testing="menuRecipeViewDetails"');
    });

    test("should contain one TileImage component", () => {
      const { container } = renderComponent();
      expect(container).toContainHTML("-TileImage");
    });

    test("should contain one RecipeTag component", () => {
      renderComponent();
      expect(screen.getByText(/cool tag/)).toBeInTheDocument();
    });

    test("should contain one BrandTag component", () => {
      const { container } = renderComponent();

      expect(container).toContainHTML("-BrandTag");
      expect(screen.getByText("NEW")).toBeInTheDocument();
    });

    test("should contain an RecipeTilePurchaseInfo ", () => {
      renderComponent();
      expect(screen.getByText("Add recipe")).toBeInTheDocument();
    });
  });

  describe("when a recipe is not in stock", () => {
    test("should contain TileImage component", () => {
      const { container } = renderComponent({ isRecipeOutOfStock: true });
      expect(container).toContainHTML("-TileImage");
    });

    test("should render out of stock message", () => {
      renderComponent({ isRecipeOutOfStock: true });
      expect(
        screen.getByText(/This recipe is sold out for your delivery date/)
      ).toBeInTheDocument();
    });
    test("should not render Add recipe button", () => {
      renderComponent({ isRecipeOutOfStock: true });
      expect(screen.queryByText("Add recipe")).not.toBeInTheDocument();
    });
  });

  describe("when click on recipe Tile", () => {
    test("should call onClick function which will showDetailRecipe", () => {
      renderComponent();
      const addRecipeButton = screen.getByText("Add recipe");
      fireEvent.click(addRecipeButton);

      expect(onClickAddRecipe).toHaveBeenCalledWith(
        "some_recipe_one",
        "some category ID",
        null
      );
    });
  });
});
