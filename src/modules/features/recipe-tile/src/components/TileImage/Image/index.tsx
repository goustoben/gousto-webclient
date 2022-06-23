import React from "react";
import LazyLoad from "react-lazyload";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";

import { useRecipe } from "../../../model/context";
import { useRecipeImage } from "./useRecipeImage";

const StyledImage = styled.img<{ styles: CSSObject }>(({ styles }) => ({ ...styles } as any))

export const Image = ({
  lazy,
  styles,
  useHomepageImage = false,
}: {
  lazy?: boolean;
  styles?: CSSObject;
  useHomepageImage?: boolean;
}) => {
  const { title } = useRecipe();

  const recipeImage = useRecipeImage(useHomepageImage);

  if (!recipeImage) {
    return null;
  }

  const [image, srcSet] = recipeImage;

  const imageComponent = (
    <StyledImage
      alt={title}
      styles={styles || {}}
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
