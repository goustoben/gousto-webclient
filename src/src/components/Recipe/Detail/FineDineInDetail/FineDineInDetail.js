import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import classnames from 'classnames'

import css from './FineDineInDetail.css'
import Title from 'Recipe/Title'
import Diet from 'Recipe/Diet'
import Cals from 'Recipe/Cals'
import Rating from 'Recipe/Rating'
import Cuisine from 'Recipe/Cuisine'
import UseWithin from 'Recipe/UseWithin'
import AddButton from 'Recipe/AddButton'
import IngredientsList from '../IngredientsList/IngredientsList'
import Allergens from '../Allergens/Allergens'
import CookingTime from 'Recipe/CookingTime'
import Ingredients from 'Recipe/Ingredients'
import Nutrition from 'Recipe/Detail/Nutrition'
import Availability from 'Recipe/Availability'
import Carousel from 'Recipe/Detail/Carousel'
import { detailPropTypes } from 'Recipe/Detail/Detail'

const FineDineInDetail = ({ title, view, count, average, perPortion, per100Grams, ingredients, allergens, id, stock, inBasket, cookingTime, useWithin, availability, cutoffDate, description, youWillNeed, cuisine, diet, equipment, restrictedView, position, surcharge, images, menuRecipeDetailVisibilityChange }) => (
	<div>
		<div className={css.container}>
			<div className={css.carousel}>
				<Carousel images={images} />
				<div className={css.closeButton} onClick={() => { menuRecipeDetailVisibilityChange(false) }}>
					<span className={css.closeIcon}></span>
				</div>
			</div>
			<div>
				<div className={css.contentContainer}>
					<div className={css.header}>
						<Title title={title} view={view} detail />
						<div className={css.headerButton}>
							<AddButton id={id} stock={stock} inBasket={inBasket} view={view} surcharge={surcharge} position={position} />
						</div>
					</div>
					<div className={css.rating}>
						<Rating count={count} average={average} />
					</div>
					<hr className={css.rule} />
					<div className={classnames(css.tabletOnly, css.block)}>
						<AddButton id={id} stock={stock} inBasket={inBasket} view={view} surcharge={surcharge} position={position} />
					</div>
					<p className={css.text}>{description}</p>
					<CookingTime time={cookingTime} />
					<UseWithin useWithin={useWithin} />
					<Availability availability={availability} date={cutoffDate} />
					<Cuisine cuisine={cuisine} />
					{diet && ['vegetarian', 'vegan'].includes(diet.toLowerCase()) ? <Diet diet={diet} /> : null}
					{!restrictedView && <Cals cals={perPortion.get('energyKcal')} restrictedView={restrictedView} />}
					<hr className={css.rule} />
					{ingredients.size > 0 ? <Ingredients ingredients={ingredients} restrictedView={restrictedView} border={false} inset={false} /> : null}
					<hr className={css.rule} />
					<div className={css.twoColumnContainer}>
						<div className={css.oneColumnContainer}>
							{youWillNeed && youWillNeed.size ? (
								<div className={css.text}>
									<p className={css.heading}>What you'll need:</p>
									<p>{youWillNeed.map((item, idx) => <span key={idx}>{item}{(youWillNeed.size - 1) !== idx ? ', ' : null}</span>)}</p>
								</div>
							) : null}
							{equipment && equipment.size ? (
								<div className={css.text}>
									<p className={css.heading}>Equipment required:</p>
									<p>{equipment.toJS().join(', ')}</p>
								</div>
							) : null}
						</div>
						<div className={css.oneColumnContainer}>
							{perPortion.size > 0 ? <Nutrition perPortion={perPortion.toJS()} per100Grams={per100Grams.toJS()} restrictedView={restrictedView} inset={false} /> : null}
						</div>
					</div>
					<hr className={css.rule} />
					<div className={css.text}>
						{(allergens.size > 0 || ingredients.size > 0) ? (
							<div>
								<IngredientsList ingredients={ingredients} allergens={allergens} inset={false} />
								<Allergens allergens={allergens} inset={false} />
							</div>
						) : null}
					</div>
				</div>
			</div>
			<div className={css.stickyContainer}>
				<div className={css.stickyButton}>
					<AddButton id={id} stock={stock} inBasket={inBasket} view={view} surcharge={surcharge} position={position} />
				</div>
			</div>
		</div>
	</div>
)

FineDineInDetail.propTypes = {
  ...detailPropTypes,
  scrolledPastPoint: PropTypes.bool,
  images: PropTypes.instanceOf(Immutable.List),
}

FineDineInDetail.defaultProps = {
  scrolledPastPoint: false,
  images: Immutable.List([]),
}

export default FineDineInDetail
