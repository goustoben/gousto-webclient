import React from 'react'
import config from 'config/cookies'
import css from './CookieBanner.css'
import Link from 'Link'

const CookieBanner = ({ copy, isCookiePolicyAccepted, cookiePolicyAcceptanceChange }) => {
	if (isCookiePolicyAccepted) {
		return null
	}

	return (
		<div className={css.container} data-testing="cookiePolicyBanner">
			<div>
				<p className={css.description}>
					{copy.description}
					<Link to={config.findOutMoreLink} clientRouted={false}>
						<span className={css.linkMessage}>
							{copy.findMore}
						</span>
					</Link>
				</p>
				<a
					role="button"
					className={css.button}
					data-testing="cookiePolicyBannerBtn"
					onClick={() => {
						cookiePolicyAcceptanceChange(true)
					}}
				>
					{copy.button}
				</a>
			</div>
		</div>
	)
}

CookieBanner.propTypes = {
	copy: React.PropTypes.shape({
		button: React.PropTypes.string,
		findMore: React.PropTypes.string,
		description: React.PropTypes.string,
	}).isRequired,
	isCookiePolicyAccepted: React.PropTypes.bool,
	cookiePolicyAcceptanceChange: React.PropTypes.func.isRequired,
}

CookieBanner.defaultProps = {
	isCookiePolicyAccepted: false,
}

export default CookieBanner
