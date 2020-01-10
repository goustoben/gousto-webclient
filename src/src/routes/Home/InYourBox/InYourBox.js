import PropTypes from 'prop-types'
import React from 'react'
import home from 'config/home'
import config from 'config/routes'
import ModuleHeader from 'ModuleHeader'
import css from './InYourBox.css'
import CTAHomepage from '../CTA'

const InYourBox = ({ redirect, inverse, ctaText, ctaUri }) => (
  <div className={css.container}>
    <div className={inverse ? css.inverseContent : css.content}>
      <ModuleHeader>It starts with a box</ModuleHeader>
      <p className={css.bodyText}>A Gousto recipe box is packed with everything you need to reinvent dinnertimes.</p>
      <ul className={css.list}>
        <li className={css.listItem}><span className={css.tick} />Precise ingredients (no food waste)</li>
        <li className={css.listItem}><span className={css.tick} />Quality produce from trusted suppliers</li>
        <li className={css.listItem}><span className={css.tick} />100% British fresh meat</li>
        <li className={css.listItem}><span className={css.tick} />Easy to follow recipe cards</li>
        <li className={css.listItem}><span className={css.tick} />Meals for 2 or 4 people</li>
      </ul>
      <CTAHomepage width={240} onClick={() => { redirect(ctaUri) }} buttonContainer={false}>{ctaText}</CTAHomepage>
    </div>
  </div>
)

InYourBox.propTypes = {
  redirect: PropTypes.func,
  inverse: PropTypes.bool,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  ctaUri: PropTypes.string,
}

InYourBox.defaultProps = {
  ctaText: home.CTA.main,
  ctaUri: config.client.signup,
}

export default InYourBox
