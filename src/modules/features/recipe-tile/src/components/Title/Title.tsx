import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, CSSObject } from "@emotion/react";

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

export function Title({styles}: {styles?: CSSObject[]} = {}) {
    const recipe = useRecipe();

    return <h2 css={css(defaultStyles, ...(styles || []))}>{recipe.title}</h2>;
}
