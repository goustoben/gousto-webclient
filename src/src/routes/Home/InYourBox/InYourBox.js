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
			<p className={css.bodyText}>Your recipe box has everything you need to cook up to 4 delicious recipes</p>
			<ul className={css.list}>
				<li className={css.listItem}><span className={css.tick} />Perfectly measured ingredients from trusted suppliers (which means no food waste)</li>
				<li className={css.listItem}><span className={css.tick} />Easy-to-follow recipe cards</li>
				<li className={css.listItem}><span className={css.tick} />2 or 4 servings per recipe (younger kids may need just half a serving)</li>
				<li className={css.listItem}><span className={css.tick} />Insulated packaging to keep food cool</li>
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
