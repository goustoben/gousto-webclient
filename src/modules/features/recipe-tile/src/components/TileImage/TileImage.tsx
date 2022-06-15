import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { useDeviceType, DeviceType } from '../../utils/useDeviceType'

import { CookingTimeIcon } from "../CookingTimeIcon/CookingTimeIcon";
import { VariantHeader } from "../VariantHeader";

import { Image } from "./Image";
import { SoldOutOverlay } from "./SoldOutOverlay";
import {
  cssImageStyle,
  cssImageWrapper,
  cssRecipeImageAndCookingTimeWrapper,
} from "./styles";

const isOnBiggerScreen = (deviceType: string) =>
  deviceType === DeviceType.DESKTOP || deviceType === DeviceType.TABLET;

export const TileImage: React.FC<{
  categoryId: string;
  originalId: string;
}> = ({ categoryId, originalId }) => {
  const deviceType = useDeviceType();
  const showVariantHeader = isOnBiggerScreen(deviceType);

  return (
    <button type="button" css={css(cssImageWrapper)}>
      <SoldOutOverlay />

      <div css={css(cssRecipeImageAndCookingTimeWrapper)}>
        <Image lazy css={css(cssImageStyle)} />

        <CookingTimeIcon />
      </div>

      {showVariantHeader && (
        <VariantHeader categoryId={categoryId} originalId={originalId} />
      )}
    </button>
  );
};
