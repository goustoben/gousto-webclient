import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import LazyLoad from 'react-lazyload'
import { useRecipeTitle } from 'routes/Menu/context/recipeContext'
import { getIsMenuImagesSizeHintsEnabled } from 'routes/Menu/selectors/recipe'
import { useRecipeImage } from './useRecipeImage'

const Image = ({ lazy, className, useHomepageImage }) => {
  const title = useRecipeTitle()
  const [ image, srcSet ] = useRecipeImage(useHomepageImage)
  const isMenuImagesSizeHintsEnabled = useSelector(getIsMenuImagesSizeHintsEnabled)

  if (!image) {
    return null
  }

  const imageComponent = (
    <img
      alt={title}
      className={className}
      src={image}
      srcSet={srcSet}
      sizes={isMenuImagesSizeHintsEnabled ? (
        '(max-width: 500px) 400px, (max-width: 991px) 700px, 400px'
      ) : ''}
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
  useHomepageImage: PropTypes.bool,
}

Image.defaultProps = {
  lazy: false,
  className: undefined,
  useHomepageImage: false,
}

export { Image }
