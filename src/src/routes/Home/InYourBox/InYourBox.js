import React from 'react'
import home from 'config/home'
import config from 'config/routes'
import ModuleHeader from 'ModuleHeader'
import css from './InYourBox.css'
import CTAHomepage from '../CTA'

const InYourBox = ({ redirect, inverse, ctaText, ctaUri }) => (
	<div className={css.container}>
		<div className={inverse ? css.inverseContent : css.content}>
			<ModuleHeader>So, what will I get?</ModuleHeader>
			<p className={css.bodyText}>Your recipe box has everything you need to cook up to four delicious meals every week</p>
			<ul className={css.list}>
				<li className={css.listItem}><span className={css.tick} />Precise ingredients (no food waste)</li>
				<li className={css.listItem}><span className={css.tick} />Quality produce from trusted suppliers</li>
				<li className={css.listItem}><span className={css.tick} />100% British meat</li>
				<li className={css.listItem}><span className={css.tick} />Easy to follow recipe cards</li>
				<li className={css.listItem}><span className={css.tick} />Meals for 2 or 4 people</li>
			</ul>
			<CTAHomepage width={240} onClick={() => { redirect(ctaUri) }} buttonContainer={false} >{ctaText}</CTAHomepage>
		</div>
	</div>
)

InYourBox.propTypes = {
  redirect: React.PropTypes.func,
  inverse: React.PropTypes.bool,
  ctaText: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),
  ctaUri: React.PropTypes.string,
}

InYourBox.defaultProps = {
  ctaText: home.CTA.main,
  ctaUri: config.client.signup,
}

export default InYourBox
