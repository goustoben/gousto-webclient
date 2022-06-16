import React from "react";

import { css } from "@emotion/react";

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

export const CookingTimeIcon = () => {
  const cookingTime = useRecipeCookingTime();

  if (!cookingTime) {
    return null;
  }

  const percentage = getPercentageFromCookingTime(cookingTime);

  return (
    <div css={css(cssCookingTimeIcon)}>
      <svg viewBox="0 0 36 36" css={css(cssCircularChart)}>
        <path
          css={css(cssCircularChartCircleBg)}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          css={css(cssCircularChartCircle, cssKeyframesProgress)}
          strokeDasharray={`${percentage}, 100`}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>

      <div css={css(cssTime)}>{cookingTime}</div>
    </div>
  );
};
