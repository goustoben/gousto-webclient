import React from 'react'

import { Box, Color, FontWeight, Text } from '@gousto-internal/citrus-react'

import css from './NewTag.css'

interface Props {
  text?: string
}

export const NewTag = ({ text = 'NEW' }: Props) => (
  <Box bg={Color.Success_600} className={css.recipeTag} color={Color.White}>
    <Text size={1} fontWeight={FontWeight.SemiBold}>
      {text}
    </Text>
  </Box>
)
