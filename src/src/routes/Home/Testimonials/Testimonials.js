import PropTypes from 'prop-types'
import React from 'react'
import home from 'config/home'
import config from 'config/routes'
import { ModuleHeaderContainer } from 'ModuleHeader'
import TestimonialCarousel from './TestimonialCarousel'
import css from './Testimonials.css'
import { CTAHomepageContainer } from '../CTA'

const Testimonials = ({ showLink, ctaText, ctaUri }) => (
  <div className={css.testimonials}>
    <ModuleHeaderContainer>Over 1 million meals delivered</ModuleHeaderContainer>
    <h3 className={css.subHeader}>And the reviews are pouring in:</h3>
    <TestimonialCarousel showLink={showLink} />
    <CTAHomepageContainer
      width={240}
      ctaUri={ctaUri}
      sectionForTracking="trustpilot"
    >
      {ctaText}
    </CTAHomepageContainer>
  </div>
)

Testimonials.propTypes = {
  showLink: PropTypes.bool,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  ctaUri: PropTypes.string,
}

Testimonials.defaultProps = {
  showLink: true,
  ctaText: home.CTA.main,
  ctaUri: config.client.signup,
}

export default Testimonials
