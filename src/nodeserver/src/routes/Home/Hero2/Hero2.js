import React, { PropTypes } from 'react'
import home from 'config/home'
import config from 'config/routes'
import CTAHomepage from '../CTA'
import css from './Hero2.css'

const Hero = ({ redirect, ctaUri, ctaText, dataTesting }) => (
	<div className={css.container} data-testing={dataTesting}>
		<div className={css.textContainer}>
			<h1 className={css.header}>{home.hero.header}</h1>
			<h2 className={css.subHeader}>{home.hero.subheader}</h2>
			<CTAHomepage width={240} onClick={() => redirect(ctaUri)} align="left" responsive dataTesting="homepageHeroCTA">{ctaText}</CTAHomepage>
		</div>
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
