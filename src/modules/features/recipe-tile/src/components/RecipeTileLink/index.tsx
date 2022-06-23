import React, { SyntheticEvent } from "react";
import styled from "@emotion/styled";

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

const StyledButton = styled.button(
  (props: any) =>
    ({
      ...cssRecipeTileLink,
      ...(props.isFineDineIn ? cssRecipeTileFineDineInLink : {}),
    } as any)
);

const StyledText = styled(Text)(
  (props: any) =>
    ({
      ...cssRecipeTileLinkText,
      ...(props.isFineDineIn ? cssRecipeFineDineInTileLinkText : {}),
    } as any)
);

const StyledIcon = styled(Icon)(
  (props: any) =>
    ({
      ...cssRecipeTileLinkIcon,
      ...(props.isFineDineIn ? cssRecipeTileFineDineInLinkIcon : {}),
    } as any)
);

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
      <StyledButton
        type="button"
        onClick={handleOnRecipeTileLinkClick}
        isFineDineIn={isFineDineIn}
      >
        <StyledText
          fontFamily={FontFamily.UI}
          fontWeight={FontWeight.SemiBold}
          size={1}
          isFineDineIn={isFineDineIn}
          color={isFineDineIn ? Color.Secondary_200 : Color.Secondary_400}
        >
          More details
        </StyledText>
        <StyledIcon name="arrow_right" size={4} isFineDineIn={isFineDineIn} />
      </StyledButton>
    </Box>
  );
}
