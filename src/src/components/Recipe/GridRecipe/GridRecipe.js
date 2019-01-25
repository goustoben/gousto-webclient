import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'

import RangeBadge from 'Recipe/RangeBadge'
import { getChef } from 'utils/recipe'
import { recipePropTypes } from 'Recipe'
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
import { RecipeAttribute } from '../RecipeAttribute'

const GridRecipe = ({onClick, media, title, highlight, unhighlight, tasteScore, chef, view, detailHover, range, isRecommendedRecipe,
  features, stock, averageRating, ratingCount, cookingTime, useWithin, equipment, inBasket, position, surcharge, id, fiveADayValue}) => (
  <div>
    <div className={css.recipeDetails}>
      <span onClick={onClick} className={css.link}>
        <Image
          media={media}
          alt={title}
          mouseEnter={highlight}
          mouseLeave={unhighlight}
        />
      </span>
      <TasteScore className={css.score} score={tasteScore} />
      <div>
        <Chef chef={chef} />
      </div>
      <div className={css.rangeBadgeWrapper}>
				<RangeBadge range={range} />
      </div>
      <div className={css.textContainer}>
        <div onClick={onClick} className={classnames(css.linkUnderlined, { [css.linkIfChef]: getChef(chef) })}>
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
            />
          </div>
        </div>
        <div className={css.attributes}>
          <RecipeAttribute name='cookingTime' value={cookingTime} icon='icon-time' />
          <RecipeAttribute name='equipmentRequired' value={equipment} icon='icon-equipment' view='notice' />
          <RecipeAttribute name='useWithin' value={useWithin} icon='icon-use-within' />
          <RecipeAttribute name='fiveADay' value={fiveADayValue} icon='icon-five-a-day' show={fiveADayValue > 1} />
        </div>
        <AddButton id={id} stock={stock} inBasket={inBasket} view={view} position={position} surcharge={surcharge} score={tasteScore} />
        <DisabledOverlay stock={stock} inBasket={inBasket} />
      </div>
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
  range: PropTypes.string,
  fiveADayValue: PropTypes.number
}

GridRecipe.defaultProps = {
  view: 'grid',
  isRecommendedRecipe: false,
  chef: Immutable.Map({}),
  averageRating: 0,
  ratingCount: 0,
  fiveADayValue: 0,
}

export default GridRecipe
