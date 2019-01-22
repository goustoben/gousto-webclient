import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import classnames from 'classnames'

import RangeBadge from 'Recipe/RangeBadge'
import { getChef } from 'utils/recipe'
import { recipePropTypes } from 'Recipe'
import css from './FeaturedRecipe.css'
import Chef from '../Chef'
import Title from '../Title'
import Image from '../Image'
import AddButton from '../AddButton'
import ChefQuote from '../ChefQuote'
import UseWithin from '../UseWithin'
import TasteScore from '../TasteScore'
import CookingTime from '../CookingTime'
import DisabledOverlay from '../DisabledOverlay'
import RecommendedBadge from '../RecommendedBadge'
import EquipmentRequired from '../EquipmentRequired'

const FeaturedRecipe = (props) => (
	<div>
		<div className={css.featuredRecipe}>
			<span onClick={props.onClick} className={css.link}>
				<Image
				  media={props.media}
				  alt={props.title}
				  view={props.view}
				  mouseEnter={props.highlight}
				  mouseLeave={props.unhighlight}
				/>
			</span>
			<TasteScore className={css.score} score={props.tasteScore} />
			<div className={css.chefLogo}>
				<Chef chef={props.chef} />
			</div>
			<div className={props.tag ? css.featuredDetailsWithTag : css.featuredDetails}>
				<div className={css.textContainer}>
				<RangeBadge range={props.range} />
					<div onClick={props.onClick} className={classnames(css.linkUnderlined, { [css.linkIfChefFeatured]: getChef(props.chef) })}>
						<Title
						  title={props.title}
						  view={props.view}
						  mouseEnter={props.highlight}
						  mouseLeave={props.unhighlight}
						  detailHover={props.detailHover}
						/>
					</div>
					<div>
						<ChefQuote chef={props.chef} quote={props.description} />
						
						<RecommendedBadge isRecommendedRecipe={props.isRecommendedRecipe} features={props.features} />
						<span className={css.attributes}>
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
								<div className={css.attributeMinHeight}>
									<EquipmentRequired
									  equipment={props.equipment}
									  view="notice"
									/>
								</div>
							</div>
						</span>
					</div>
					<AddButton id={props.id} stock={props.stock} inBasket={props.inBasket} view={props.view} position={props.position} surcharge={props.surcharge} score={props.tasteScore} />
					<DisabledOverlay stock={props.stock} inBasket={props.inBasket} />
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
      images: PropTypes.Array,
    }),
    name: PropTypes.string,
    celebrity: PropTypes.bool,
  }),
  highlight: PropTypes.func,
  unhighlight: PropTypes.func,
  detailHover: PropTypes.bool,
  tasteScore: PropTypes.number,
}

FeaturedRecipe.defaultProps = {
  view: 'featured',
  tag: '',
  isRecommendedRecipe: false,
  chef: Immutable.Map({}),
}

export default FeaturedRecipe
