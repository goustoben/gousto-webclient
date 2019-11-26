import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import RangeBadge from 'Recipe/RangeBadge'
import { recipePropTypes } from 'Recipe'
import { Pill } from 'goustouicomponents'
import { RecipeDisclaimer } from 'routes/Menu/RecipeDisclaimer'
import css from './GridRecipe.css'
import Chef from '../Chef'
import Title from '../Title'
import Image from '../Image'
import Rating from '../Rating'
import AddButton from '../AddButton'
import StockBadge from '../StockBadge'
import TasteScore from '../TasteScore'
import DisabledOverlay from '../DisabledOverlay'
import RecommendedBadge from '../RecommendedBadge'
import { AttributeGrid } from '../AttributeGrid'
import { ShortlistButton } from '../ShortlistButton'

const GridRecipe = ({ onClick, selectFoodBrand, isFoodBrandClickable, media, title, highlight, unhighlight, tasteScore, chef, view, detailHover, range, isRecommendedRecipe,
  features, stock, averageRating, ratingCount, cookingTime, useWithin, equipment, inBasket, position, id, diet, fiveADay, isNew, showShortlistButton, showShortlistFirstStep }) => (
    <div className={css.recipeDetails}>
      <span onClick={onClick} className={css.link}>
        <Image
          media={media}
          alt={title}
          mouseEnter={highlight}
          mouseLeave={unhighlight}
        />
      </span>
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
      <TasteScore className={css.score} score={tasteScore} />
      <div>
        <Chef chef={chef} />
      </div>
      <div className={css.rangeBadgeWrapper}>
        <RangeBadge range={range} selectFoodBrand={selectFoodBrand} isFoodBrandClickable={isFoodBrandClickable} />
      </div>
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
          <RecommendedBadge isRecommendedRecipe={isRecommendedRecipe} features={features} />
          <StockBadge stock={stock} />
          <div>
            <Rating
              average={averageRating}
              count={ratingCount}
              isNew={isNew}
            />
          </div>
        </div>
        <AttributeGrid maxNoAttributes={4} cookingTime={cookingTime} useWithin={useWithin} equipment={equipment} diet={diet} fiveADay={fiveADay} />
        <RecipeDisclaimer id={id} />
        <div className={css.buttonContainer}>
          {showShortlistButton &&
            <ShortlistButton id={id} stock={stock} view={view} position={position} showShortlistFirstStep={showShortlistFirstStep} />
          }
          <AddButton id={id} stock={stock} inBasket={inBasket} view={view} position={position} score={tasteScore} />
        </div>
        <DisabledOverlay stock={stock} inBasket={inBasket} />
      </div>
    </div>
)

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
  isRecommendedRecipe: PropTypes.bool,
  equipment: PropTypes.instanceOf(Immutable.List),
  inBasket: PropTypes.bool,
  averageRating: PropTypes.number,
  cookingTime: PropTypes.number.isRequired,
  ratingCount: PropTypes.number,
  features: PropTypes.instanceOf(Immutable.Map).isRequired,
  useWithin: PropTypes.string.isRequired,
  highlight: PropTypes.func,
  unhighlight: PropTypes.func,
  detailHover: PropTypes.bool,
  tasteScore: PropTypes.number,
  range: PropTypes.instanceOf(Immutable.Map),
  fiveADay: PropTypes.number,
  isFoodBrandClickable: PropTypes.bool,
  selectFoodBrand: PropTypes.func,
  showShortlistButton: PropTypes.bool,
  showShortlistFirstStep: PropTypes.bool,
}

GridRecipe.defaultProps = {
  view: 'grid',
  isRecommendedRecipe: false,
  chef: Immutable.Map({}),
  averageRating: 0,
  ratingCount: 0,
  fiveADay: 0,
  cookingTime: 0,
  features: Immutable.Map({}),
  useWithin: '',
  showShortlistFirstStep: false
}

export default GridRecipe
