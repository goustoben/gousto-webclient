import PropTypes from 'prop-types'
import React from 'react'
import Image from 'Image'
import classnames from 'classnames'
import Immutable from 'immutable'
import { getFeaturedImage } from 'utils/image'
import { isMobile, DESKTOP_VIEW } from 'utils/view'
import css from './RecipeHolder.css'

const RecipeHolder = ({ recipe, view, onClick, browserType }) => {
  const isMobileView = isMobile(view)

  return (
    <span
      className={classnames(
        css[view],
        { [css.borderNone]: recipe.size > 0 },
        { [css.placeHolder]: recipe.size < 1 },
        { [css.recipeImg]: !isMobileView },
        { [css.widthMobile]: isMobileView }
      )}
      onClick={onClick}
    >
      {(recipe.size > 0)
        ? (
          <Image
            media={getFeaturedImage(recipe, '', browserType)}
            className={classnames(
              { [css.recipeImg]: !isMobileView },
              { [css.imgMobile]: isMobileView }
            )}
          />
        )
        : 'Add Recipe'}
    </span>
  )
}

RecipeHolder.propTypes = {
  recipe: PropTypes.instanceOf(Immutable.Map),
  view: PropTypes.string,
  onClick: PropTypes.func,
  browserType: PropTypes.string.isRequired
}

RecipeHolder.defaultProps = {
  recipe: Immutable.Map({}),
  view: DESKTOP_VIEW,
  onClick: () => { }
}

export default RecipeHolder
