import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { recipePropTypes } from 'routes/Menu/Recipe'
import { Pill } from 'goustouicomponents'
import { RecipeDisclaimerContainer } from 'routes/Menu/RecipeDisclaimer'
import config from 'config'
import css from './GridRecipe.css'
import Chef from '../Chef'
import Image from '../Image'
import { RecipeRating } from '../Rating'
import { AddRecipe } from '../AddRecipe'
import { AttributeGrid } from '../AttributeGrid'
import { VariantHeaderContainer } from '../VariantHeader'
import { TitleContainer } from '../Title/TitleContainer'

const GridRecipe = ({ onClick, media, highlight, unhighlight, chef, view, detailHover,
  stock, averageRating, ratingCount, cookingTime, useWithin, equipment, inBasket, position, id, diet,
  fiveADay, isNew, isChefPrepared, numPortions
}) => {
  const outOfStock = stock <= config.menu.stockThreshold && stock !== null && !inBasket

  return (
    <div className={css.recipeDetails}>
      <div>
        <VariantHeaderContainer recipeId={id} stock={stock} inBasket={inBasket} />
      </div>
      <span onClick={onClick} className={css.link}>
        <Image
          media={media}
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
      <div className={css.contentWrapper}>
        <div onClick={onClick} className={css.titleWrapper}>
          <TitleContainer
            recipeId={id}
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
          <AddRecipe id={id} stock={stock} inBasket={inBasket} view={view} position={position} buttonText={isChefPrepared ? 'Add meal' : 'Add Recipe'} />
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
  fiveADay: PropTypes.number,
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
