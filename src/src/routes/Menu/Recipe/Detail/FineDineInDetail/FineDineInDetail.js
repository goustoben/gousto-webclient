import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'

import { Title } from 'routes/Menu/Recipe/Title'
import { RecipeRating } from 'routes/Menu/Recipe/Rating'
import { AddButton } from 'routes/Menu/Recipe/AddButton'
import { AttributeGrid } from 'routes/Menu/Recipe/AttributeGrid'
import { CookingInstructions } from 'routes/Menu/Recipe/CookingInstructions'
import { Ingredients } from 'routes/Menu/Recipe/Ingredients'
import {NutritionInfo } from 'routes/Menu/Recipe/Detail/Nutrition'
import Carousel from 'routes/Menu/Recipe/Detail/Carousel'
import { detailPropTypes } from 'routes/Menu/Recipe/Detail/Detail'
import { NutritionDisclaimerText } from 'routes/Menu/Recipe/Detail/NutritionDisclaimerText'
import { IngredientsList } from '../IngredientsList/IngredientsList'
import { Allergens } from '../Allergens/Allergens'
import css from './FineDineInDetail.css'

const FineDineInDetail = ({ title, view, count, average, perPortion, per100Grams, ingredients, allergens,
  id, stock, inBasket, cookingTime, useWithin, description, youWillNeed, cuisine, diet, equipment,
  position, surcharge, images, menuRecipeDetailVisibilityChange, fiveADay, dairyFree, glutenFree, isNew, showCookingInstruction }) => (
    <div>
      <div className={css.container}>
        <div className={css.carousel}>
          <Carousel images={images} stock={stock} inBasket={inBasket} />
          <div className={css.closeButton} role="button" tabIndex={0} onKeyPress={menuRecipeDetailVisibilityChange} onClick={menuRecipeDetailVisibilityChange}>
            <span className={css.closeIcon} />
          </div>
        </div>
        <div>
          <div className={css.contentContainer}>
            <div className={css.header}>
              <Title title={title} view={view} detail />
              <div className={css.headerButton}>
                <AddButton id={id} stock={stock} inBasket={inBasket} view={view} surcharge={surcharge} position={position} />
              </div>
            </div>
            <div className={css.rating}>
              <RecipeRating count={count} average={average} isNew={isNew} />
            </div>
            <hr className={css.rule} />
            <div className={classnames(css.tabletOnly, css.block)}>
              <AddButton id={id} stock={stock} inBasket={inBasket} view={view} surcharge={surcharge} position={position} />
            </div>
            <p className={css.text}>{description}</p>
            <AttributeGrid
              maxNoAttributes={20}
              showDetailedRecipe
              cookingTime={cookingTime}
              useWithin={useWithin}
              equipment={equipment}
              diet={diet}
              fiveADay={fiveADay}
              cals={perPortion.get('energyKcal')}
              cuisine={cuisine}
              glutenFree={glutenFree}
              dairyFree={dairyFree}
            />
            <hr className={css.rule} />
            {!!ingredients.size > 0 && <Ingredients ingredients={ingredients} border={false} inset={false} />}
            <hr className={css.rule} />
            <div className={css.twoColumnContainer}>
              <div className={css.oneColumnContainer}>
                {youWillNeed && !!youWillNeed.size && (
                  <div className={css.text}>
                    <p className={css.heading}>What you&#8217;ll need:</p>
                    <p>
                      {youWillNeed.map((item, idx) => (
                        <span key={idx}>
                          {item}
                          {(youWillNeed.size - 1) !== idx && ', '}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
                {equipment && !!equipment.size && (
                  <div className={css.text}>
                    <p className={css.heading}>Equipment required:</p>
                    <p>{equipment.toJS().join(', ')}</p>
                  </div>
                )}
              </div>
              <div className={css.oneColumnContainer}>
                {perPortion.size > 0 ? <NutritionInfo perPortion={perPortion.toJS()} per100Grams={per100Grams.toJS()} inset={false} /> : null}
                <NutritionDisclaimerText />
              </div>
            </div>
            <hr className={css.rule} />
            <div className={css.text}>
              {(!!allergens.size > 0 || !!ingredients.size > 0) && (
                <div>
                  <IngredientsList ingredients={ingredients} allergens={allergens} inset={false} />
                  <Allergens allergens={allergens} inset={false} />
                </div>
              )}
            </div>
            {showCookingInstruction
              && (
                <div>
                  <hr className={css.rule} />
                  <div className={css.cookingInstructions}>
                    <CookingInstructions recipeId={id} />
                  </div>
                </div>
              )}
          </div>
        </div>
        <div className={css.stickyContainer}>
          <AddButton id={id} stock={stock} inBasket={inBasket} view={view} surcharge={surcharge} position={position} />
        </div>
      </div>
    </div>
)

FineDineInDetail.propTypes = {
  ...detailPropTypes,
  images: PropTypes.instanceOf(Immutable.List),
  showCookingInstruction: PropTypes.bool.isRequired,
}

FineDineInDetail.defaultProps = {
  images: Immutable.List([]),
}

export { FineDineInDetail }
