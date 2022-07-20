import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup } from "@testing-library/react";

import { Image } from ".";
import { Image as ImageType } from "../../../model/recipe";
import { RecipeContextProvider } from "../../../model/context";

const defaultImages: ImageType[] = [
  {
    type: "homepage-image",
    title: "home page image",
    description: "Cool image",
    urls: [
      {
        src: "image-1-x150.jpg",
        width: 150,
      },
      {
        src: "image-1-x50.jpg",
        width: 50,
      },
      {
        src: "image-1-x300.jpg",
        width: 300,
      },
    ],
  },
];

const renderComponent = ({
  className,
  images = defaultImages,
  lazy = false,
}: { images?: ImageType[]; className?: string; lazy?: boolean } = {}) =>
  render(
    <RecipeContextProvider
      value={{ id: "1234", title: "A Really Nice Recipe", media: { images } }}
    >
      <Image lazy={lazy} styles={{ label: className }} />
    </RecipeContextProvider>
  );

describe("Recipe components > Image", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should render image's alternative text", () => {
    renderComponent();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toContainHTML('alt="A Really Nice Recipe"');
  });

  describe("when recipe has no media", () => {
    test("should render nothing", () => {
      renderComponent({ images: [] });
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });
  });

  describe("when recipe has media", () => {
    test("should render an img component correctly", () => {
      const className = "some-cool-class";
      renderComponent({ className });

      const image = screen.getByRole("img");
      expect(image).toBeInTheDocument();
      expect(image).toContainHTML('alt="A Really Nice Recipe"');
      expect(image).toContainHTML(className);
      expect(image).toContainHTML('src="image-1-x150.jpg"');
      expect(image).toContainHTML(
        'sizes="(max-width: 500px) 400px, (max-width: 991px) 700px, 400px"'
      );
      expect(image).toContainHTML(
        'srcset="image-1-x150.jpg 150w, image-1-x50.jpg 50w, image-1-x300.jpg 300w"'
      );
    });

    describe("when lazy is true", () => {
      test("should render an img component correctly inside LazyLoad", () => {
        const { container } = renderComponent({ lazy: true });
        expect(
          container.getElementsByClassName("lazyload-placeholder").length
        ).toBe(1);
      });
    });
  });
});
