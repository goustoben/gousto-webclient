import React from "react";

import styled from "@emotion/styled";

import { AlternativeOptionItem } from "../AlternativeOptionItem";

import { useGetAlternativeOptionsForRecipeHook } from "../../../model/context";
import { cssRecipeList, cssRecipeListText, cssVariantsTitle } from "./styles";
import { useTrackingHook } from "../../../model/context/useTracking";

type RecipeAlternativeOptionsProps = {
  recipeId: string;
  categoryId?: string;
  isOnDetailScreen?: boolean;
  /**
   * Optional Function to be called upon switching recipes.
   */
  onChangeCheckedRecipe:
    | ((_: { previousRecipeId: string; nextRecipeId: string }) => void)
    | null;
};

const RecipeListDiv = styled.div(cssRecipeList as any)
const VariantsTitle = styled.h2(cssVariantsTitle as any)
const RecipeListText = styled.ul(cssRecipeListText as any)

export function RecipeAlternativeOptions({
  recipeId: currentRecipeId,
  categoryId = undefined,
  isOnDetailScreen = false,
  onChangeCheckedRecipe = null,
}: RecipeAlternativeOptionsProps) {
  const useGetAlternativeOptionsForRecipe =
    useGetAlternativeOptionsForRecipeHook();
  const useTracking = useTrackingHook();
  const { useTrackVariantListDisplay } = useTracking();
  const getAlternativeOptionsForRecipe = useGetAlternativeOptionsForRecipe();

  const recipeWithAlternativeOptions = getAlternativeOptionsForRecipe({
    recipeId: currentRecipeId,
    isOnDetailScreen,
    categoryId,
  });

  // alternative options include the recipe itself
  const ALTERNATIVE_OPTIONS_STARTING_LENGTH = 1;

  const hasAlternativeOptions =
    recipeWithAlternativeOptions.length > ALTERNATIVE_OPTIONS_STARTING_LENGTH;

  useTrackVariantListDisplay({
    hasAlternativeOptions,
    view: isOnDetailScreen ? "details" : "grid",
  });

  const preventPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

  if (!hasAlternativeOptions) {
    return null;
  }

  return (
    <RecipeListDiv
      role="button"
      tabIndex={-1}
      onClick={preventPropagation}
      onKeyPress={preventPropagation}
    >
      {isOnDetailScreen && (
        <VariantsTitle>Variants available</VariantsTitle>
      )}
      <RecipeListText>
        {recipeWithAlternativeOptions.map(
          ({
            recipeId,
            recipeName,
            changeCheckedRecipe,
            isChecked,
            isOutOfStock,
            surcharge,
          }) => (
            <AlternativeOptionItem
              key={recipeId}
              recipeId={recipeId}
              recipeName={recipeName}
              changeCheckedRecipe={(...args) => {
                if (onChangeCheckedRecipe) {
                  onChangeCheckedRecipe({
                    nextRecipeId: recipeId,
                    previousRecipeId: currentRecipeId,
                  });
                }

                return changeCheckedRecipe(...args);
              }}
              isChecked={isChecked}
              isOnDetailScreen={isOnDetailScreen}
              isOutOfStock={isOutOfStock}
              surcharge={surcharge === undefined ? null : surcharge}
            />
          )
        )}
      </RecipeListText>
    </RecipeListDiv>
  );
}
