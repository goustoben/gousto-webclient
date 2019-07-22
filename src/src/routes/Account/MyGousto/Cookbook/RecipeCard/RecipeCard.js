import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  link: PropTypes.string,
  images: PropTypes.string,
  title: PropTypes.string,
}

const RecipeCard = ({ link = 'link', images = 'image', title = 'title' }) => (
const RecipeCard = ({link="link", image="image", title="title"}) => (
  <div>I am a recipe, {link} , {image}, {title} </div>

)

RecipeCard.propTypes = propTypes

export { RecipeCard }
