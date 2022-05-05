import React from 'react'

import { RecipeTile } from '@features/recipe-tile'

export type Props = {
  bool: boolean
}

// Feature modules can depend on media images
// const webclientMediaImage = require('media/images/box-prices/best-value.png')

export function RecipeTileT(props: Props) {
  return (
    <>
    <RecipeTile bool={false} />
    <p data-testid="recipe-tile">Recipe tile ({props.bool})</p>
    </>
  )
}
