import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'

import { recipePropTypes } from 'Recipe'
import RangeBadge from 'Recipe/RangeBadge'
import { getChef } from 'utils/recipe'
import { Pill } from 'goustouicomponents'
import css from './FeaturedRecipe.css'
import Chef from '../Chef'
import Title from '../Title'
import Image from '../Image'
import AddButton from '../AddButton'
import ChefQuote from '../ChefQuote'
import TasteScore from '../TasteScore'
import DisabledOverlay from '../DisabledOverlay'
import RecommendedBadge from '../RecommendedBadge'
import { AttributeGrid } from '../AttributeGrid'
import { ShortlistButton } from '../ShortlistButton'

const FeaturedRecipe = ({ onClick, selectFoodBrand, isFoodBrandClickable, media, title,
  view, highlight, unhighlight, tasteScore, chef, tag, detailHover,
  description, range, isRecommendedRecipe, features, cookingTime,
  useWithin, equipment, id, stock, inBasket, position, fiveADay, diet, showRecipeDetailsButton, showShortlistButton }) => (
    <div>
      <div className={css.featuredRecipe}>
        <span onClick={onClick} className={css.link}>
          <Image
            media={media}
            alt={title}
            view={view}
            mouseEnter={highlight}
            mouseLeave={unhighlight}
          />
        </span>
        <TasteScore className={css.score} score={tasteScore} />
        <div className={css.chefLogo}>
          <Chef chef={chef} />
        </div>
        <div className={tag ? css.featuredDetailsWithTag : css.featuredDetails}>
          <div className={css.textContainer}>
            <div className={css.rangeBadgeFeatured}>
              <RangeBadge range={range} selectFoodBrand={selectFoodBrand} isFoodBrandClickable={isFoodBrandClickable} />
            </div>
            <div onClick={onClick} className={classnames(css.linkUnderlined, { [css.linkIfChefFeatured]: getChef(chef) })}>
              <Title
                title={title}
                view={view}
                mouseEnter={highlight}
                mouseLeave={unhighlight}
                detailHover={detailHover}
              />
            </div>
            <div>
              <ChefQuote chef={chef} quote={description} />
              {showRecipeDetailsButton &&
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
              }
              <RecommendedBadge isRecommendedRecipe={isRecommendedRecipe} features={features} />
              <AttributeGrid maxNoAttributes={4} cookingTime={cookingTime} useWithin={useWithin} equipment={equipment} diet={diet} fiveADay={fiveADay} />
            </div>
            <div className={css.buttonContainer}>
              {showShortlistButton &&
                <ShortlistButton id={id} stock={stock} position={position}/>
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

FeaturedRecipe.propTypes = {
  ...recipePropTypes,
  id: PropTypes.string.isRequired,
  position: PropTypes.number,
  description: PropTypes.string,
  useWithin: PropTypes.string.isRequired,
  tag: PropTypes.string,
  cookingTime: PropTypes.number.isRequired,
  equipment: PropTypes.instanceOf(Immutable.List),
  inBasket: PropTypes.bool,
  features: PropTypes.instanceOf(Immutable.Map).isRequired,
  isRecommendedRecipe: PropTypes.bool,
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
  tasteScore: PropTypes.number,
  fiveADay: PropTypes.number,
  isFoodBrandClickable: PropTypes.bool,
  selectFoodBrand: PropTypes.func,
  showRecipeDetailsButton: PropTypes.bool,
  showShortlistButton: PropTypes.bool,
}

FeaturedRecipe.defaultProps = {
  view: 'featured',
  tag: '',
  isRecommendedRecipe: false,
  chef: Immutable.Map({}),
  fiveADay: 0,
}

export default FeaturedRecipe
