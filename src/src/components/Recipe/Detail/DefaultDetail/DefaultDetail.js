import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Image from 'Recipe/Image'
import Title from 'Recipe/Title'
import Rating from 'Recipe/Rating'
import AddButton from 'Recipe/AddButton'
import RangeBadge from 'Recipe/RangeBadge'
import { RecipeAttribute } from 'Recipe/RecipeAttribute'
import Ingredients from 'Recipe/Ingredients'
import Nutrition from 'Recipe/Detail/Nutrition'
import Availability from 'Recipe/Availability'
import { detailPropTypes } from 'Recipe/Detail/Detail'
import Allergens from '../Allergens/Allergens'
import IngredientsList from '../IngredientsList/IngredientsList'
import css from './DefaultDetail.css'

const DefaultDetail = ({ media, title, view, count, average, perPortion, per100Grams, ingredients, allergens, id, stock, inBasket, cookingTime, useWithin, availability, cutoffDate, description, youWillNeed, cuisine, diet, equipment, menuRecipeDetailVisibilityChange, restrictedView, position, surcharge, range, fiveADayValue }) => (
  <div>
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.stickyHeader}>
          <div className={css.headerContentContainer}>
            <div className={css.titleFlex}>
              <Title title={title} view={view} detail />
              <span className={css.closeIcon} onClick={() => { menuRecipeDetailVisibilityChange(false) }}></span>
            </div>
          </div>
        </div>
        <div className={css.badges}>
          <Rating count={count} average={average} />
        </div>
      </div>
      <div className={css.shadow}>
        <div className={css.imageContainer}>
          <Image media={media} title={title} view={view} />
          <div className={css.infoBox}>
            <div className={css.rangeBadgeDetails}>
              <RangeBadge range={range} />
            </div>
            <p className={css.infoBoxText}>{description}</p>
            <RecipeAttribute attributeName='cookingTime' attributeValue={cookingTime} svgFileName='icon-time' />
            <RecipeAttribute attributeName='fiveADay' attributeValue={fiveADayValue} svgFileName='icon-five-a-day' showAttribute={fiveADayValue > 1} />
            <RecipeAttribute attributeName='useWithin' attributeValue={useWithin} />
            <Availability availability={availability} date={cutoffDate} />
            <RecipeAttribute attributeName='cuisine' attributeValue={cuisine} />
            <RecipeAttribute attributeName='diet' attributeValue={diet} showAttribute={['vegetarian', 'vegan'].includes(diet.toLowerCase())} />
            <RecipeAttribute attributeName='cals' attributeValue={perPortion.get('energyKcal')} showAttribute={!restrictedView}/>
            {equipment && equipment.size ? (
              <p className={css.additionalInfo}>
                Equipment required: {equipment.toJS().join(', ')}
              </p>
            ) : null}
            {youWillNeed && youWillNeed.size ? (
              <p className={css.additionalInfo}>
              What you'll need: {youWillNeed.map((item, idx) => <span key={idx}>{item}{(youWillNeed.size - 1) !== idx ? ', ' : null}</span>)}
              </p>
            ) : null }
            <span className={css.mobileHide}>
              <AddButton id={id} stock={stock} inBasket={inBasket} view={view} surcharge={surcharge} position={position} />
            </span>
          </div>
        </div>
      </div>
      <div className={css.row}>
        {ingredients.size > 0 ? (
          <div className={css.section}>
            <div className={classnames(css.sectionPanel, css.insetSectionPanel)}>
              <Ingredients ingredients={ingredients} restrictedView={restrictedView} />
            </div>
          </div>
        ) : null}
        <div className={css.row}>
          {perPortion.size > 0 ? (
            <div className={classnames(css.section, css.splitSection)}>
              <div className={css.sectionPanel}>
                <Nutrition perPortion={perPortion.toJS()} per100Grams={per100Grams.toJS()} restrictedView={restrictedView} />
              </div>
            </div>
          ) : null}
          {(allergens.size > 0 || ingredients.size > 0) ? (
            <div className={classnames(css.section, css.splitSection)}>
              <div className={css.sectionPanel}>
                <IngredientsList ingredients={ingredients} allergens={allergens} />
                <Allergens allergens={allergens} />
              </div>
            </div>
          ) : null}
        </div>
        <div className={css.stickyContainer}>
          <div className={css.stickyButton}>
            <AddButton id={id} stock={stock} inBasket={inBasket} view={view} surcharge={surcharge} position={position} />
          </div>
        </div>
      </div>
    </div>
  </div>
)

DefaultDetail.propTypes = {
  ...detailPropTypes,
  scrolledPastPoint: PropTypes.bool,
}

DefaultDetail.defaultProps = {
  scrolledPastPoint: false,
  fiveADayValue: 0
}

export default DefaultDetail
