import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import home from 'config/home'
import config from 'config/routes'
import { ModuleHeaderContainer } from 'ModuleHeader'
import typography from 'design-language/typography.css'
import TestimonialCarousel from './TestimonialCarousel'
import Storystream from '../Storystream'
import css from './Testimonials.css'
import { CTAHomepageContainer } from '../CTA'

const Testimonials = ({ redirect, enableStorystream, showLink, ctaText, ctaUri, trackGetStarted, isHomePageRedesignEnabled, ...props }) => (
  <div className={classNames(css.testimonials, { [css.homepageRedesign]: isHomePageRedesignEnabled })}>
    <ModuleHeaderContainer>Over 1 million meals delivered</ModuleHeaderContainer>
    <h3 className={classNames(css.subHeader, { [typography.fontStyleBody]: isHomePageRedesignEnabled })}>And the reviews are pouring in:</h3>
    <TestimonialCarousel showLink={showLink} isHomePageRedesignEnabled={isHomePageRedesignEnabled} />
    {enableStorystream && (
      <section className={css.storystreamContainer}>
        <Storystream {...props} />
      </section>
    )}

    <CTAHomepageContainer
      width={240}
      onClick={() => {
        redirect(ctaUri)
        trackGetStarted('trustpilot')
      }}
    >
      {ctaText}
    </CTAHomepageContainer>
  </div>
)

Testimonials.propTypes = {
  redirect: PropTypes.func,
  showLink: PropTypes.bool,
  enableStorystream: PropTypes.bool,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  ctaUri: PropTypes.string,
  trackGetStarted: PropTypes.func,
  isHomePageRedesignEnabled: PropTypes.bool,
}

Testimonials.defaultProps = {
  showLink: true,
  enableStorystream: false,
  ctaText: home.CTA.main,
  ctaUri: config.client.signup,
  trackGetStarted: () => {},
  isHomePageRedesignEnabled: false
}

export default Testimonials
