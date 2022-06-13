import React from 'react'

import Immutable from 'immutable'

import Image from 'components/Image'
import Svg from 'components/Svg'
import { getMenuRecipeImage } from 'utils/image'

import css from './IngredientImage.css'

type IngredientProps = {
  ingredient: Immutable.Map<string, any>
}

const IngredientImage = ({ ingredient }: IngredientProps) => {
  const images = ingredient.get('media').get('images')

  if (images.size <= 0) {
    return <Svg fileName="icon-vegs" className={css.placeholder} />
  }

  const urls = images.first().get('urls')
  const src = getMenuRecipeImage(urls, 125)

  return <Image media={src} title={ingredient.get('name')} className={css.image} />
}

export { IngredientImage }
