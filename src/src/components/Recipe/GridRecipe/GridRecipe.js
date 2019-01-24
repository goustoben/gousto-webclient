import React, { PropTypes } from 'react'
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
import UseWithin from '../UseWithin'
import AddButton from '../AddButton'
import StockBadge from '../StockBadge'
import TasteScore from '../TasteScore'
import CookingTime from '../CookingTime'
import DisabledOverlay from '../DisabledOverlay'
import RecommendedBadge from '../RecommendedBadge'
import EquipmentRequired from '../EquipmentRequired'

const GridRecipe = (props) => (
	<div>
		<div className={css.recipeDetails}>
			<span onClick={props.onClick} className={css.link}>
				<Image
				  media={props.media}
				  alt={props.title}
				  mouseEnter={props.highlight}
				  mouseLeave={props.unhighlight}
				/>
			</span>
			<TasteScore className={css.score} score={props.tasteScore} />
			<div>
				<Chef chef={props.chef} />
			</div>
			<div className={css.rangeBadgeWrapper}>
				<RangeBadge range={props.range} />
			</div>
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
				<div>
					<RecommendedBadge isRecommendedRecipe={props.isRecommendedRecipe} features={props.features} />
					<StockBadge stock={props.stock} />
				</div>
				<div className={css.attributes}>
					<Rating
					  average={props.averageRating}
					  count={props.ratingCount}
					/>
					<div className={css.attributeMinHeight}>
						<CookingTime
						  time={props.cookingTime}
						/>
					</div>
					<div className={css.attributeMinHeight}>
						<UseWithin
						  useWithin={props.useWithin}
						/>
					</div>
					<div className={css.attributeMinHeight}>
						<EquipmentRequired
						  equipment={props.equipment}
						  view="notice"
						/>
					</div>
				</div>
				<AddButton id={props.id} stock={props.stock} inBasket={props.inBasket} view={props.view} position={props.position} surcharge={props.surcharge} score={props.tasteScore} />
				<DisabledOverlay stock={props.stock} inBasket={props.inBasket} />
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

GridRecipe.defaultProps = {
  view: 'grid',
  isRecommendedRecipe: false,
  chef: Immutable.Map({}),
  averageRating: 0,
  ratingCount: 0,
}

export default GridRecipe
