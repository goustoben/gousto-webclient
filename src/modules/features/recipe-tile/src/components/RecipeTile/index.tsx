import React, { SyntheticEvent } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import {
  useGetAlternativeOptionsForRecipeHook,
  useRecipe,
  useStockHook,
} from "../../model/context";

import { useRecipeReference } from "../../model/context/useRecipeReference";

import { DeviceType, useDeviceType } from "../../utils/useDeviceType";
import { VariantHeader } from "../VariantHeader";
import { TileImage } from "../TileImage/TileImage";
import { BrandTag } from "../BrandTag";
import { Title } from "../Title";
import { RecipeTilePurchaseInfo } from "../RecipeTilePurchaseInfo";
import {
  cssRecipeTagHolder,
  cssRecipeTagHolderShifted,
  cssRecipeTile,
  cssRecipeTileContainer,
  cssRecipeTileInfo,
  cssRecipeTileIsFineDineIn,
  cssRecipeTileWithLinkTitle,
  cssVariantPushDown,
} from "./styles";
import { RecipeTag } from "../RecipeTag";
import { useGetRecipeTileLinkDataHook } from "../../model/context/useGetRecipeTileLinkData";
import { RecipeTileLink } from "../RecipeTileLink";

type RecipeTileProps = {
  recipeId: string;
  currentCollectionId: string;
  onClick: (
    recipeId: string,
    currentCollectionId: string,
    recipeReference?: string | null
  ) => void;
};

export const RecipeTile = ({
  recipeId,
  currentCollectionId: categoryId,
  onClick,
}: RecipeTileProps) => {
  const useGetAlternativeOptionsForRecipe =
    useGetAlternativeOptionsForRecipeHook();
  const getAlternativeOptionsForRecipe = useGetAlternativeOptionsForRecipe();

  const useStock = useStockHook();
  const { isRecipeOutOfStock } = useStock();

  const isOutOfStock = isRecipeOutOfStock(recipeId);

  const { isFineDineIn } = useRecipe();

  const deviceType = useDeviceType();
  const recipeReference = useRecipeReference();
  const useGetRecipeTileLinkData = useGetRecipeTileLinkDataHook()
  const { isRecipeTileLinkVisible } = useGetRecipeTileLinkData()

  // should never happen but caters for loading state
  if (categoryId === null) {
    return null;
  }

  const alternatives = getAlternativeOptionsForRecipe({
    recipeId,
    categoryId,
    isOnDetailScreen: false,
  });

  const handleOnClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    onClick(recipeId, categoryId, recipeReference);
  };

  // alternative options include the recipe itself
  const hasAlternatives = alternatives.length > 1;

  const showVariantHeader = hasAlternatives && !isOutOfStock;

  const mobileBannerShown =
    showVariantHeader && deviceType === DeviceType.MOBILE;

  return (
    <div
      role="button"
      tabIndex={0}
      css={css(cssRecipeTile)}
      data-testing={
        isOutOfStock ? "menuRecipeOutOfStock" : "menuRecipeViewDetails"
      }
      data-testing-id={recipeId}
      onClick={handleOnClick}
      onKeyPress={handleOnClick}
    >
      {
        // mobile banner needs to sit outside of TileImage
        deviceType === DeviceType.MOBILE && (
          <VariantHeader categoryId={categoryId} />
        )
      }

      <div
        css={css(
          cssRecipeTileContainer,
          isFineDineIn ? cssRecipeTileIsFineDineIn : null
        )}
      >
        <TileImage categoryId={categoryId} />
        <span
          css={css(
            cssRecipeTagHolder,
            showVariantHeader ? cssRecipeTagHolderShifted : null
          )}
        >
          <RecipeTag />
        </span>
        <div
          css={css(
            cssRecipeTileInfo,
            mobileBannerShown ? cssVariantPushDown : null
          )}
        >
          <BrandTag />

          <Title styles={isRecipeTileLinkVisible ? [cssRecipeTileWithLinkTitle] : []}/>

          {isRecipeTileLinkVisible && (
            <RecipeTileLink
              isFineDineIn={Boolean(isFineDineIn)}
              onClickTile={handleOnClick}
            />
          )}

          <RecipeTilePurchaseInfo
            categoryId={categoryId}
            fdiStyling={isFineDineIn}
          />
        </div>
      </div>
    </div>
  );
};
