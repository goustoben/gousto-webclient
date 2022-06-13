import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import {
  cssExtraInformation,
  cssLabelContainer,
  cssPerServingText,
  cssSoldOutText,
  cssSurchargeAmountText,
  cssTitleContainer,
  cssTitleText,
} from "./styles";

type ItemContentProps = {
  recipeName: string;
  isOutOfStock: boolean;
  surcharge: number | null;
};

export const ItemContent = ({
  recipeName,
  isOutOfStock,
  surcharge = null,
}: ItemContentProps) => (
  <div css={css(cssLabelContainer)}>
    <div css={css(cssTitleContainer)}>
      <span css={css(cssTitleText)}>{recipeName}</span>
    </div>
    {surcharge && !isOutOfStock && (
      <div css={css(cssExtraInformation)}>
        <span css={css(cssSurchargeAmountText)}>{`+£${surcharge.toFixed(
          2
        )}`}</span>
        <span css={css(cssPerServingText)}>per serving</span>
      </div>
    )}
    {isOutOfStock && <span css={css(cssSoldOutText)}>Sold out</span>}
  </div>
);
