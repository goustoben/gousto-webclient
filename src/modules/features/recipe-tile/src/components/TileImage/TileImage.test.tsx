import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup } from "@testing-library/react";

import { RecipeTileDependencies } from "../../model/context";
import { Image } from "../../model/recipe";
import { TileImage } from "./TileImage";
import Immutable from 'immutable'
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'

const images: Image[] = [
  {
    type: "homepage-image",
    title: "home page image",
    description: "Cool image",
    urls: [
      {
        src: "image-1-x150.jpg",
        width: 150,
      },
    ],
  },
];

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

const createMockStore = () => {
  const state = {
    auth: Immutable.fromJS({
      accessToken: '',
      isAdmin: false,
      id: undefined,
    })
  }

  const mockStore = configureMockStore()

  const store = mockStore(state)

  store.dispatch = jest.fn().mockReturnValue(Promise.resolve())

  return store
}

const renderComponent = ({
  isRecipeOutOfStock = false,
  cookingTime = 0,
}: { isRecipeOutOfStock?: boolean; cookingTime?: number } = {}) =>
  render(
    <Provider store={createMockStore()}>
    <RecipeTileDependencies
      recipe={{
        id: "111",
        title: "test recipe",
        media: { images },
        cookingTime,
      }}
      useGetAlternativeOptionsForRecipe={() =>
        defaultGetAlternativeOptionsForRecipe
      }
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
      useGetSurchargeForRecipeId={() => 0}
      useRecipeBrand={() => ({
        useRecipeBrandAvailabilityTag: () => null,
        useRecipeBrandTag: () => null,
      })}
      useGetRecipeTileLinkData= {() => ({
        isRecipeTileLinkVisible: true,
        dispatchTrackClickMoreRecipeDetails: jest.fn(),
      })}
      useMakeOnCheckRecipe={() => () => () => {}}
    >
      <TileImage categoryId="abcde" />
    </RecipeTileDependencies>
    </Provider>
  );

describe("<TileImage />", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should render one Recipe Image component (LazyWrapper)", () => {
    const { container } = renderComponent();
    expect(container.getElementsByClassName("lazyload-placeholder").length).toBe(1);
  });

  test("should contain one SoldOutOverlay component", () => {
    renderComponent({ isRecipeOutOfStock: true });
    expect(
      screen.getByText(/This recipe is sold out for your delivery date/)
    ).toBeInTheDocument();
  });

  test("should contain one CookingTimeIcon component", () => {
    const { container } = renderComponent({ cookingTime: 47 });
    expect(screen.getByText(/47/)).toBeInTheDocument();
    expect(container).toContainHTML(
      'stroke-dasharray="78.33333333333333, 100"'
    );
  });

  test("should contain one VariantHeader component", () => {
    renderComponent();
    expect(screen.getByText(/2 options available/)).toBeInTheDocument();
  });
});
