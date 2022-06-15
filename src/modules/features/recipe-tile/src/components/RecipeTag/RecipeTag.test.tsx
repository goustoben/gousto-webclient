import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup } from "@testing-library/react";

import { UseRecipeBrandContextProvider } from "../../model/context/useRecipeBrand";
import { RecipeTag } from "./";

const renderComponent = (hasTag = false) =>
  render(
    <UseRecipeBrandContextProvider
      value={() => ({
        useRecipeBrandAvailabilityTag: () =>
          hasTag
            ? {
                slug: "slug",
                text: "cool tag",
                theme: {
                  name: "boom",
                  color: "red",
                  borderColor: "red",
                },
              }
            : null,
        useRecipeBrandTag: () => null,
      })}
    >
      <RecipeTag />
    </UseRecipeBrandContextProvider>
  );

describe("RecipeTag", () => {
  afterEach(() => cleanup());

  describe("when given null brandTag", () => {
    test("should not render a tag", () => {
      renderComponent();
      expect(screen.queryByText("cool tag")).not.toBeInTheDocument();
    });
  });

  describe("when given new brand tag", () => {
    test("should find recipe tag span", () => {
      renderComponent(true);
      expect(screen.queryByText("cool tag")).toBeInTheDocument();
    });
  });
});
