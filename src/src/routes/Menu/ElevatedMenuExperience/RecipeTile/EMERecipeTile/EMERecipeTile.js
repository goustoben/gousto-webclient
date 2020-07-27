import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { TileImageContainer } from '../TileImage'
import { RecipeTag } from '../RecipeTag'
import { RecipeTagTitle } from '../RecipeTagTitle'
import { RecipeTilePurchaseInfoContainer } from '../RecipeTilePurchaseInfo'
import css from './EMERecipeTile.css'

class EMERecipeTile extends PureComponent {
  constructor() {
    super()

    this.state = {
      detailHover: true
    }
  }

  highlight = () => {
    this.setState({ detailHover: true })
  }

  unhighlight = () => {
    this.setState({ detailHover: false })
  }

  render() {
    const { detailHover } = this.state
    const { recipe, recipeId, showDetailRecipe, isOutOfStock, title, brandTags, isFineDineIn } = this.props
    if (!recipe) {
      return null
    }

    const onClick = (isViewMoreDetailsClicked = false) => { showDetailRecipe(recipeId, isViewMoreDetailsClicked) }

    return (
      <div
        className={classnames(css.recipeTileContainer, {
          [css.recipeTileHover]: detailHover,
          [css.recipeTileIsFineDineIn]: isFineDineIn
        })}
        data-testing={isOutOfStock ? 'menuRecipeOutOfStock' : 'menuRecipe'}
      >
        <TileImageContainer
          recipeId={recipeId}
          onClick={onClick}
          mouseEnter={this.highlight}
          mouseLeave={this.unhighlight}
        />

        {brandTags && brandTags.topLeftTag && (
        <RecipeTag brandTag={brandTags.topLeftTag} />
        )}
        <div className={css.recipeTileInfo}>
          <div>
            {brandTags && brandTags.topRightTag && (
            <RecipeTagTitle brandTag={brandTags.topRightTag} />
            )}
            <div
              role="button"
              tabIndex={0}
              onClick={onClick}
              onKeyPress={onClick}
              className={css.titleWrapper}
              onMouseEnter={this.highlight}
              onMouseLeave={this.unhighlight}
            >
              <h2 className={css.recipeTitle}>
                {title}
              </h2>
            </div>
          </div>
          <RecipeTilePurchaseInfoContainer recipeId={recipeId} />
        </div>
      </div>
    )
  }
}

EMERecipeTile.propTypes = {
  recipe: PropTypes.instanceOf(Immutable.Map).isRequired,
  recipeId: PropTypes.string.isRequired,
  showDetailRecipe: PropTypes.func.isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  brandTags: PropTypes.shape({
    topLeftTag: PropTypes.object,
    topRightTag: PropTypes.object,
  }),
  isFineDineIn: PropTypes.bool.isRequired
}

EMERecipeTile.defaultProps = {
  brandTags: null,
}

export { EMERecipeTile }
