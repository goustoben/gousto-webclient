import PropTypes from 'prop-types'
import React from 'react'
import home from 'config/home'
import config from 'config/routes'
import CTAHomepage from '../CTA'
import Content from 'containers/Content'
import css from './Hero2.css'

const Hero = ({ redirect, ctaUri, ctaText, dataTesting }) => (
	<div className={css.container} data-testing={dataTesting}>
		<div className={css.textContainer}>
			<h1 className={css.header}>
				<Content contentKeys="propositionMainHeadline"><span>{home.hero.header}</span></Content>
				</h1>
			<h2 className={css.subHeader}>
				<Content contentKeys="propositionSupportingHeadline"><span>{home.hero.subheader}</span></Content>
			</h2>
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
