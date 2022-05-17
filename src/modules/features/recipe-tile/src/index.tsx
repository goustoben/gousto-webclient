import React from 'react'

export { RecipeTileDependencies } from './model/context'

export type Props = {
  bool: boolean
}

// Feature modules can depend on media images
// const webclientMediaImage = require('media/images/box-prices/best-value.png')

export function RecipeTile(props: Props) {
  return (
    <p data-testid="recipe-tile">Recipe tile ({props.bool})</p>
  )
}
