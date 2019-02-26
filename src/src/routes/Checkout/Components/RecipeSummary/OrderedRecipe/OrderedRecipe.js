import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import Immutable from 'immutable'/* eslint-disable new-cap */
import config from 'config/menu'
import GoustoImage from 'Image'
import css from './OrderedRecipe.css'
import Button from '../Buttons'

const OrderedRecipes = ({ title, recipeId, stock, media, basics, serving, featureBtn, featureLink, view, range }) => (
	<div className={css.container}>
		<GoustoImage media={media} title={title} className={css[`${view}Img`]} />
		<div className={classnames(css.recipeContainer, css[`${view}Flex`])}>
			<div className={css.receipeName}>
				<span className={classnames((featureLink) ? css.link : '', css.details)}>
					<span className={css.textBold}>{title}</span>&nbsp;{(featureLink) ? <span className={css.arrowRight} /> : null}
				</span>
				{(range === 'fine-dine-in') ? <span className={css.detailsRow}><span className={css.fineDineIn}>Fine Dine In</span></span> : null}
				{(basics.size > 0 && view === 'boxdetails') ? <p className={css.details}><span className={css.basics}>You'll need: {basics.toJS().join(', ')}</span></p> : null}
				{(featureBtn) ?
					<Button
					  view="checkout"
					  recipeId={recipeId}
					  outOfstock={stock <= config.stockThreshold && stock !== null}
					  stock={stock}
					  disabled={false}
					  showControl
					/>
				  :
					<span className={css.textSM}>{`${serving} Servings`}</span>
				}
			</div>
		</div>
	</div>
)

OrderedRecipes.propTypes = {
  title: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  basics: PropTypes.instanceOf(Immutable.List),
  stock: PropTypes.number,
  serving: PropTypes.number,
  featureBtn: PropTypes.bool,
  featureLink: PropTypes.bool,
  media: PropTypes.instanceOf(Immutable.List),
  view: PropTypes.oneOf(['boxdetails', 'summary']),
  range: PropTypes.string.isRequired,
}

OrderedRecipes.defaultProps = {
  title: '',
  recipeId: '',
  basics: Immutable.List([]),
  stock: 0,
  serving: 0,
  media: Immutable.List([]),
  featureBtn: false,
  featureLink: false,
  view: 'boxdetails',
  range: '',
}

export default OrderedRecipes
