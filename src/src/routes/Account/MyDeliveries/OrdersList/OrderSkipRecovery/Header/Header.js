import React, { PropTypes } from 'react'

import ContentMask from 'ContentMask'

import css from './Header.css'

const propTypes = {
	offer: PropTypes.shape({
    formatted_value: PropTypes.string,
    raw_message: PropTypes.shape({
      text: PropTypes.string,
      values: PropTypes.shape({
        date: PropTypes.string,
        value: PropTypes.string,
      }),
		}),
	}),
	featureFlag: PropTypes.bool,
}

const defaultProps = {
	offer: null,
}

const Header = ({ offer, featureFlag }) => (
	(offer && featureFlag) ? (
		<div>
			<div className={css.header}>
				<div className={css.mask}>
					<ContentMask />
				</div>
			</div>
		</div>
	) : null
)

Header.propTypes = propTypes

Header.defaultProps = defaultProps

export default Header
