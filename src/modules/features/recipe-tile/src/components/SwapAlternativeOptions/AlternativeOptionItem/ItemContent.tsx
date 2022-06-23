import React from "react";

import styled from "@emotion/styled";
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

const LabelContainer = styled.div(cssLabelContainer as any)
const TitleContainer = styled.div(cssTitleContainer as any)
const Title = styled.span(cssTitleText as any)
const ExtraInformation = styled.div(cssExtraInformation as any)
const SurchargeAmountText = styled.span(cssSurchargeAmountText as any)
const PerServingText = styled.span(cssPerServingText as any)
const SoldOutText = styled.span(cssSoldOutText as any)

export function ItemContent({
  recipeName,
  isOutOfStock,
  surcharge = null,
}: ItemContentProps) {
  return (
    <LabelContainer>
      <TitleContainer>
        <Title>{recipeName}</Title>
      </TitleContainer>
      {surcharge && !isOutOfStock && (
        <ExtraInformation>
          <SurchargeAmountText>{`+£${surcharge.toFixed(
            2
          )}`}</SurchargeAmountText>
          <PerServingText>per serving</PerServingText>
        </ExtraInformation>
      )}
      {isOutOfStock && <SoldOutText>Sold out</SoldOutText>}
    </LabelContainer>
  );
}
