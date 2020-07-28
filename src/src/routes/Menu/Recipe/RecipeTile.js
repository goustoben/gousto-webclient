import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'

import { Pill } from 'goustouicomponents'

import css from './RecipeTile.css'

import { RecipeDisclaimerContainer } from '../RecipeDisclaimer'
import { RoundelImageContainer } from './RoundelImage'
import { RecipeImageContainer } from './Image'
import { RecipeRatingContainer } from './Rating'
import { AddRecipe } from './AddRecipe'
import { AttributeGridContainer } from './AttributeGrid'
import { VariantHeaderContainer } from './VariantHeader'
import { TitleContainer } from './Title/TitleContainer'
import { RecipeInfoBadgesContainer } from './InfoBadge/RecipeInfoBadgesContainer'

const getRecipeView = (isFineDineIn, isChefPrepared) => {
  if (isChefPrepared) {
    return 'chefPrepared'
  }

  if (isFineDineIn) {
    return 'fineDineIn'
  }

  return 'grid'
}

class RecipeTile extends React.Component {
  constructor() {
    super()

    this.state = {
      detailHover: false
    }
  }

  highlight = () => {
    this.setState({ detailHover: true })
  }

  unhighlight = () => {
    this.setState({ detailHover: false })
  }

  render() {
    const { recipe, originalId, recipeId, index, showDetailRecipe,
      isOutOfStock } = this.props
    const { detailHover } = this.state

    if (!recipe) {
      return null
    }

    const isChefPrepared = recipe.get('chefPrepared') === true
    const view = getRecipeView(recipe.get('isFineDineIn'), isChefPrepared)

    const className = classnames(
      css.grid,
      css[view],
      css.recipeDetails,
      {
        [css.gridHover]: detailHover
      }
    )

    const fineDineInStyle = view === 'fineDineIn'

    const onClick = (isViewMoreDetailsClicked = false) => { showDetailRecipe(recipeId, isViewMoreDetailsClicked) }

    return (
      <div
        className={className}
        data-testing={isOutOfStock ? 'menuRecipeOutOfStock' : 'menuRecipe'}
      >
        <div>
          <VariantHeaderContainer recipeId={recipeId} isOutOfStock={isOutOfStock} />
        </div>
        <span role="button" tabIndex={0} onKeyPress={onClick} onClick={onClick} className={css.link}>
          <RecipeImageContainer recipeId={recipeId} view={view} mouseEnter={this.highlight} mouseLeave={this.unhighlight} />
        </span>
        <div className={css.viewDetails} data-testing="menuRecipeViewDetails">
          {isOutOfStock || (
            <Pill
              mouseEnter={this.highlight}
              mouseLeave={this.unhighlight}
              onClick={() => { onClick(true) }}
              icon
              data-testing="menuRecipeViewDetails"
            >
              View details
            </Pill>
          )}
        </div>
        <div>
          <RoundelImageContainer recipeId={recipeId} />
        </div>
        <div className={classnames(css.contentWrapper, { [css.fineDineInStyle]: fineDineInStyle })}>
          <div role="button" tabIndex={0} onClick={onClick} onKeyPress={onClick} className={css.titleWrapper}>
            <TitleContainer
              recipeId={recipeId}
              view={view}
              mouseEnter={this.highlight}
              mouseLeave={this.unhighlight}
              detailHover={detailHover}
            />
          </div>
          <div>
            <div>
              {isOutOfStock || <RecipeInfoBadgesContainer recipeId={recipeId} />}
              {isOutOfStock || (!fineDineInStyle && <RecipeRatingContainer recipeId={recipeId} />)}
            </div>
          </div>
          {
            (!isOutOfStock)
            && (
              <div>
                <AttributeGridContainer
                  recipeId={recipeId}
                  isChefPrepared={isChefPrepared}
                  maxNoAttributes={fineDineInStyle ? 2 : 4}
                  fineDineInStyle={fineDineInStyle}
                />
              </div>
            )
          }
          <RecipeDisclaimerContainer recipeId={recipeId} />
          <div className={css.buttonContainer}>
            <AddRecipe
              id={recipeId}
              originalId={originalId}
              isOutOfStock={isOutOfStock}
              view={view}
              position={index}
              buttonText={isChefPrepared ? 'Add meal' : 'Add recipe'}
            />
          </div>
        </div>
      </div>
    )
  }
}

RecipeTile.propTypes = {
  recipe: PropTypes.instanceOf(Immutable.Map).isRequired,
  originalId: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  showDetailRecipe: PropTypes.func.isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
}

export { RecipeTile }
