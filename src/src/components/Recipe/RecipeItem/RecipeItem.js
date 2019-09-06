import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import Item from 'Item'

const RecipeItem = (props) => (
  <Item
    type="recipe"
    media={props.media.getIn(['images', 0, 'urls'], Immutable.List([]))}
    title={props.title}
    quantity={props.numPortions}
    onRemove={props.onRemove}
    available={props.available}
    url={props.url}
    showShortlistButton={props.showShortlistButton}
    onImageClick={props.onImageClick}
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
  showShortlistButton: PropTypes.bool,
  onImageClick: PropTypes.func
}

RecipeItem.defaultProps = {
  showShortlistButton: false,
  onImageClick: false
}

export default RecipeItem
