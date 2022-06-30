import React, { SyntheticEvent } from "react";
import styled from "@emotion/styled";

import {
  Box,
  FontFamily,
  FontWeight,
  Icon,
  Text,
} from "@gousto-internal/citrus-react";
import { useGetRecipeTileLinkDataHook } from "../../model/context/useGetRecipeTileLinkData";
import { cssRecipeTileLink, cssFineDineIn } from "./styles";

type RecipeTileLinkProps = {
  isFineDineIn: boolean;
  onClickTile: (e: SyntheticEvent) => void;
};

const StyledButton = styled.button(
  (props: any) =>
    ({
      ...cssRecipeTileLink,
      ...(props.isFineDineIn ? cssFineDineIn : {}),
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
        <Text
          fontFamily={FontFamily.UI}
          fontWeight={FontWeight.SemiBold}
          size={1}
        >
          More details
        </Text>
        <Icon name="arrow_right" size={4} style={{ color: "inherit" }} />
      </StyledButton>
    </Box>
  );
}
