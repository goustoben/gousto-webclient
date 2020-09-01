import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { Image } from 'routes/Menu/Recipe/Image'
import { Title } from 'routes/Menu/Recipe/Title'
import { RecipeRating } from 'routes/Menu/Recipe/Rating'
import { AddRecipe } from 'routes/Menu/Recipe/AddRecipe'
import Carousel from './Carousel'

import { VariantRecipeListContainer } from '../VariantRecipeList/VariantRecipeList'
import { RecipeInfoBadgesContainer } from '../InfoBadge/RecipeInfoBadgesContainer'
import { RecipeDisclaimerContainer } from '../../RecipeDisclaimer'

import { DetailIngredientsContainer } from './DetailIngredients'
import { DetailAllergenIngredientsContainer } from './DetailAllergenIngredients'
import { DetailPerPortionContainer } from './DetailPerPortion'
import { DetailAttributeGridContainer } from './DetailAttributeGrid'

import css from './Detail.css'

export const Detail = (props) => {
  const {
    id, chosenSideRecipeId,
    closeRecipeDetails,
    media, title,
    view, count, average,
    isOutOfStock,
    description, youWillNeed,
    equipment,
    position, surcharge,
    isChefPrepared, isFineDineIn
  } = props

  const recipeLegalDetailId = chosenSideRecipeId || id

  return (
    <div
      className={css.modalContainer}
      role="button"
      tabIndex={0}
      onKeyPress={closeRecipeDetails}
      onClick={closeRecipeDetails}
      data-testing="menuRecipeDetailsClose"
    >
      <div role="button" tabIndex={0} className={css.container} onKeyPress={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
        <div className={css.header}>
          <div className={css.stickyHeader}>
            <div className={css.titleFlex}>
              <Title title={title} view={view} detail />
              <span
                className={css.closeIcon}
                role="button"
                tabIndex={0}
                onKeyPress={closeRecipeDetails}
                onClick={closeRecipeDetails}
                data-testing="menuRecipeDetailsClose"
              />
            </div>
          </div>
          <div className={css.badges}>
            <div className={css.titleHidden}>
              <Title title={title} view={view} detail />
            </div>
            <RecipeInfoBadgesContainer recipeId={id} />
            <RecipeRating count={count} average={average} />
          </div>
        </div>
        <div className={css.imageContainer}>
          {isFineDineIn
            ? (
              <Carousel images={media} isOutOfStock={isOutOfStock} />
            ) : (
              <Image media={media} title={title} view={view} isOutOfStock={isOutOfStock} />
            )}
        </div>
        <div className={css.sectionPanel}>
          <div className={css.variantsContainer}>
            <VariantRecipeListContainer originalId={id} recipeId={chosenSideRecipeId} isOnDetailScreen />
          </div>
          <h2 className={css.infoBoxDescriptionTitle}>Recipe Details</h2>
          <p className={css.infoBoxText}>{description}</p>
          <DetailAttributeGridContainer recipeId={recipeLegalDetailId} isChefPrepared={isChefPrepared} />
          <RecipeDisclaimerContainer recipeId={id} />
          {equipment && !!equipment.size && (
          <p className={css.additionalInfo}>
            Equipment required:
            {equipment.toJS().join(', ')}
          </p>
          )}
          {youWillNeed && !!youWillNeed.size && (
          <p className={css.additionalInfo}>
            What you&#8217;ll need:
            {youWillNeed.map((item, idx) => (
              <span key={idx}>
                {item}
                {(youWillNeed.size - 1) !== idx && ', '}
              </span>
            ))}
          </p>
          )}
        </div>
        <div className={css.row}>
          <DetailIngredientsContainer recipeId={recipeLegalDetailId} />
        </div>
        <div className={css.row}>
          <DetailPerPortionContainer recipeId={recipeLegalDetailId} />
        </div>
        <div className={css.row}>
          <DetailAllergenIngredientsContainer recipeId={recipeLegalDetailId} />
        </div>

        <div className={css.stickyContainer}>
          <AddRecipe
            id={id}
            isOutOfStock={isOutOfStock}
            view={view}
            surcharge={surcharge}
            position={position}
            buttonText={isChefPrepared ? 'Add meal' : 'Add recipe'}
            isOnDetailScreen
          />
        </div>
      </div>
    </div>
  )
}

Detail.propTypes = {
  id: PropTypes.string.isRequired,
  chosenSideRecipeId: PropTypes.string,
  media: PropTypes.instanceOf(Immutable.List).isRequired,
  title: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  average: PropTypes.number,
  isOutOfStock: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  youWillNeed: PropTypes.instanceOf(Immutable.List).isRequired,
  equipment: PropTypes.instanceOf(Immutable.List).isRequired,
  closeRecipeDetails: PropTypes.func.isRequired,
  position: PropTypes.number,
  isChefPrepared: PropTypes.bool.isRequired,
  isFineDineIn: PropTypes.bool,
  surcharge: PropTypes.number,
}

Detail.defaultProps = {
  surcharge: 0,
  position: 0,
  average: 0,
  isFineDineIn: false,
  chosenSideRecipeId: null
}
