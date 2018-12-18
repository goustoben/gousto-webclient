import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import classnames from 'classnames'

import Svg from 'components/Svg'
import { getChef } from 'utils/recipe'
import css from './FineDineInRecipe.css'
import Title from '../Title'
import AddButton from '../AddButton'
import StockBadge from '../StockBadge'
import TasteScore from '../TasteScore'
import CookingTime from '../CookingTime'
import DisabledOverlay from '../DisabledOverlay'
import RecommendedBadge from '../RecommendedBadge'
import { recipePropTypes } from 'Recipe'

const FineDineInRecipe = (props) => {
  const image = props.media.find(url => url.get('width') === 700) || Immutable.Map({})

  return (
		<div className={css.overlay}>
			<div style={{ backgroundImage: `url(${image.get('src')})` }} className={css.recipeCover}>
				<Svg fileName="fine-dine-in-range" className={css.gel}>
					Fine Dine In
				</Svg>
				<div
				  className={css.clickContainer}
				  onClick={props.onClick}
				  onMouseEnter={props.highlight}
				  onMouseLeave={props.unhighlight}
				>
				</div>
				<div className={css.recipeDetails}>
					<TasteScore className={css.score} score={props.tasteScore} />
					<div className={css.textContainer}>
						<div onClick={props.onClick} className={classnames(css.linkUnderlined, { [css.linkIfChef]: getChef(props.chef) })}>
							<Title
							  title={props.title}
							  view={props.view}
							  mouseEnter={props.highlight}
							  mouseLeave={props.unhighlight}
							  detailHover={props.detailHover}
							/>
						</div>
						<div className={css.alignBadges}>
							<div className={css.badgeItem}>
								<CookingTime
								  time={props.cookingTime}
								/>
							</div>
							<div className={css.badgeItem}>
								<RecommendedBadge
								  isRecommendedRecipe={props.isRecommendedRecipe}
								  features={props.features}
								/>
							</div>
							<div className={css.badgeItem}>
								<StockBadge stock={props.stock} inverse />
							</div>
						</div>

						<AddButton id={props.id} stock={props.stock} inBasket={props.inBasket} view={props.view} position={props.position} surcharge={props.surcharge} score={props.tasteScore} />
						<DisabledOverlay stock={props.stock} inBasket={props.inBasket} />
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
      images: PropTypes.Array,
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
