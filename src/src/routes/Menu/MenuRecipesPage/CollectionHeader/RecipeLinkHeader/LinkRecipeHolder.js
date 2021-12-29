import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { RecipeTile } from '../../../components/RecipeTile'
import css from './RecipeLinkHeader.css'

export const LinkRecipeHolder = ({ matches, images, fdiStyling, recipes, title }) => {
  const getRecipeHeaderContentForNumberOfColumns = (columnNumber) => {
    const classNameForContent = columnNumber === 3 ? css.recipeLink33percentContainer : css.recipeLink50percentContainer
    const imageSrc = columnNumber === 4 ? images.double : images.single
    const recipesToRender = columnNumber === 2 ? [recipes[0]] : recipes

    return (
      <div className={css.recipeLinkRecipesContainer}>
        <div className={classNameForContent}>
          <img className={css.recipeLinkImage} src={imageSrc} alt={title} />
        </div>
        {
          recipesToRender.map(recipeId => (
            <RecipeTile key={recipeId} recipeId={recipeId} originalId={recipeId} fdiStyling={fdiStyling} />
          ))
        }
      </div>
    )
  }

  return (
    <Fragment>
      { matches.twoColumns && ( getRecipeHeaderContentForNumberOfColumns(2)) }
      { matches.threeColumns && (getRecipeHeaderContentForNumberOfColumns(3)) }
      { matches.fourColumns && (getRecipeHeaderContentForNumberOfColumns(4)) }
    </Fragment>
  )
}

LinkRecipeHolder.propTypes = {
  matches: PropTypes.shape({
    twoColumns: PropTypes.bool,
    threeColumns: PropTypes.bool,
    fourColumns: PropTypes.bool,
  }).isRequired,
  images: PropTypes.shape({
    single: PropTypes.string,
    double: PropTypes.string,
  }).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.string).isRequired,
  fdiStyling: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
}
