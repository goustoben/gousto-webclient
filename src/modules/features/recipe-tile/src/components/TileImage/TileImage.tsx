import React from "react";
import styled from "@emotion/styled";

import { useDeviceType, DeviceType } from '../../utils/useDeviceType'

import { CookingTimeIcon } from "../CookingTimeIcon/CookingTimeIcon";
import { LikeDislikeButtons } from '../LikeDislikeButtons/LikeDislikeButtons';
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

const ImageWrapper = styled.button({...cssImageWrapper, label: '-TileImage'} as any)
const ContentWrapper = styled.div(cssRecipeImageAndCookingTimeWrapper as any)

export function TileImage({ categoryId } : {
  categoryId: string;
}) {
  const deviceType = useDeviceType();
  const showVariantHeader = isOnBiggerScreen(deviceType);

  return (
    <ImageWrapper>
      <SoldOutOverlay />

      <ContentWrapper>
        <Image lazy styles={cssImageStyle} />

        <CookingTimeIcon />
        <LikeDislikeButtons />
      </ContentWrapper>

      {showVariantHeader && (
        <VariantHeader categoryId={categoryId} />
      )}
    </ImageWrapper>
  );
}
