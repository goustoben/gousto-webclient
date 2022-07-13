import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { LikeDislikeButtons } from "./LikeDislikeButtons";
import  { isLikeDislikeFeatureEnabled } from './isLikeDislikeFeatureEnabled'
import { RecipeContextProvider } from "../../model/context";
import { UseTrackingContextProvider } from "../../model/context/useTracking";
import { Recipe } from "@library/api-menu-service";

jest.mock('./isLikeDislikeFeatureEnabled');

const renderComponent = () =>
  render(
    <RecipeContextProvider value={{ id: 'some_id', title: 'Test recipe title' } as Recipe}>
      <UseTrackingContextProvider
        value={() => ({
          useTrackVariantListDisplay: () => {},
          useTrackingSwapAlternativeOptions: jest.fn(),
          track: () => {},
        })}
      >
        <LikeDislikeButtons />
      </UseTrackingContextProvider>
    </RecipeContextProvider>,
  )

describe("LikeDislikeButtons", () => {
  beforeEach(() => {
    (isLikeDislikeFeatureEnabled as jest.Mock).mockReturnValue(true);
  })

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe("when it initially renders", () => {
    test("like icon should be unfilled", () => {
      renderComponent();
      expect(screen.getByLabelText('thumb-up-unfilled')).toBeInTheDocument()
    });

    test("dislike icon should be unfilled", () => {
      renderComponent();
      expect(screen.getByLabelText('thumb-down-unfilled')).toBeInTheDocument()
    });
  });

  describe("when unfilled icon is clicked", () => {
    test("unfilled like icon should become filled", () => {
      const { getByLabelText } = renderComponent();
      fireEvent.click(screen.getByLabelText('thumb-up-unfilled'))
      expect(getByLabelText('thumb-up-filled')).toBeInTheDocument()
    });
    test("unfilled dislike icon should become filled", () => {
      const { getByLabelText } = renderComponent();
      fireEvent.click(screen.getByLabelText('thumb-down-unfilled'))
      expect(getByLabelText('thumb-down-filled')).toBeInTheDocument()
    });
  });

  describe("when unfilled icon is clicked twice", () => {
    test("like icon should be unfilled", () => {
      const { getByLabelText } = renderComponent();
      fireEvent.click(screen.getByLabelText('thumb-up-unfilled'))
      fireEvent.click(screen.getByLabelText('thumb-up-filled'))
      expect(getByLabelText('thumb-up-unfilled')).toBeInTheDocument()
      expect(getByLabelText('thumb-down-unfilled')).toBeInTheDocument()
    });

    test("dislike icon should be unfilled", () => {
      const { getByLabelText } = renderComponent();
      fireEvent.click(screen.getByLabelText('thumb-down-unfilled'))
      fireEvent.click(screen.getByLabelText('thumb-down-filled'))
      expect(getByLabelText('thumb-up-unfilled')).toBeInTheDocument()
      expect(getByLabelText('thumb-down-unfilled')).toBeInTheDocument()
    });

  });

  describe("when like is clicked, then dislike is clicked", () => {
    test("like should be unfilled and dislike filled", () => {
      const { getByLabelText } = renderComponent();
      fireEvent.click(screen.getByLabelText('thumb-up-unfilled'))
      fireEvent.click(screen.getByLabelText('thumb-down-unfilled'))
      expect(getByLabelText('thumb-up-unfilled')).toBeInTheDocument()
      expect(getByLabelText('thumb-down-filled')).toBeInTheDocument()
    });
  });
});
