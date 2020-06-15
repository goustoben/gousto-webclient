import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'

import { Pill } from 'goustouicomponents'
import { RecipeDisclaimerContainer } from 'routes/Menu/RecipeDisclaimer'
import Chef from '../Chef'
import { Image } from '../Image'
import { RecipeRatingContainer } from '../Rating'
import { AddRecipe } from '../AddRecipe'
import { AttributeGrid } from '../AttributeGrid'
import { VariantHeaderContainer } from '../VariantHeader'
import { TitleContainer } from '../Title/TitleContainer'
import { RecipeInfoBadgesContainer } from '../InfoBadge/RecipeInfoBadgesContainer'
import css from './GridRecipe.css'

const GridRecipe = ({ id, originalId, onClick, media, highlight, unhighlight, chef, view, detailHover,
  cookingTime, useWithin, equipment, position, diet,
  fiveADay, isChefPrepared, numPortions, isOutOfStock, fineDineInStyle
}) => (
  <div className={css.recipeDetails}>
    <div>
      <VariantHeaderContainer recipeId={id} isOutOfStock={isOutOfStock} />
    </div>
    <span role="button" tabIndex={0} onKeyPress={onClick} onClick={onClick} className={css.link}>
      <Image
        view={view}
        media={media}
        mouseEnter={highlight}
        mouseLeave={unhighlight}
        isOutOfStock={isOutOfStock}
      />
    </span>
    <div className={css.viewDetails}>
      {isOutOfStock || (
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
    <div className={classnames(css.contentWrapper, {[css.fineDineInStyle]: fineDineInStyle})}>
      <div role="button" tabIndex={0} onClick={onClick} onKeyPress={onClick} className={css.titleWrapper}>
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
          {isOutOfStock || <RecipeInfoBadgesContainer recipeId={id} />}
          {isOutOfStock || (!fineDineInStyle && <RecipeRatingContainer recipeId={id} />)}
        </div>
      </div>
      {
        (!isOutOfStock)
          && (
            <div>
              <AttributeGrid
                maxNoAttributes={fineDineInStyle ? 2 : 4}
                numPortions={isChefPrepared ? numPortions : null }
                cookingTime={!isChefPrepared ? cookingTime : null }
                useWithin={useWithin}
                diet={diet}
                fiveADay={fiveADay}
                equipment={!isChefPrepared ? equipment : null }
                fineDineInStyle={fineDineInStyle}
              />
            </div>
          )
      }
      <RecipeDisclaimerContainer recipeId={id} />
      <div className={css.buttonContainer}>
        <AddRecipe
          id={id}
          originalId={originalId}
          isOutOfStock={isOutOfStock}
          view={view}
          position={position}
          buttonText={isChefPrepared ? 'Add meal' : 'Add Recipe'}
        />
      </div>
    </div>
  </div>
)

GridRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  media: PropTypes.instanceOf(Immutable.List).isRequired,
  highlight: PropTypes.func.isRequired,
  unhighlight: PropTypes.func.isRequired,
  chef: PropTypes.shape({
    media: PropTypes.shape({
      images: PropTypes.array,
    }),
    name: PropTypes.string,
    celebrity: PropTypes.bool,
  }),
  view: PropTypes.string,
  detailHover: PropTypes.bool,
  cookingTime: PropTypes.number.isRequired,
  useWithin: PropTypes.string.isRequired,
  equipment: PropTypes.instanceOf(Immutable.List).isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
  position: PropTypes.number,
  diet: PropTypes.string.isRequired,
  fiveADay: PropTypes.number,
  isChefPrepared: PropTypes.bool,
  numPortions: PropTypes.number,
  fineDineInStyle: PropTypes.bool
}

GridRecipe.defaultProps = {
  view: 'grid',
  chef: Immutable.Map({}),
  fiveADay: 0,
  isChefPrepared: false,
  numPortions: 2,
  position: 0,
  detailHover: false,
  fineDineInStyle: false
}

export { GridRecipe }
