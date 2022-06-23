import React from "react";
import styled from "@emotion/styled";

import { useRecipeBrandHook } from "../../model/context/useRecipeBrand";

import { cssRecipeTag } from "./styles";

const getTagStyle = (theme: { borderColor?: string }) => ({
  ...theme,
  border: theme.borderColor ? "1px solid" : "none",
});

const Container = styled.span(cssRecipeTag as any);

export const RecipeTag: React.FC<{ type?: string }> = () => {
  const useRecipeBrand = useRecipeBrandHook();
  const { useRecipeBrandAvailabilityTag } = useRecipeBrand();
  const brandTag = useRecipeBrandAvailabilityTag();

  if (!brandTag) {
    return null;
  }

  const { theme, text } = brandTag;

  return <Container style={getTagStyle(theme)}>{text}</Container>;
};
