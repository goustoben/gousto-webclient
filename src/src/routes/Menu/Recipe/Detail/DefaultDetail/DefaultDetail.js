import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Image from 'routes/Menu/Recipe/Image'
import { Title } from 'routes/Menu/Recipe/Title'
import { RecipeRating } from 'routes/Menu/Recipe/Rating'
import { AddRecipe } from 'routes/Menu/Recipe/AddRecipe'
import { RangeBadge } from 'routes/Menu/Recipe/RangeBadge'
import { Ingredients } from 'routes/Menu/Recipe/Ingredients'
import { NutritionInfo } from 'routes/Menu/Recipe/Detail/Nutrition'
import { RecipeMicronutrientsContainer } from 'routes/Menu/RecipeMicronutrients'
import { detailPropTypes } from 'routes/Menu/Recipe/Detail/Detail'
import { AttributeGrid } from 'routes/Menu/Recipe/AttributeGrid'
import { CookingInstructions } from 'routes/Menu/Recipe/CookingInstructions'
import { RecipeDisclaimerContainer } from 'routes/Menu/RecipeDisclaimer'
import { NutritionDisclaimerText } from 'routes/Menu/Recipe/Detail/NutritionDisclaimerText'

import { Allergens } from '../Allergens/Allergens'
import { IngredientsList } from '../IngredientsList/IngredientsList'
import css from './DefaultDetail.css'

const DefaultDetail = ({ media, title, view, count, average, perPortion,
  per100Grams, ingredients, allergens, id, stock, inBasket, cookingTime,
  useWithin, description, youWillNeed, cuisine, diet, equipment, menuRecipeDetailVisibilityChange,
  position, surcharge, range, fiveADay, glutenFree, dairyFree, isNew, isFoodBrandClickable,
  showCookingInstruction, isChefPrepared, numPortions }) => (
    <div>
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.stickyHeader}>
            <div className={css.headerContentContainer}>
              <div className={css.titleFlex}>
                <Title title={title} view={view} detail />
                <span className={css.closeIcon} role="button" tabIndex={0} onKeyPress={menuRecipeDetailVisibilityChange} onClick={menuRecipeDetailVisibilityChange} />
              </div>
            </div>
          </div>
          <div className={css.badges}>
            <RecipeRating count={count} average={average} isNew={isNew} />
          </div>
        </div>
        <div className={css.shadow}>
          <div className={css.imageContainer}>
            <Image media={media} title={title} view={view} stock={stock} inBasket={inBasket} />
            <div className={css.infoBox}>
              <div className={css.rangeBadgeDetails}>
                <RangeBadge range={range} isFoodBrandClickable={isFoodBrandClickable} />
              </div>
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
              <RecipeDisclaimerContainer id={id} />
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
              <span className={css.mobileHide}>
                <AddRecipe id={id} stock={stock} inBasket={inBasket} view={view} surcharge={surcharge} position={position} buttonText={isChefPrepared ? 'Add meal' : 'Add Recipe'} />
              </span>
            </div>
          </div>
        </div>
        <div className={css.row}>
          {!!ingredients.size > 0 && (
            <div className={css.section}>
              <div className={css.sectionPanel}>
                <Ingredients ingredients={ingredients} />
              </div>
            </div>
          )}
          <div className={css.row}>
            {!!perPortion.size > 0 && (
              <div className={classnames(css.section, css.splitSection)}>
                <div className={css.sectionPanel}>
                  <NutritionInfo perPortion={perPortion.toJS()} per100Grams={per100Grams.toJS()} />
                  <RecipeMicronutrientsContainer id={id} />
                  <NutritionDisclaimerText />
                </div>
                {showCookingInstruction
                  && (
                    <div className={classnames(css.cookingInstructionsDesktop, css.sectionPanel)}>
                      <CookingInstructions recipeId={id} />
                    </div>
                  )}
              </div>
            )}
            {(!!allergens.size > 0 || !!ingredients.size > 0) && (
              <div className={classnames(css.section, css.splitSection)}>
                <div className={css.sectionPanel}>
                  <IngredientsList ingredients={ingredients} allergens={allergens} />
                  <Allergens allergens={allergens} />
                </div>
                {showCookingInstruction
                  && (
                    <div className={classnames(css.cookingInstructionsMobile, css.sectionPanel)}>
                      <CookingInstructions recipeId={id} />
                    </div>
                  )}
              </div>
            )}
          </div>
          <div className={css.stickyContainer}>
            <AddRecipe id={id} stock={stock} inBasket={inBasket} view={view} surcharge={surcharge} position={position} buttonText={isChefPrepared ? 'Add meal' : 'Add Recipe'} />
          </div>
        </div>
      </div>
    </div>
)

DefaultDetail.propTypes = {
  ...detailPropTypes,
  isFoodBrandClickable: PropTypes.bool,
  isChefPrepared: PropTypes.bool.isRequired,
  showCookingInstruction: PropTypes.bool.isRequired,
  numPortions: PropTypes.number.isRequired
}

DefaultDetail.defaultProps = {
  fiveADay: 0,
  isFoodBrandClickable: false,
}

export default DefaultDetail
