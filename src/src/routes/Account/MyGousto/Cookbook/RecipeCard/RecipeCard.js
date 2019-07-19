import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  link: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,

}

const RecipeCard = ({link="link", image="image", title="title"}) => (
  <div>I am a recipe, {link} , {image}, {title} </div>

)

RecipeCard.propTypes = propTypes

export { RecipeCard }
