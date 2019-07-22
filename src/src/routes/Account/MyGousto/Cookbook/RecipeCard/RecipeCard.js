import React from "react"
import PropTypes from "prop-types"
import Image from "Recipe/Image"
import css from "./RecipeCard.css"

const propTypes = {
  link: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string
}

const maxMediaSize = 400

const RecipeCard = ({ link = "link", image = "image", title = "title" }) => (
  <a href={link}>
    <div className={css.cardContainer}>
      <Image
        media={image}
        alt={title}
        maxMediaSize={maxMediaSize}
        // className={css.recipeImg}
      />
      <p>{title}</p>
    </div>
  </a>
)

RecipeCard.propTypes = propTypes

export { RecipeCard }
