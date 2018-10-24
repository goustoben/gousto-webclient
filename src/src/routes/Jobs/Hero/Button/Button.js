import PropTypes from 'prop-types'
import React from 'react'
import css from './Button.css'
import Link from 'Link'

const CTA = ({ children, link }) => (
	<div className={css.buttonContainer}>
		<Link to={link}>
			<div className={css.buttonInner}>
				<div className={css.buttonText}>
					<p className={css.copy} >{children}</p>
					<span className={css.chevron} aria-hidden="true" ></span>
				</div>
			</div>
		</Link>
	</div>
)

CTA.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	link: PropTypes.string,
}

export default CTA
