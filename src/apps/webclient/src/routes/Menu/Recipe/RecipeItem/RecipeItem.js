import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import Item from 'Item'

const RecipeItem = ({ media, title, numPortions, onRemove, available, url, onImageClick, recipeId, fromBox }) => (
  <Item
    type="recipe"
    media={media.getIn(['images', 0, 'urls'], Immutable.List([]))}
    title={title}
    quantity={numPortions}
    onRemove={onRemove}
    available={available}
    url={url}
    onImageClick={onImageClick}
    recipeId={recipeId}
    fromBox={fromBox}
  />
)

RecipeItem.propTypes = {
  media: PropTypes.instanceOf(Immutable.Map).isRequired,
  title: PropTypes.string.isRequired,
  numPortions: PropTypes.number.isRequired,
  onRemove: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([false]),
  ]),
  available: PropTypes.bool,
  url: PropTypes.string,
  onImageClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([false]),
  ]),
  recipeId: PropTypes.string,
  fromBox: PropTypes.bool
}

RecipeItem.defaultProps = {
  onImageClick: false
}

export default RecipeItem
