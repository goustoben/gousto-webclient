import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'

import { recipePropTypes } from 'Recipe'
import RangeBadge from 'Recipe/RangeBadge'
import { getChef } from 'utils/recipe'
import css from './FeaturedRecipe.css'
import Chef from '../Chef'
import Title from '../Title'
import Image from '../Image'
import AddButton from '../AddButton'
import ChefQuote from '../ChefQuote'
import TasteScore from '../TasteScore'
import DisabledOverlay from '../DisabledOverlay'
import RecommendedBadge from '../RecommendedBadge'
import { RecipeAttribute } from '../RecipeAttribute'

const FeaturedRecipe = ({onClick, media, title, view, highlight, unhighlight, tasteScore, chef, tag, detailHover, description, range, isRecommendedRecipe, features, cookingTime, useWithin, equipment, id, stock, inBasket, position, surcharge, fiveADayValue}) => (
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
            <RangeBadge range={range} />
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
            <RecommendedBadge isRecommendedRecipe={isRecommendedRecipe} features={features} />
            <span className={css.attributes}>
                <RecipeAttribute attributeName='cookingTime' attributeValue={cookingTime} svgFileName='icon-time' />
                <RecipeAttribute attributeName='fiveADay' attributeValue={fiveADayValue} svgFileName='icon-five-a-day' showAttribute={fiveADayValue > 1}/>
                <RecipeAttribute attributeName='useWithin' attributeValue={useWithin} svgFileName='icon-use-within' />
                <RecipeAttribute attributeName='equipmentRequired' attributeValue={equipment} svgFileName='icon-equipment' view='notice' />
            </span>
          </div>
          <AddButton id={id} stock={stock} inBasket={inBasket} view={view} position={position} surcharge={surcharge} score={tasteScore} />
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
  fiveADayValue: PropTypes.number
}

FeaturedRecipe.defaultProps = {
  view: 'featured',
  tag: '',
  isRecommendedRecipe: false,
  chef: Immutable.Map({}),
  fiveADayValue: 0,
}

export default FeaturedRecipe
