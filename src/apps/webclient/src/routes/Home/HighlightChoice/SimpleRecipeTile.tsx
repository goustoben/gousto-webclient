import React from 'react'

import {
  Box,
  Image,
  Icon,
  Color,
  JustifyContent,
  AlignItems,
  Display,
} from '@gousto-internal/citrus-react'

import { RecipeData } from './types'

import css from './SimpleRecipeTile.css'

export const SimpleRecipeTile = ({ name, imageUrl, type }: RecipeData) => (
  <Box style={{ position: 'relative' }} paddingH={[1, 2, 2, 2]}>
    <Image src={imageUrl} alt={name} />
    {type != null && (
      <Box
        width="1.35rem"
        height="1.35rem"
        bg={Color.White}
        borderRadius="round"
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
        className={css.recipeTileBadge}
      >
        <Icon name={type} size={6} />
      </Box>
    )}
  </Box>
)
