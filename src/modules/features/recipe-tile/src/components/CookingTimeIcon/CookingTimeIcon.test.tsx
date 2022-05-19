import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useRecipeCookingTime } from "../../model/recipe";
import { CookingTimeIcon } from "./CookingTimeIcon";

jest.mock("../../model/recipe");

const useRecipeCookingTimeMock = useRecipeCookingTime as jest.MockedFunction<
  typeof useRecipeCookingTime
>;

describe("CookingTimeIcon", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe("when given null cookingTime", () => {
    beforeEach(() => {
      useRecipeCookingTimeMock.mockImplementation(() => null);
    });

    test("should return null", () => {
      const { container } = render(<CookingTimeIcon />);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("when given zero cooking time", () => {
    beforeEach(() => {
      useRecipeCookingTimeMock.mockImplementation(() => 0);
    });

    test("should return null", () => {
      const { container } = render(<CookingTimeIcon />);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("when given 30 cooking time", () => {
    beforeEach(() => {
      useRecipeCookingTimeMock.mockImplementation(() => 30);
    });

    test("should find cooking time icon", () => {
      const { container } = render(<CookingTimeIcon />);
      expect(container).not.toBeEmptyDOMElement();
      expect(container).toContainHTML('stroke-dasharray="50, 100"');
    });
  });
});
