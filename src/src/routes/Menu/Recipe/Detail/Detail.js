import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { Image } from 'routes/Menu/Recipe/Image'
import { Title } from 'routes/Menu/Recipe/Title'
import { RecipeRating } from 'routes/Menu/Recipe/Rating'
import { AddRecipe } from 'routes/Menu/Recipe/AddRecipe'
import { Ingredients } from 'routes/Menu/Recipe/Ingredients'
import { NutritionInfo } from 'routes/Menu/Recipe/Detail/Nutrition'
import { RecipeMicronutrientsContainer } from 'routes/Menu/RecipeMicronutrients'
import { AttributeGrid } from 'routes/Menu/Recipe/AttributeGrid'
import { RecipeDisclaimerContainer } from 'routes/Menu/RecipeDisclaimer'
import { NutritionDisclaimerText } from 'routes/Menu/Recipe/Detail/NutritionDisclaimerText'
import Carousel from 'routes/Menu/Recipe/Detail/Carousel'

import { Allergens } from './Allergens/Allergens'
import { IngredientsList } from './IngredientsList/IngredientsList'
import { VariantRecipeListContainer } from '../VariantRecipeList/VariantRecipeList'
import { RecipeInfoBadgesContainer } from '../InfoBadge/RecipeInfoBadgesContainer'
import css from './Detail.css'

export const Detail = (props) => {
  const {
    menuRecipeDetailVisibilityChange,
    media, title,
    view, count, average, perPortion,
    per100Grams, ingredients, allergens,
    id, isOutOfStock, cookingTime,
    useWithin, description, youWillNeed,
    cuisine, diet, equipment,
    position, surcharge, fiveADay, glutenFree,
    dairyFree, isChefPrepared, numPortions, isFineDineIn
  } = props

  return (
    <div
      className={css.modalContainer}
      role="button"
      tabIndex={0}
      onKeyPress={menuRecipeDetailVisibilityChange}
      onClick={menuRecipeDetailVisibilityChange}
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
                onKeyPress={menuRecipeDetailVisibilityChange}
                onClick={menuRecipeDetailVisibilityChange}
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
            <VariantRecipeListContainer originalId={id} recipeId={id} isOnDetailScreen />
          </div>
          <h2 className={css.infoBoxDescriptionTitle}>Recipe Details</h2>
          <p className={css.infoBoxText}>{description}</p>
          <AttributeGrid
            maxNoAttributes={20}
            showDetailedRecipe
            numPortions={isChefPrepared ? numPortions : null }
            cookingTime={isChefPrepared ? null : cookingTime }
            useWithin={useWithin}
            equipment={equipment}
            diet={diet}
            fiveADay={fiveADay}
            cals={perPortion.get('energyKcal')}
            cuisine={cuisine}
            glutenFree={glutenFree}
            dairyFree={dairyFree}
          />
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
          {!!ingredients.size > 0 && (
          <div className={css.sectionPanel}>
            <Ingredients ingredients={ingredients} />
          </div>
          )}
        </div>
        <div className={css.row}>
          {!!perPortion.size > 0 && (
          <div className={css.sectionPanel}>
            <NutritionInfo perPortion={perPortion.toJS()} per100Grams={per100Grams.toJS()} />
            <RecipeMicronutrientsContainer id={id} />
            <NutritionDisclaimerText />
          </div>
          )}
        </div>
        <div className={css.row}>
          {(!!allergens.size > 0 || !!ingredients.size > 0) && (
          <div className={css.sectionPanel}>
            <IngredientsList ingredients={ingredients} allergens={allergens} />
            <Allergens allergens={allergens} />
          </div>
          )}
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
  media: PropTypes.instanceOf(Immutable.List).isRequired,
  title: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  average: PropTypes.number,
  per100Grams: PropTypes.instanceOf(Immutable.Map).isRequired,
  perPortion: PropTypes.instanceOf(Immutable.Map).isRequired,
  ingredients: PropTypes.instanceOf(Immutable.List).isRequired,
  allergens: PropTypes.instanceOf(Immutable.List).isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  useWithin: PropTypes.string.isRequired,
  cookingTime: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  youWillNeed: PropTypes.instanceOf(Immutable.List).isRequired,
  cuisine: PropTypes.string.isRequired,
  diet: PropTypes.string.isRequired,
  equipment: PropTypes.instanceOf(Immutable.List).isRequired,
  menuRecipeDetailVisibilityChange: PropTypes.func.isRequired,
  fiveADay: PropTypes.number.isRequired,
  position: PropTypes.number,
  isChefPrepared: PropTypes.bool.isRequired,
  numPortions: PropTypes.number.isRequired,
  isFineDineIn: PropTypes.bool,
  glutenFree: PropTypes.bool.isRequired,
  dairyFree: PropTypes.bool.isRequired,
  surcharge: PropTypes.number,
}

Detail.defaultProps = {
  surcharge: 0,
  position: 0,
  average: 0,
  isFineDineIn: false
}
