import React, { SyntheticEvent } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import {
  Box,
  Color,
  FontFamily,
  FontWeight,
  Icon,
  Text,
} from "@gousto-internal/citrus-react";
import { useGetRecipeTileLinkDataHook } from "../../model/context/useGetRecipeTileLinkData";
import {
  cssRecipeFineDineInTileLinkText,
  cssRecipeTileFineDineInLink,
  cssRecipeTileFineDineInLinkIcon,
  cssRecipeTileLink,
  cssRecipeTileLinkIcon,
  cssRecipeTileLinkText,
} from "./styles";

type RecipeTileLinkProps = {
  isFineDineIn: boolean;
  onClickTile: (e: SyntheticEvent) => void;
};

export function RecipeTileLink({
  isFineDineIn,
  onClickTile,
}: RecipeTileLinkProps) {
  const useGetRecipeTileLinkData = useGetRecipeTileLinkDataHook();
  const { dispatchTrackClickMoreRecipeDetails } = useGetRecipeTileLinkData();

  const handleOnRecipeTileLinkClick = (e: SyntheticEvent) => {
    dispatchTrackClickMoreRecipeDetails();
    onClickTile(e);
  };

  return (
    <Box
      maxWidth="6.45rem"
      width="6.25rem"
      flexBasis="100%"
      borderBottomWidth={1}
      paddingBottom={4}
      style={{ boxSizing: "content-box" }}
    >
      <button
        type="button"
        onClick={handleOnRecipeTileLinkClick}
        css={css(
          cssRecipeTileLink,
          isFineDineIn ? cssRecipeTileFineDineInLink : null
        )}
      >
        <Text
          fontFamily={FontFamily.UI}
          fontWeight={FontWeight.SemiBold}
          size={1}
          css={css(
            cssRecipeTileLinkText,
            isFineDineIn ? cssRecipeFineDineInTileLinkText : null
          )}
          color={isFineDineIn ? Color.Secondary_200 : Color.Secondary_400}
        >
          More details
        </Text>
        <Icon
          name="arrow_right"
          size={4}
          css={css(
            cssRecipeTileLinkIcon,
            isFineDineIn ? cssRecipeTileFineDineInLinkIcon : null
          )}
        />
      </button>
    </Box>
  );
}
