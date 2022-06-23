import React from "react";
import styled from "@emotion/styled";

import { useRecipeCookingTime } from "../../model/recipe";
import { getPercentageFromCookingTime } from "./getPercentageFromCookingTime";

import {
  cssCookingTimeIcon,
  cssCircularChart,
  cssCircularChartCircleBg,
  cssCircularChartCircle,
  cssTime,
  cssKeyframesProgress,
} from "./styles";

const OuterContainer = styled.div(cssCookingTimeIcon as any);
const TimeContainer = styled.div(cssTime as any);

const Svg = styled.svg(cssCircularChart as any);
const PathOne = styled.path(cssCircularChartCircleBg as any);
const PathTwo = styled.path({
  ...cssCircularChartCircle,
  ...cssKeyframesProgress,
} as any);

export const CookingTimeIcon = () => {
  const cookingTime = useRecipeCookingTime();

  if (!cookingTime) {
    return null;
  }

  const percentage = getPercentageFromCookingTime(cookingTime);

  return (
    <OuterContainer>
      <Svg viewBox="0 0 36 36">
        <PathOne
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <PathTwo
          strokeDasharray={`${percentage}, 100`}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </Svg>
      <TimeContainer>{cookingTime}</TimeContainer>
    </OuterContainer>
  );
};
