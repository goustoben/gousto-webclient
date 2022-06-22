import React from "react";

import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";

import { useRecipe } from "../../model/context";
import { screen, typography } from "../../styles";

const defaultStyles: CSSObject = {
  marginBottom: "1rem",
  flex: 1,
  fontFamily: typography.axiformaFontStack,
  fontSize: typography.sizeXS,
  fontWeight: 600,
  lineHeight: 1.6,
  [`@media ${screen.screenSMMin}`]: {
    fontSize: typography.sizeMD,
  },
};

const TileHeader = styled.h2((props: { styles: CSSObject[] }) => ({
  ...defaultStyles,
  ...Object.assign({}, ...props.styles),
}));

export function Title({ styles }: { styles?: CSSObject[] } = {}) {
  // const recipe = useRecipe();

  // return <TileHeader styles={styles || []}>{recipe.title}</TileHeader>;
  return <TileHeader styles={styles || []}>Boom!</TileHeader>;
}
