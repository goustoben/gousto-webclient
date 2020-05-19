import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'

import { recipePropTypes } from 'routes/Menu/Recipe'
import { getChef } from 'utils/recipe'
import { Pill } from 'goustouicomponents'
import { RecipeDisclaimerContainer } from 'routes/Menu/RecipeDisclaimer'
import css from './FeaturedRecipe.css'
import Chef from '../Chef'
import { TitleContainer } from '../Title/TitleContainer'
import Image from '../Image'
import { AddRecipe } from '../AddRecipe'
import { StockBadge } from '../StockBadge'
import { ChefQuote } from '../ChefQuote'
import { SoldOutOverlay } from '../SoldOutOverlay'
import { AttributeGrid } from '../AttributeGrid'
import { VariantHeaderContainer } from '../VariantHeader'

const FeaturedRecipe = ({
  onClick, media,
  view, highlight, unhighlight, chef, tag, detailHover,
  description, cookingTime,
  useWithin, equipment, id, stock, inBasket, position, fiveADay, diet,
  originalId
}) =>
  (
    <div>
      <div className={css.featuredRecipe}>

        <span onClick={onClick} className={css.link}>
          <Image
            media={media}
            view={view}
            mouseEnter={highlight}
            mouseLeave={unhighlight}
            stock={stock}
            inBasket={inBasket}
          />
        </span>
        <div className={css.chefLogo}>
          <Chef chef={chef} />
        </div>
        <div className={tag ? css.featuredDetailsWithTag : css.featuredDetails}>
          <VariantHeaderContainer recipeId={id} stock={stock} inBasket={inBasket} />
          <div className={css.textContainer}>
            <div onClick={onClick} className={classnames(css.linkUnderlined, { [css.linkIfChefFeatured]: getChef(chef) })}>
              <TitleContainer
                recipeId={id}
                view={view}
                mouseEnter={highlight}
                mouseLeave={unhighlight}
                detailHover={detailHover}
              />
            </div>
            <div>
              <ChefQuote chef={chef} quote={description} />
              <div className={css.viewDetails}>
                <Pill
                  mouseEnter={highlight}
                  mouseLeave={unhighlight}
                  onClick={() => { onClick(true) }}
                  icon
                >
                  View details
                </Pill>
              </div>
              <StockBadge stock={stock} />
              <AttributeGrid maxNoAttributes={4} cookingTime={cookingTime} useWithin={useWithin} equipment={equipment} diet={diet} fiveADay={fiveADay} />
              <RecipeDisclaimerContainer id={id} />
            </div>
            <div className={css.buttonContainer}>
              <div className={css.addButton}>
                <AddRecipe id={id} originalId={originalId} stock={stock} inBasket={inBasket} view={view} position={position} />
              </div>
            </div>
            <SoldOutOverlay stock={stock} inBasket={inBasket} />
          </div>
        </div>
      </div>
    </div>
  )

FeaturedRecipe.propTypes = {
  ...recipePropTypes,
  id: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
  position: PropTypes.number,
  description: PropTypes.string,
  useWithin: PropTypes.string.isRequired,
  tag: PropTypes.string,
  cookingTime: PropTypes.number.isRequired,
  equipment: PropTypes.instanceOf(Immutable.List),
  inBasket: PropTypes.bool,
  chef: PropTypes.shape({
    media: PropTypes.shape({
      images: PropTypes.array,
    }),
    name: PropTypes.string,
    celebrity: PropTypes.bool,
  }),
  highlight: PropTypes.func,
  unhighlight: PropTypes.func,
  detailHover: PropTypes.bool,
  fiveADay: PropTypes.number,
  view: PropTypes.string,
}

FeaturedRecipe.defaultProps = {
  view: 'featured',
  tag: '',
  chef: Immutable.Map({}),
  fiveADay: 0,
}

export { FeaturedRecipe }
