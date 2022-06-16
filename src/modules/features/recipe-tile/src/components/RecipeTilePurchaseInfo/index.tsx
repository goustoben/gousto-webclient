import React from "react";
import PropTypes from "prop-types";

import { css } from "@emotion/react";

import { SwapAlternativeOptions } from "../SwapAlternativeOptions/SwapAlternativeOptions";
import {
  useGetAlternativeOptionsForRecipeHook,
  useRecipe,
  useStockHook,
} from "../../model/context";
import { useGetSurchargeForRecipeIdHook } from "../../model/context/useGetSurchargeForRecipeId";
import { AddRecipeButton } from "../AddRecipeButton";
import {
  cssButtonsWrapper,
  cssPerServingText,
  cssPerText,
  cssPurchaseInfoWrapper,
  cssSpaceLeft,
  cssSurchargeAmountText,
  cssSurchargeInfo,
  cssSurchargeInfoIsFineDineIn,
  cssSurchargeInfoRow,
  cssSurchargeOnTop,
} from "./styles";

type RecipeTilePurchaseInfoProps = {
  categoryId: string;
  fdiStyling?: boolean;
};

export const RecipeTilePurchaseInfo: React.FC<RecipeTilePurchaseInfoProps> = ({
  categoryId,
  fdiStyling = false,
}) => {
  const { id: recipeId, isFineDineIn } = useRecipe();

  const useGetAlternativeOptionsForRecipe =
    useGetAlternativeOptionsForRecipeHook();
  const getAlternativeOptionsForRecipe = useGetAlternativeOptionsForRecipe();

  const useStock = useStockHook();
  const { isRecipeOutOfStock } = useStock();

  const useGetSurchargeForRecipeId = useGetSurchargeForRecipeIdHook();
  const surcharge = useGetSurchargeForRecipeId(recipeId);

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

  // alternative options include the recipe itself
  const hasAlternativeOptions = alternatives.length > 1;

  const surchargeOnTop = hasAlternativeOptions;

  return (
    <div
      css={css(
        cssPurchaseInfoWrapper,
        surchargeOnTop ? cssSurchargeOnTop : null
      )}
    >
      {surcharge ? (
        <div
          css={css(
            cssSurchargeInfo,
            isFineDineIn && fdiStyling ? cssSurchargeInfoIsFineDineIn : null,
            surchargeOnTop ? cssSurchargeInfoRow : null
          )}
        >
          <span css={css(cssSurchargeAmountText)}>
            +£
            {surcharge.toFixed(2)}
          </span>
          <span
            css={css(cssPerServingText, surchargeOnTop ? cssSpaceLeft : null)}
          >
            <span css={css(cssPerText)}>per</span>
            serving
          </span>
        </div>
      ) : null}
      <div css={css(cssButtonsWrapper)}>
        <AddRecipeButton recipeId={recipeId} />
        {hasAlternativeOptions && (
          //   deviceType === DeviceType.MOBILE ? (
          //   <SwapAlternativeOptionsMobile
          //     recipeId={recipeId}
          //     categoryId={categoryId}
          //   />
          // ) : (
          <SwapAlternativeOptions
            recipeId={recipeId}
            categoryId={categoryId}
          />
          // )
        )}
      </div>
    </div>
  );
};

RecipeTilePurchaseInfo.propTypes = {
  categoryId: PropTypes.string.isRequired,
  fdiStyling: PropTypes.bool.isRequired,
};
