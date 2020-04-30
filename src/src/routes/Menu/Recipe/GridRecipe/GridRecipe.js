import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { RangeBadge } from 'routes/Menu/Recipe/RangeBadge'
import { recipePropTypes } from 'routes/Menu/Recipe'
import { Pill } from 'goustouicomponents'
import { RecipeDisclaimerContainer } from 'routes/Menu/RecipeDisclaimer'
import config from 'config'
import css from './GridRecipe.css'
import Chef from '../Chef'
import { Title } from '../Title'
import Image from '../Image'
import { RecipeRating } from '../Rating'
import { AddButton } from '../AddButton'
import { AttributeGrid } from '../AttributeGrid'
import { VariantHeaderContainer } from '../VariantHeader'

const GridRecipe = ({ onClick, selectFoodBrand, isFoodBrandClickable, media, title, highlight, unhighlight, chef, view, detailHover, range, stock, averageRating, ratingCount, cookingTime, useWithin, equipment, inBasket, position, id, diet, fiveADay, isNew, isChefPrepared, numPortions }) => {
  const outOfStock = stock <= config.menu.stockThreshold && stock !== null && !inBasket

  return (
    <div className={css.recipeDetails}>
      <div>
        <VariantHeaderContainer recipeId={id} stock={stock} inBasket={inBasket} />
      </div>
      <span onClick={onClick} className={css.link}>
        <Image
          media={media}
          alt={title}
          mouseEnter={highlight}
          mouseLeave={unhighlight}
          stock={stock}
          inBasket={inBasket}
        />
      </span>
      <div className={css.viewDetails}>
        {outOfStock || (
          <Pill
            mouseEnter={highlight}
            mouseLeave={unhighlight}
            onClick={() => { onClick(true) }}
            icon
          >
            View details
          </Pill>
        )}
      </div>
      <div>
        <Chef chef={chef} />
      </div>
      {
        !isChefPrepared
        && (
        <div className={css.rangeBadgeWrapper}>
          <RangeBadge range={range} selectFoodBrand={selectFoodBrand} isFoodBrandClickable={isFoodBrandClickable} />
        </div>
        )
      }
      <div className={css.contentWrapper}>
        <div onClick={onClick} className={css.titleWrapper}>
          <Title
            title={title}
            view={view}
            mouseEnter={highlight}
            mouseLeave={unhighlight}
            detailHover={detailHover}
          />
        </div>
        <div>
          <div>
            {outOfStock || (
            <RecipeRating
              average={averageRating}
              count={ratingCount}
              isNew={isNew}
              isChefPrepared={isChefPrepared}
            />
            )}
          </div>
        </div>
        {
          (!outOfStock)
          && (
            <div>
              <AttributeGrid
                maxNoAttributes={4}
                numPortions={isChefPrepared ? numPortions : null }
                cookingTime={!isChefPrepared ? cookingTime : null }
                useWithin={useWithin}
                diet={diet}
                fiveADay={fiveADay}
                equipment={!isChefPrepared ? equipment : null }
              />
            </div>
          )
        }
        <RecipeDisclaimerContainer id={id} />
        <div className={css.buttonContainer}>
          <AddButton id={id} stock={stock} inBasket={inBasket} view={view} position={position} buttonText={isChefPrepared ? 'Add meal' : 'Add Recipe'} />
        </div>

      </div>
    </div>
  )
}

GridRecipe.propTypes = {
  ...recipePropTypes,
  id: PropTypes.string.isRequired,
  position: PropTypes.number,
  chef: PropTypes.shape({
    media: PropTypes.shape({
      images: PropTypes.array,
    }),
    name: PropTypes.string,
    celebrity: PropTypes.bool,
  }),
  equipment: PropTypes.instanceOf(Immutable.List),
  inBasket: PropTypes.bool,
  averageRating: PropTypes.number,
  cookingTime: PropTypes.number.isRequired,
  ratingCount: PropTypes.number,
  useWithin: PropTypes.string.isRequired,
  highlight: PropTypes.func,
  unhighlight: PropTypes.func,
  detailHover: PropTypes.bool,
  range: PropTypes.instanceOf(Immutable.Map),
  fiveADay: PropTypes.number,
  isFoodBrandClickable: PropTypes.bool,
  selectFoodBrand: PropTypes.func,
  view: PropTypes.string,
  isChefPrepared: PropTypes.bool,
  numPortions: PropTypes.number,
}

GridRecipe.defaultProps = {
  view: 'grid',
  chef: Immutable.Map({}),
  averageRating: 0,
  ratingCount: 0,
  fiveADay: 0,
  isChefPrepared: false,
  numPortions: 2
}

export { GridRecipe }
