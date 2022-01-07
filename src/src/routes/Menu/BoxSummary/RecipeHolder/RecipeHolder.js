import PropTypes from 'prop-types'
import React from 'react'
import Image from 'Image'
import classnames from 'classnames'
import Immutable from 'immutable'
import { getFeaturedImage } from 'utils/image'
import { isMobile, DESKTOP_VIEW } from 'utils/view'
import css from './RecipeHolder.css'

const RecipeHolder = ({ recipe, view, onClick, browserType, children }) => {
  const isMobileView = isMobile(view)

  return (
    <div
      className={classnames(
        css[view],
        css.recipeHolder,
        { [css.borderNone]: recipe.size > 0 },
        { [css.placeHolder]: recipe.size < 1 },
      )}
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex={0}
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
        : <div className={css.paddingForAddRecipes}>{children}</div>}
    </div>
  )
}

RecipeHolder.propTypes = {
  recipe: PropTypes.instanceOf(Immutable.Map),
  view: PropTypes.string,
  onClick: PropTypes.func,
  browserType: PropTypes.string.isRequired,
  children: PropTypes.node,
}

RecipeHolder.defaultProps = {
  recipe: Immutable.Map({}),
  view: DESKTOP_VIEW,
  onClick: () => { },
  children: 'Add recipe',
}

export { RecipeHolder }
