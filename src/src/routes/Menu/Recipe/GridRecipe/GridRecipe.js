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
import { RecipeRatingContainer } from '../Rating'
import { AddRecipe } from '../AddRecipe'
import { AttributeGrid } from '../AttributeGrid'
import { VariantHeaderContainer } from '../VariantHeader'
import { TitleContainer } from '../Title/TitleContainer'
import { RecipeInfoBadgesContainer } from '../InfoBadge/RecipeInfoBadgesContainer'

const GridRecipe = ({ id, originalId, onClick, media, highlight, unhighlight, chef, view, detailHover,
  stock, cookingTime, useWithin, equipment, inBasket, position, diet,
  fiveADay, isChefPrepared, numPortions
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
            {outOfStock || <RecipeInfoBadgesContainer recipeId={id} />}
            {outOfStock || <RecipeRatingContainer recipeId={id} />}
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
        <RecipeDisclaimerContainer recipeId={id} />
        <div className={css.buttonContainer}>
          <AddRecipe id={id} originalId={originalId} stock={stock} inBasket={inBasket} view={view} position={position} buttonText={isChefPrepared ? 'Add meal' : 'Add Recipe'} />
        </div>

      </div>
    </div>
  )
}

GridRecipe.propTypes = {
  ...recipePropTypes,
  id: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
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
  cookingTime: PropTypes.number.isRequired,
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
  fiveADay: 0,
  isChefPrepared: false,
  numPortions: 2
}

export { GridRecipe }
