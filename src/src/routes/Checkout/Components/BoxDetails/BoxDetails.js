import PropTypes from 'prop-types'
import React from 'react'
import { basketSum } from 'utils/basket'
import Immutable from 'immutable'/* eslint-disable new-cap */
import routes from 'config/routes'
import config from 'config/basket'
import Link from 'Link'
import css from './BoxDetails.css'
import RecipeSummary from '../RecipeSummary'

const BoxDetails = ({ maxRecipesNum, recipes }) => (
	<div>
		<div className={css.boxDetailsContainer} data-testing="checkoutBoxDetailsSection">
			<h3 className={css.header}>In your box</h3>
			<RecipeSummary showButton view="boxdetails" />
			{(basketSum(recipes) < maxRecipesNum)
			  ? <div className={css.text}>
					You get the best value when your box is full with {maxRecipesNum} recipes.&nbsp;
					<Link to={routes.client.menu} clientRouted>
						Add another recipe&nbsp;
						<span className={css.arrowRight} />
					</Link>
       </div>
			  : null}
		</div>
	</div>
)

BoxDetails.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.Map),
  redirect: PropTypes.func,
  onSubmit: PropTypes.func,
  nextStepName: PropTypes.string,
  browser: PropTypes.string,
  maxRecipesNum: PropTypes.number,
}

BoxDetails.defaultProps = {
  maxRecipesNum: config.maxRecipesNum,
  recipes: Immutable.Map({}),
  redirect: () => {},
}

export default BoxDetails
