import React from "react";
import PropTypes from "prop-types";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import {
  useRecipe,
  useStockHook,
  useGetAlternativeOptionsForRecipeHook,
} from "../../model/context";
import { cssPositionTop, cssTextLeft, cssThemeBlue, cssVariantHeader } from "./styles";

export const VariantHeader: React.FC<{
  categoryId: string;
}> = ({ categoryId }) => {
  const useStock = useStockHook();
  const useGetAlternativeOptionsForRecipe =
    useGetAlternativeOptionsForRecipeHook();

  const { isRecipeOutOfStock } = useStock();
  const getAlternativeOptionsForRecipe = useGetAlternativeOptionsForRecipe();
  const recipe = useRecipe();
  const recipeId = recipe?.id;

  if (!recipeId) {
    return null;
  }

  const isOutOfStock = isRecipeOutOfStock(recipeId);

  if (isOutOfStock) {
    return null;
  }

  const alternatives = getAlternativeOptionsForRecipe({
    recipeId,
    categoryId,
    isOnDetailScreen: false,
  });

  // alternatives includes recipe itself, hence checking against `1`
  if (!alternatives || alternatives.length <= 1) {
    return null;
  }

  const alternativeCount = alternatives.length;
  const text = `${alternativeCount} options available`;

  return (
    <div
      css={css(cssVariantHeader, cssTextLeft, cssThemeBlue, cssPositionTop)}
    >
      {text}
    </div>
  );
};

VariantHeader.propTypes = {
  categoryId: PropTypes.string.isRequired,
};
