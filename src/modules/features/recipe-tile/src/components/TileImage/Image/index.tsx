import React from "react";
import LazyLoad from "react-lazyload";

import { useRecipe } from "../../../model/context";
import { useRecipeImage } from "./useRecipeImage";

export const Image = ({
  lazy,
  className,
  useHomepageImage = false,
}: {
  lazy?: boolean;
  className?: string;
  useHomepageImage?: boolean;
}) => {
  const { title } = useRecipe();

  const recipeImage = useRecipeImage(useHomepageImage);

  if (!recipeImage) {
    return null;
  }

  const [image, srcSet] = recipeImage;

  const imageComponent = (
    <img
      alt={title}
      className={className}
      src={image}
      srcSet={srcSet}
      sizes="(max-width: 500px) 400px, (max-width: 991px) 700px, 400px"
    />
  );

  if (lazy) {
    return (
      <LazyLoad once offset={200} height={0}>
        {imageComponent}
      </LazyLoad>
    );
  }

  return imageComponent;
};
