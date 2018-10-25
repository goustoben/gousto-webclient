import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable' // eslint-disable no-caps
import css from './Attributes.css'

const Attributes = ({ attributes }) => (
	<ul className={css.list}>
		{attributes.map((attribute, i) =>
			<li key={i} className={css.listItem}>
				<span className={css.textBold}>{attribute.get('title')}: </span> {attribute.get('value')}{attribute.get('unit')}
			</li>
		)}
	</ul>
)

Attributes.propTypes = {
	attributes: PropTypes.instanceOf(Immutable.List),
}

export default Attributes
