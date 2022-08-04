import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { RecipeTileDependencies } from "../../model/context";
import { RecipeTile } from ".";
import Immutable from 'immutable'
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'

const createMockStore = (userId: string | undefined = undefined) => {
  const state = {
    auth: Immutable.fromJS({
      accessToken: '',
      isAdmin: false,
      id: userId,
    })
  }

  const mockStore = configureMockStore()

  const store = mockStore(state)

  store.dispatch = jest.fn().mockReturnValue(Promise.resolve())

  return store
}

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
  originalId: "some_recipe_one",
  currentCollectionId: "some category ID",
  onClick: onClickAddRecipe,
};

const renderComponent = ({
  isRecipeOutOfStock = false,
  surcharge = 0,
  getAlternativeOptionsForRecipe = defaultGetAlternativeOptionsForRecipe,
  userId,
}: {
  isRecipeOutOfStock?: boolean;
  surcharge?: number;
  getAlternativeOptionsForRecipe?: typeof defaultGetAlternativeOptionsForRecipe;
  userId?: string
} = {}) =>
  render(
    <Provider store={createMockStore(userId)}>
      <RecipeTileDependencies
        recipe={{
          id: "some_recipe_one",
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
          track: () => {},
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
          }),
        })}
        useGetRecipeTileLinkData={() => ({
          isRecipeTileLinkVisible: true,
          dispatchTrackClickMoreRecipeDetails: jest.fn(),
        })}
        useMakeOnCheckRecipe={() => () => () => {}}
      >
        <RecipeTile {...defaultProps} />
      </RecipeTileDependencies>
    </Provider>
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

    test("should contain Like and Dislike buttons if authUserId is present", () => {
      renderComponent({ userId: 'user-is-logged-in'});
      const likeButton = screen.queryByRole('button', { name: 'thumb-up'});
      const dislikeButton = screen.queryByRole('button', { name: 'thumb-down'});
      expect(likeButton).toBeInTheDocument();
      expect(dislikeButton).toBeInTheDocument();
    });

    test("should not contain Like and Dislike buttons if authUserId is not present", () => {
      renderComponent();
      const likeButton = screen.queryByRole('button', { name: 'thumb-up'});
      const dislikeButton = screen.queryByRole('button', { name: 'thumb-down'});
      expect(likeButton).not.toBeInTheDocument();
      expect(dislikeButton).not.toBeInTheDocument();
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
