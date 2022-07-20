import React from "react";
import PropTypes from "prop-types";

import styled from "@emotion/styled";

import { SwapAlternativeOptions } from "../SwapAlternativeOptions/SwapAlternativeOptions";
import {
  useGetAlternativeOptionsForRecipeHook,
  useRecipe,
  useStockHook,
} from "../../model/context";
import { useDeviceType, DeviceType } from "../../utils/useDeviceType";
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
  originalId: string;
  categoryId: string;
  fdiStyling?: boolean;
  SwapAlternativeOptionsMobile?: React.FC<{}>,
};

const SurchargeDiv = styled.div<{
  isFineDineIn: boolean;
  surchargeOnTop: boolean;
  fdiStyling: boolean;
}>(
  ({ isFineDineIn, surchargeOnTop, fdiStyling }) =>
    ({
      ...cssSurchargeInfo,
      ...(isFineDineIn && fdiStyling ? cssSurchargeInfoIsFineDineIn : {}),
      ...(surchargeOnTop ? cssSurchargeInfoRow : {}),
    } as any)
);

const SurchargeAmount = styled.span(cssSurchargeAmountText as any);
const PerServingText = styled.span<{ surchargeOnTop: boolean }>(
  ({ surchargeOnTop }) =>
    ({
      ...cssPerServingText,
      ...(surchargeOnTop ? cssSpaceLeft : {}),
    } as any)
);
const PerText = styled.span(cssPerText as any);

const ButtonsWrapper = styled.div(cssButtonsWrapper as any);
const PurchaseInfoWrapper = styled.div<{ surchargeOnTop: boolean }>(
  ({ surchargeOnTop }) =>
    ({
      ...cssPurchaseInfoWrapper,
      ...(surchargeOnTop ? cssSurchargeOnTop : {}),
    } as any)
);

export const RecipeTilePurchaseInfo: React.FC<RecipeTilePurchaseInfoProps> = ({
  originalId,
  categoryId,
  fdiStyling = false,
  SwapAlternativeOptionsMobile,
}) => {
  const { id: recipeId, isFineDineIn } = useRecipe();
  const deviceType = useDeviceType();

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
    <PurchaseInfoWrapper surchargeOnTop={surchargeOnTop}>
      {surcharge ? (
        <SurchargeDiv
          surchargeOnTop={surchargeOnTop}
          isFineDineIn={Boolean(isFineDineIn)}
          fdiStyling={fdiStyling}
        >
          <SurchargeAmount>
            +£
            {surcharge.toFixed(2)}
          </SurchargeAmount>
          <PerServingText surchargeOnTop={surchargeOnTop}>
            <PerText>per</PerText>
            serving
          </PerServingText>
        </SurchargeDiv>
      ) : null}
      <ButtonsWrapper>
        <AddRecipeButton recipeId={recipeId} />
        {hasAlternativeOptions &&
          (SwapAlternativeOptionsMobile && deviceType === DeviceType.MOBILE ? (
            <SwapAlternativeOptionsMobile />
          ) : (
            <SwapAlternativeOptions
              originalId={originalId}
              recipeId={recipeId}
              categoryId={categoryId}
            />
          ))}
      </ButtonsWrapper>
    </PurchaseInfoWrapper>
  );
};

RecipeTilePurchaseInfo.propTypes = {
  categoryId: PropTypes.string.isRequired,
  fdiStyling: PropTypes.bool.isRequired,
};
