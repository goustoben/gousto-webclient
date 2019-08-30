import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'

import { recipePropTypes } from 'Recipe'
import { getChef } from 'utils/recipe'
import RangeBadge from 'Recipe/RangeBadge'
import css from './FineDineInRecipe.css'
import Title from '../Title'
import AddButton from '../AddButton'
import StockBadge from '../StockBadge'
import TasteScore from '../TasteScore'
import { RecipeAttribute } from '../RecipeAttribute'
import DisabledOverlay from '../DisabledOverlay'
import RecommendedBadge from '../RecommendedBadge'
import { ShortlistButton } from '../ShortlistButton'

const FineDineInRecipe = ({media, onClick, selectFoodBrand, isFoodBrandClickable, highlight, unhighlight,
  tasteScore, title, view, detailHover, cookingTime, chef, isRecommendedRecipe,
  features, stock, inBasket, position, id, range, showShortlistButton}) => {
  const image = media.find(url => url.get('width') === 700) || Immutable.Map({})

  return (
    <div className={css.overlay}>
      <div style={{ backgroundImage: `url(${image.get('src')})` }} className={css.recipeCover}>
        <div className={css.rangeBadgeWrapper}>
          <RangeBadge range={range} selectFoodBrand={selectFoodBrand} isFoodBrandClickable={isFoodBrandClickable} />
        </div>
        <div
          role="button"
          tabIndex={0}
          className={css.clickContainer}
          onClick={onClick}
          onKeyPress={onClick}
          onMouseEnter={highlight}
          onMouseLeave={unhighlight}
        >
        </div>
        <div className={css.recipeDetails}>
          <TasteScore className={css.score} score={tasteScore} />
          <div className={css.textContainer}>
            <div
              role="link"
              tabIndex={0}
              onClick={onClick}
              onKeyPress={onClick}
              className={classnames(css.linkUnderlined, { [css.linkIfChef]: getChef(chef) })}
            >
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
                <RecipeAttribute name='cookingTime' value={cookingTime} icon='icon-time-white' />
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
            <div className={css.buttonContainer}>
              {showShortlistButton &&
                <div>
                  <ShortlistButton id={id} stock={stock} position={position}/>
                </div>
              }
              <div className={css.addButton}>
                <AddButton id={id} stock={stock} inBasket={inBasket} view={view} position={position} score={tasteScore} />
              </div>
            </div>
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
  isFoodBrandClickable: PropTypes.bool,
  selectFoodBrand: PropTypes.func,
  showShortlistButton: PropTypes.bool,
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
