import React from 'react'

import classnames from 'classnames'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useAllCollections } from '../../domains/collections'
import { getMenuCategoryIdForDetails } from '../../selectors/menuRecipeDetails'
import { Title } from '../Recipe'
import { RecipeAlternativeOptions } from '../RecipeAlternativeOptions'
import { RecipeTag } from '../RecipeTag'
import { AttributeGrid } from './AttributeGrid'
import Carousel from './Carousel'
import { DetailAddRecipe } from './DetailAddRecipe'
import { DetailAllergenIngredientsContainer } from './DetailAllergenIngredients'
import { DetailImage as Image } from './DetailImage'
import { DetailIngredientsContainer } from './DetailIngredients'
import { DetailPerPortionContainer } from './DetailPerPortion'
import { RecipeRating } from './Rating'
import { RecipeDisclaimer } from './RecipeDisclaimer'

import css from './Detail.css'
import titleCss from './DetailTitle.css'

export const Detail = (props) => {
  const {
    id,
    chosenSideRecipeId,
    onClose,
    media,
    title,
    view,
    count,
    average,
    description,
    youWillNeed,
    equipment,
    position,
    surcharge,
    isFineDineIn,
  } = props

  const allCollections = useAllCollections()

  let currentCollectionId = useSelector(getMenuCategoryIdForDetails)
  if (!currentCollectionId) {
    currentCollectionId = Object.values(allCollections.toJSON())
      .filter((c) => !!c)
      .find((collectionObj) => collectionObj.recipesInCollection?.indexOf(id) > -1).id
  }

  const recipeLegalDetailId = chosenSideRecipeId || id
  const titleClass = classnames(titleCss.containerLG, {
    [titleCss.detailHeading]: view === 'detail',
    [titleCss.fineDineInDetailHeading]: view === 'fineDineInDetail',
  })

  return (
    <div
      className={css.modalContainer}
      role="button"
      tabIndex={0}
      onKeyPress={onClose}
      onClick={onClose}
      data-testing="menuRecipeDetailsClose"
    >
      <div
        role="button"
        tabIndex={0}
        className={css.container}
        onKeyPress={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={css.header}>
          <div className={css.stickyHeader}>
            <div className={css.titleFlex}>
              <Title className={titleClass} />
              <span
                className={css.closeIcon}
                role="button"
                tabIndex={0}
                onKeyPress={onClose}
                onClick={onClose}
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
          {isFineDineIn ? (
            <Carousel images={media} />
          ) : (
            <Image media={media} title={title} view={view} />
          )}
        </div>
        <div className={css.sectionPanel}>
          <div className={css.variantsContainer}>
            <RecipeAlternativeOptions
              originalId={id}
              recipeId={id}
              isOnDetailScreen
              categoryId={currentCollectionId}
            />
          </div>
          <div className={css.infoBoxDescriptionTitle}>Recipe details</div>
          <p>{description}</p>
          <AttributeGrid />
          <RecipeDisclaimer recipeId={id} />
          {equipment && !!equipment.size && (
            <p className={css.additionalInfo}>Equipment required: {equipment.toJS().join(', ')}</p>
          )}
          {youWillNeed && !!youWillNeed.size && (
            <p className={css.additionalInfo}>
              What you&#8217;ll need:{' '}
              {youWillNeed.map((item, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <span key={idx}>
                  {item}
                  {youWillNeed.size - 1 !== idx && ', '}
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
          <DetailAddRecipe id={id} view={view} surcharge={surcharge} position={position} />
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
  description: PropTypes.string.isRequired,
  youWillNeed: PropTypes.instanceOf(Immutable.List).isRequired,
  equipment: PropTypes.instanceOf(Immutable.List).isRequired,
  onClose: PropTypes.func.isRequired,
  position: PropTypes.number,
  isFineDineIn: PropTypes.bool,
  surcharge: PropTypes.number,
}

Detail.defaultProps = {
  surcharge: 0,
  position: 0,
  average: 0,
  isFineDineIn: false,
  chosenSideRecipeId: null,
}
