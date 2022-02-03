import React from 'react'

// Feature modules can load CSS modules
import css from './test.scss'

export type Props = {
  bool: boolean
}

// Feature modules can depend on media images
const webclientMediaImage = require('media/images/box-prices/best-value.png')

export function RecipeTile(props: Props) {
  return (
    <p className={css.testModule}>Recipe tile</p>
  )
}
