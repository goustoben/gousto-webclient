import React, { SyntheticEvent, useCallback } from 'react'
import styled from '@emotion/styled'

import { Box, FontFamily, FontWeight, Icon, Text } from '@gousto-internal/citrus-react'
import { useGetRecipeTileLinkDataHook } from '../../model/context/useGetRecipeTileLinkData'
import { cssRecipeTileLink, cssFineDineIn } from './styles'

type RecipeTileLinkProps = {
  isFineDineIn: boolean
  onClickTile: (e: SyntheticEvent) => void
}

const StyledButton = styled.button(
  (props: any) =>
    ({
      ...cssRecipeTileLink,
      ...(props.isFineDineIn ? cssFineDineIn : {}),
    } as any),
)

const boxStyle = { boxSizing: 'content-box' } as const
const iconStyle = { color: 'inherit' }

export function RecipeTileLink({ isFineDineIn, onClickTile }: RecipeTileLinkProps) {
  const useGetRecipeTileLinkData = useGetRecipeTileLinkDataHook()
  const { dispatchTrackClickMoreRecipeDetails } = useGetRecipeTileLinkData()

  const handleOnRecipeTileLinkClick = useCallback(
    (e: SyntheticEvent) => {
      dispatchTrackClickMoreRecipeDetails()
      onClickTile(e)
    },
    [dispatchTrackClickMoreRecipeDetails, onClickTile],
  )

  return (
    <Box
      maxWidth="6.45rem"
      width="6.25rem"
      flexBasis="100%"
      borderBottomWidth={1}
      paddingBottom={4}
      style={boxStyle}
    >
      <StyledButton type="button" onClick={handleOnRecipeTileLinkClick} isFineDineIn={isFineDineIn}>
        <Text fontFamily={FontFamily.UI} fontWeight={FontWeight.SemiBold} size={1}>
          More details
        </Text>
        <Icon name="arrow_right" size={4} style={iconStyle} />
      </StyledButton>
    </Box>
  )
}
