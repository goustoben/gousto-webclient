import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import { useRecipeTitle } from 'routes/Menu/context/recipeContext'
import { useRecipeImage } from './useRecipeImage'

const Image = ({ lazy, className, useHomepageImage }) => {
  const title = useRecipeTitle()
  const [ image, srcSet ] = useRecipeImage(useHomepageImage)

  if (!image) {
    return null
  }

  const imageComponent = (
    <img
      alt={title}
      className={className}
      src={image}
      srcSet={srcSet}
    />
  )

  if (lazy) {
    return <LazyLoad once offset={200} height={0}>{imageComponent}</LazyLoad>
  }

  return imageComponent
}

Image.propTypes = {
  lazy: PropTypes.bool,
  className: PropTypes.string,
  useHomepageImage: PropTypes.bool
}

Image.defaultProps = {
  lazy: false,
  className: undefined,
  useHomepageImage: false
}

export { Image }
