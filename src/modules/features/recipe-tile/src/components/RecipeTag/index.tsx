import React from "react";

import { css } from "@emotion/react";

import { useRecipeBrandHook } from "../../model/context/useRecipeBrand";

import { cssRecipeTag } from "./styles";

const getTagStyle = (theme: { borderColor?: string }) => ({
  ...theme,
  border: theme.borderColor ? "1px solid" : "none",
});

export const RecipeTag: React.FC<{ type?: string }> = () => {
  const useRecipeBrand = useRecipeBrandHook();
  const { useRecipeBrandAvailabilityTag } = useRecipeBrand();
  const brandTag = useRecipeBrandAvailabilityTag();

  if (!brandTag) {
    return null;
  }

  const { theme, text } = brandTag;

  return (
    <span css={css(cssRecipeTag)} style={getTagStyle(theme)}>
      {text}
    </span>
  );
};
