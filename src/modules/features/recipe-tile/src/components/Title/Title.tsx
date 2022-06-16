import React from "react";

import { css, CSSObject } from "@emotion/react";

import { useRecipe } from "../../model/context";
import { screen, typography } from "../../styles";

const styles: CSSObject = {
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

export function Title() {
    const recipe = useRecipe();

    return <h2 css={css(styles)}>{recipe.title}</h2>;
}
