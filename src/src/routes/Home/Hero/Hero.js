import React, { PropTypes } from 'react'
import ContentMask from 'ContentMask'
import home from 'config/home'
import config from 'config/routes'
import CTAHomepage from '../CTA'
import css from './Hero.css'

const Hero = ({ redirect, ctaUri, ctaText, dataTesting }) => (
	<div className={css.container} data-testing={dataTesting}>
		<div className={css.textContainer}>
			<h1 className={css.header}>
				<span>{home.hero.header}</span>
			</h1>
			<h2 className={css.subHeader}>{home.hero.subheader}</h2>
			<div className={css.cta}>
				<CTAHomepage
					width={240}
					onClick={() => redirect(ctaUri)}
					dataTesting="homepageHeroCTA"
				>
					{ctaText}
				</CTAHomepage>
			</div>
		</div>
		<ContentMask fillColor="Coconut" />
		<div className={css.spacer} />
	</div>
)

Hero.propTypes = {
	redirect: PropTypes.func,
	ctaUri: PropTypes.string,
	ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	dataTesting: PropTypes.string,
}

Hero.defaultProps = {
	ctaUri: config.client.menu,
	ctaText: home.CTA.main,
}

export default Hero
