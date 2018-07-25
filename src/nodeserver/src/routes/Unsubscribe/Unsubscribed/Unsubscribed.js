import React, { PropTypes } from 'react'

import Link from 'Link'

import css from './Unsubscribed.css'

const Unsubscribed = ({ copy }) => (
	<div>
		<Link to="/">
			{copy.link}
			<span className={css.buttonRightIcon} />
		</Link>
	</div>
)

Unsubscribed.propTypes = {
	copy: PropTypes.shape({
		link: PropTypes.string,
	}).isRequired,
}

export default Unsubscribed
