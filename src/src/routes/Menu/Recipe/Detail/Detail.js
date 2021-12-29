import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useSelector } from 'react-redux'

import { getMenuCategoryIdForDetails } from 'routes/Menu/selectors/menuRecipeDetails'
import { Image } from 'routes/Menu/Recipe/Image'
import { Title } from 'routes/Menu/components/Recipe'
import { RecipeRating } from 'routes/Menu/Recipe/Rating'
import Carousel from './Carousel'

import { RecipeDisclaimerContainer } from '../../RecipeDisclaimer'
import { RecipeTag } from '../../components/RecipeTag'

import { DetailIngredientsContainer } from './DetailIngredients'
import { DetailAllergenIngredientsContainer } from './DetailAllergenIngredients'
import { DetailPerPortionContainer } from './DetailPerPortion'
import { DetailAttributeGridContainer } from './DetailAttributeGrid'
import { DetailAddRecipe } from './DetailAddRecipe'

import css from './Detail.css'
import titleCss from './DetailTitle.css'
import { RecipeAlternativeOptions } from '../VariantRecipeList'

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
    isChefPrepared, isFineDineIn,
    menuWithSides,
    isFromShowcaseMenu
  } = props

  const currentCollectionId = useSelector(getMenuCategoryIdForDetails)

  if (! currentCollectionId) {
    return null
  }

  const recipeLegalDetailId = chosenSideRecipeId || id
  const titleClass = classnames(
    titleCss.containerLG,
    {
      [titleCss.detailHeading]: view === 'detail',
      [titleCss.fineDineInDetailHeading]: view === 'fineDineInDetail'
    }
  )

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
              <Title className={titleClass} />
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
              <Title className={titleClass} />
            </div>
            <span className={css.recipeTagHolder}>
              <RecipeTag />
            </span>
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
            <RecipeAlternativeOptions
              originalId={id}
              recipeId={menuWithSides ? chosenSideRecipeId : id}
              isOnDetailScreen
              isFromShowcaseMenu={isFromShowcaseMenu}
              categoryId={currentCollectionId}
            />
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
              // eslint-disable-next-line react/no-array-index-key
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
        {
          isFromShowcaseMenu ? null : (
            <div className={css.stickyContainer}>
              <DetailAddRecipe
                id={id}
                isOutOfStock={isOutOfStock}
                view={view}
                surcharge={surcharge}
                position={position}
                buttonText={isChefPrepared ? 'Add meal' : 'Add recipe'}
              />
            </div>
          )
        }
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
  menuWithSides: PropTypes.bool,
  isFromShowcaseMenu: PropTypes.bool,
}

Detail.defaultProps = {
  surcharge: 0,
  position: 0,
  average: 0,
  isFineDineIn: false,
  chosenSideRecipeId: null,
  menuWithSides: false,
  isFromShowcaseMenu: false,
}
