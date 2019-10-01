import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'

import Title from 'Recipe/Title'
import Rating from 'Recipe/Rating'
import AddButton from 'Recipe/AddButton'
import { AttributeGrid } from 'Recipe/AttributeGrid'
import { ShortlistButton } from 'Recipe/ShortlistButton'
import Ingredients from 'Recipe/Ingredients'
import Nutrition from 'Recipe/Detail/Nutrition'
import Carousel from 'Recipe/Detail/Carousel'
import { detailPropTypes } from 'Recipe/Detail/Detail'
import IngredientsList from '../IngredientsList/IngredientsList'
import Allergens from '../Allergens/Allergens'
import css from './FineDineInDetail.css'

const FineDineInDetail = ({ title, view, count, average, perPortion, per100Grams, ingredients, allergens, id, stock, inBasket, cookingTime, useWithin, description, youWillNeed, cuisine, diet, equipment, restrictedView, position, surcharge, images, menuRecipeDetailVisibilityChange, fiveADay, dairyFree, glutenFree, isNew, showShortlistButton }) => (
  <div>
    <div className={css.container}>
      <div className={css.carousel}>
        <Carousel images={images} />
        <div className={css.closeButton} onClick={() => { menuRecipeDetailVisibilityChange(false) }}>
          <span className={css.closeIcon}></span>
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
            <Rating count={count} average={average} isNew={isNew} />
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
          {ingredients.size > 0 ? <Ingredients ingredients={ingredients} restrictedView={restrictedView} border={false} inset={false} /> : null}
          <hr className={css.rule} />
          <div className={css.twoColumnContainer}>
            <div className={css.oneColumnContainer}>
              {youWillNeed && youWillNeed.size ? (
                <div className={css.text}>
                  <p className={css.heading}>What you&#8217;ll need:</p>
                  <p>{youWillNeed.map((item, idx) => <span key={idx}>{item}{(youWillNeed.size - 1) !== idx ? ', ' : null}</span>)}</p>
                </div>
              ) : null}
              {equipment && equipment.size ? (
                <div className={css.text}>
                  <p className={css.heading}>Equipment required:</p>
                  <p>{equipment.toJS().join(', ')}</p>
                </div>
              ) : null}
            </div>
            <div className={css.oneColumnContainer}>
              {perPortion.size > 0 ? <Nutrition perPortion={perPortion.toJS()} per100Grams={per100Grams.toJS()} restrictedView={restrictedView} inset={false} /> : null}
            </div>
          </div>
          <hr className={css.rule} />
          <div className={css.text}>
            {(allergens.size > 0 || ingredients.size > 0) ? (
              <div>
                <IngredientsList ingredients={ingredients} allergens={allergens} inset={false} />
                <Allergens allergens={allergens} inset={false} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className={css.stickyContainer}>
        {showShortlistButton &&
          <ShortlistButton id={id} stock={stock} view={view} position={position} />
        }
        <AddButton id={id} stock={stock} inBasket={inBasket} view={view} surcharge={surcharge} position={position} />
      </div>
    </div>
  </div>
)

FineDineInDetail.propTypes = {
  ...detailPropTypes,
  scrolledPastPoint: PropTypes.bool,
  images: PropTypes.instanceOf(Immutable.List),
}

FineDineInDetail.defaultProps = {
  scrolledPastPoint: false,
  images: Immutable.List([]),
}

export default FineDineInDetail
