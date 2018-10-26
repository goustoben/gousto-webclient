import PropTypes from 'prop-types'
import React from 'react'
import css from './ChefQuote.css'
import Immutable from 'immutable'
/* eslint-disable new-cap */
import classNames from 'classnames'
import { getMenuRecipeImage } from 'utils/image'

const ChefQuote = ({ chef, quote }) => {
	let chefProfile
	if (Immutable.Iterable.isIterable(chef) && chef.size > 0) {
		const chefImage = chef.getIn(['media', 'images']).find((value) => value.get('type') === 'headshot-image')
		const signatureImage = chef.getIn(['media', 'images']).find((value) => value.get('type') === 'signature-image')
		chefProfile = (
			<div className={css.row}>
				<div className={css.mainImage}>
					<img src={getMenuRecipeImage(chefImage.get('urls'), 400)} alt={chefImage.get('title')} className={css.secondaryImage} />
				</div>
				<div className={classNames(css.secondary, css.secondaryText)}>
					{(Immutable.Iterable.isIterable(signatureImage) && signatureImage.size > 1) ?
						<img src={getMenuRecipeImage(signatureImage.get('urls'), 400)} alt={`${chef.get('name')}'s signature`} className={css.signature} /> :
						<span>{chef.get('name')}</span>}
				</div>
			</div>
		)
	}

	return (
		<div className={css.container}>
			<div className={css.headingContainer}>
				{chefProfile}
			</div>
			<div>
				<div className={css.quoteContainer}>
					<blockquote>
						<p className={css.quoteContents}>
							{quote}
						</p>
					</blockquote>
				</div>
			</div>
		</div>
	)
}

ChefQuote.propTypes = {
	chef: PropTypes.instanceOf(Immutable.Map),
	quote: PropTypes.string.isRequired,
}

export default ChefQuote
