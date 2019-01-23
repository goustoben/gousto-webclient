import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'

import { recipePropTypes } from 'Recipe'
import Svg from 'components/Svg'
import { getChef } from 'utils/recipe'
import css from './FineDineInRecipe.css'
import Title from '../Title'
import AddButton from '../AddButton'
import StockBadge from '../StockBadge'
import TasteScore from '../TasteScore'
import { RecipeAttribute } from '../RecipeAttribute'
import DisabledOverlay from '../DisabledOverlay'
import RecommendedBadge from '../RecommendedBadge'

const FineDineInRecipe = ({media, onClick, highlight, unhighlight, tasteScore, title, view, detailHover, cookingTime, chef, isRecommendedRecipe, features, stock, inBasket, position, surcharge, id}) => {
  const image = media.find(url => url.get('width') === 700) || Immutable.Map({})

  return (
    <div className={css.overlay}>
      <div style={{ backgroundImage: `url(${image.get('src')})` }} className={css.recipeCover}>
        <Svg fileName="fine-dine-in-range" className={css.gel}>
          Fine Dine In
        </Svg>
        <div
          className={css.clickContainer}
          onClick={onClick}
          onMouseEnter={highlight}
          onMouseLeave={unhighlight}
        >
        </div>
        <div className={css.recipeDetails}>
          <TasteScore className={css.score} score={tasteScore} />
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
            <div className={css.alignBadges}>
              <div className={css.badgeItem}>
                <RecipeAttribute attributeName='cookingTime' attributeValue={cookingTime} svgFileName='icon-time' />
              </div>
              <div className={css.badgeItem}>
                <RecommendedBadge
                  isRecommendedRecipe={isRecommendedRecipe}
                  features={features}
                />
              </div>
              <div className={css.badgeItem}>
                <StockBadge stock={stock} inverse />
              </div>
            </div>

            <AddButton id={id} stock={stock} inBasket={inBasket} view={view} position={position} surcharge={surcharge} score={tasteScore} />
            <DisabledOverlay stock={stock} inBasket={inBasket} />
          </div>
        </div>
      </div>
    </div>
  )
}

FineDineInRecipe.propTypes = {
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
}

FineDineInRecipe.defaultProps = {
  view: 'fineDineIn',
  isRecommendedRecipe: false,
  chef: Immutable.Map({}),
  averageRating: 0,
  ratingCount: 0,
  media: Immutable.List([]),
}

export default FineDineInRecipe
