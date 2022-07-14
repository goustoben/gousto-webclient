import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import {
  useRecipe,
  useStockHook,
  useGetAlternativeOptionsForRecipeHook,
} from "../../model/context";
import { cssPositionTop, cssTextLeft, cssThemeBlue, cssVariantHeader } from "./styles";
import { useBasketHook } from "../../model/context/useBasket";

const VariantHeaderDiv = styled.div({
  ...cssVariantHeader,
  ...cssTextLeft,
  ...cssThemeBlue,
  ...cssPositionTop,
} as any)

export function VariantHeader({ categoryId }: {
  categoryId: string;
}) {
  const useBasket = useBasketHook();
  const { numPortions } = useBasket();

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

  const isOutOfStock = isRecipeOutOfStock(recipeId, numPortions);

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

  return <VariantHeaderDiv>{text}</VariantHeaderDiv>;
}
